/* global define*/
define(['q', 'db'], function(Q, Mongo) {
	'use strict';

	/**
	 * Returns a promise for a particular asset
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function get(id) {
		return Mongo.getSingleObject('assets', {_id: id});
	}

	// export function
	return get;
});
