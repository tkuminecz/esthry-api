/* global define*/
define(['knox'], function(Knox) {
	'use strict';

	/**
	 * Returns an Amazon S3 client
	 *
	 * @param {String} key
	 * @param {String} secret
	 * @param {String} bucket
	 * @return {Object}
	 */
	function getClient(key, secret, bucket) {
		return Knox.createClient({
			key: key,
			secret: secret,
			bucket: bucket
		});
	}

	// export function
	return getClient;
});
