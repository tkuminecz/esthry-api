/* global define*/
define(['db', 'validation'], function(Mongo, Validation) {
	'use strict';

	/**
	 * Updates the given collections
	 *
	 * @param {String} id
	 * @param {Object} data
	 * @return {Promise}
	 */
	function update(id, data) {
		Validation.validateValue({validate: 'objectid'}, id);
		// @todo validate data as well
		return Mongo.updateObjects('collections', {_id: id}, data);
	}

	// export function
	return update;
});
