/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Removes the collection with the given ID
	 *
	 * @param {String} id The ID of the collection to remove
	 * @return {Promise}
	 */
	function remove(id) {
		return Mongo.removeObjects('collections', {_id: id});
	}

	// export function
	return remove;
});
