var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

// Lib Task
gulp.task('lib', async function () {
  gulp.src(config.lib.srcFile)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    .pipe(gulp.dest(config.lib.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }));
});