import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import server from '../../src/server';
import knex from '../../src/models/knex';

chai.use(chaiHttp);

describe('Users', () => {
  const token = jwt.sign({username: 'cubadomingo'}, process.env.SECRET);

  // set migrations
  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        knex.seed.run()
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

  describe('GET /api/v1/users', () => {
    it('retrieves a list of all users', (done) => {
      chai.request(server)
      .get('/api/v1/users')
      .set('x-access-token', token)
      .end((err,  res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.length).to.equal(2);
        done();
      });
    }) ;
  });

  describe('PUT /api/v1/users', () => {
    it('succesfully edits a user\'s complete information', (done) => {
      const params = {
        username: 'cubadomingo650',
        email: 'new@devinosor.io',
        password: 'newpassword',
        password_confirmation: 'newpassword',
      };

      chai.request(server)
      .put('/api/v1/users/1')
      .set('x-access-token', token)
      .send(params)
      .end((err,  res) => {
        const { username, email } = res.body.data[0];

        expect(res).to.have.status(200);
        expect(username).to.equal(params.username);
        expect(email).to.equal(params.email);
        done();
      });
    });

    it('succesfully edits a user\'s username only', (done) => {
      const params = {
        username: 'cubadomingo650',
      };

      chai.request(server)
      .put('/api/v1/users/1')
      .set('x-access-token', token)
      .send(params)
      .end((err,  res) => {
        const { username } = res.body.data[0];

        expect(res).to.have.status(200);
        expect(username).to.equal(params.username);
        done();
      });
    });

    it('succesfully edits a user\'s email only', (done) => {
      const params = {
        email: 'new@devinosor.io',
      };

      chai.request(server)
      .put('/api/v1/users/1')
      .set('x-access-token', token)
      .send(params)
      .end((err,  res) => {
        const { email } = res.body.data[0];

        expect(res).to.have.status(200);
        expect(email).to.equal(params.email);
        done();
      });
    });

    it('succesfully edits a user\'s password only', (done) => {
      const params = {
        password: 'newpassword',
        password_confirmation: 'newpassword',
      };

      chai.request(server)
      .put('/api/v1/users/1')
      .set('x-access-token', token)
      .send(params)
      .end((err,  res) => {
        const { username, email } = res.body.data[0];

        expect(res).to.have.status(200);
        expect(username).to.exist;
        expect(email).to.exist;
        done();
      });
    });

    it('returns an error if edits password without password_confirmation', (done) => {
      const params = {
        password: 'newpassword',
      };

      chai.request(server)
      .put('/api/v1/users/1')
      .set('x-access-token', token)
      .send(params)
      .end((err,  res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Password_confirmation does not match or is missing'
        );
        done();
      });
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('destroys a user', (done) => {
      chai.request(server)
      .delete('/api/v1/users/1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User has been deleted');
        done();
      });
    });

    it('returns an error if user could not be found', (done) => {
      chai.request(server)
      .delete('/api/v1/users/100')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('User could not be found');
        done();
      });
    });
  });

  describe('POST /api/v1/users', () => {
    it('creates a new user', (done) => {
      const params = {
        username: 'cubadomingo',
        email: 'me@devinosor.io',
        password: 'password',
        password_confirmation: 'password',
      };

      chai.request(server)
      .post('/api/v1/users')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data[0].username).to.equal(params.username);
        expect(res.body.data[0].email).to.equal(params.email);
        done();
      });
    });

    it('returns an error if username is missing', (done) => {
      const params = {
        email: 'me@devinosor.io',
        password: 'password',
        password_confirmation: 'password11',
      };

      chai.request(server)
      .post('/api/v1/users')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Username is required'
        );
        done();
      });
    });

    it('returns an error if email is missing', (done) => {
      const params = {
        username: 'cubadomingo',
        password: 'password',
        password_confirmation: 'password11',
      };

      chai.request(server)
      .post('/api/v1/users')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Email is required'
        );
        done();
      });
    });

    it('returns an error if password is missing', (done) => {
      const params = {
        username: 'cubadomingo',
        email: 'me@devinosor.io',
        password_confirmation: 'password11',
      };

      chai.request(server)
      .post('/api/v1/users')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Password is required'
        );
        done();
      });
    });

    it('returns an error if password_confirmation is missing', (done) => {
      const params = {
        username: 'cubadomingo',
        email: 'me@devinosor.io',
        password: 'password',
      };

      chai.request(server)
      .post('/api/v1/users')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Password_confirmation is required'
        );
        done();
      });
    });

    it('returns an error if password_confirmation is wrong', (done) => {
      const params = {
        username: 'cubadomingo',
        email: 'me@devinosor.io',
        password: 'password',
        password_confirmation: 'password11',
      };

      chai.request(server)
      .post('/api/v1/users')
      .set('x-access-token', token)
      .send(params)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Password and password_confirmation do not match'
        );
        done();
      });
    });
  });
});
