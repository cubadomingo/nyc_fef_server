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

  it('should send a token if the passwords match', function() {
    const params = {
      username: 'cubadomingo',
      password: 'password'
    };

    return chai.request(server)
    .post('/api/v1/authenticate')
    .send(params)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect('token' in res.body).to.equal(true);
    });
  });

  it('should send an error if password is wrong', function() {
    const params = {
      username: 'cubadomingo',
      password: 'password510'
    };

    return chai.request(server)
    .post('/api/v1/authenticate')
    .send(params)
    .catch((err) => {
      expect(err).to.have.status(404);
      expect(err.response.body.message).to.equal('password is not valid');
    });
  });
});
