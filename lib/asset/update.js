/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Updates the given asset
	 *
	 * @param {String} id
	 * @param {Object} data
	 * @return {Promise}
	 */
	function update(id, data) {
		return Mongo.updateObjects('assets', {_id: id}, data);
	}

	// export function
	return update;
});
