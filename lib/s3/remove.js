/* global define*/
define(['q', 'knox', 'config'], function(Q, Knox, Config) {
	'use strict';

	/**
	 * Deletes an item
	 *
	 * @param {String} name
	 * @return {Promise}
	 */
	function deleteObject(name) {
		var defer = Q.defer(),
			client = Knox.createClient({
				key: Config.s3_key,
				secret: Config.s3_secret,
				bucket: Config.s3_bucket
			});

		client.deleteFile(name, function(err, res) {
			if (err) {
				defer.reject(err);
			}

			defer.resolve(true);
		});

		return defer.promise;
	}

	// export methods
	return {
		deleteObject: deleteObject
	};
});
