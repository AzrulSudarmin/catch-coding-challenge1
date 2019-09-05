/**
 * @summary
 * Load configuration file that stored in config.json and save it to process.env with uppercase key
 * @example
 * console.log(process.env.JSONL_SOURCE)
 */
const fs = require('fs');

module.exports = () => {
  try {
    const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

    Object.keys(config).forEach(function(key) {
      let upKey = key.toUpperCase();
      process.env[upKey] = config[key];
    });
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error in reading configuration file...');
    console.error('\x1b[33m%s\x1b[0m', 'Tips: Make sure config.json file exist in directory "config" with following json format inside the file');
    process.exit();
  }
}