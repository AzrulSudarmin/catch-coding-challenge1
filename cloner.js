const { downloader, csvgenerator } = require('./lib');

//load configuration file
require('./config')();

downloader({
  source: process.env.JSONL_SOURCE,
  targetDirectory: 'storage',
  targetFileName: 'order.jsonl'
})
.then(() => csvgenerator({
  source: 'storage/order.jsonl' ,
  targetDirectory: 'storage',
  targetFileName: 'order.csv'
}))
.then(() => {
  // console.log('Cloner done')
  process.exit()
})
.catch(err => {
  console.log(err);
  process.exit();
})