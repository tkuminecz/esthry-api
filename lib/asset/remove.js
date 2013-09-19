/* global define*/
define(['q', 'db'], function(Q, Mongo) {
	'use strict';

	/**
	 * Deletes the asset with the given id
	 */
	function remove(id) {
		var defer = Q.defer(),
			db = Mongo.db('localhost', 27017, 'esthry');

		db.collection('assets');
		db.assets.remove({_id: Mongo.ObjectID(id)}, function(err, result) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(result);
		});
		
		return defer.promise;
	}

	return remove;
});
