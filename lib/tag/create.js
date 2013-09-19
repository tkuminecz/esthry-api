/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Creates a tag object with the given title
	 *
	 * @param {String} title
	 * @return {Promise}
	 */
	function create(title) {
		return Mongo.createObject('tags', {title: title});
	}

	return create;
});
