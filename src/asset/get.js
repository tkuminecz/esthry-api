/* global define*/
define(['db', 'validation'], function(Mongo, Validation) {
	'use strict';

	/**
	 * Returns a promise for a particular asset
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function get(id) {
		Validation.validateValue({validate: 'objectid'}, id);
		return Mongo.getSingleObject('assets', {_id: id});
	}

	// export function
	return get;
});
