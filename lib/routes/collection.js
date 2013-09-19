/* global define*/
define(['lodash', 'collection'], function(_, Collection) {
	'use strict';

	/**
	 * Returns a function which takes an object and sends it as JSON.
	 * Convienent for passing into promise chaining
	 *
	 * @param {Object} res The response object to send JSON to
	 * @return {Function}
	 */
	function sendJson(res) {
		return function(json) {
			res.json(json);
		};
	}

	/**
	 * Adds the /collection/ routes to the app
	 *
	 * @param {Object} app The express app to add routes to
	 * @return {Object} The express app (for chaining)
	 */
	function routes(app) {

		// list collections
		app.get('/collections/', function(req, res) {
			Collection.list()
				.then(_.partialRight(_.pluck, '_id'))
				.then(sendJson(res))
				.done();
		});
	
		// create a new collection
		app.post('/collections/', function(req, res) {
			Collection.create(req.body)
				.then(sendJson(res))
				.done();
		});

		// delete a collection
		app.del('/collections/:id', function(req, res) {
			Collection.remove(req.params.id)
				.then(function(n_affected) {
					sendJson(res)([(n_affected > 0)]);
				})
				.done();
		});

		// retrieve a collection
		app.get('/collections/:id', function(req, res) {
			Collection.get(req.params.id)
				.then(sendJson(res))
				.done();
		});

		// update a collection
		app.put('/collections/:id', function(req, res) {
			Collection.update(req.params.id, req.body)
				.then(function(n_affected) {
					sendJson(res)([(n_affected > 0)]);
				})
				.done();
		});

		// return the app for chaining
		return app;
	}

	// export function
	return routes;
});
