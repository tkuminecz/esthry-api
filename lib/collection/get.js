/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Returns a promise for a collection
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function get(id) {
		return Mongo.getSingleObject('collections', {_id: id});
	}
	
	// export function
	return get;
});
