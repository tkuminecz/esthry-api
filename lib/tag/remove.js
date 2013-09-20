/* global define*/
define(['db', 'validation'], function(Mongo, Validation) {
	'use strict';

	/**
	 * Remove the given tag
	 *
	 * @param {String} id
	 * @return {Promise{
	 */
	function remove(id) {
		Validation.validateValue({validate: 'objectid'}, id);
		return Mongo.deleteObjects('tags', {_id: id});
	}

	// export function
	return remove;
});
