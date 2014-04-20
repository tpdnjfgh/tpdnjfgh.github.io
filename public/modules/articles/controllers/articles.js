'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'Votes',
    function($scope, $stateParams, $location, Authentication, Articles, Votes) {
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



        $scope.toggleMode = function() {
            
            this.is_newest = !this.is_newest;

            
            if(this.is_newest) {
                Articles.getByNewest(function(articles) {
                    $scope.articles = articles;

                    console.log(articles);
                });

            } else {
                Articles.getByVotes(function(articles) {
                    $scope.articles = articles;
                    console.log(articles);
                });
            }
            

            
            console.log(this.is_newest);
        };

        $scope.voting = function(article) {
            if (!article.updated) {
                article.updated = [];
            }
            
            article.votes += 1;

            article.$update(function() {
                // $location.path('articles/' + article._id);
            });
        };

        $scope.findAll = function() {

            this.find();
            this.findVote();

        };

        // Find a list of Votes
        $scope.findVote = function() {
            Votes.query(function(votes) {
                $scope.vote = votes[0];
            });
        };

        $scope.create = function() {
            var article = new Articles({
                title: this.title,
                url: this.url,
                content: this.content
            });
            article.$save(function(response) {
                $location.path('articles/' + response._id);
            });

            this.title = '';
            this.url = '';
            this.content = '';
        };

        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function() {
            var article = $scope.article;
            if (!article.updated) {
                article.updated = [];
            }
            article.updated.push(new Date().getTime());

            article.$update(function() {
                $location.path('articles/' + article._id);
            });
        };

        $scope.find = function() {
            Articles.getByNewest(function(articles) {
                $scope.articles = articles;
            });
        };

        $scope.findOne = function() {
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                $scope.article = article;
            });
        };
    }
]);