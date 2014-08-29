var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');

var runBrowserifyTask = function (options) {

	var vendorBundler = browserify({
		debug: true
	})
	.require('react');

	var bundler = browserify({
		debug: true,
		external: ['react'],
		cache: {}, packageCache: {}, fullPaths: true
	})
	.require(require.resolve('./dev/app/main.js'), { entry: true })
	.transform(reactify)
	.external('react');

	var rebundle = function() {
		var start = Date.now();
		bundler.bundle()
		.pipe(source('main.js'))
		.pipe(gulpif(options.uglify, streamify(uglify())))
		.pipe(gulp.dest(options.dest))
		.pipe(notify(function () {
			console.log('Built in ' + (Date.now() - start) + 'ms');
		}));
	};

	if (options.watch) {
		bundler = watchify(bundler);
		bundler.on('update', rebundle);
	}

	
	vendorBundler.bundle()
	.pipe(source('vendors.js'))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest(options.dest));

	return rebundle();

};

gulp.task('default', function () {

	runBrowserifyTask({
		watch: true,
		dest: 'build/',
		uglify: false
	});

});

gulp.task('deploy', function () {

	runBrowserifyTask({
		watch: false,
		dest: 'dist/',
		uglify: true
	});

});