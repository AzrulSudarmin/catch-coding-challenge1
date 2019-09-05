const { downloader, csvgenerator, lineManipulator } = require('./app/actions');

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
}, lineManipulator ))
.then(() => {
  // console.log('Cloner done')
  process.exit()
})
.catch(err => {
  console.log(err);
  process.exit();
})