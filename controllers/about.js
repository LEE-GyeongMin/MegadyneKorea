var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: "Megadyne Korea - 소개"
	};

	res.render('about', pageScope);
});

module.exports = router;
