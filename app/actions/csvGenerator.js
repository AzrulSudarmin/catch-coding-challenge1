/**
 * @name csvgenerator
 * @summary
 * The function to generate csv files with stream method to prevent large usage of memory
 * @param {String} source - JSONl location to read and stream
 * @param {String} targetDirectory - target file location
 * @param {String} targetFileName - target file name
 * @param {Function} streamLineHandler - trigger when csv read by line and passing the line data and also csv stream
 * @example
 * csvgenerator({ fileSource: 'storage/order.jsonl', targetDirectory: 'storage', targetFileName: 'order.csv'}, streamLineHandler)
 * .then(result => console.log('csv has been generated'))
 */

//dependency
const fs = require('fs');
const es = require('event-stream');
const csvWriter = require('csv-write-stream');

const csvgenerator = ({source, targetDirectory, targetFileName}, streamLineHandler) => new Promise((resolve, reject) => {
  
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
      //read data by line inside jsonl files
      es.through( function( lines )  {
        this.pause();

        streamLineHandler(lines)
          .then(data => {
            this.resume();
            console.log(`order ${data.order_id} has been stored in database and has been write to csv files`);

            //increment csv file with stream data
            if (data) csv.write(data);
          })
          .catch(err => {
            // console.log(err)
            this.resume();
          })
      })
      .on('error', err => {
        console.log(err)
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