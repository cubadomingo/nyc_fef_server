import knex from './knex';

export const authenticate = (body) => {
  return knex('users')
  .where('username', body.username);
};
