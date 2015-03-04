/* global define*/
define(['db', 'validation'], function(Mongo, Validation) {
	'use strict';

	/**
	 * Returns a promise for a collection
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function get(id) {
		Validation.validateValue({validate: 'objectid'}, id);
		return Mongo.getSingleObject('collections', {_id: id});
	}
	
	// export function
	return get;
});
