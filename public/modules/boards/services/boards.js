'use strict';

//Boards service used to communicate Boards REST endpoints
angular.module('boards').factory('Boards', ['$resource', function($resource) {
    return $resource('boards/:boardId', {
        boardId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        getByVotes: {
          method: 'GET',
          params: { sort: '-votes' }, 
          isArray: true 
        },
        getPopulars: {
          method: 'GET',
          params: { sort: '-votes', limit: 3 },
          isArray: true 
        },
        getByNewest: {
          method: 'GET',
          params: { sort: '-created' }, 
          isArray: true 
        }
    });
}]);