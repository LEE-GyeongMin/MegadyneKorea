var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: "Megadyne Korea - 카탈로그"
	};

	res.render('catalogs', pageScope);
});

module.exports = router;
