/**
 * @name downloader
 * @summary
 * The function to download and write file to local with stream 
 * method to prevent large usage of memory
 * @param {String} source - JSONl download url 
 * @param {String} targetDirectory - target file location
 * @param {String} targetFileName - target file name
 * @example
 * downloader('https://url/to/file').then(res => console.log('File has been download and write'))
 */
const fs = require('fs');
const request = require('request');

module.exports = ({source, targetDirectory = 'storage', targetFileName}) => new Promise((resolve, reject) => {
  //creates a writable stream file to store in specific location
  const jsonlFile = fs.createWriteStream(`${targetDirectory}/${targetFileName}`);

  console.log(`Starting download file: ${source}`);
  console.log('\x1b[33m%s\x1b[0m', 'Please wait...');
  console.time('Has been download in');

  //do a request to get target file and write it to the file output with stream method
  request(source)
    .pipe(jsonlFile)
  
  jsonlFile.on('close', function() {
    console.log('\x1b[32m');
    console.timeEnd('Has been download in');
    console.log('\x1b[0m')
    resolve()
  });
})