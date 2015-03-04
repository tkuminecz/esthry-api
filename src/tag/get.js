/* tag/get.js */

import mongo from 'db';
import validation from 'validation';

/**
 * Returns a given tag
 *
 * @param {String} id
 * @return {Promise}
 */
function get(id) {
	validation.validateValue({validate: 'objectid'}, id);
	return mongo.getSingleObject('tags', {_id: id});
}

export default get;
