/* asset/update.js */
import mongo from 'db';
import validation from 'validation';

/**
 * Updates the given asset
 *
 * @param {String} id
 * @param {Object} data
 * @return {Promise}
 */
function update(id, data) {
	validation.validateValue({validate: 'objectid'}, id);
	// @todo validate data as well
	return mongo.updateObjects('assets', {_id: id}, data);
}

export default update;
