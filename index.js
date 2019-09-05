const fs = require('fs');
const { downloader, csvgenerator } = require('./lib');

const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

downloader({
  source: config.jsonlSource,
  targetDirectory: 'storage',
  targetFileName: 'order.jsonl'
})
.then(() => csvgenerator({
  source: 'storage/order.jsonl' ,
  targetDirectory: 'storage',
  targetFileName: 'order.csv'
}))
.then(() => {
  console.log('process done')
  process.exit()
})
.catch(err => {
  console.log(err);
  process.exit();
})