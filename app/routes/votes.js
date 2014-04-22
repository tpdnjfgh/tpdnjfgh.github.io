'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var votes = require('../../app/controllers/votes');

	// Votes Routes
	app.get('/votes', votes.list);
	app.post('/votes', users.requiresLogin, votes.create);
	app.get('/votes/:voteId', votes.read);
	app.put('/votes/:voteId', users.requiresLogin, votes.update);
	app.del('/votes/:voteId', users.requiresLogin, votes.delete);

	// Finish by binding the Vote middleware
	app.param('voteId', votes.voteByID);
};