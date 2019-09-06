const types = require('pg').types;
// const TIMESTAMPTZ_OID = 1184;
// const TIMESTAMP_OID = 1114;
// types.setTypeParser(TIMESTAMPTZ_OID, val => val);
// types.setTypeParser(TIMESTAMP_OID, val => val);

global.knexConnection = require('knex')({
  client: 'postgresql',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    charset  : 'utf8',
    timezone : 'UTC'
  }  ,
  // debug: process.env.NODE_ENV != 'production'
});

const bookshelf = require('bookshelf')(knexConnection);
bookshelf.plugin('registry');  
bookshelf.plugin(require('bookshelf-upsert'));
// bookshelf.plugin('processor')

module.exports = bookshelf;