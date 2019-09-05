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
  
  console.log('\x1b[33m%s\x1b[0m', `Starting to write ${targetFileName}`);

  const csv = csvWriter({
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

  console.time(`${targetFileName} has been write after`);
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
          //write exist order to csv
          if (order.items) csvLineWrite({ csv, order });
        } catch (error) {
          // console.log(error.message);
          return;
        }
      })
      .on('error', err => {
        reject();
      })
      .on('end', () => {
        csv.end();
        console.log('\x1b[32m');
        console.timeEnd(`${targetFileName} has been write after`);
        console.log('\x1b[0m');
        resolve();
      })
    )
});

module.exports = csvgenerator;