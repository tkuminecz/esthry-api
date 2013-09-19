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
requirejs(['express', 'routes/asset', 'routes/collection', 'routes/tag'], function(Express, AssetRoutes, CollectionRoutes, TagRoutes) {

	var app = Express();

	// use bodyParser middleware
	app.use(Express.bodyParser());

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
	console.log('Listening on ' + host + ':' + port);
	app.listen(port, host);
});
