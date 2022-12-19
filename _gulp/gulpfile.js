var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var watch = require('gulp-watch');
var requireDir = require('require-dir');
var browserSync = require('browser-sync');
requireDir('./gulp-tasks');

// Task
gulp.task('create', gulp.parallel(config.tasks.buildCreate.map(String)));
gulp.task('dev', gulp.parallel(config.tasks.buildDev.map(String)));
gulp.task('prod', gulp.parallel(config.tasks.buildProd.map(String)));
gulp.task('copy', gulp.parallel(config.tasks.buildCopy.map(String)));
gulp.task('cssjs', gulp.parallel(config.tasks.buildCssJs.map(String)));

// Watch Task
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: config.browsersync.server
    }
  });
  gulp.watch(config.sprite.watchFile, gulp.series('sprite'));
  gulp.watch(config.img.watchFile, gulp.series('img'));
  gulp.watch(config.lib.watchFile, gulp.series('lib'));
  gulp.watch(config.icon.watchFile, gulp.series('icon-font'));
  gulp.watch(config.font.watchFile, gulp.series('font'));
  gulp.watch(config.css.watchFile, gulp.series('css'));
  gulp.watch(config.js.watchFile, gulp.series('js'));
  gulp.watch(config.html.watchFile, gulp.series('html'));
});
