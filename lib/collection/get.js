/* global define*/
define(['q', 'db'], function(Q, Mongo) {
	'use strict';

	/**
	 * Returns a promise for a collection
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function get(id) {
		var defer = Q.defer(),
			db = Mongo.db();

		db.collection('collections');
		db.collections.findOne({_id: Mongo.ObjectID(id)}, function(err, collection) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(collection);
		});

		return defer.promise;
	}

	// export function
	return get;
});
