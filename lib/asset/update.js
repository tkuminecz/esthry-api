/* global define*/
define(['db', 'validation'], function(Mongo, Validation) {
	'use strict';

	/**
	 * Updates the given asset
	 *
	 * @param {String} id
	 * @param {Object} data
	 * @return {Promise}
	 */
	function update(id, data) {
		Validation.validateValue({validate: 'objectid'}, id);
		// @todo validate data as well
		return Mongo.updateObjects('assets', {_id: id}, data);
	}

	// export function
	return update;
});
