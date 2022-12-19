var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

// Font Task
gulp.task('font', async function () {
  gulp.src(config.font.srcFile)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    .pipe(gulp.dest(config.font.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }));
});