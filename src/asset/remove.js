/* asset/remove.js */

import mongo from 'db';
import validation from 'validation';
import getAsset from 'asset/get';
import s3remove from 's3/remove';
import urlUtil from 'url';

/**
 * Deletes the asset with the given id
 *
 * @param {String} id
 * @return {Promise}
 */
function remove(id) {
	validation.validateValue({validate: 'objectid'}, id);

	return getAsset(id)
		.then(function(asset) {
			if (!asset) {
				throw 'Unable to delete non-existent asset';
			}

			return mongo.removeObjects('assets', {_id: id})
				.then(function(result) {
					var url = urlUtil.parse(asset.s3_url),
						object_name = url.path.substr(1);

					return s3remove.deleteObject(object_name)
						.then(function(s3_result) {
							return result && s3_result;
						});
				});
		});

}

export default remove;
