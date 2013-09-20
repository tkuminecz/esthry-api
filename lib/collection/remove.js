/* global define*/
define(['db', 'validation'], function(Mongo, Validation) {
	'use strict';

	/**
	 * Removes the collection with the given ID
	 *
	 * @param {String} id The ID of the collection to remove
	 * @return {Promise}
	 */
	function remove(id) {
		Validation.validateValue({validate: 'objectid'}, id);
		return Mongo.removeObjects('collections', {_id: id});
	}

	// export function
	return remove;
});
