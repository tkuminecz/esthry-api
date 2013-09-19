/* global define*/
define(['mongodb-wrapper', 'q'], function(Mongo, Q) {
	'use strict';

	var orig_db = Mongo.db;

	/**
	 * Wrapper around db() to automatically connect to esthry
	 */
	Mongo.db = function() {
		return orig_db('localhost', 27017, 'esthry');
	};

	/**
	 * Performs a simple action on the given collection using the given criteria
	 *
	 * @param {String} action Method to call
	 * @param {String} collection The mongo collection to use
	 * @param {Object} criteria The criteria used to determine which objects are affected
	 * @return {Promise} A promise for the response from mongo
	 */
	Mongo.performCriteriaBasedAction = function(action, collection, criteria) {
		var defer = Q.defer(),
			db = Mongo.db();

		// chose the collection
		db.collection(collection);

		// perform the action
		if (!db[collection][action]) {
			console.log(action);
			defer.reject('Invalid action');
		}
		db[collection][action].call(db[collection], criteria, function(err, response) {
			db.close();

			if (err) {
				defer.reject(err);
			}

			defer.resolve(response);
		});

		return defer.promise;
	};

	/**
	 * Creates the object in the given collection
	 *
	 * @param {String} collection
	 * @param {Object} data
	 * @return {Promise}
	 */
	Mongo.createObject = Mongo.performCriteriaBasedAction.bind(Mongo, 'save');

	/**
	 * Deletes objects based on criteria
	 *
	 * @param {String} collection
	 * @param {Object} criteria
	 * @return {Promise}
	 */
	Mongo.deleteObject = Mongo.performCriteriaBasedAction.bind(Mongo, 'remove');

	/**
	 * Retrieves a single object from the collection based on criteria
	 *
	 * @param {String} collection
	 * @param {Object} criteria
	 * @return {Promise}
	 */
	Mongo.getSingleObject = Mongo.performCriteriaBasedAction.bind(Mongo, 'findOne');

	// export function
	return Mongo;
});
