const downloader = require('./lib/downloader');
const csvgenerator = require('./lib/csvgenerator');

downloader({
  fileUrl: 'https://s3-ap-southeast-2.amazonaws.com/catch-code-challenge/challenge-1-in.jsonl',
  location: 'storage',
  filename: 'order.jsonl'
})
.then(() => csvgenerator({
  fileSource: 'storage/order.jsonl' ,
  targetDirectory: 'storage',
  targetFileName: 'order.csv'
}))
.then(() => {
  process.exit()
})
.catch(err => {
  console.log(err);
  process.exit();
})