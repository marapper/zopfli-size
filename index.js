'use strict';
var duplexer = require('duplexer');
var stream = require('stream');
var zlib = require('zlib');
var defaultOpts = {level: 9};

module.exports = function (str, cb) {
	if (!str) {
		cb(null, 0);
		return;
	}

	zlib.gzip(str, opts, function (err, data) {
		if (err) {
			cb(err, 0);
			return;
		}

		cb(err, data.length);
	});
};

module.exports.sync = function (str, opts) {
	return zlib.gzipSync(str, opts || defaultOpts).length;
};

module.exports.stream = function (opts) {
	var input = new stream.PassThrough();
	var output = new stream.PassThrough();
	var wrapper = duplexer(input, output);

	var gzipSize = 0;
	var gzip = zlib.createGzip(opts || defaultOpts)
		.on('data', function (buf) {
			gzipSize += buf.length;
		})
		.on('error', function () {
			wrapper.gzipSize = 0;
		})
		.on('end', function () {
			wrapper.gzipSize = gzipSize;
			wrapper.emit('gzip-size', gzipSize);
			output.end();
		});

	input.pipe(gzip);
	input.pipe(output, {end: false});

	return wrapper;
};
