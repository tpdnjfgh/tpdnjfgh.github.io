'use strict';

module.exports = {
	db: 'mongodb://localhost/one-dev',
	app: {
		title: '세월호 - 손바닥으로 하늘을 가릴쏘냐'
	},
	facebook: {
		clientID: '292918034205739',
		clientSecret: '2667cd1b7646fc4b7c6f4409ea997fe7',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: 'CONSUMER_KEY',
		clientSecret: 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};