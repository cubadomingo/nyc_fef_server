import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import knex from '../../src/models/knex';

chai.use(chaiHttp);

describe('Authentication', () => {
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

  it('should send a token if the passwords match', (done) => {
    const params = {
      username: 'cubadomingo',
      password: 'password'
    };

    chai.request(server)
    .post('/api/v1/authenticate')
    .send(params)
    .end((err, res) => {
      expect(res.body.success).to.equal(true);
      expect('token' in res.body).to.equal(true);
      done();
    });
  });

  it('should send an error if password is wrong', (done) => {
    const params = {
      username: 'cubadomingo',
      password: 'password510'
    };

    chai.request(server)
    .post('/api/v1/authenticate')
    .send(params)
    .end((err, res) => {
      expect(res.body.message).to.equal('password is not valid');
      done();
    });
  });
});
