var isProduction = process.env.NODE_ENV === 'production';
var publicDir = isProduction ? '/dist' : '/build';

// Setup Express
var express = require('express');
var app = express();

app.use(express.static(__dirname + publicDir));
app.get('/', function (req, res) {

	// Send index html
	res.type('html');
	res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' + 
		'<script src="main.js"></script></body></html>');

});

app.listen(3000);
console.log('Server running on 3000');