/* asset/display.js */

import Cache from 'asset/cache';
import Route from 'routes';
import get from 'asset/get';
import lwip from 'lwip';
import mongo from 'db';
import q from 'q';
import request from 'request';
import transform from 'transform';
import validation from 'validation';

/**
 * Retrieves base64 from the given url
 */
function getBase64Data(url) {
	var defer = q.defer();

	request({url, encoding: 'base64'}, (err, res, body) => {
		if (err) {
			defer.reject(err);
		}

		defer.resolve(body);
	});

	return defer.promise;
}

/**
 * Sends the given asset to the browser
 *
 * @param {String} id
 * @param {Response} res
 * @return {Promise}
 */
function display(id, res) {
	var cache = new Cache(),
		cache_key = `asset-${id}`;

	validation.validateValue({validate: 'objectid'}, id);

	return get(id)
		.then(img_data => {

			// attempt to get data from cache
			return cache.get(cache_key)
				.then(cache_data => {
					if (cache_data) {
						return q(cache_data);
					}
					else {
						return getBase64Data(img_data.s3_url)
							.then(base64_data => {
								// save data to cache
								cache.add(cache_key, base64_data);

								return base64_data;
							});
					}
				})
				.then(base64_data => {
					var defer = q.defer(),
						buffer = new Buffer(base64_data, 'base64');

					// apply image transformations
					transform(buffer, img_data.type.split('/')[1], img_data.transforms)
						.then(buffer => {
							// send image to browser
							Route.sendMimeData(res, img_data.type, buffer.length, buffer);
							defer.resolve();
						});

					return defer.promise;
				});
		});
}

export default display;
