const postcss = require('gulp-postcss'),
	gulp = require('gulp'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	cssvars = require('postcss-simple-vars'),
	atImport = require('postcss-import'),
	nested = require('postcss-nested'),
	postcssCustomMedia = require('postcss-custom-media');

gulp.task('css', function () {
	var plugins = [
		atImport,
		autoprefixer,
		cssvars,
		cssnano,
		nested,
		postcssCustomMedia
	  ];
	return gulp.src('./resources/style.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('www/assets/css'));
});

gulp.task('watcher', function() {
	gulp.watch('resources/**/*.css', gulp.series('css'));
})