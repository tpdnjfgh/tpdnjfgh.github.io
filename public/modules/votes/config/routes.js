'use strict';

//Setting up route
angular.module('votes').config(['$stateProvider',
	function($stateProvider) {
		// Votes state routing
		$stateProvider.
		state('listVotes', {
			url: '/votes',
			templateUrl: 'modules/votes/views/list.html'
		}).
		state('createVote', {
			url: '/votes/create',
			templateUrl: 'modules/votes/views/create.html'
		}).
		state('viewVote', {
			url: '/votes/:voteId',
			templateUrl: 'modules/votes/views/view.html'
		}).
		state('editVote', {
			url: '/votes/:voteId/edit',
			templateUrl: 'modules/votes/views/edit.html'
		});
	}
]);