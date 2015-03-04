/* s3/put.js */

import config from 'config';
import http from 'http';
import knox from 'knox';
import q from 'q';
import uuid from 'tiny-uuid';

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
	var defer = q.defer(),
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
 * Puts a file to S3 from a src url
 *
 * @param {String} src_url
 * @param {String} dest_filename
 * @return {Promise}
 */
function putFromUrl(src_url, dest_filename) {
	var defer = q.defer(),
		client = knox.createClient({
			key: config.s3_key,
			secret: config.s3_secret,
			bucket: config.s3_bucket
		});

	// optionally create the filename
	dest_filename = dest_filename ||uuid();

	// pipe file from url to S3
	http.get(src_url, function(res) {
		var headers = {
			'Content-Length': res.headers['content-length'],
			'Content-Type': res.headers['content-type']
		};
		client.putStream(res, dest_filename, headers, function(err, s3_res) {
			if (err) {
				defer.reject(err);
			}

			if (s3_res.statusCode !== 200) {
				defer.reject('error saving upload: HTTP ' + s3_res.statusCode);
			}

			defer.resolve('https://' + config.s3_bucket + '.s3.amazonaws.com/' + dest_filename);
		});
	});

	return defer.promise;
}

/**
 * Uploads a base64 encoded image to S3
 *
 * @param {String} src_data
 * @param {String} src_type
 * @param {String} dest_filename
 * @return {Promise}
 */
function putImageFromBase64(src_data, src_type, dest_filename) {
	var defer = q.defer(),
		client = knox.createClient({
			key: config.s3_key,
			secret: config.s3_secret,
			bucket: config.s3_bucket
		}),
		unencoded = new Buffer(src_data, 'base64'),
		headers = {
			'Content-Length': unencoded.length,
			'Content-Type': src_type
		};

	// optionally create the filename
	dest_filename = dest_filename || uuid();

	// upload to s3
	client.putBuffer(unencoded, dest_filename, headers, function(err, res) {
		if (err) {
			defer.reject(err);
		}

		if (res.statusCode !== 200) {
			defer.reject('error saving upload: HTTP ' + res.statusCode);
		}

		defer.resolve('https://' + config.s3_bucket + '.s3.amazonaws.com/' + dest_filename);
	});

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

export default {
	put: put,
	putImageFromBase64: putImageFromBase64,
	putFromUrl: putFromUrl,
	putJson: putJson
};
