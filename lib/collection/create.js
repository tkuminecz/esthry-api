/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Creates a new collection with the given title and description
	 *
	 * @param {String} title
	 * @param {String} description
	 * @return {Promise}
	 */
	function create(title, description) {
		var data = {
			title: title,
			description: description
		};

		return Mongo.createObject('collections', data);
	}

	// export function
	return create;
});
