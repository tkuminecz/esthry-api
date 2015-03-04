/* asset/get.js */

import mongo from 'db';
import validation from 'validation';

/**
 * Returns a promise for a particular asset
 *
 * @param {String} id
 * @return {Promise}
 */
function get(id) {
	validation.validateValue({validate: 'objectid'}, id);
	return mongo.getSingleObject('assets', {_id: id});
}

export default get;
