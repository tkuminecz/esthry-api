/* global define*/
define(['db'], function(Mongo) {
	'use strict';

	/**
	 * Remove the given tag
	 *
	 * @param {String} id
	 * @return {Promise{
	 */
	function remove(id) {
		return Mongo.deleteObjects('tags', {_id: id});
	}

	// export function
	return remove;
});
