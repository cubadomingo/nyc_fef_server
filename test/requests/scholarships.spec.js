import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import knex from '../../src/models/knex';

chai.use(chaiHttp);

describe('Scholarships', function() {

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
});
