'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
    beforeEach(module('contactList.controllers'));
    describe('ContactListCtrl', function(){
    var scope, ctrl, $httpBackend;
    beforeEach(module('contactList.controllers'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('contacts/contacts.json').
            respond([{first_name: 'Andrey'}, {first_name: 'Andrey'}, {first_name: 'Vasja'}, {first_name: 'David'}]);

        scope = $rootScope.$new();
        ctrl = $controller('ContactListCtrl', {$scope: scope});
    }));

    it('should create "contacts" model with 4 contacts fetched from xhr', function() {
        expect(scope.contacts).toBeUndefined();
        $httpBackend.flush();

        expect(scope.contacts).toEqual([{first_name: 'Andrey'}, {first_name: 'Andrey'}, {first_name: 'Vasja'}, {first_name: 'David'}]);
    });

    it('should set the default value of model', function() {
          expect(scope.contacts).toBeUndefined();
          $httpBackend.flush();
          expect(scope.fullList).toBe(true);
          expect(scope.details).toBe(false);
          expect(scope.contactForm).toBe(false);
          expect(scope.contactDetails).toBe(null);
          expect(scope.contact).toBe(null);
    });
  });
});
