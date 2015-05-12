(function() {
	"use strict";

	var banner = document.querySelector(".slider");
	var toLeft = document.querySelector(".sliderCtrl .toLeft");
	var toRight = document.querySelector(".sliderCtrl .toRight");

	var animaName = undefined;

	toLeft.addEventListener("click", function(event) {
		event.preventDefault();
		animaName = "moveLeft";
		util.element.appendClassName(banner, animaName);
	});

	toRight.addEventListener("click", function(event) {
		event.preventDefault();
		animaName = "moveRight";
		util.element.appendClassName(banner, animaName);
	});

	addAnimationEventListener(banner, "AnimationEnd", function() {
		if (animaName === "moveLeft") {
			var last = banner.lastChild.cloneNode(true);
			banner.insertBefore(last, banner.firstChild);
			banner.removeChild(banner.lastChild);
		} else {
			var first = banner.firstChild.cloneNode(true);
			banner.appendChild(first);
			banner.removeChild(banner.firstChild);
		}

		util.element.removeClassName(banner, animaName);
		animaName = "";
	});

	function addAnimationEventListener(element, type, callback) {
		var pfx = ["webkit", "moz", "MS", "o", ""];

		for (var p = 0; p < pfx.length; p++) {
			if (!pfx[p]) type = type.toLowerCase();
			element.addEventListener(pfx[p] + type, callback, false);
		}
	}
})();

