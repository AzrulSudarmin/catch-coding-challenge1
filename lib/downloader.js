/**
 * @name downloader
 * @summary
 * The function to download and write file to local with stream 
 * method to prevent large usage of memory
 * @param {String} fileUrl - JSONl download url 
 * @param {String} location - target file location
 * @param {String} filename - target file name
 * @example
 * downloader('https://url/to/file').then(res => console.log('File has been download and write'))
 */
const fs = require('fs');
const request = require('request');

module.exports = ({fileUrl, location = 'storage', filename}) => new Promise((resolve, reject) => {
  //creates a writable stream file to store in specific location
  const jsonlFile = fs.createWriteStream(`${location}/${filename}`);

  console.log('Starting download file challenge-1-in.jsonl');
  console.log('Please wait...');
  console.time('Has been download in');

  //do a request to get target file and write it to the file output with stream method
  request(fileUrl)
    .pipe(jsonlFile)
  
  jsonlFile.on('close', function() {
    console.timeEnd('Has been download in');
    resolve()
  });
})