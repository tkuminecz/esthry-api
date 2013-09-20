/* global define*/
define(['db', 'validation'], function(Mongo, Validation) {
	'use strict';

	/**
	 * Deletes the asset with the given id
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function remove(id) {
		Validation.validateValue({validate: 'objectid'}, id);
		return Mongo.removeObjects('assets', {_id: id});
	}

	return remove;
});
