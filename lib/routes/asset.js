/* global define*/
define(['lodash', 'asset'], function(_, Asset) {
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

		// list assets
		app.get('/asset/', function(req, res) {
			Asset.list()
				.then(_.partialRight(_.pluck, '_id'))
				.then(sendJson(res))
				.done();
		});
	
		// create a new asset
		app.post('/asset/', function(req, res) {
			Asset.create(req.body)
				.then(sendJson(res))
				.done();
		});

		// delete an asset
		app.del('/asset/:id', function(req, res) {
			Asset.remove(req.params.id)
				.then(function(n_affected) {
					sendJson(res)([(n_affected > 0)]);
				})
				.done();
		});

		// retrieve an asset
		app.get('/asset/:id', function(req, res) {
			Asset.get(req.params.id)
				.then(sendJson(res))
				.done();
		});

		// update an asset
		app.put('/asset/:id', function(req, res) {
			Asset.update(req.params.id, req.body)
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
