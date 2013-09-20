/* global define*/
define(['lodash'], function(_) {
	'use strict';

	// set of predefined types
	var types = {
		array: _.isArray,
		image_data: _.isString,
		objectid: _.isString,
		string: _.isString,
		url: _.isString
	};

	/**
	 * Returns the validation config for a given key in the schema
	 *
	 * @param {Object} schema
	 * @param {String} key
	 * @return {Object}
	 */
	function findValidationConfig(schema, key) {
		var config;

		_.each(schema.required, function(req) {
			if (_.isArray(req)) {
				_.each(req, function(req) {
					if (_.isObject(req) && req.key === key) {
						config = req.config;
					}
				});
			}
			else if (_.isObject(req) && req.key === key) {
				config = req.config;
			}
		});

		return config;
	}

	/**
	 * Validates a single value
	 *
	 * @param {Object} config validation config object
	 * @param {Mixed} value
	 * @return {Boolean}
	 */
	function validateSingleValue(config, value) {
		var validate_fn;

		if (_.isString(config.validate)) {
			validate_fn = types[config.validate];
		}
		else if (_.isFunction(config.validate)) {
			validate_fn = config.validate;
		}

		return validate_fn(value);
	}

	/**
	 * Validates all values in an object
	 */
	function validateValues(schema, object) {
		_.each(object, function(value, key) {
			validateSingleValue(findValidationConfig(schema, key), value);
		});
	}

	/**
	 * Validates that required properties are present
	 *
	 * @param {Object} schema The schema to validate against
	 * @param {Object} object The object to validate
	 * @return {Boolean}
	 */
	function validateProperties(schema, object) {
		var required_keys = [],
			disjoint_keys = [],
			diff, valid;

		_.each(schema.required, function(req, index) {
			if (_.isArray(req)) {
				disjoint_keys.push( _.pluck(req, 'key') );
			}
			else if (_.isObject(req)) {
				required_keys.push(req.key);
			}
		});

		// verify required keys are present
		diff = _.difference(required_keys, _.keys(object));
		if (diff.length) {
			throw 'Not all required keys present: ' + diff.join(', ');
		}

		// verify disjoin key sets are satisfied
		_.each(disjoint_keys, function(keys) {
			var orig_keys = _.union([], keys),
				key = keys.pop(),
				valid = object.hasOwnProperty(key);

			while ((key = keys.pop())) {
				valid = !valid ^ !object.hasOwnProperty(key);
			}

			if (!valid) {
				throw 'You must provide one key in the set (' + orig_keys.join(', ') + ')';
			}
		});

		return true;
	}

	/**
	 * Validates a given object according to schema
	 *
	 * @param {Object} schema
	 * @param {Object} object
	 * @return {Boolean}
	 */
	function validate(schema, object) {
		validateProperties(schema, object);
		validateValues(schema, object);
	}

	// export function
	return validate;
});
