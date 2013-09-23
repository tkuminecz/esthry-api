/* global define*/
define(['db', 'validation', 'q', 'lodash', 'http', 's3/put'], function(Mongo, Validation, Q, _, Http, S3Put) {
	'use strict';

	/**
	 * Schema for asset create request
	 */
	var schema = {
		required: [
			{
				key: 'title',
				config: {validate: 'string'}
			},
			{
				key: 'description',
				config: {validate: 'string'}
			},
			{
				key: 'tags',
				config: {validate: function(value) {
					if (!_.isArray(value)) {
						return false;
					}
				}}
			},
			{
				key: 'collection_id',
				config: {validate: 'string'}
			},
			[
				{
					key: 'image_url',
					config: {validate: 'url'}
				},
				{
					key: 'image_data',
					config: {validate: function(value) {
						if (_.isString(value.data) && _.isString(value.type) && _.isNumber(value.size)) {
							return true;
						}
						else {
							throw 'Image data did not validate';
						}
					}}
				}
			]
		]
	};

	/**
	 * @param {Object} data
	 * @return {Promise}
	 */
	function post(data) {
		var defer = Q.defer(),
			db = Mongo.db('localhost', 27017, 'esthry'),
			upload_image;

		Validation.validateObject(schema, data);

		// upload from URL
		if (data.image_url) {
			upload_image = S3Put.putFromUrl(data.image_url);
		}
		else { // upload from image data
			upload_image = S3Put.putImageFromBase64(data.image_data.data, data.image_data.type);
		}

		/*
		 * data contains either an 'image_url' or 'image_data' field.
		 * Either way, the image needs to be uploaded to S3 and then the
		 * relevant S3 url is what is actually saved to mongo
		 */

		upload_image.then(function(s3_filename) {
			data.s3_url = s3_filename;
			data.type = data.image_data.type;
			data.size = data.image_data.size;
			delete data.image_data;
			delete data.image_url;

			// save object to mongo
			db.collection('assets');
			db.assets.save(data, function(err, asset) {
				db.close();

				if (err) {
					defer.reject(err);
				}

				defer.resolve(asset);
			});
		});

		return defer.promise;
	}

	// export function
	return post;
});
