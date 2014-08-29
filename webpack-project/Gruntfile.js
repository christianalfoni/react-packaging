module.exports = function (grunt) {

	var webpack = require('webpack');

	/*
	 * SOME OPTIONS VARIABLES
	 */

	// Our two bundles
	var entry = {
		main: './dev/app/main.js', // Application bundle
		vendors: ['react'] // Vendor bundle
	};

	// Creates a special Commons bundle that our application can require from
	var commonPlugin = [new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js")];

	// We need to uglify that code on deploy
	var uglifyPlugin = [new webpack.optimize.UglifyJsPlugin()];

	// The loader transforms our JSX content
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
				devtool: "#inline-source-map", // Here we get our sourcemap
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