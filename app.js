/**
 * app.js
 */

// GLOBAL VARIABLES
//===================================================
var getController = function getController(ctrl) {
	return path.join(__dirname, 'controllers', ctrl);
};

// DEPENDENCIES
//===================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// CONTROLLERS
var index = require(getController('index'));

// SETUPS
//===================================================
var app = express();

//app.enable('case sensitive routing');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// MIDDLEWARES
//===================================================
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// URL - CONTROLLER MAPPING
app.use('/', index);

// REQUESTS WITH NO HANDLER
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	// TODO CHANGE ERROR PAGE DESIGN
	res.render('error', {
		message: err.message,
		error: {}
	});
});

// EXPORTS
//===================================================
module.exports = app;

