/* global require*/
var requirejs = require('requirejs');

// configure
requirejs.config({
	nodeRequire: require,
	baseUrl: 'lib/'
});

// bootstrap
requirejs(['asset'], function(Asset) {

	console.log(Asset);
});
