/* tag/create.js */

import mongo from 'db';
import validation from 'validation';

// schema for tag creation request
var schema = {
	required: [
		{key: 'title', config: {validate: 'string'}}
	]
};

/**
 * Creates a tag object with the given title
 *
 * @param {Object} data
 * @return {Promise}
 */
function create(data) {
	validation.validateObject(schema, data);
	return mongo.createObject('tags', data);
}

export default create;
