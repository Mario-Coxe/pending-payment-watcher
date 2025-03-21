import knex from 'knex';

const db = knex({
  client: 'mysql2', 
  connection: {
    host: '',
    user: '',
    password: '',
    database: '',
  },
});

export default db;
