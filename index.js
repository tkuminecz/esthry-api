/* global require*/
'use strict';

var requirejs = require('requirejs'),
	port = 3000,
	host = '0.0.0.0';

// configure
requirejs.config({
	baseUrl: 'lib/',
	nodeRequire: require
});

// bootstrap
requirejs([
	'cors',
	'express',
	'routes/asset',
	'routes/collection',
	'routes/tag',
	'express-cache-control',
	's3/put',
], function(Cors, Express, AssetRoutes, CollectionRoutes, TagRoutes, CacheControl, S3Put) {

	var app = Express(),
		cache = new CacheControl({override: 0}).middleware;

	// log requests
	app.use(function(req, res, next) {
		console.log(req.url);
		next();
	});

	// use bodyParser middleware
	app.use(Express.bodyParser());

	// support CORS
	app.use(Cors());

	// default route
	app.get('/', function(req, res) {
		res.type('text/plain');
		res.send('please select a collection, e.g., /collections/messages');
	});

	// add routes
	AssetRoutes(app);
	CollectionRoutes(app);
	TagRoutes(app);

	// listen
	console.log('Listening on ' + host + ':' + port + "\n");
	app.listen(port, host);
});
