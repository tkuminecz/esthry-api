/* collection/list.js */

import mongo from 'db';
import q from 'q';

/**
 * Returns a list of collections
 *
 * @param {Object} criteria
 * @param {Array} fields
 * @param {Integer} count
 * @param {Integer} offset
 * @return {Promise}
 */
function list(criteria, fields, count, offset) {
	var defer = q.defer(),
		db = mongo.db();

	// handle default values
	criteria = criteria || {};
	fields = fields || [];
	count = count || 0;
	offset = offset || 0;

	// choose the collection
	db.collection('collections');

	// make the query & truncate results
	db.collections
		.find(criteria, fields)
		.skip(offset)
		.limit(count)
		.toArray(function(err, collections) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(collections);
		});

	return defer.promise;
}

export default list;