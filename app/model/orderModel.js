const bookshelf = require('./_model');

const order = bookshelf.Model.extend({
  tableName: 'orders',
  idAttribute: 'order_id' ,
  processors: {
    // loginDate is a model attribute name
    order_datetime: function(value) {
      // console.log(value)
      return new Date(value);
    }
  }
});

module.exports = bookshelf.model('order', order);
