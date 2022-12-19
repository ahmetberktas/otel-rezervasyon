var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');

// JS Task
gulp.task('js', async function () {
  gulp.src(config.js.srcFile)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat(config.js.distFileName))
    .pipe(gulp.dest(config.js.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }))
    .pipe(browserSync.stream());
});

// JS Min Task
gulp.task('js-min', async function () {
  gulp.src(config.js.srcFile)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat(config.js.distFileNameMin))
    .pipe(uglify())
    .pipe(gulp.dest(config.js.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }))
    .pipe(browserSync.stream());
});

// JS Vendor Task
gulp.task('js-vendor', async function () {
  gulp.src(config.js.srcFileVendor)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    // .pipe(babel({
    //   presets: ['@babel/preset-env']
    // }))
    .pipe(concat(config.js.distFileVendorName))
    .pipe(gulp.dest(config.js.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }));
});

// js Vendor Min Task
gulp.task('js-vendor-min', async function () {
  gulp.src(config.js.srcFileVendor)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    // .pipe(babel({
    //   presets: ['@babel/preset-env']
    // }))
    .pipe(concat(config.js.distFileVendorNameMin))
    .pipe(uglify())
    .pipe(gulp.dest(config.js.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }))
    .pipe(browserSync.stream());
});

// JS All Task
gulp.task('js-all', async function () {
  gulp.src(config.js.srcFileAll)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    // .pipe(babel({
    //   presets: ['@babel/preset-env']
    // }))
    .pipe(gulp.dest(config.js.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }))
    .pipe(browserSync.stream());
});

// JS All Min Task
gulp.task('js-all-min', async function () {
  gulp.src(config.js.srcFileAll)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    // .pipe(babel({
    //   presets: ['@babel/preset-env']
    // }))
    .pipe(uglify())
    .pipe(rename({
      suffix: config.js.distFileNameMinPrefix
    }))
    .pipe(gulp.dest(config.js.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }))
    .pipe(browserSync.stream());
});