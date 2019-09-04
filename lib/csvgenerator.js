/**
 * @name csvgenerator
 * @summary
 * The function to generate csv files with stream method to prevent large usage of memory
 * @param {String} source - JSONl location to read and stream
 * @param {String} targetDirectory - target file location
 * @param {String} targetFileName - target file name
 * @example
 * csvgenerator({ fileSource: 'storage/order.jsonl', targetDirectory: 'storage', targetFileName: 'order.csv'})
 * .then(result => console.log('csv has been generated'))
 */

const fs = require('fs');
const es = require('event-stream');
const csvWriter = require('csv-write-stream');
const csvLineWrite = require('./csvlinewriter');

const csvgenerator = ({source, targetDirectory, targetFileName}) => new Promise((resolve, reject) => {
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
  //Generate file csv and write it with stream feature
  csv.pipe(fs.createWriteStream(`${targetDirectory}/${targetFileName}`))

  fs
    .createReadStream(source)
    .pipe(es.split())
    .pipe(
      //read line by line data inside jsonl files
      es.mapSync(lines => {
        try {
          const order = JSON.parse(lines);
          console.time(`Finish write order ${order.order_id} after`);

          if (order.items) csvLineWrite({ csv, order });

          console.timeEnd(`Finish write order ${order.order_id} after`);
        } catch (error) {          
          return;
        }
      })
      .on('error', err => {
        console.log(err);
        process.exit()
      })
      .on('end', () => {
        csv.end();
        console.timeEnd('Finish write csv files after');
        process.exit()
      })
    )
});

module.exports = csvgenerator;