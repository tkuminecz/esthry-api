/* global define*/
define(['q'], function(Q) {
	'use strict';

	/**
	 * Returns the raw file data
	 *
	 * @param {Object} client
	 * @param {String} fileName
	 * @return {Promise}
	 */
	function get(client, fileName) {
		var defer = Q.defer(),
			req = client.get(fileName),
			file = {};

		req.on('response', function(res) {
			if (res.statusCode !== 200) {
				defer.reject('http code ' + res.statusCode);
			}

			file.modified = res.headers['last-modified'];
			file.content_type = res.headers['content-type'];
			file.content_length = res.headers['content-length'];
			file.data = '';

			res.on('data', function(chunk) {
				file.data += chunk;
			})
			res.on('end', function() {
				defer.resolve(file);
			});
		});

		req.on('error', function(err) {
			defer.reject(err);
		});

		req.end();
		
		return defer.promise;
	}

	/**
	 * Returns the file data base64 encoded
	 *
	 * @param {Object} client
	 * @param {String} fileName
	 * @return {Promise}
	 */
	function getBase64(client, fileName) {
		return get(client, fileName)
			.then(function(file) {
				file.data = new Buffer(file.data).toString('base64');
				return file;
			});
	}

	// export methods
	return {
		get: get,
		getBase64: getBase64
	};
});
