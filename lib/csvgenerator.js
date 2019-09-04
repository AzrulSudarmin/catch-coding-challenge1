const fs = require('fs');
const es = require('event-stream');
const csvWriter = require('csv-write-stream');

const { getDiscount, getTotalOrder, getTotalUnits } = require('../helper/orderHelper');

module.exports = ({fileSource, targetDirectory, targetFileName}) => new Promise((resolve, reject) => {
  const csv = csvWriter({
    // separator: ',',
    newline: '\r\n',
    headers: [
      "order_id",
      "order_datetime",
      "total_order_value",
      "average_unit_price",
      "distinct_unit_count",
      "total_units_count",
      "customer_state"
    ],
    sendHeaders: true
  });

  console.time('Finish write csv files after');
  csv.pipe(fs.createWriteStream(`${targetDirectory}/${targetFileName}`))

  fs
    .createReadStream(fileSource)
    .pipe(es.split())
    .pipe(
      es.mapSync(function( lines ) {
        try {
          const order = JSON.parse(lines);
          console.time(`Finish write order ${order.order_id} after`);
          if (order.items) {
            const totalOrder = getTotalOrder(order.items);
            const totalUnits = getTotalUnits(order.items);
            
            const totalDiscount = getDiscount({discounts: order.discounts, totalOrder});

            csv.write({
              order_id: order.order_id ,
              order_datetime: order.order_date,
              total_order_value: totalOrder - totalDiscount,
              average_unit_price: totalOrder / totalUnits,
              distinct_unit_count: order.items.length,
              total_units_count: totalUnits,
              customer_state: order.customer.shipping_address.state
            })
          }
          console.timeEnd(`Finish write order ${order.order_id} after`);
        } catch (error) {          
          return;
        }
      })
      .on('error', function(err) {
        console.log(err);
        process.exit()
      })
      .on('end', function(){
        csv.end();
        console.timeEnd('Finish write csv files after');
        process.exit()
      })
    )
});