import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import knex from '../../src/models/knex';

chai.use(chaiHttp);

describe('Authentication', function() {
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

  describe('Request Token', function() {
    it('returns a token with proper credentials', function() {
      const params = {
        username: 'cubadomingo',
        password: 'password'
      };

      return chai.request(server)
      .post('/api/v1/authenticate')
      .send(params)
      .then((res) => {
        expect(res).to.have.status(200);
        expect('token' in res.body).to.equal(true);
      });
    });

    it('returns an error if password is wrong', function() {
      const params = {
        username: 'cubadomingo',
        password: 'password510'
      };

      return chai.request(server)
      .post('/api/v1/authenticate')
      .send(params)
      .catch((err) => {
        expect(err).to.have.status(404);
        expect('token' in err.response.body).to.equal(false);
        expect(err.response.body.message).to.equal('password is not valid');
      });
    });

    it('returns an error if username is wrong', function() {
      const params = {
        username: 'cubadomingo5000',
        password: 'password'
      };

      return chai.request(server)
      .post('/api/v1/authenticate')
      .send(params)
      .catch((err) => {
        expect(err).to.have.status(404);
        expect('token' in err.response.body).to.equal(false);
        expect(err.response.body.message).to.equal('user does not exist');
      });
    });
  });
});
