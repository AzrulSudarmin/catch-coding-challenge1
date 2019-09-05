const nodemon = require('gulp-nodemon');

module.exports = (cb) => {
  let called = false;
  return nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: [
      'gulpfile.js',
      'node_modules/',
      'storage',
      'migrations'
    ] ,
    // nodeArgs: ['--harmony'],
    stdout: false
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      global.reload({ stream: false });
    }, 3000);
  })
  .on('readable', function(data) {
    this.stdout.on('data', function(chunk) {
      if (/Running/.test(chunk)) {
        global.reload({ stream: false });
        global.reloadOrganization({ stream: false });
      }
      process.stdout.write(chunk);
    });
    this.stderr.pipe(process.stderr);
  })
  .on('crash', function () {
    console.log('Nodemon: script crashed for some reason');
  });
}