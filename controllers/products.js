var express = require('express');
var router = express.Router();

var titleSuffix = 'Megadyne Korea - 제품';

router.get('/', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: titleSuffix
	};

	res.render('products', pageScope);
});

router.get('/test', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: titleSuffix + " - test"
	};

	res.render('products', pageScope);
});

module.exports = router;
