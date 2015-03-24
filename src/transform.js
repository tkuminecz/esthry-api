/* transform.js */

import lwip from 'lwip';
import q from 'q';

function contain(image, opts) {
	var defer = q.defer();

	opts.color = opts.color || {r: 0, g: 0, b: 0, a: 0};

	image.contain(opts.width, opts.height, opts.color, (err, image) => {
		if (err) {
			defer.reject(err);
		}
		else {
			defer.resolve(image);
		}
	});

	return defer.promise;
}

function crop(image, opts) {
	var defer = q.defer();

	image.crop(opts.left, opts.top, opts.right, opts.bottom, (err, image) => {
		if (err) {
			defer.reject(err);
		}
		else {
			defer.resolve(image);
		}
	});

	return defer.promise;
}

function cropPercent(image, opts) {
	var defer = q.defer(),
		height = image.height(),
		width = image.width(),
		round = Math.round,
		bottom, left, right, top;

	left = round(opts.left * width);
	right = round(opts.right * width);
	top = round(opts.top * height);
	bottom = round(opts.bottom * height);

	image.crop(left, top, right, bottom, (err, image) => {
		if (err) {
			defer.reject(err);
		}
		else {
			defer.resolve(image);
		}
	});

	return defer.promise;
}

function scale(image, opts) {
	var defer = q.defer();

	image.scale(opts.ratio, (err, image) => {
		if (err) {
			defer.reject(err);
		}
		else {
			defer.resolve(image);
		}
	});

	return defer.promise;
}

function dispatchTransform(image, opts) {
	switch(opts.operation) {
		case 'contain':
			return contain(image, opts);

		case 'crop':
			return crop(image, opts);

		case 'cropPercent':
			return cropPercent(image, opts);

		case 'scale':
			return scale(image, opts);

		default:
			console.log('invalid transform', opts);
			return q(false);
	}
}

function transform(buffer, type, transformations) {
	var defer = q.defer();

	lwip.open(buffer, type, (err, image) => {
		var transforms;

		// apply image transformations
		transforms = transformations.reduce((soFar, transform) => {
			return soFar.then(image => {
				console.log("\t- applying image transforms " + JSON.stringify(transform));
				return dispatchTransform(image, transform);
			});
		}, q(image));

		// convert image back to buffer
		transforms.then(image => {
			console.log("\t- finished transforms")
			image.toBuffer(type, (err, buffer) => {
				if (err) {
					defer.reject(err);
				}
				else {
					defer.resolve(buffer);
				}
			});
		});
	});

	return defer.promise;
}

export default transform;
