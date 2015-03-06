/* util/image.js */

import q from 'q';
import request from 'request';

export default {
	getInfoFromUrl: function(url) {
		var defer = q.defer();

		request.head(url, (err, res, body) => {
			var data = {
				type: res.headers['content-type'],
				size: res.headers['content-length']
			};
			
			defer.resolve(data);
		});

		return defer.promise;
	}
};