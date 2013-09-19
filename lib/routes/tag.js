/* global define*/
define(['lodash', 'tag'], function(_, Tag) {
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
	 * Adds the /tag/ routes to the app
	 *
	 * @param {Object} app The express app to add routes to
	 * @return {Object} The express app (for chaining)
	 */
	function routes(app) {

		// list tags
		app.get('/tag/', function(req, res) {
			Tag.list()
				.then(_.partialRight(_.pluck, '_id'))
				.then(sendJson(res))
				.done();
		});
	
		// create a new tag
		app.post('/tag/', function(req, res) {
			Tag.create(req.body)
				.then(sendJson(res))
				.done();
		});

		// delete a tag
		app.del('/tag/:id', function(req, res) {
			Tag.remove(req.params.id)
				.then(function(n_affected) {
					sendJson(res)([(n_affected > 0)]);
				})
				.done();
		});

		// retrieve a tag
		app.get('/tag/:id', function(req, res) {
			Tag.get(req.params.id)
				.then(sendJson(res))
				.done();
		});

		// update a tag
		app.put('/tag/:id', function(req, res) {
			Tag.update(req.params.id, req.body)
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
