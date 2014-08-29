var isProduction = process.env.NODE_ENV === 'production';

// Setup Express
var express = require('express');
var app = express();

// Load React and set paths to where main and requirejs is located
// depending on environment

var publicDir = isProduction ? '/dist' : '/build';

app.use(express.static(__dirname + publicDir));
app.get('/', function (req, res) {

	// Send index html with App html and script to load app
	res.type('html');
	res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' + 
		'<script src="main.js"></script></body></html>');

});

app.listen(3000);
console.log('Server running on 3000');