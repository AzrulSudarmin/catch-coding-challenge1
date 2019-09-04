const fs = require('fs');
const es = require('event-stream');
const csvWriter = require('csv-write-stream');
const request = require('request');

const csv = csvWriter();

const start = () => {
  const jsonlFile = fs.createWriteStream('storage/challenge-1-in.jsonl');
  console.log('Starting download file challenge-1-in.jsonl');
  console.log('Please wait...');
  console.time('Has been download in');
   request('https://s3-ap-southeast-2.amazonaws.com/catch-code-challenge/challenge-1-in.jsonl')
    .pipe(jsonlFile)
  
  jsonlFile.on('close', function() {
    console.timeEnd('Has been download in');
    writeCsvFiles();
  });
}

const writeCsvFiles = () => {
  console.time('Finish write csv files after');
  csv.pipe(fs.createWriteStream('storage/challenge-1-in.csv'))

  fs
    .createReadStream('storage/challenge-1-in.jsonl')
    .pipe(es.split())
    .pipe(
      es.mapSync(function( lines ) {
        try {
          const order = JSON.parse(lines);
          console.time(`Finish write order ${order.order_id} after`);
          if (order.items) {
            const totalOrder = order.items.reduce((acc, curr) => acc + (curr.unit_price*curr.quantity), 0);
            const totalUnits = order.items.reduce((acc,curr) => acc + curr.quantity, 0);
            let totalDiscount = 0;

            order.discounts.map(discount => {
              totalDiscount += discount.type === 'DOLLAR' ? discount.value : (totalOrder/100)*discount.value
            })

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
        // process.exit()
      })
    )
}
start();