const csv = require('csv-validator');

describe('#validateCSV()', function() {
  it('csv format should be valid', done => {   
    const csvFilePath = './storage/order.csv';
    const headers = {
      customer_status: 1, //should be number
      order_datetime: '', //should be string
      total_order_value: 1,
      average_unit_price: 1,
      distinct_unit_count: 1,
      total_units_count: 1,
      customer_state: ''
    };

    csv(csvFilePath, headers)
      .then(data => {        
        done();
      }).catch(err => {
        done(new Error(err));
      })
  })
})