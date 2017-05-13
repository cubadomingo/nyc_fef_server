import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import jwt from 'jsonwebtoken';
import knex from '../../src/models/knex';

chai.use(chaiHttp);

describe('Events', () => {
  const token = jwt.sign({username: 'cubadomingo'}, process.env.SECRET);

  // set migrations and seeds
  beforeEach((done) => {
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
  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe('GET /api/v1/events', () => {
    it('should return all events', (done) => {
      chai.request(server)
      .get('/api/v1/events')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data.length).to.equal(5);
        done();
      });
    });
  });

  describe('GET /api/v1/events/:id', () => {
    it('should return event with id 1', (done) => {
      chai.request(server)
      .get('/api/v1/events/1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data[0].title).to.equal('NYSE Visiting Tour');
        done();
      });
    });

    it('should return an error message if event is not found', (done) => {
      chai.request(server)
      .get('/api/v1/events/100')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body.message).to.equal('The event was not found');
        done();
      });
    });
  });

  describe('PUT /api/v1/events/:id', () => {
    it('should succesfully edit event and update created_at', (done) => {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
        datetime: '2017-12-05T17:21:00.000Z',
        location: '21691 Meekland Ave, Hayward, CA, United States',
      };

      chai.request(server)
      .put('/api/v1/events/1')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        const {
          title,
          description,
          datetime,
          location,
          created_at,
          updated_at,
        } = res.body.data[0];

        expect(title).to.equal(params.title);
        expect(description).to.equal(params.description);
        expect(datetime).to.equal(params.datetime);
        expect(location).to.equal(params.location);
        expect(created_at).to.not.equal(updated_at);
        done();
      });
    });

    it('should succesfully edit event with atleast one param', (done) => {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
      };

      chai.request(server)
      .put('/api/v1/events/1')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        const {
          title,
          description,
          datetime,
          location,
        } = res.body.data[0];

        expect(title).to.equal(params.title);
        expect(description).to.equal(params.description);
        expect(datetime).to.equal('2017-12-05T17:30:00.000Z');
        expect(location).to.equal(
          '11 Wall Street, New York, NY, United States'
        );
        done();
      });
    });

    it('should return an error when params are invalid', (done) => {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
        hello: 'what a lovely day',
      };

      chai.request(server)
      .put('/api/v1/events/1')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Invalid params');
        done();
      });
    });
  });

  describe('POST /api/v1/events', () => {
    it('should create a new event', (done) => {
      const params = {
        title: 'Sample Title',
        description: 'Lorem Ipsum',
        datetime: '2017-12-05T17:21:00.000Z',
        location: '21691 Meekland Ave, Hayward, CA, United States',
      };

      chai.request(server)
      .post('/api/v1/events')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
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
        done();
      });
    });

    it('returns an error when there is an invalid params', (done) => {
      const params = {
        title: 'Hello',
        description: 'Lorem',
        invalid: 'yooo',
      };

      chai.request(server)
      .post('/api/v1/events')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Invalid params');
        done();
      });
    });

    it('returns an error if title is missing', (done) => {
      const params = {
      };

      chai.request(server)
      .post('/api/v1/events')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Title is required');
        done();
      });
    });

    it('returns an error if description is missing', (done) => {
      const params = {
        title: 'Hello'
      };

      chai.request(server)
      .post('/api/v1/events')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Description is required');
        done();
      });
    });

    it('returns an error if datetime is missing', (done) => {
      const params = {
        title: 'Hello',
        description: 'Lorem',
      };

      chai.request(server)
      .post('/api/v1/events')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Datetime is required');
        done();
      });
    });

    it('returns an error if location is missing', (done) => {
      const params = {
        title: 'Hello',
        description: 'Lorem',
        datetime: '2017-12-05T17:21:00.000Z',
      };

      chai.request(server)
      .post('/api/v1/events')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Location is required');
        done();
      });
    });
  });

  describe('DELETE /api/v1/events/:id', () => {
    it('should succesfully delete an event', (done) => {
      chai.request(server)
      .delete('/api/v1/events/1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('The event has been deleted');
        done();
      });
    });

    it('should return an error if the event can not be found', (done) => {
      chai.request(server)
      .delete('/api/v1/events/100')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('The event was not found');
        done();
      });
    });
  });
});
