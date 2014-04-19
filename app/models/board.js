'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Board Schema
 */
var BoardSchema = new Schema({
	content: {
		type: String,
		default: '',
		required: 'Please fill Board name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	votes: {
		type: Number,
		default: 0,
		index: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Board', BoardSchema);