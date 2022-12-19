var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

// Video Task
gulp.task('video', async function () {
  gulp.src(config.video.srcFile)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    .pipe(gulp.dest(config.video.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }));
});