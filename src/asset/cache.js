/* asset/cache.js */

import fs from 'fs';
import q from 'q';

class Cache {
	constructor() {
		this.max = 100;
		this.manifest_path = '/tmp/esthry-asset-cache-manifest';
	}

	// returns the cache manifest
	getManifest() {
		var defer = q.defer();

		fs.readFile(this.manifest_path, (err, data) => {
			if (err) {
				defer.resolve({});
			}
			else {
				defer.resolve(JSON.parse(data));
			}
		});

		return defer.promise;
	}

	// sets the cache manifest
	setManifest(manifest) {
		var defer = q.defer(),
			json = JSON.stringify(manifest);

		fs.writeFile(this.manifest_path, json, err => {
			if (err) {
				defer.reject(err);
			}
			else {
				defer.resolve();
			}
		});

		return defer.promise;
	}

	// retrieves a value from the cache
	get(key) {
		var defer = q.defer();

		this.getManifest()
			.then(manifest => {
				if (manifest[key]) {
					// load the base64 data from the file
					fs.readFile(manifest[key], {encoding: 'utf8'}, (err, data) => {
						if (err) {
							defer.reject(err);
						}
						else {
							defer.resolve(data);
						}
					});
				}
				else {
					defer.reject('cache miss');
				}
			});

		return defer.promise;
	}

	// sets a value to the cache
	set(key, value) {
		var defer = q.defer();

		this.getManifest()
			.then(manifest => {
				var	filename = `/tmp/${key}-data`;

				manifest[key] = filename;
				this.setManifest(manifest)
					.then(() => {
						fs.writeFile(filename, value, {encoding: 'utf8'}, err => {
							if (err) {
								defer.reject(err);
							}
							else {
								defer.resolve();
							}
						});
					});
			});
		return defer.promise;
	}

	// sets a value to the cache only if it isn't already set
	add(key, value) {
		return this.get(key)
			.then(cache_data => {
				if (!cache_data) {
					return this.set(key, value);
				}

				return q(undefined);
			});
	}
}

export default Cache;