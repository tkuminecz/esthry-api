/* routes/collection.js */
import _ from 'lodash';
import collection from 'collection';
import Route from 'routes';

/**
 * Adds the /collection/ routes to the app
 *
 * @param {Object} app The express app to add routes to
 * @return {Object} The express app (for chaining)
 */
function routes(app) {

	// list collections
	app.get('/collection/', function(req, res) {
		collection.list()
			.then(_.partialRight(_.pluck, '_id'))
			.then(Route.sendJson(res))
			.catch(Route.sendJson(res))
			.done();
	});

	// create a new collection
	app.post('/collection/', function(req, res) {
		collection.create(req.body)
			.then(Route.sendJson(res))
			.catch(Route.sendJson(res))
			.done();
	});

	// delete a collection
	app.del('/collection/:id', function(req, res) {
		collection.remove(req.params.id)
			.then(function(n_affected) {
				Route.sendJson(res)([(n_affected > 0)]);
			})
			.catch(Route.sendJson(res))
			.done();
	});

	// retrieve a collection
	app.get('/collection/:id', function(req, res) {
		collection.get(req.params.id)
			.then(Route.sendJson(res))
			.catch(Route.sendJson(res))
			.done();
	});

	// update a collection
	app.put('/collection/:id', function(req, res) {
		collection.update(req.params.id, req.body)
			.then(function(n_affected) {
				Route.sendJson(res)([(n_affected > 0)]);
			})
			.catch(Route.sendJson(res))
			.done();
	});

	// return the app for chaining
	return app;
}

export default routes;
