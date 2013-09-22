/* global define*/
define(['lodash', 'routes', 'collection'], function(_, Routes, Collection) {
	'use strict';

	/**
	 * Adds the /collection/ routes to the app
	 *
	 * @param {Object} app The express app to add routes to
	 * @return {Object} The express app (for chaining)
	 */
	function routes(app) {

		// list collections
		app.get('/collection/', function(req, res) {
			Collection.list()
				.then(_.partialRight(_.pluck, '_id'))
				.then(Routes.sendJson(res))
				.catch(Routes.sendJson(res))
				.done();
		});
	
		// create a new collection
		app.post('/collection/', function(req, res) {
			Collection.create(req.body)
				.then(Routes.sendJson(res))
				.catch(Routes.sendJson(res))
				.done();
		});

		// delete a collection
		app.del('/collection/:id', function(req, res) {
			Collection.remove(req.params.id)
				.then(function(n_affected) {
					Routes.sendJson(res)([(n_affected > 0)]);
				})
				.catch(Routes.sendJson(res))
				.done();
		});

		// retrieve a collection
		app.get('/collection/:id', function(req, res) {
			Collection.get(req.params.id)
				.then(Routes.sendJson(res))
				.catch(Routes.sendJson(res))
				.done();
		});

		// update a collection
		app.put('/collection/:id', function(req, res) {
			Collection.update(req.params.id, req.body)
				.then(function(n_affected) {
					Routes.sendJson(res)([(n_affected > 0)]);
				})
				.catch(Routes.sendJson(res))
				.done();
		});

		// return the app for chaining
		return app;
	}

	// export function
	return routes;
});
