/* global define*/
define(['q', 'db'], function(Q, Mongo) {
	'use strict';

	/**
	 * Updates the given asset
	 *
	 * @param {String} id
	 * @param {Object} data
	 * @return {Promise}
	 */
	function update(id, data) {
		var defer = Q.defer(),
			db = Mongo.db('localhost', 27017, 'esthry');

		db.collection('assets');
		db.assets.update({_id: Mongo.ObjectID(id)}, data, function(err, asset) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(asset);
		});

		return defer.promise;
	}

	// export function
	return update;
});
