/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Returns a list of collections
	 *
	 * @param {Object} criteria
	 * @param {Array} fields
	 * @param {Integer} count
	 * @param {Integer} offset
	 * @return {Promise}
	 */
	function list(criteria, fields, count, offset) {
		var defer = Q.defer(),
			db = Mongo.db();

		// handle default values
		criteria = criteria || {};
		fields = fields || [];
		count = count || 0;
		offset = offset || 0;

		// choose the collection
		db.collection('collections');

		// make the query & truncate results
		db.collections
			.find(criteria, fields)
			.skip(offset)
			.limit(count)
			.toArray(function(err, collections) {
				db.close();

				if (err) {
					defer.reject(err);
				}

				defer.resolve(collections);
			});

		return defer.promise;
	}

	// export function
	return list;
});
