var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: "소개 | Megadyne Korea"
	};

	res.render('about', pageScope);
});

module.exports = router;
