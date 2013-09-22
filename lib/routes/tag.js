/* global define*/
define(['lodash', 'routes', 'tag'], function(_, Routes, Tag) {
	'use strict';

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
				.then(Routes.sendJson(res))
				.done();
		});
	
		// create a new tag
		app.post('/tag/', function(req, res) {
			Tag.create(req.body)
				.then(Routes.sendJson(res))
				.done();
		});

		// delete a tag
		app.del('/tag/:id', function(req, res) {
			Tag.remove(req.params.id)
				.then(function(n_affected) {
					Routes.sendJson(res)([(n_affected > 0)]);
				})
				.done();
		});

		// retrieve a tag
		app.get('/tag/:id', function(req, res) {
			Tag.get(req.params.id)
				.then(Routes.sendJson(res))
				.done();
		});

		// update a tag
		app.put('/tag/:id', function(req, res) {
			Tag.update(req.params.id, req.body)
				.then(function(n_affected) {
					Routes.sendJson(res)([(n_affected > 0)]);
				})
				.done();
		});

		// return the app for chaining
		return app;
	}

	// export function
	return routes;
});
