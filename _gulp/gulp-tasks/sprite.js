var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var spriteSmith = require('gulp.spritesmith');

// Sprite Task
gulp.task('sprite', async function () {

	var spriteData = gulp.src(config.sprite.srcFile)

		.pipe(
			gulpIf(config.sprite.sprite2xRetina,
				spriteSmith({
					retinaSrcFilter: config.sprite.src2xFile,
					//imgName: config.sprite.srcImgName + '-' + new Date().getTime() + ".png",
					imgName: config.sprite.srcImgName + ".png",
					//retinaImgName: config.sprite.srcImg2xName + '-' + new Date().getTime() + "@2x.png",
					retinaImgName: config.sprite.srcImg2xName + "@2x.png",
					cssName: config.sprite.srcCssName,
					imgPath: config.sprite.spritePath + "/" + config.sprite.srcImgName + ".png",
					retinaImgPath: config.sprite.spritePath + "/" + config.sprite.srcImg2xName + "@2x.png",
					algorithm: "binary-tree"
				}),
				spriteSmith({
					imgName: config.sprite.srcImgName,
					cssName: config.sprite.srcCssName,
					imgPath: config.sprite.spritePath + "/" + config.sprite.srcImgName + ".png",
					algorithm: "binary-tree"
				})
			)
		);

	spriteData.img.pipe(gulp.dest(config.sprite.srcImgFolder, {
		overwrite: true,
		mode: "0777",
		dirMode: "0777"
	}));
	spriteData.css.pipe(gulp.dest(config.sprite.srcCssFolder, {
		overwrite: true,
		mode: "0777",
		dirMode: "0777"
	}));

});