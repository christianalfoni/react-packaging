var isProduction = process.env.NODE_ENV === 'production';
var publicDir = isProduction ? '/dist' : '/build';

// Setup Express
var express = require('express');
var app = express();
var nodejsx = require('node-jsx');
var React = require('react');

// Convert files with JSX to javascript
nodejsx.install();

app.use(express.static(__dirname + publicDir));
app.get('/', function (req, res) {

	// Get the component and render it as a string
	var App = require('./dev/app/App.js');
	var appHtml = React.renderComponentToString(App());

	// In development mode we want a fresh version of the module
	// on every refresh, so we delete the node require cache
	if (!isProduction) {
		delete require.cache[require.resolve('./dev/app/App.js')];
	}

	// Send index html with App html and script to load app
	res.type('html');
	res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' + 
		appHtml + '<script src="vendors.js"></script><script src="main.js"></script></body></html>');

});

app.listen(3000);
console.log('Server running on 3000');