/* global define*/
define(['collection/create', 'collection/get', 'collection/list', 'collection/remove', 'collection/update'], function(Create, Get, List, Remove, Update) {
	'use strict';

	// export methods
	return {
		create: Create,
		get: Get,
		list: List,
		remove: Remove,
		update: Update
	};
});
