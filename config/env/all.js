'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		title: '[세월호]손바닥으로 하늘을 가릴쏘냐',
		description: '양심(良心)은 선악을 판단하고 선을 명령하며 악을 물리치는 도덕 의식이다. 양심의 가책이나 양심에 부끄럽지 않다고 말하듯이 자기가 행하거나 행하게 되는일 특히, 나쁜 행위를 비판하고 반성하는 의식을 말한다',
		keywords: '세월호'
	},
	root: rootPath,
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'oneSecret',
	sessionCollection: 'sessions'
};