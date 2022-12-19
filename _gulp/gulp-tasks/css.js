var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var postCss = require('gulp-postcss');
var cleanCss = require('gulp-clean-css');
var autoPrefixer = require('autoprefixer');
var browserSync = require('browser-sync');

var postCssConfig = [
  autoPrefixer({
    overrideBrowserslist: ['last 20 version', 'ie >= 10', 'edge >= 1', 'chrome >= 1', 'firefox >= 1', 'safari >= 1', 'opera >= 1', 'last 20 iOS versions', 'last 20 Android versions'],
    cascade: false
  })
];

var cssMinConfig = {
  compatibility: 'ie8',
  format: 'beautify'
};

var cssMinBuildConfig = {
  compatibility: 'ie10'
};

// Sass to Css Task
gulp.task('css', async function () {
  gulp.src(config.css.srcFile)
    .pipe(sassGlob())
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(postCss(postCssConfig))
    .pipe(cleanCss(cssMinConfig))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(config.css.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }))
    .pipe(browserSync.stream());
});

// Sass to Css Min Task
gulp.task('css-min', async function () {
  gulp.src(config.css.srcFile)
    .pipe(sassGlob())
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    //.pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(postCss(postCssConfig))
    .pipe(cleanCss(cssMinBuildConfig))
    .pipe(rename(config.css.distFileNameMin))
    //.pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(config.css.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }))
    .pipe(browserSync.stream());
});