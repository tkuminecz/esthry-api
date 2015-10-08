/* asset/display.js */

import Cache from 'cache';
import Route from 'routes';
import get from 'asset/get';
import lwip from 'lwip';
import md5 from 'MD5';
import mongo from 'db';
import q from 'q';
import request from 'request';
import transform from 'transform';
import validation from 'validation';

var cache_version = 1;

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
		cache_key;

	validation.validateValue({validate: 'objectid'}, id);

	return get(id)
		.then(img_data => {
			var defer = q.defer();

			cache_key = md5(cache_version + JSON.stringify([img_data.s3_url, img_data.type, img_data.transforms]));

			process.stdout.write("\t+ getting image data...");

			// attempt to get data from cache
			cache.get(cache_key)
				.then(cache_data => {
					var buffer;

					if (cache_data) {
						buffer = new Buffer(cache_data, 'base64');
						console.log('cached...done.');
						process.stdout.write("\t+ sending response...");
						Route.sendMimeData(res, img_data.type, buffer.length, buffer);
						defer.resolve();
						console.log('done.');
					}
					else {
						process.stdout.write('aws...');
						getBase64Data(img_data.s3_url)
							.then(base64_data => {
								var buffer = new Buffer(base64_data, 'base64');

								console.log('done.');

								// apply image transformations
console.log(img_data, img_data.transforms);
								transform(buffer, img_data.type.split('/')[1], img_data.transforms)
									.then(buffer => {
										// save data to cache
										process.stdout.write("\t+ saving to cache...");
										cache.add(cache_key, buffer.toString('base64'));
										console.log('done.');

										// send image to browser
										process.stdout.write("\t+ sending response...");
										Route.sendMimeData(res, img_data.type, buffer.length, buffer);
										defer.resolve();
										console.log('done.');
									});
							});
					}
				});

			return defer.promise;
		});
}

export default display;
