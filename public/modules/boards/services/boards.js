'use strict';

//Boards service used to communicate Boards REST endpoints
angular.module('boards').factory('Boards', ['$resource', function($resource) {
    return $resource('boards/:boardId', {
        boardId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);