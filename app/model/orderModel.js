const bookshelf = require('./_model');

const order = bookshelf.Model.extend({
  tableName: 'orders',
  idAttribute: 'order_id'
});

module.exports = bookshelf.model('order', order);
