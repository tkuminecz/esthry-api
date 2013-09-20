/* global define*/
define(['db', 'validation', 'q', 'lodash'], function(Mongo, validation, Q, _) {
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
					config: {validate: 'image_data'}
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
			db = Mongo.db('localhost', 27017, 'esthry');

		validation(schema, data);

		db.collection('assets');
		db.assets.save(data, function(err, asset) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(asset);
		});

		return defer.promise;
	}

	// export function
	return post;
});
