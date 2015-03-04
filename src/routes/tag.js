/* global define*/
import _ from 'lodash';
import Route from 'routes';
import tag from 'tag';

/**
 * Adds the /tag/ routes to the app
 *
 * @param {Object} app The express app to add routes to
 * @return {Object} The express app (for chaining)
 */
function routes(app) {

	// list tags
	app.get('/tag/', function(req, res) {
		tag.list()
			.then(_.partialRight(_.pluck, '_id'))
			.then(Route.sendJson(res))
			.done();
	});

	// create a new tag
	app.post('/tag/', function(req, res) {
		tag.create(req.body)
			.then(Route.sendJson(res))
			.done();
	});

	// delete a tag
	app.del('/tag/:id', function(req, res) {
		tag.remove(req.params.id)
			.then(function(n_affected) {
				Route.sendJson(res)([(n_affected > 0)]);
			})
			.done();
	});

	// retrieve a tag
	app.get('/tag/:id', function(req, res) {
		tag.get(req.params.id)
			.then(Route.sendJson(res))
			.done();
	});

	// update a tag
	app.put('/tag/:id', function(req, res) {
		tag.update(req.params.id, req.body)
			.then(function(n_affected) {
				Route.sendJson(res)([(n_affected > 0)]);
			})
			.done();
	});

	// return the app for chaining
	return app;
}

export default routes;
