import knex from './knex';

const Events = () => {
  return knex('events');
};

// queries

export const getAll = () => {
  return Events()
  .select()
  .orderBy('id');
};

export const getSingle = (id) => {
  return Events()
  .where('id', parseInt(id));
};

export const edit = (id, body) => {
  body['updated_at'] = new Date();

  return Events()
  .where('id', parseInt(id))
  .update(body, [
    'id',
    'title',
    'description',
    'datetime',
    'location',
    'created_at',
    'updated_at'
  ]);
};

export const create = (body) => {
  return Events()
  .insert(body, [
    'id',
    'title',
    'description',
    'datetime',
    'location',
    'created_at',
    'updated_at'
  ]);
};

export const destroy = (id) => {
  return Events()
  .where('id', parseInt(id))
  .del();
};
