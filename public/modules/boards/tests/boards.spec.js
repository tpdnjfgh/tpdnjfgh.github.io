'use strict';

(function() {
	// Boards Controller Spec
	describe('Boards Controller Tests', function() {
		// Initialize global variables
		var BoardsController,
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

			// Initialize the Boards controller.
			BoardsController = $controller('BoardsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Board object fetched from XHR', inject(function(Boards) {
			// Create sample Board using the Boards service
			var sampleBoard = new Boards({
				name: 'New Board'
			});

			// Create a sample Boards array that includes the new Board
			var sampleBoards = [sampleBoard];

			// Set GET response
			$httpBackend.expectGET('boards').respond(sampleBoards);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.boards).toEqualData(sampleBoards);
		}));

		it('$scope.findOne() should create an array with one Board object fetched from XHR using a boardId URL parameter', inject(function(Boards) {
			// Define a sample Board object
			var sampleBoard = new Boards({
				name: 'New Board'
			});

			// Set the URL parameter
			$stateParams.boardId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/boards\/([0-9a-fA-F]{24})$/).respond(sampleBoard);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.board).toEqualData(sampleBoard);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Boards) {
			// Create a sample Board object
			var sampleBoardPostData = new Boards({
				name: 'New Board'
			});

			// Create a sample Board response
			var sampleBoardResponse = new Boards({
				_id: '525cf20451979dea2c000001',
				name: 'New Board'
			});

			// Fixture mock form input values
			scope.name = 'New Board';

			// Set POST response
			$httpBackend.expectPOST('boards', sampleBoardPostData).respond(sampleBoardResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Board was created
			expect($location.path()).toBe('/boards/' + sampleBoardResponse._id);
		}));

		it('$scope.update() should update a valid Board', inject(function(Boards) {
			// Define a sample Board put data
			var sampleBoardPutData = new Boards({
				_id: '525cf20451979dea2c000001',
				name: 'New Board'
			});

			// Mock Board in scope
			scope.board = sampleBoardPutData;

			// Set PUT response
			$httpBackend.expectPUT(/boards\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/boards/' + sampleBoardPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid boardId and remove the Board from the scope', inject(function(Boards) {
			// Create new Board object
			var sampleBoard = new Boards({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Boards array and include the Board
			scope.boards = [sampleBoard];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/boards\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBoard);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.boards.length).toBe(0);
		}));
	});
}());