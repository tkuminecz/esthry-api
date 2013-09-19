/* global define*/
define(['q', 'db'], function(Q, Mongo) {
	'use strict';

	/**
	 * Retrieves a single object from collection based on criteria
	 *
	 * @param {String} collection
	 * @param {Object} criteria
	 * @return {Promise}
	 */
	function getSingleObject(collection, criteria) {
		var defer = Q.defer(),
			db = Mongo.db();

		db.collection(collection);
		db[collection].findOne(criteria, function(err, object) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(object);
		});

		return defer.promise;
	}

	// export methods
	return {
		getSingleObject: getSingleObject
	};
});
