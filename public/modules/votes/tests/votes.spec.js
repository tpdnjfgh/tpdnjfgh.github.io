'use strict';

(function() {
	// Votes Controller Spec
	describe('Votes Controller Tests', function() {
		// Initialize global variables
		var VotesController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Votes controller.
			VotesController = $controller('VotesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Vote object fetched from XHR', inject(function(Votes) {
			// Create sample Vote using the Votes service
			var sampleVote = new Votes({
				name: 'New Vote'
			});

			// Create a sample Votes array that includes the new Vote
			var sampleVotes = [sampleVote];

			// Set GET response
			$httpBackend.expectGET('votes').respond(sampleVotes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.votes).toEqualData(sampleVotes);
		}));

		it('$scope.findOne() should create an array with one Vote object fetched from XHR using a voteId URL parameter', inject(function(Votes) {
			// Define a sample Vote object
			var sampleVote = new Votes({
				name: 'New Vote'
			});

			// Set the URL parameter
			$stateParams.voteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/votes\/([0-9a-fA-F]{24})$/).respond(sampleVote);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vote).toEqualData(sampleVote);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Votes) {
			// Create a sample Vote object
			var sampleVotePostData = new Votes({
				name: 'New Vote'
			});

			// Create a sample Vote response
			var sampleVoteResponse = new Votes({
				_id: '525cf20451979dea2c000001',
				name: 'New Vote'
			});

			// Fixture mock form input values
			scope.name = 'New Vote';

			// Set POST response
			$httpBackend.expectPOST('votes', sampleVotePostData).respond(sampleVoteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Vote was created
			expect($location.path()).toBe('/votes/' + sampleVoteResponse._id);
		}));

		it('$scope.update() should update a valid Vote', inject(function(Votes) {
			// Define a sample Vote put data
			var sampleVotePutData = new Votes({
				_id: '525cf20451979dea2c000001',
				name: 'New Vote'
			});

			// Mock Vote in scope
			scope.vote = sampleVotePutData;

			// Set PUT response
			$httpBackend.expectPUT(/votes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/votes/' + sampleVotePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid voteId and remove the Vote from the scope', inject(function(Votes) {
			// Create new Vote object
			var sampleVote = new Votes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Votes array and include the Vote
			scope.votes = [sampleVote];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/votes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVote);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.votes.length).toBe(0);
		}));
	});
}());