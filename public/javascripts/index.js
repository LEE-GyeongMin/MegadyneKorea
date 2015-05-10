(function() {
	"use strict";

	var banner = document.querySelector(".banner");
	var toLeft = document.querySelector(".bannerCtrl .toLeft");
	var toRight = document.querySelector(".bannerCtrl .toRight");

	var animaName = "";

	toLeft.addEventListener("click", function() {
		animaName = "moveLeft";
		appendClassName(banner, animaName);
	});

	toRight.addEventListener("click", function() {
		animaName = "moveRight";
		appendClassName(banner, animaName);
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

		removeClassName(banner, animaName);
	});

	function addAnimationEventListener(element, type, callback) {
		var pfx = ["webkit", "moz", "MS", "o", ""];

		for (var p = 0; p < pfx.length; p++) {
			if (!pfx[p]) type = type.toLowerCase();
			element.addEventListener(pfx[p] + type, callback, false);
		}
	}

	function isString(str) {
		if (typeof str === "undefined" || str === null) {
			return false;
		}
		return true;
	}

	function hasClassName(element, sClassName) {
		if (!isString(sClassName)) {
			return false;
		}
		if (element.className === "") {
			return false;
		}
		
		var regExp = new RegExp("\\b" + sClassName + "\\b");
		if (element.className.toString().search(regExp) === -1) {
			return false;
		}

		return true;
	}

	function appendClassName(element, sClassName) {
		if (!isString(sClassName)) {
			return ;
		}
		if (hasClassName(element, sClassName)) {
			return ;
		}

		if (element.className === "") {
			element.className = sClassName;
		}

		element.className += " " + sClassName;
	}

	function removeClassName(element, sClassName) {
		if (!isString(sClassName)) {
			return ;
		}
		if (element.className === "") {
			return ;
		}

		if (element.className.length === sClassName.length) {
			element.className = "";
			return ;
		}

		element.className = element.className.replace(" " + sClassName, "").toString();
	}

})();
