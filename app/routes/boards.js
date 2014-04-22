'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var boards = require('../../app/controllers/boards');

	// Boards Routes
	app.get('/boards', boards.list);
	app.post('/boards', users.requiresLogin, boards.create);
	app.get('/boards/:boardId', boards.read);
	app.put('/boards/:boardId', users.requiresLogin, boards.update);
	app.del('/boards/:boardId', users.requiresLogin, boards.hasAuthorization, boards.delete);

	// Finish by binding the Board middleware
	app.param('boardId', boards.boardByID);
};