/* global define*/
define(['db', 'validation', 'lodash'], function(Mongo, validation, _) {
	'use strict';

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
		validation(schema, data);
		return Mongo.createObject('tags', data);
	}

	// export function
	return create;
});
