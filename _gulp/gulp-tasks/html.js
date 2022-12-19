var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var prettify = require('gulp-prettify');
var replace = require('gulp-replace');
var index = require('gulp-index');
var browserSync = require('browser-sync');

var pugOptions = {
  pretty: true
};

var prettifyOptions = {
  indent_size: 2
};

// Pug to Html Task
gulp.task('html', async function () {
  gulp.src(config.html.srcFile)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    .pipe(pug(pugOptions))
    .pipe(prettify(prettifyOptions))
    .pipe(gulp.dest(config.html.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }))
    .pipe(browserSync.stream());
});

// Pug to Html Min Task
gulp.task('html-min', async function () {
  gulp.src(config.html.srcFile)
    .pipe(plumber({
      errorHandler: notify.onError(config.error)
    }))
    .pipe(pug(pugOptions))
    .pipe(prettify(prettifyOptions))
    .pipe(replace(config.html.distReplaceCssSrcFileName, config.html.distReplaceCssDistFileName + '?v=' + new Date().getTime()))
    .pipe(replace(config.html.distReplaceJsSrcFileName, config.html.distReplaceJsDistFileName + '?v=' + new Date().getTime()))
    .pipe(replace(config.html.distReplaceJsSrcFileNameVendor, config.html.distReplaceJsDistFileNameVendor + '?v=' + new Date().getTime()))
    .pipe(gulp.dest(config.html.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }))
    .pipe(browserSync.stream());
});

// Html Index
var indexOptions = {
  'title': config.projectName,
  'prepend-to-output': () => `
  <!DOCTYPE html>
  <html lang="tr">
    <head>
        <title>${config.projectName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
    </head>
    <body>
      <div class="container">`,'append-to-output': () => `</div>
    </body>
  </html>`,'title-template': (title) => `
  <div class="page-header">
    <h2>${title}</h2>
  </div>`,
  'pathDepth': 1,
  'section-template': (sectionContent) => `
  <ul class="nav nav-pills nav-stacked" style="display:inline-block; width:280px;">
    ${sectionContent}
  </ul>`,
  'section-heading-template': (heading) => ``,
  'list-template': (listContent) => `${listContent}`,
  'item-template': (filepath, filename) => `
  <li role="presentation"> 
  <a href="${filename}">${filename}</a> 
  </li>`,
  'relativePath': '../dist/',
  'outputFile': './index.html',
  'tab-depth': 2,
  'tab-string': ''
};

gulp.task('html-index', async function () {
  return gulp.src(config.html.distFile)
    .pipe(index(indexOptions))
    .pipe(gulp.dest(config.html.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }));
});