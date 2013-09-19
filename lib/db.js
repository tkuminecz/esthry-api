/* global define*/
define(['mongodb-wrapper'], function(Mongo) {
	'use strict';

	var _Mongo = Mongo;

	// this module is here to allow future addition of connection pooling, etc
	Mongo.db = function() {
		return _Mongo.db('localhost', 27017, 'esthry');
	};

	// export function
	return Mongo;
});
