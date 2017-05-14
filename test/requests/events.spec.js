import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import jwt from 'jsonwebtoken';
import knex from '../../src/models/knex';

chai.use(chaiHttp);

describe('Events', function() {
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

  describe('GET /api/v1/events', function() {
    it('should return all events', function() {
      return chai.request(server)
      .get('/api/v1/events')
      .set('x-access-token', token)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data.length).to.equal(5);
      });
    });
  });

  describe('GET /api/v1/events/:id', function() {
    it('should return event with id 1', function() {
      return chai.request(server)
      .get('/api/v1/events/1')
      .set('x-access-token', token)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data[0].title).to.equal('NYSE Visiting Tour');
      });
    });

    it('should return an error message if event is not found', function() {
      return chai.request(server)
      .get('/api/v1/events/100')
      .set('x-access-token', token)
      .catch((err) => {
        expect(err).to.have.status(404);
        expect(err.response.body.message).to.equal('event was not found');
      });
    });
  });

  describe('PUT /api/v1/events/:id', () => {
    it('should succesfully edit event and update created_at', function() {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
        datetime: '2017-12-05T17:21:00.000Z',
        location: '21691 Meekland Ave, Hayward, CA, United States',
      };

      return chai.request(server)
      .put('/api/v1/events/1')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        const {
          title,
          description,
          datetime,
          location,
          created_at,
          updated_at,
        } = res.body.data[0];

        expect(res).to.have.status(200);
        expect(title).to.equal(params.title);
        expect(description).to.equal(params.description);
        expect(datetime).to.equal(params.datetime);
        expect(location).to.equal(params.location);
        expect(created_at).to.not.equal(updated_at);
      });
    });

    it('should succesfully edit event with atleast one param', function() {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
      };

      return chai.request(server)
      .put('/api/v1/events/1')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        const {
          title,
          description,
          datetime,
          location,
        } = res.body.data[0];

        expect(res).to.have.status(200);
        expect(title).to.equal(params.title);
        expect(description).to.equal(params.description);
        expect(datetime).to.equal('2017-12-05T17:30:00.000Z');
        expect(location).to.equal(
          '11 Wall Street, New York, NY, United States'
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
      .put('/api/v1/events/1')
      .set('x-access-token', token)
      .send(params)
      .catch((err) => {
        expect(err).to.have.status(404);
        expect(err.response.body.message).to.equal('invalid param(s)');
      });
    });
  });

  describe('POST /api/v1/events', function() {
    it('should create a new event', function() {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
        datetime: '2017-12-05T17:21:00.000Z',
        location: '21691 Meekland Ave, Hayward, CA, United States',
      };

      return chai.request(server)
      .post('/api/v1/events')
      .set('x-access-token', token)
      .send(params)
      .then((res) => {
        const {
          id,
          title,
          description,
          datetime,
          location,
        } = res.body.data[0];

        expect(res).to.have.status(200);
        expect(id).to.equal(6);
        expect(title).to.equal(params.title);
        expect(description).to.equal(params.description);
        expect(datetime).to.equal(params.datetime);
        expect(location).to.equal(params.location);
      });
    });

    it('returns an error when there is an invalid params', function() {
      const params = {
        title: 'Hello',
        description: 'Lorem',
        invalid: 'yooo',
      };

      return chai.request(server)
      .post('/api/v1/events')
      .set('x-access-token', token)
      .send(params)
      .catch((err) => {
        expect(err).to.have.status(404);
        expect(err.response.body.message).to.equal('invalid param(s)');
      });
    });

    it('returns errors when required params are missing', function() {
      const params = {
      };

      return chai.request(server)
      .post('/api/v1/events')
      .set('x-access-token', token)
      .send(params)
      .catch((err) => {
        expect(err).to.have.status(404);
        expect(err.response.body.message).to.equal(
          'title is required, description is required, datetime is required, location is required'
        );
      });
    });
  });

  describe('DELETE /api/v1/events/:id', function() {
    it('should succesfully delete an event', function() {
      return chai.request(server)
      .delete('/api/v1/events/1')
      .set('x-access-token', token)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('event has been deleted');
      });
    });

    it('should return an error if the event can not be found', function() {
      return chai.request(server)
      .delete('/api/v1/events/100')
      .set('x-access-token', token)
      .catch((err) => {
        expect(err).to.have.status(404);
        expect(err.response.body.message).to.equal('event was not found');
      });
    });
  });
});
