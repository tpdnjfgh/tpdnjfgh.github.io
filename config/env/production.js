'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/one',
	facebook: {
		clientID: '1422107211381754',
		clientSecret: '92613031a3fe25af9388502f71bbc1d5',
		callbackURL: 'http://one.unamed.kr/auth/facebook/callback'
	}
};