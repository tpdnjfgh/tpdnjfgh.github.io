'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource', function($resource) {
    return $resource('articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        getByVotes: {
          method: 'GET',
          params: { sort: '-votes' }, 
          isArray: true 
        },
        getByNewest: {
          method: 'GET',
          params: { sort: '-created' }, 
          isArray: true 
        }
    });
}]);