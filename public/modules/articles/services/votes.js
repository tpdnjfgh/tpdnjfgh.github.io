'use strict';

//Votes service used to communicate Votes REST endpoints
angular.module('articles').factory('Votes', ['$resource', function($resource) {
    return $resource('votes/:voteId', {
        voteId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);