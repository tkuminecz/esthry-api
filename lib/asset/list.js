/* global define*/
define(['q', 'db'], function(Q, Mongo) {
	'use strict';

	/**
	 * Returns a list of assets that meet the search criteria
	 *
	 * @param {Object} criteria
	 * @param {Array} fields
	 * @return {Promise}
	 */
	function list(criteria, fields) {
		var defer = Q.defer(),
			db = Mongo.db();

		criteria = criteria || {};
		fields = fields || [];

		db.collection('assets');
		db.assets.find(criteria, fields).toArray(function(err, assets) {
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
