var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');

// The task that handles both development and deployment
var runBrowserifyTask = function (options) {

	// We create one bundle for our dependencies,
	// which in this case is only react
	var vendorBundler = browserify({
		debug: true // We also add sourcemapping
	})
	.require('react');

	// This bundle is for our application
	var bundler = browserify({
		debug: true, // Need that sourcemapping

		// These options are just for Watchify
		cache: {}, packageCache: {}, fullPaths: true
	})
	.require(require.resolve('./dev/app/main.js'), { entry: true })
	.transform(reactify) // Transform JSX 
	.external('react'); // Do not include react

	// The actual rebundle process
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

	// Fire up Watchify when developing
	if (options.watch) {
		bundler = watchify(bundler);
		bundler.on('update', rebundle);
	}

	// Run the vendor bundle when the default Gulp task starts
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