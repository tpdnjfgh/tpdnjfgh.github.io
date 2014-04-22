'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Board = mongoose.model('Board'),
	_ = require('lodash');

/**
 * Create a Board
 */
exports.create = function(req, res) {
	var board = new Board(req.body);
	board.user = req.user;

	board.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				board: board
			});
		} else {
			res.jsonp(board);
		}
	});
};

/**
 * Show the current Board
 */
exports.read = function(req, res) {
	res.jsonp(req.board);
};

/**
 * Update a Board
 */
exports.update = function(req, res) {
	var board = req.board;

	board = _.extend(board, req.body);

	board.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(board);
		}
	});
};

/**
 * Delete an Board
 */
exports.delete = function(req, res) {
	var board = req.board;

	board.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(board);
		}
	});
};

/**
 * List of Boards
 */
exports.list = function(req, res) {
	
	var sort = req.query.sort || '-created';
	var limit = req.query.limit || 200;
	
	Board.find()
		.sort(sort)
		.limit(limit)
		.populate('user', 'displayName providerData.link')
		.exec(function(err, boards) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(boards);
		}
	});
};

/**
 * Board middleware
 */
exports.boardByID = function(req, res, next, id) {
	Board.findById(id).populate('user', 'displayName').exec(function(err, board) {
		if (err) return next(err);
		if (!board) return next(new Error('Failed to load Board ' + id));
		req.board = board;
		next();
	});
};

/**
 * Board authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.board.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};