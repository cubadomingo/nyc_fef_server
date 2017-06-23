import knex from './knex';
import moment from 'moment';

const Scholarships = () => {
  return knex('scholarships');
};

// queries

export const getAll = () => {
  return Scholarships()
  .select()
  .orderBy('id');
};

export const getSingle = (id) => {
  return Scholarships()
  .where('id', parseInt(id))
  .then((scholarship) => {
    if (scholarship == 0) {
      throw new Error('scholarship not found');
    } else {
      scholarship[0].deadline = moment(scholarship[0].deadline).format('YYYY-MM-DDTHH:mm');
      return scholarship;
    }
  });
};

export const edit = (id, body) => {
  body['updated_at'] = new Date();

  return Scholarships()
  .where('id', parseInt(id))
  .update(body, [
    'id',
    'title',
    'description',
    'deadline',
    'eligibility',
    'created_at',
    'updated_at'
  ])
  .then((scholarship) => {
    if (scholarship == 0) {
      throw new Error('scholarship not found');
    } else {
      return scholarship;
    }
  });
};

export const create = (body) => {
  return Scholarships()
  .insert(body, [
    'id',
    'title',
    'description',
    'deadline',
    'eligibility',
    'created_at',
    'updated_at'
  ]);
};