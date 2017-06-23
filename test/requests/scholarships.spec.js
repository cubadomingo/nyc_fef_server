import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import jwt from 'jsonwebtoken';
import knex from '../../src/models/knex';

chai.use(chaiHttp);

describe('Scholarships', function() {
  const token = jwt.sign({username: 'cubadomingo'}, process.env.SECRET);

  // set migrations and seeds
  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  // clear database
  afterEach(function(done) {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe('GET /api/v1/scholarships', function() {
    it('should return all scholarships', function() {
      return chai.request(server)
      .get('/api/v1/scholarships')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.scholarships.length).to.equal(5);
      });
    });
  });

  describe('GET /api/v1/scholarships/:id', function() {
    it('should return scholarship with id 1', function() {
      return chai.request(server)
      .get('/api/v1/scholarships/1')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.scholarship[0].title).to.equal(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        );
      });
    });

    it('should return an error message if scholarship is not found',
    function() {
      return chai.request(server)
      .get('/api/v1/scholarships/100')
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('scholarship not found');
      });
    });
  });

  describe('PUT /api/v1/scholarships/:id', function() {
     it('should succesfully edit scholarships and update created_at',
     function() {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
        deadline: '2017-12-05T17:21:00.000Z',
        eligibility: 'Freshman only',
      };

      return chai.request(server)
      .put('/api/v1/scholarships/1')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        const {
          title,
          description,
          deadline,
          eligibility,
          created_at,
          updated_at,
        } = res.body.scholarship[0];

        expect(res).to.have.status(200);
        expect(title).to.equal(params.title);
        expect(description).to.equal(params.description);
        expect(deadline).to.equal(params.deadline);
        expect(eligibility).to.equal(params.eligibility);
        expect(created_at).to.not.equal(updated_at);
      });
    });

    it('should succesfully edit scholarship with atleast one param', function() {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
      };

      return chai.request(server)
      .put('/api/v1/scholarships/1')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        const {
          title,
          description,
          deadline,
          eligibility,
        } = res.body.scholarship[0];

        expect(res).to.have.status(200);
        expect(title).to.equal(params.title);
        expect(description).to.equal(params.description);
        expect(deadline).to.equal('2017-12-06T01:30:00.000Z');
        expect(eligibility).to.equal(
          'Must be a freshman, sophomore, or junior'
        );
      });
    });

    it('should return an error when params are invalid', function() {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
        hello: 'what a lovely day',
      };

      return chai.request(server)
      .put('/api/v1/scholarships/1')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('invalid param(s)');
      });
    });

    it('should return an error if the scholarship is not found', function() {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
        deadline: '2017-12-05T17:21:00.000Z',
        eligibility: 'Sophomores',
      };

      return chai.request(server)
      .put('/api/v1/scholarships/1000')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('scholarship not found');
      });
    });
  });

  describe('POST /api/v1/scholarships', function() {
    it('should create a new scholarship', function() {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
        deadline: '2017-12-05T17:21:00.000Z',
        eligibility: 'freshman only',
      };

      return chai.request(server)
      .post('/api/v1/scholarships')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        const {
          id,
          title,
          description,
          deadline,
          eligibility,
        } = res.body.scholarship[0];

        expect(res).to.have.status(200);
        expect(id).to.equal(6);
        expect(title).to.equal(params.title);
        expect(description).to.equal(params.description);
        expect(deadline).to.equal(params.deadline);
        expect(eligibility).to.equal(params.eligibility);
      });
    });

    it('returns an error when there is an invalid params', function() {
      const params = {
        title: 'Hello',
        description: 'Lorem',
        invalid: 'yooo',
      };

      return chai.request(server)
      .post('/api/v1/scholarships')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('invalid param(s)');
      });
    });

    it('returns errors when required params are missing', function() {
      const params = {
      };

      return chai.request(server)
      .post('/api/v1/scholarships')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'title is required, description is required, deadline is required, eligibility is required'
        );
      });
    });
  });

  describe('DELETE /api/v1/scholarships/:id', function() {
    it('should succesfully delete an scholarship', function() {
      return chai.request(server)
      .delete('/api/v1/scholarships/1')
      .set('x-access-token', token)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('scholarship has been deleted');
      });
    });

    it('should return an error if the scholarship can not be found',
    function() {
      return chai.request(server)
      .delete('/api/v1/scholarships/100')
      .set('x-access-token', token)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('scholarship not found');
      });
    });
  });
});
