/* collection/update.js */

import mongo from 'db';
import validation from 'validation';

/**
 * Updates the given collections
 *
 * @param {String} id
 * @param {Object} data
 * @return {Promise}
 */
function update(id, data) {
	validation.validateValue({validate: 'objectid'}, id);
	// @todo validate data as well
	return mongo.updateObjects('collections', {_id: id}, data);
}

export default update;

