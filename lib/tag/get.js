/* global define*/
define(['db', 'validation'], function(Mongo, Validation) {
	'use strict';

	/**
	 * Returns a given tag
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function get(id) {
		Validation.validateValue({validate: 'objectid'}, id);
		return Mongo.getSingleObject('tags', {_id: id});
	}

	// export function
	return get;
});
