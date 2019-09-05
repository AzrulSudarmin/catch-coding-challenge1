global.knexConnection = require('knex')({
  client: 'pg',
  timezone : 'UTC',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    charset  : 'utf8',
    timezone : 'UTC',
    dateStrings: true
  }  ,
  // debug: process.env.NODE_ENV != 'production'
});

const bookshelf = require('bookshelf')(knexConnection);
bookshelf.plugin('registry');  
bookshelf.plugin(require('bookshelf-upsert'));

module.exports = bookshelf;