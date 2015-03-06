/* asset/create.js */

import _ from 'lodash';
import imageUtils from 'util/image';
import mongo from 'db';
import q from 'q';
import s3put from 's3/put';
import validation from 'validation';

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
	var defer = q.defer(),
		db = mongo.db('localhost', 27017, 'esthry'),
		upload_image,
		prepData;

	validation.validateObject(schema, data);

	// upload from URL
	if (data.image_url) {
		prepData = q.all([s3put.putFromUrl(data.image_url), imageUtils.getInfoFromUrl(data.image_url)])
			.spread((s3_filename, image_data) => {
				data.date_created = Math.floor(new Date().getTime() / 1000);
				data.tags = _.isArray(data.tags) ? data.tags : [data.tags];
				data.s3_url = s3_filename;
				data.type = image_data.type;
				data.size = image_data.size;
				delete data.image_url;

				return data;
			});
	}
	else { // upload from image data
		prepData = s3put.putImageFromBase64(data.image_data.data, data.image_data.type)
			.then((s3_filename) => {
				data.date_created = Math.floor(new Date().getTime() / 1000);
				data.tags = _.isArray(data.tags) ? data.tags : [data.tags];
				data.s3_url = s3_filename;
				data.type = data.image_data.type;
				data.size = data.image_data.size;
				delete data.image_data;

				return data;
			});
	}

	// save object to mongo
	prepData.then((data) => {
		db.collection('assets');
		db.assets.save(data, function(err, asset) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(asset);
		});
	}).done();

	return defer.promise;
}

export default post;
