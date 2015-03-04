/* collection/remove.js */

import mongo from 'db';
import validation from 'validation';

/**
 * Removes the collection with the given ID
 *
 * @param {String} id The ID of the collection to remove
 * @return {Promise}
 */
function remove(id) {
	validation.validateValue({validate: 'objectid'}, id);
	return mongo.removeObjects('collections', {_id: id});
}

export default remove;
