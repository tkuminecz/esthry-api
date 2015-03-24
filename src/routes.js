/* routes.js */

class Route {
	/**
	 * Returns a function which sends a JSON object as a JSON
	 *
	 * @param {object} res
	 * @return {function}
	 */
	static sendJson(res) {
		res.set('Cache-Control', 'public, max-age=0');

		return function(json) {
			res.json(json);
		};
	}

	static sendMimeData(res, type, length, data) {

		res.set('Cache-Control', 'public, max-age=0');
		res.writeHead(200, {
			'accept-ranges': 'bytes',
			'Content-Type': type,
			'Content-Length': length
		});
		res.end(data);
	}

}

export default Route;
