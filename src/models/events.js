import knex from './knex';
import moment from 'moment';

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
  .where('id', parseInt(id))
  .then((event) => {
    if (event == 0) {
      throw new Error('event not found');
    } else {
      event[0].datetime = moment(event[0].datetime).format('YYYY-MM-DDTHH:mm');
      return event;
    }
  });
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
  ])
  .then((event) => {
    if (event == 0) {
      throw new Error('event not found');
    } else {
      return event;
    }
  });
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
  .del()
  .then((event) => {
    if (event === 1) {
      return event;
    } else {
      throw new Error('event not found');
    }
  });
};
