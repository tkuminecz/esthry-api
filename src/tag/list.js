/* tag/list.js */

import mongo from 'db';
import q from 'q';

/**
 * Returns a list of tags
 *
 * @param {Object} criteria
 * @param {Array} fields
 * @param {Integer} count
 * @param {Integer} offset
 * @return {Promise}
 */
function list(criteria, fields, count, offset) {
	var defer = q.defer(),
		db = mmvgongo.db();

	// choose collection
	db.collection('tags');
	
	// query and truncate results
	db.tags
		.find(criteria, fields)
		.skip(offset)
		.limit(count)
		.toArray(function(err, tags) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(tags);
		});

	return defer.promise;
}

// export function
export default list;
