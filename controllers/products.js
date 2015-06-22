var express = require('express');
var router = express.Router();
var path = require('path');

var titleSuffix = 'Megadyne Korea';

var kinds = {
	'polyurethane': '폴리우레탄 벨트',
	'rubber': '고무 벨트',
	'pulley': '풀리',
	'other': '기타제품',
	'special': '특수 벨트'
};

var pages = {
	'polyurethane': {
		'megaflex': 'MEGAFLEX',
		'megaflat': 'MEGAFLAT',
		'megalinear': 'MEGALINEAR',
		'megapower': 'MEGAPOWER',
		'megarib': 'MEGARIB'
	},
	'rubber': {
		'v-belts': 'V 벨트',
		'pv-ribbed': 'PV RIBBED 벨트',
		'megaflat-rubber': 'MEGAFLAT RUBBER',
		'isoran-synchronous': 'ISORAN SYNCH.'
	},
	'pulley': {
		'pulleys': '풀리',
		'timing-bars': '타이밍 바',
		'taper-bushes': '테이퍼 부쉬',
		'flanges': '플랜지',
		'clamping-plates': '클램핑 플레이트'
	},
	'other': {
		'conveyor': '컨베이어 벨트',
		'megablue': 'MEGABLUE',
		'accu-link': 'ACCU LINK',
		'megaweld': 'MEGAWELD'
	},
	'special': {
		'rubber': '고무 벨트 주문제작',
		'polyurethane': '폴리우레탄 주문제작',
		'cover-properties': '특수 코팅',
		'cleats': '고마찰'
	}
}

router.get('/', function(req, res, next) {
	var pageScope = {
		baseUrl: req.baseUrl,
		title: titleSuffix + ' - 제품'
	};

	res.render('products', pageScope);
});

router.get('/:kind/:product', function(req, res, next) {
	var kind = req.params.kind;
	var product = req.params.product;

	var pageScope = {
		baseUrl: req.baseUrl,
		title: pages[kind][product] ? titleSuffix + ' - ' + pages[kind][product] : titleSuffix
	};

	res.render(path.join('products', kind, product), pageScope);
});

module.exports = router;
