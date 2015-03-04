/* global define*/
define(['q', 'db'], function(Q, Mongo) {
	'use strict';

	/**
	 * Returns a list of assets that meet the search criteria
	 *
	 * @param {Object} criteria The query criteria
	 * @param {Array} fields The set of fields to return
	 * @param {Integer} count The maximum number of results to return
	 * @param {Integer} offset The number of results to remove from the beginning of the list
	 * @return {Promise}
	 */
	function list(criteria, fields, count, offset) {
		var defer = Q.defer(),
			db = Mongo.db();

		// handle default values for args
		criteria = criteria || {};
		fields = fields || [];
		count = count || 0;
		offset = offset || 0;

		// choose the collection
		db.collection('assets');

		// make the query and truncate results
		db.assets
			.find(criteria, fields)
			.skip(offset)
			.limit(count)
			.toArray(function(err, assets) {
				db.close();

				if (err) {
					defer.reject(err);
				}

				defer.resolve(assets);
			});

		return defer.promise;
	}

	// export function
	return list;
});
