/* global define*/
define(['q', 'db'], function(Q, Mongo) {
	'use strict';

	/**
	 * @param {Object} data
	 * @return {Promise}
	 */
	function post(data) {
		var defer = Q.defer(),
			db = Mongo.db('localhost', 27017, 'esthry');

		db.collection('assets');
		db.assets.save(data, function(err, asset) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(asset);
		});

		return defer.promise;
	}

	// export function
	return post;
});
