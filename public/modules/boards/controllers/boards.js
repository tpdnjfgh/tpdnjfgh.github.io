'use strict';

// Boards controller
angular.module('boards').controller('BoardsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Boards', 'Votes',
    function($scope, $stateParams, $location, Authentication, Boards, Votes) {
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



        $scope.voting = function(board) {
            if (!board.updated) {
                board.updated = [];
            }
            
            board.votes += 1;

            board.$update(function() {
                // $location.path('articles/' + article._id);
            });
        };

        $scope.toggleMode = function() {
            
            this.is_newest = !this.is_newest;

            console.log(this.is_newest);
            
            if(this.is_newest) {
                Boards.getByNewest(function(boards) {
                    $scope.boards = boards;

                    console.log(boards);
                });

            } else {
                Boards.getByVotes(function(boards) {
                    $scope.boards = boards;
                    console.log(boards);
                });
            }

        };

        // Create new Board
        $scope.create = function() {
        	// Create new Board object
            var board = new Boards({
                content: this.content
            });

            // Redirect after save
            board.$save(function(response) {
                $location.path('boards/' + response._id);
            });

            // Clear form fields
            this.content = '';
        };

        // Remove existing Board
        $scope.remove = function(board) {
            if (board) {
                board.$remove();

                for (var i in $scope.boards) {
                    if ($scope.boards[i] === board) {
                        $scope.boards.splice(i, 1);
                    }
                }
            } else {
                $scope.board.$remove(function() {
                    $location.path('boards');
                });
            }
        };

        // Update existing Board
        $scope.update = function() {
            var board = $scope.board;

            board.$update(function() {
                $location.path('boards/' + board._id);
            });
        };

        $scope.findAll = function() {

            this.find();
            this.findPopular();
            this.findVote();

        };
        
        // Find a list of Boards
        $scope.findPopular = function() {
            Boards.getPopulars(function(boards) {
                $scope.popularBoards = boards;
            });

        };

        // Find a list of Votes
        $scope.findVote = function() {
            Votes.query(function(votes) {
                $scope.vote = votes[0];
            });
        };

        // Find a list of Boards
        $scope.find = function() {
            Boards.query(function(boards) {
                $scope.boards = boards;
            });
        };

        // Find existing Board
        $scope.findOne = function() {
            Boards.get({
                boardId: $stateParams.boardId
            }, function(board) {
                $scope.board = board;
            });
        };
    }
]);