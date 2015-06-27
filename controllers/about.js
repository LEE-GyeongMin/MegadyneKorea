var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: "(주)티비에스 - 소개"
	};

	res.render('about', pageScope);
});

module.exports = router;
