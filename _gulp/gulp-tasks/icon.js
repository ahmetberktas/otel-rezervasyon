var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var iconFont = require('gulp-iconfont');
var iconFontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now() / 1000);

// Icon Font Task
gulp.task('icon-font', async function () {
  gulp.src(config.icon.srcFile)
    .pipe(iconFontCss({
      fontName: config.icon.fontName,
      path: config.icon.srcThemplateFileName,
      targetPath: config.icon.distThemplateFileName,
      fontPath: config.icon.distThemplateFolder + config.icon.fontName,
      cssClass: 'icon'
    }))
    .pipe(iconFont({
      fontName: config.icon.fontName,
      prependUnicode: true,
      formats: config.icon.fontTypes,
      timestamp: runTimestamp,
      normalize: true,
      fontHeight: 1001,
      descent: 50,
    }))
    .pipe(gulp.dest(config.icon.distFolder + config.icon.fontName, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }));
});