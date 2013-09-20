/* global define*/
define(['db', 'lodash', 'q', 'validation'], function(Mongo, _, Q, validation) {
	'use strict';

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
		validation(schema, data);
		return Mongo.createObject('collections', data);
	}

	// export function
	return create;
});
