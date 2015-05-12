var express = require('express');
var router = express.Router();

var titleSuffix = ' | Megadyne Korea';

router.get('/', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: '제품' + titleSuffix
	};

	res.render('products', pageScope);
});

router.get('/test', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: 'Test' + titleSuffix
	};

	res.render('products', pageScope);
});

module.exports = router;
