'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		title: '세월호 - 손바닥으로 하늘을 가릴쏘냐',
		description: '세월호 - 손바닥으로 하늘을 가릴쏘냐',
		keywords: '세월호'
	},
	root: rootPath,
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'oneSecret',
	sessionCollection: 'sessions'
};