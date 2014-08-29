var gulp = require('gulp');
var watcher = require('duo-watch');
var duo = require('duo');
var react = require('react-tools');
var uglifyjs = require('uglify-js');
var fs = require('fs');

var root = __dirname + '/dev/app';

var bundle = function (entry, assets) {
	return duo(root)
	.entry(entry)
	.assets(assets)
	.use(jsx)
};

gulp.task('default', function () {
	bundle('main.js', '../../build')
	.write(function () {
		console.log('Ready to work!');
		watcher(root).watch(function(file) {
			var start = Date.now();
			bundle(file, '../../build')
			.development()
			.write(function(err) {
				err && console.error(err);
				console.log('rebuilt in ' + (Date.now() - start) + 'ms');
			});

		});
	});

});

gulp.task('deploy', function () {
	bundle('main.js', '../../dist')
	.write(function () {
		
		fs.writeFileSync('./dist/main.js', uglifyjs.minify('dist/main.js').code);

	});

});

function jsx(file, entry) {

  // ensure the file is a coffeescript file
  if ('js' != file.type) return;

  // ensure we're building a javascript file
  if ('js' != entry.type) return;

  // compile the coffeescript
  file.src = react.transform(file.src);

  // update the file type
  file.type = 'js';
}
