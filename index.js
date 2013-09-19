/* global require*/
'use strict';

var requirejs = require('requirejs');

// configure
requirejs.config({
	baseUrl: 'lib/',
	nodeRequire: require
});

// bootstrap
requirejs(['lodash', 'express', 'asset', 'collection', 'tag'], function(_, Express, Asset, Collection, Tag) {

	var app = Express();

	/**
	 * Returns a function which takes an object and sends it as JSON
	 *
	 * @param {Object} res The response object to send JSON to
	 * @return {Function}
	 */
	function sendJson(res) {
		return function(json) {
			res.json(json);
		}
	}

	// use bodyParser middleware
	app.use(Express.bodyParser());

	// default route
	app.get('/', function(req, res) {
		res.type('text/plain');
		res.send('please select a collection, e.g., /collections/messages');
	});

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

	app.listen(3000);
});
