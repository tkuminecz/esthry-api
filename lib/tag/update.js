/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Updates the given tag
	 *
	 * @param {String} id
	 * @param {Object} data
	 * @return {Promise}
	 */
	function update(id, data) {
		return Mongo.updateObject('tags', {_id: id}, data);
	}

	// export function
	return update;
});
