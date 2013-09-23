/* global define*/
define(['db', 'validation', 'asset/get', 's3/remove', 'url'], function(Mongo, Validation, AssetGet, S3Remove, Url) {
	'use strict';

	/**
	 * Deletes the asset with the given id
	 *
	 * @param {String} id
	 * @return {Promise}
	 */
	function remove(id) {
		Validation.validateValue({validate: 'objectid'}, id);

		return AssetGet(id)
			.then(function(asset) {
				if (!asset) {
					throw 'Unable to delete non-existent asset';
				}

				return Mongo.removeObjects('assets', {_id: id})
					.then(function(result) {
						var url = Url.parse(asset.s3_url),
							object_name = url.path.substr(1);

						return S3Remove.deleteObject(object_name)
							.then(function(s3_result) {
								return result && s3_result;
							});
					});
			});

	}

	return remove;
});
