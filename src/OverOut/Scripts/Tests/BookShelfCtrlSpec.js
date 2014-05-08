var httpBackend;
var injector;
var ctrlScope;
var ctrl;
var services;

var books = [
    { "Id": 43434, "Author": "Author", "Title": "Title", "ISBN": "ISBN", "LoanedTo": "LoanedTo", "LoanedToName": "" },
    { "Id": 78788, "Author": "Author 2", "Title": "Title 2", "ISBN": "ISBN 2", "LoanedTo": "LoanedTo 2", "LoanedToName": "" }];

var users = [
    { "Id": 86897, "Firstname": "Firstname", "Lastname": "Lastname", "BooksBorrowed": [43434] },
    { "Id": 89007, "Firstname": "Firstname 2", "Lastname": "Lastname 2", "BooksBorrowed": [78788] }];

module('BookShelfCtrlSpec', {
    setup: function () {
        var appMocks = angular.module('appMocks', []);
        appMocks.config(function ($provide) {
            $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        });

        injector = angular.injector(['ng', 'appMocks', 'BookShelf']);
        httpBackend = injector.get('$httpBackend');
        ctrlScope = injector.get('$rootScope').$new();
        services = injector.get('services');
        ctrl = injector.get('$controller')('BookShelfCtrl', { $scope: ctrlScope, services: services });

    }
});

test('When retrieving all books', function () {
    httpBackend.expectGET('BookData/GetAllBooks').respond(books);
    ctrlScope.getAllBooks();
    httpBackend.flush();
    notEqual(ctrlScope.books.length, 0, "The length of the book array should be greater than 0");
});

test("when retrieving all users", function () {
    httpBackend.expectGET('BookData/GetAllUsers').respond(users);
    ctrlScope.getAllUsers();
    httpBackend.flush();
    notEqual(ctrlScope.users.length, 0, "The length of the user array should be greater than 0");
});

test("when loaning a book and all the exception passes", function () {

    ctrlScope.userSelected = users[0];
    ctrlScope.bookChosen = books[0];
    books[0].LoanedTo = ctrlScope.userSelected.Id;
    books[0].LoanedToName = ctrlScope.userSelected.Firstname + " " + ctrlScope.userSelected.Lastname;

    httpBackend.expectGET('BookData/Loan?bookId=' + ctrlScope.bookChosen.Id + "&userId=" + ctrlScope.userSelected.Id).respond(true);
    httpBackend.expectGET('BookData/GetAllBooks').respond(books);
    ctrlScope.loan();
    httpBackend.flush();
    
    equal(ctrlScope.loanResponse, true, 'response should be true, loan was successfull');
    equal(ctrlScope.books[0].LoanedTo, users[0].Id, "book should be loaned to the right user id");
    equal(ctrlScope.books[0].LoanedToName, users[0].Firstname + " " + users[0].Lastname, "book should be loaned to the right user with right firstname and lastname");
});

test("when loaning a book without a user selected", function () {
    ctrlScope.loan();
    equal(ctrlScope.didNotSelectAnyUser, true, "You didn't select any user to loan this book to");
});

test('when returning a book', function() {

    ctrlScope.userSelected = users[0];
    ctrlScope.bookChosen = books[0];
    ctrlScope.bookChosen.LoanedTo = ctrlScope.userSelected.Id;
    ctrlScope.bookChosen.LoanedToName = ctrlScope.userSelected.Firstname + " " + ctrlScope.userSelected.Lastname;
   
    httpBackend.expectGET('BookData/Return?bookId=' + ctrlScope.bookChosen.Id + "&userId=" + ctrlScope.userSelected.Id).respond(true);
    httpBackend.expectGET('BookData/GetAllBooks').respond(books);
    ctrlScope.return(ctrlScope.bookChosen);
    httpBackend.flush();
    books[0].LoanedTo = "";
    books[0].LoanedToName = "";

    equal(ctrlScope.returnResponse, true, 'response should be true, return was successfull');
    equal(books[0].LoanedTo, "", "the loanedTo param should be empty");
    equal(books[0].LoanedToName, "", "the LoanedToName param should be empty");
});

test('when filtering books', function() {

    ctrlScope.filter = "2";
    var filterBooks = [];
    for (var i = 0; i < books.length; i++) {
        
        if (books[i].Title.indexOf(ctrlScope.filter) != -1) {

            filterBooks.push(books[i]);
        }
    }
    httpBackend.expectGET('BookData/FilterBooks?filter=' + ctrlScope.filter).respond(filterBooks);
    ctrlScope.setupWatch();
    ctrlScope.$digest();
    httpBackend.flush();
    equal(ctrlScope.books[0].Title, filterBooks[0].Title, "Should return books corresponding to the filter");
});

