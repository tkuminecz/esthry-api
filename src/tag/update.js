/* tag/update.js */

import mongo from 'db';
import validation from 'validation';

/**
 * Updates the given tag
 *
 * @param {String} id
 * @param {Object} data
 * @return {Promise}
 */
function update(id, data) {
	validation.validateValue({validate: 'objectid'}, id);
	return mongo.updateObject('tags', {_id: id}, data);
}

export default update;
