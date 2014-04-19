'use strict';

// Votes controller
angular.module('votes').controller('VotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Votes',
    function($scope, $stateParams, $location, Authentication, Votes) {
        $scope.authentication = Authentication;

        
        $scope.voteNo = function(vote) {
            vote.no += 1;

            vote.$update(function() {
                // $location.path('articles/' + article._id);
            });
        };

        $scope.voteYes = function(vote) {
            vote.yes += 1;

            vote.$update(function() {
                // $location.path('articles/' + article._id);
            });
        };


        // Create new Vote
        $scope.create = function() {
        	// Create new Vote object
            var vote = new Votes({
                name: this.name
            });

            // Redirect after save
            vote.$save(function(response) {
                $location.path('votes/' + response._id);
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing Vote
        $scope.remove = function(vote) {
            if (vote) {
                vote.$remove();

                for (var i in $scope.votes) {
                    if ($scope.votes[i] === vote) {
                        $scope.votes.splice(i, 1);
                    }
                }
            } else {
                $scope.vote.$remove(function() {
                    $location.path('votes');
                });
            }
        };

        // Update existing Vote
        $scope.update = function() {
            var vote = $scope.vote;

            vote.$update(function() {
                $location.path('votes/' + vote._id);
            });
        };

        // Find a list of Votes
        $scope.find = function() {
            Votes.query(function(votes) {
                $scope.votes = votes;
            });
        };

        // Find existing Vote
        $scope.findOne = function() {
            Votes.get({
                voteId: $stateParams.voteId
            }, function(vote) {
                $scope.vote = vote;
            });
        };
    }
]);