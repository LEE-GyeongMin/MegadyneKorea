window.util = {};

(function() {
	var element = {};
	
	element.hasClassName = function(element, sClassName) {
		if (!_isString(sClassName)) {
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

	element.appendClassName = function(element, sClassName) {
		if (!_isString(sClassName)) {
			return ;
		}
		if (this.hasClassName(element, sClassName)) {
			return ;
		}

		if (element.className === "") {
			element.className = sClassName;
		}

		element.className += " " + sClassName;
	}

	element.removeClassName = function(element, sClassName) {
		if (!_isString(sClassName)) {
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

	function _isString(str) {
		if (typeof str === "undefined" || str === null) {
			return false;
		}
		return true;
	}

	window.util.element = element;
})();

