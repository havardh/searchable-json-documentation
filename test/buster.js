var config = module.exports;

config['Browser Environment'] = {
	env: 'browser',
	rootPath: '../',
	sources: [
		'data/*.js',
		'lib/jquery.js',
		'lib/*.js',
		'js/*.js'
	],
	tests: [
		'test/*-test.js'
	]
};