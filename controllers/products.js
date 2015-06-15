var express = require('express');
var router = express.Router();
var path = require('path');

var titleSuffix = 'Megadyne Korea - 제품';

var kinds = {
	'polyurethane': '폴리우레탄 벨트',
	'rubber': '고무 벨트',
	'pulley': '풀리',
	'other': '기타제품',
	'special': '특수 벨트'
};

router.get('/', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: titleSuffix
	};

	res.render('products', pageScope);
});

router.get('/:kind', function(req, res, next) {
	var kind = req.params.kind;

	var pageScope = {
		baseUrl: req.baseUrl,
		title: titleSuffix + ' - ' + kinds[kind]
	};

	res.render(path.join('products', kind), pageScope);
});

router.get('/:kind/:product', function(req, res, next) {
	var kind = req.params.kind;
	var product = req.params.product;

	var pageScope = {
		baseUrl: req.baseUrl,
		title: titleSuffix + ' - ' + product.toUpperCase()
	};

	res.render(path.join('products', kind, product), pageScope);
});

module.exports = router;
