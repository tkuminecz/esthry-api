/* tag/remove.js */

import mongo from 'db';
import validation from 'validation';

/**
 * Remove the given tag
 *
 * @param {String} id
 * @return {Promise{
 */
function remove(id) {
	validation.validateValue({validate: 'objectid'}, id);
	return mongo.removeObjects('tags', {_id: id});
}

// export function
export default remove;
