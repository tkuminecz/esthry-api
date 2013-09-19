/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Returns a given tag
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function get(id) {
		return Mongo.getSingleObject('tags', {_id: id});
	}

	// export function
	return get;
});
