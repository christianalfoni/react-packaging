module.exports = function (grunt) {

	var webpack = require('webpack');

	var entry = {
		main: './dev/app/main.js',
		vendors: ['react']
	};
	var commonPlugin = [new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js")];
	var uglifyPlugin = [new webpack.optimize.UglifyJsPlugin()];
	var module = {
		loaders: [{ 
			test: /\.js$/, 
			loader: 'jsx' 
		}]
	};
	grunt.initConfig({

		webpack: {
			dev: {
				entry: entry,
				plugins: commonPlugin,
				watch: true,
				keepalive: true,
				stats: {
					timings: true
				},
				devtool: "#inline-source-map",
				output: {
					filename: 'main.js',
					path: './build'
				},
				module: module
			},
			dist: {
				entry: entry,
				plugins: commonPlugin.concat(uglifyPlugin),
				output: {
					filename: 'main.js',
					path: './dist'
				},
				module: module
			}
		}

	});

	grunt.loadNpmTasks('grunt-webpack');

	grunt.registerTask('default', ['webpack:dev']);

	grunt.registerTask('deploy', ['webpack:dist']);

}