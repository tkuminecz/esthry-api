/* global define */
define(['asset/create', 'asset/get', 'asset/list', 'asset/remove', 'asset/update'], function(Create, Get, List, Remove, Update) {
	'use strict';

	// export methods
	return {
		create: Create,
		get: Get,
		remove: Remove,
		update: Update
	};
});
