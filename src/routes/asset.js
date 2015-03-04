/* asset.js */
import _ from 'lodash';
import Route from 'routes';
import Asset from 'asset';

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
			.then(Route.sendJson(res))
			.done();
	});

	// create a new asset
	app.post('/asset/', function(req, res) {
		Asset.create(req.body)
			.then(Route.sendJson(res))
			.done();
	});

	// delete an asset
	app.del('/asset/:id', function(req, res) {
		Asset.remove(req.params.id)
			.then(function(n_affected) {
				Route.sendJson(res)([(n_affected > 0)]);
			})
			.catch(Route.sendJson(res))
			.done();
	});

	// retrieve an asset
	app.get('/asset/:id', function(req, res) {
		Asset.get(req.params.id)
			.then(Route.sendJson(res))
			.done();
	});

	// update an asset
	app.put('/asset/:id', function(req, res) {
		Asset.update(req.params.id, req.body)
			.then(function(n_affected) {
				Route.sendJson(res)([(n_affected > 0)]);
			})
			.done();
	});

	// return the app for chaining
	return app;
}

// export function
export default routes;
