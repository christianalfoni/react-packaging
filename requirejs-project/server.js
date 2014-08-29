var isProduction = process.env.NODE_ENV === 'production';
var publicDir = isProduction ? '/dist' : '/dev';
var mainPath =  isProduction ? '' : '/app/';
var requirejsPath = isProduction ? '' : '/libs/';

// Setup Express
var express = require('express');
var app = express();

// Setup requirejs for Node
var requirejs = require('requirejs');
requirejs.config({
	baseUrl: __dirname + '/dev', // Pointing to our dev folder for loading files
	jsx: {
		fileExtension: '.jsx' // Required setting to handle JSX
	},
	paths: { // Setting up paths to our libs
		'jsx': 'libs/jsx',
		'JSXTransformer': 'libs/JSXTransformer',
		'react': 'libs/react',
		'text': 'libs/text'
	}
});

// Load React with RequireJS
var React = requirejs('react');

app.use(express.static(__dirname + publicDir));
app.get('/', function (req, res) {

	var appHtml = '';

	// If running in production get the main app component
	// and render it straight to the dom (instant load)
	if (isProduction) {
		var App = requirejs('jsx!app/App');
		appHtml = React.renderComponentToString(App());
	}

	// Send index html with App html and script to load app
	res.type('html');
	res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' + 
		appHtml + '<script data-main="' + mainPath + 'main" src="' + requirejsPath + 'requirejs.js"></script></body></html>');

});

app.listen(3000);
console.log('Server running on 3000');