/* asset/find.js */

import mongo from 'db';

/**
 * Returns a promise for a particular asset
 *
 * @param {String} sum
 * @return {Promise}
 */
function find(crit) {
	return mongo.getSingleObject('assets', crit);
}

export default find;
