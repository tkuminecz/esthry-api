/* global define*/
define(['db', 'validation'], function(Mongo, Validation) {
	'use strict';

	/**
	 * Updates the given tag
	 *
	 * @param {String} id
	 * @param {Object} data
	 * @return {Promise}
	 */
	function update(id, data) {
		Validation.validateValue({validate: 'objectid'}, id);
		return Mongo.updateObject('tags', {_id: id}, data);
	}

	// export function
	return update;
});
