var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', {
		title: "Hello, World!",
		message: "Hello, Jade!"
	});
});

module.exports = router;
