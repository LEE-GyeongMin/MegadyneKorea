var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl
	};

	res.render('index', pageScope);
});

router.get('/test', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl
	};

	res.render('index', pageScope);
});

module.exports = router;
