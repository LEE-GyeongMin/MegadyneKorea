(function() {
	"use strict";

	var banner = document.querySelector(".slider");
	var toLeft = document.querySelector(".sliderCtrl .toLeft");
	var toRight = document.querySelector(".sliderCtrl .toRight");

	if (!document.addEventListener) {
		util.element.appendClassName(banner, "ie8");
		shiftLeft();

		toLeft.attachEvent("onclick", function() {
			shiftLeft();
		});

		toRight.attachEvent("onclick", function() {
			shiftRight();
		});

		return ;
	}

	// LEFT == -1
	toLeft.attachEvent("onclick", function() {
		moveBanner(-1);
	});

	// RIGHT == 1
	toRight.attachEvent("onclick", function() {
		moveBanner(1);
	});

	function moveBanner(direction) {
		var posX = 0;
		var interval = setInterval(function() {
			banner.style.msTransform = "translateX(" + posX + "px)";
			posX -= direction * (1000 / 60) * 3;

			if (Math.abs(posX) >= 1000) {
				banner.style.msTransform = "";
				if (direction === -1) {
					shiftLeft();
				}
				if (direction === 1) {
					shiftRight();
				}
				clearInterval(interval);
			}
		}, 1000 / 60);
	}
	function shiftLeft() {
		var last = banner.lastChild.cloneNode(true);
		banner.insertBefore(last, banner.firstChild);
		banner.removeChild(banner.lastChild);
	}

	function shiftRight() {
		var first = banner.firstChild.cloneNode(true);
		banner.appendChild(first);
		banner.removeChild(banner.firstChild);
	}

})();

