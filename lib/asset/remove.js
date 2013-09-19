/* global define*/
define(['q', 'db'], function(Q, Mongo) {
	'use strict';

	/**
	 * Deletes the asset with the given id
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function remove(id) {
		return Mongo.removeObjects('assets', {_id: id});
	}

	return remove;
});
