/* global define*/
define(['db', 'lodash', 'q'], function(Mongo, _, Q) {
	'use strict';

	/**
	 * Schema for the collection object
	 */
	var required_keys = {
		'title': {type: _.isString},
		'description': {type: _.isString}
	};

	/**
	 * Verifies the correct properties are present
	 *
	 * @param {Object} data
	 * @return {Promise}
	 */
	function validateSchema(data) {
		var defer = Q.defer(),
			keys = _.keys(data),
			diff = _.difference(_.keys(required_keys), keys);

		// ensure we have all the required keys
		if (diff.length) {
			diff = _.map(diff, function(key) {
				return "'" + key + "'";
			});
			defer.reject('Required keys ' + diff.join(', ') + ' not supplied');
		}
		// ensure our properties are the correct types
		else {
			defer.resolve(data);
		}

		return defer.promise;
	}

	/**
	 * Verify the value of each property is the correct type
	 *
	 * @param {Object}
	 * @return {Promise}
	 */
	function validateTypes(data) {
		var defer = Q.defer();

		// verify the value of each key is the required type
		_.each(required_keys, function(config, key) {
			if (!config.type(data[key])) {
				defer.reject('The value of \'' + key + '\' was not the required type. ' + data[key]);
			}
		});

		// we've implicitly passed validation if we reach this point
		defer.resolve(data);

		return defer.promise;
	}

	/**
	 * Creates a new collection with the given data
	 *
	 * @param {Object} data
	 * @return {Promise}
	 */
	function create(data) {

		// return promise for creation of object after validating
		return validateSchema(data)
			.then(validateTypes)
			.then(_.partial(Mongo.createObject, 'collections'));
	}

	// export function
	return create;
});
