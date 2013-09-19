/* global define*/
define(['q', 'db', 'utils/mongo'], function(Q, Mongo, Db) {
	'use strict';

	/**
	 * Returns a promise for a particular asset
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function get(id) {
		return Db.getSingleObject('assets', {_id: Mongo.ObjectID(id)});
	}

	// export function
	return get;
});
