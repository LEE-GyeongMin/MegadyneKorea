/**
 * app.js
 */

// GLOBAL VARIABLES
//===================================================
var directories = {
	stylesheets: 'public/stylesheets',
	jades: 'views',
	stylus: 'views/styluses'
};

var getDirectory = function getDirectory(dir) {
	var result;

	if (directories.hasOwnProperty(dir)) {
		result = path.join(__dirname, directories[dir]);
	} else {
		result = path.join(__dirname, dir ? String(dir) : '');
	}

	return fs.existsSync(result) ? result : false;
};

var getController = function getController(ctrl) {
	var dir = path.join(getDirectory('controllers'), ctrl);
	var isExists = fs.existsSync(dir) || fs.existsSync(dir + '.js');

	return isExists ? dir : false;
};

var compileStylus = function compileStylus(str, path) {
	return stylus(str)
			.set('filename', path)
			.set('compress', true)
			.use(nib()).import('nib');
};

// DEPENDENCIES
//===================================================
var fs = require('fs');

// express.js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Stylus & Nib
var stylus = require('stylus');
var nib = require('nib');

// for morgan
var FileStreamRotator = require('file-stream-rotator');
var filesize = require('filesize');

// CONTROLLERS
var index = require(getController('index'));
var about = require(getController('about'));
var products = require(getController('products'));
var catalogs = require(getController('catalogs'));

// SETUPS
//===================================================
var app = express();

var logDir = 'logs/';
fs.existsSync(logDir) || fs.mkdirSync(logDir);
var logStream = FileStreamRotator.getStream({
	filename: logDir + '/access-%DATE%.log',
	frequency: 'daily',
	verbose: false,
	date_format: "YYYY-MM-DD"
});

morgan.token('filesize', function(req, res) {
	var fsize = res._headers['content-length'];
	return (isNaN(fsize) ? '-' : filesize(fsize, { base: 10 }));
});

//app.enable('case sensitive routing');
app.set('view engine', 'jade');
app.set('views', getDirectory('jades'));
app.locals.pretty = true;

// MIDDLEWARES
//===================================================
app.use(favicon(getDirectory('public/favicon.ico')));
app.use(morgan('[:date[iso]] :method :status :remote-addr :url :filesize', {
	skip: function(req, res) {
		var isSkip = 
				req.url.search('/images') *
				req.url.search('/stylesheets') *
				req.url.search('/fonts');
		return !isSkip;
	},
	stream: logStream
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(stylus.middleware({
	src: path.join(getDirectory('stylus')),
	dest: path.join(getDirectory('stylesheets')),
	compile: compileStylus
}));

app.get('/*', function(req, res, next) {
	res.setHeader('Cache-Control', 'max-age=864000');
	next();
});

app.get('/catalogs/:filename', function(req, res, next) {
	res.setHeader('Content-Type', 'application/octet-stream');
	next();
});

app.use(express.static(getDirectory('public'), {
	dotfile: 'deny',
	index: false
}));

// URL - CONTROLLER MAPPING
app.use('/', index);
app.use('/about', about);
app.use('/products', products);
app.use('/catalogs', catalogs);

// REQUESTS WITH NO HANDLER
app.use(function(req, res, next) {
	var err = new Error('URL is Not Defined');
	err.status = 404;
	next(err);
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
	console.log(err.message);
	res.status(err.status || 500);
	res.render('error');
});

// EXPORTS
//===================================================
module.exports = app;

