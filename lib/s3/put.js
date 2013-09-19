/* global define*/
define(['q'], function(Q) {
	'use strict';

	/**
	 * Puts the given data onto S3
	 *
	 * @param {Object} client Knox client
	 * @param {String} fileName Target filename on S3
	 * @param {String} contentType mime-tye of the data
	 * @param {String} data
	 * @param {Boolean} public_read Flag indicating if the file should be public
	 * @return {Promise}
	 */
	function put(client, fileName, contentType, data, public_read) {
		var defer = Q.defer(),
			headers = {
				'Content-Type': contentType,
				'Content-Length': data.length
			},
			req;

		// send x-amz-acl if public access is desired
		if (public_read) {	
			headers['x-amz-acl'] = 'public-read';
		}

		// make request
		req = client.put(fileName, headers);

		// handle response
		req.on('response', function(res) {
			if (res.statusCode === 200) {
				defer.resolve(req.url);
				req.abort();
			}
			else {
				defer.reject('http code ' + res.statusCode);
			}
		});

		// reject promise on error
		req.on('error', function(err) {
			defer.reject(err);
		});

		// send the data
		req.end(data);

		// return promise
		return defer.promise;
	}
	
	/**
	 * Saves a JSON object to S3
	 *
	 * @param {Object} client Knox client
	 * @param {String} fileName Target filename on S3
	 * @param {Object} obj JSON object
	 * @param {Boolean} public_read Flag indicating if the file should be public
	 * @return {Promise}
	 */
	function putJson(client, fileName, obj, public_read) {
		return put(client, fileName, 'application/json', JSON.stringify(obj), public_read);
	}

	// export methods
	return {
		put: put,
		putJson: putJson
	};
});
