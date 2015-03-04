/* main.js */

import cors from 'cors';
import express from 'express';
import assetRoutes from 'routes/asset';
import collectionRoutes from 'routes/collection';
import tagRoutes from 'routes/tag';
import cacheControl from 'express-cache-control';
import s3Put from 's3/put';

var port = 3000,
	host = '0.0.0.0',
	app = express(),
	cache = new cacheControl({override: 0}).middleware;

// log requests
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

// use bodyParser middleware
app.use(express.bodyParser());

// support CORS
app.use(cors());

// default route
app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('please select a collection, e.g., /collections/messages');
});

// add routes
assetRoutes(app);
collectionRoutes(app);
tagRoutes(app);

// listen
console.log('Listening on ' + host + ':' + port + "\n");
app.listen(port, host);
