(function() {
	"use strict";

	var banner = document.querySelector(".banner");
	var toLeft = document.querySelector(".bannerCtrl .toLeft");
	var toRight = document.querySelector(".bannerCtrl .toRight");

	toLeft.addEventListener("click", function() {
		var clone = banner.lastChild.cloneNode(true);
		banner.insertBefore(clone, banner.firstChild);
		banner.removeChild(banner.lastChild);
	});

	toRight.addEventListener("click", function() {
		var clone = banner.firstChild.cloneNode(true);
		banner.appendChild(clone);
		banner.removeChild(banner.firstChild);
	});
})();
