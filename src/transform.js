/* transform.js */

import lwip from 'lwip';
import q from 'q';

// enlarges image to maximum size that still fits within the canvas
function contain(image, opts) {
	var defer = q.defer(),
		img_height = image.height(),
		img_width = image.width(),
		img_ratio = img_width / img_height,
		canvas_ratio = opts.width / opts.height,
		new_img_w, new_img_h;

	if (img_ratio > canvas_ratio) { // image is wider than the canvas
		new_img_w = opts.width;
		new_img_h = (new_img_w / img_ratio);
	}
	else { // image is taller than or same as the canvas
		new_img_h = opts.height;
		new_img_W = (new_img_h * img_ratio);
	}

	image.resize(new_img_w, new_img_h, (err, image) => {
		if (err) {
			defer.reject(err);
		}
		else {
			defer.resolve(image);
		}
	});

	return defer.promise;
}

// crops the image to a rectangle
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

// crops the image to a rectangle using percentages instead of absolute coordinates
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

// scales the image using a ratio
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

// dispatches a transform function
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

// applies a set of transformations to the image
function transform(buffer, type, transformations) {
	var defer = q.defer();

	process.stdout.write("\t+ performing image transforms..");

	lwip.open(buffer, type, (err, image) => {
		var transforms;

		// apply image transformations
		transforms = transformations.reduce((soFar, transform) => {
			return soFar.then(image => {
				//console.log("\t- applying image transforms " + JSON.stringify(transform));
				process.stdout.write('.');
				return dispatchTransform(image, transform);
			});
		}, q(image));

		// convert image back to buffer
		transforms.then(image => {
			console.log('done.');
			process.stdout.write("\t+ converting to buffer...");
			image.toBuffer(type, (err, buffer) => {
				if (err) {
					defer.reject(err);
				}
				else {
					console.log('done.');
					defer.resolve(buffer);
				}
			});
		});
	});

	return defer.promise;
}

export default transform;
