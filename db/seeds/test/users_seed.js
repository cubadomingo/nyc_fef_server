import { create } from '../../../src/models/users.js';

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(function () {
    return create({
      username: 'cubadomingo',
      email: 'me@devinosor.io',
      password: 'password',
      password_confirmation: 'password_confirmation',
    });
  })
  .then(function () {
    return create({
      username: 'cubadomingo',
      email: 'me@devinosor.io',
      password: 'password',
      password_confirmation: 'password_confirmation',
    });
  });
};
