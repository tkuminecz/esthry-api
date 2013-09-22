/* global define*/
define([], function() {
	'use strict';

	/**
	 * Returns a function which takes an object and sends it as JSON.
	 * Convienent for passing into promise chaining
	 *
	 * @param {Object} res The response object to send JSON to
	 * @return {Function}
	 */
	function sendJson(res) {
		res.set('Cache-Control', 'public, max-age=0');
		return function(json) {
			res.json(json);
		};
	}

	// export methods
	return {
		sendJson: sendJson
	};
});
