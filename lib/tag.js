/* global define*/
define(['tag/create', 'tag/get', 'tag/list', 'tag/remove', 'tag/update'], function(Create, Get, List, Remove, Update) {
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
