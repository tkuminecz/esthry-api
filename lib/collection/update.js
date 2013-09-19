/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Updates the given collections
	 *
	 * @param {String} id
	 * @param {Object} data
	 * @return {Promise}
	 */
	function update(id, data) {
		return Mongo.updateObjects('collections', {_id: id}, data);
	}

	// export function
	return update;
});
