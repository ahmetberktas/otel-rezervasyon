var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var clean = require('gulp-clean');

// Clean Dist Task
gulp.task('clean-dist', async function () {
  return gulp.src(config.clean.srcFile, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

//Clean Dist JS Task
gulp.task('clean-dist-js', async function () {
  return gulp.src(config.clean.srcFileJs, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

//Clean Dist CSS Task
gulp.task('clean-dist-css', async function () {
  return gulp.src(config.clean.srcFileCss, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

//Clean Dist Img Task
gulp.task('clean-dist-img', async function () {
  return gulp.src(config.clean.srcFileImg, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

//Clean Dist Font Task
gulp.task('clean-dist-font', async function () {
  return gulp.src(config.clean.srcFileFonts, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

//Clean Dist Html Task
gulp.task('clean-dist-html', async function () {
  return gulp.src(config.clean.srcFileHtml, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

// Clean Dist All Task
gulp.task('clean-dist-all', async function () {
  return gulp.src(config.clean.srcFileAll, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});