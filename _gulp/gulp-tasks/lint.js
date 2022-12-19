var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var esLint = require('gulp-eslint');
var htmlHint = require('gulp-htmlhint');
var styleLint = require('gulp-stylelint');

// Lint Src JS Task
gulp.task('lint-src-js', async function () {
  return gulp.src(config.js.srcFile)
    .pipe(esLint({
      configFile: 'eslint.json'
    }))
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
});

// Lint Dist JS Task
gulp.task('lint-dist-js', async function () {
  return gulp.src(config.js.distFile)
    .pipe(esLint({
      configFile: 'eslint.json'
    }))
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
});

// Lint Dist CSS Task
gulp.task("lint-dist-css", async function () {
  return gulp.src(config.css.distFile)
    .pipe(styleLint({
      fix: true,
      failAfterError: true,
      configFile: 'stylelint.json',
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
});

// Lint Dist HTML Task
gulp.task('lint-dist-html', async function () {
  return gulp.src(config.html.distFile)
    .pipe(htmlHint('htmlhint.json'))
    .pipe(htmlHint.reporter())
});