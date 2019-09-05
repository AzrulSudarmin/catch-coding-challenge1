const gulp = require('gulp');

const backendWatcher = require('./gulp-task/backendWatcher');
const browserSync = require('browser-sync').create();

global.reload = browserSync.reload;

gulp.task('nodemon', backendWatcher);
gulp.task('set-dev', () => {
  process.env.NODE_ENV = 'development';
});

gulp.task(
  'watch', 
  ['set-dev', 'nodemon',],
  function(){    
    browserSync.init({
      proxy: "localhost:3000",  // local node app address
      host: "localhost" ,
      port: 4000,  // use *different* port than above
      notify: true ,
      open: 'external'
    });

  }
);