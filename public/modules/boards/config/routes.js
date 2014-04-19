'use strict';

//Setting up route
angular.module('boards').config(['$stateProvider',
	function($stateProvider) {
		// Boards state routing
		$stateProvider.
		state('listBoards', {
			url: '/boards',
			templateUrl: 'modules/boards/views/list.html'
		}).
		state('createBoard', {
			url: '/boards/create',
			templateUrl: 'modules/boards/views/create.html'
		}).
		state('viewBoard', {
			url: '/boards/:boardId',
			templateUrl: 'modules/boards/views/view.html'
		}).
		state('editBoard', {
			url: '/boards/:boardId/edit',
			templateUrl: 'modules/boards/views/edit.html'
		});
	}
]);