/* collection/create.js */

import _ from 'lodash';
import mongo from 'db';
import q from 'q';
import validation from 'validation';

/**
 * Schema for the collection object
 */
var schema = {
	required: [
		{key: 'title', config: {validate: 'string'}},
		{key: 'description', config: {validate: 'string'}}
	]
};

/**
 * Creates a new collection with the given data
 *
 * @param {Object} data
 * @return {Promise}
 */
function create(data) {
	validation.validateObject(schema, data);
	return mongo.createObject('collections', data);
}

export default create;