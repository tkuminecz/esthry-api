/* db.js */

import _ from 'lodash';
import mongo from 'mongodb-wrapper';
import q from 'q';

var orig_db = mongo.db;

/**
 * Wrapper around db() to automatically connect to esthry
 */
mongo.db = function() {
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
mongo.performCriteriaBasedAction = function(action, collection, criteria) {
	var defer = q.defer(),
		db = mongo.db();

	// chose the collection
	db.collection(collection);

	// perform the action
	if (!db[collection][action]) {
		defer.reject('Invalid action: ' + action);
	}
	db[collection][action].call(db[collection], handleObjectIDs(criteria), function(err, response) {
		db.close();

		if (err) {
			defer.reject(err);
		}

		defer.resolve(response);
	});

	return defer.promise;
};

/**
 * Convert _id strings to ObjectID's
 *
 * @param {Object} criteria
 * @return {Object}
 */
function handleObjectIDs(criteria) {
	if (criteria.hasOwnProperty('_id')) {
		criteria._id = mongo.ObjectID(criteria._id);
	}

	return criteria;
}

/**
 * Creates the object in the given collection
 *
 * @param {String} collection
 * @param {Object} data
 * @return {Promise}
 */
mongo.createObject = mongo.performCriteriaBasedAction.bind(mongo, 'save');

/**
 * Deletes objects based on criteria
 *
 * @param {String} collection
 * @param {Object} criteria
 * @return {Promise}
 */
mongo.removeObjects = mongo.performCriteriaBasedAction.bind(mongo, 'remove');

/**
 * Retrieves a single object from the collection based on criteria
 *
 * @param {String} collection
 * @param {Object} criteria
 * @return {Promise}
 */
mongo.getSingleObject = mongo.performCriteriaBasedAction.bind(mongo, 'findOne');

/**
 * Updates objects that match the given criteria
 *
 * @param {String} collection The collection to operate on
 * @param {Object} criteria The matching criteria
 * @param {Object} updates The updates to perform
 * @param {Boolean} multi Flag indicating if multiple objects should be updated (if matching)
 * @return {Promise}
 */
mongo.updateObjects = function(collection, criteria, updates, multi) {
	var db = mongo.db(),
		defer = q.defer(),
		promise = defer.promise;

	// convert object ids
	criteria = handleObjectIDs(criteria);

	// helper function to update a single property
	function updateProperty(db, criteria, key, value) {
		return function() {
			var defer = q.defer(),
				update_spec = {};

			update_spec[key] = value;

			db[collection].update(criteria, {$set: update_spec}, function(err, n_affected) {
				if (err) {
					defer.reject(err);
				}

				defer.resolve(n_affected);
			});

			return defer.promise;
		};
	}

	// choose the collection
	db.collection(collection);

	// update each property
	defer.resolve();
	_.each(updates, function(val, key) {
		promise = promise.then(updateProperty(db, criteria, key, val));
	});

	// close the db connection and return the updated object
	return promise.then(function(n_affected) {
			db.close();
			return n_affected;
		});
};

export default mongo;
