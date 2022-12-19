var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var changed = require('gulp-changed');
var imageMin = require('gulp-imagemin');

// Img Task
gulp.task('img', async function () {
  gulp.src(config.img.srcFile)
    .pipe(changed(config.img.distFolder))
    .pipe(imageMin([
      imageMin.gifsicle({ interlaced: true }),
      imageMin.mozjpeg({ progressive: true }),
      imageMin.optipng({ optimizationLevel: 5 }),
      imageMin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest(config.img.distFolder, {
      overwrite: true,
      mode: "0777",
      dirMode: "0777"
    }));
});