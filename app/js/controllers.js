'use strict';

/* Controllers */

angular.module('contactList.controllers', ['ui.bootstrap']).
    controller('ContactListCtrl', function($scope, $http, $modal, $log) {
        // Init main variables
        $scope.alerts = [];
        // Get data from json file. In real project it would be better to fetch
        // data from db
        $http.get('contacts/contacts.json').success(function(data) {
            $scope.contacts = data;
            $scope.contactsCopy = angular.copy($scope.contacts);
            $scope.fullListContacts();
        }).error(function(data) {
            $scope.addAlert({ type: 'danger', msg: 'Sorry. Can not get data' });
        });


        $scope.fullListContacts = function(query) {
            // Function to show initial view and init rest variables
            $scope.alerts = [];
            $scope.contacts = angular.copy($scope.contactsCopy);
            $scope.fullList = true;
            $scope.details = false;
            $scope.contactForm = false;
            $scope.contactDetails = null;
            $scope.contact = null;
            $scope.query = query;
        };
     
        $scope.showContactInfo = function(contact) {
            // Shows selected contact
            $scope.fullList = false;
            $scope.details = true;
            $scope.contactForm = false;
            $scope.contactDetails = contact;
        };

        $scope.addContactForm = function() {
            // Shows empty form for a new contact
            $scope.alerts = [];
            $scope.contacts = angular.copy($scope.contactsCopy);
            $(".form-view .page-header h1 small").text('add new');
            $scope.fullList = false;
            $scope.details = false;
            $scope.contactForm = true;
            $scope.contactDetails = null;
            $scope.contact = null;
        };

        $scope.editContactForm = function($event, contact) {
            // Shows form with info of selected contact
            $event.preventDefault();
            $event.stopPropagation();
            $(".form-view .page-header h1 small").text('edit existing one');
            $scope.fullList = false;
            $scope.details = false;
            $scope.contactForm = true;
            $scope.contact = contact;
            $scope.contactDetails = null;
        };

        $scope.saveEditedContact = function(contact) {
            // Saves edited contact
            $scope.contactsCopy = angular.copy($scope.contacts);
            $scope.showContactInfo(contact);
            $scope.addAlert({type: 'success', msg: 'Contact saved'})

        };

        $scope.addNewContact = function(contact) {
            // Puts new contact in the scope
            // Set random ID. in real life db should handle it
            contact.id = Math.floor(Math.random()*1000);
            $scope.contacts.push(contact);
            $scope.contactsCopy = angular.copy($scope.contacts);
            $scope.showContactInfo(contact);
            $scope.addAlert({type: 'success', msg: 'Contact added'})
        };

        $scope.deleteContact = function($event, contact) {
            // Removes contact from the scope
            $event.preventDefault();
            $event.stopPropagation();
            var contactId = $scope.contacts.indexOf(contact)
            if (contactId >= 0) {
                $scope.contacts.splice(contactId, 1);
                $scope.contactsCopy = angular.copy($scope.contacts);
                $scope.fullListContacts();
                $scope.addAlert({type: 'success', msg: 'Contact deleted'})
            } else {
                $scope.addAlert({type: 'danger', msg: 'Contact not found'})
            }
        };

        $scope.isUnchanged = function() {
            // Help function to enable/disable 'save' button
            return angular.equals($scope.contacts, $scope.contactsCopy);
        };

        $scope.isInvalidNumber = function() {
            // Checks is phone number valid
            var regexp = /^\+?([0-9]{2,15})$/
            var number = $("#contact-phone").val()
            return !regexp.test(number)
        };

        $scope.confirmDelete = function ($event, contact) {
            // Shows modal confirmation dialog
            $event.preventDefault();
            $event.stopPropagation();
            var modalInstance = $modal.open({
                templateUrl: 'confirmationDialog.html',
                controller: confirmationDialogCtrl,
                resolve: {
                    contact: function () {
                        return contact;
                    }
                }
            });

            modalInstance.result.then(function(contact) {
                $scope.deleteContact($event, contact)
            });
        };

        $scope.addAlert = function(alert) {
            // Shows alert on top of the page
            $scope.alerts.push(alert);
        };

        $scope.closeAlert = function(index) {
            // Removes alert from the page
            $scope.alerts.splice(index, 1);
        };

        $scope.searchContacts = function(query) {
            // Shows contacts according search query
            $scope.fullListContacts(query);
        };

    });
// Ctrl for confirmation dialog
var confirmationDialogCtrl = function ($scope, $modalInstance, contact) {
    $scope.activeContact = contact;

    $scope.ok = function () {
        // Handles 'ok' button
        $modalInstance.close($scope.activeContact);
    };

    $scope.cancel = function () {
        // Handles 'cancel' button
        $modalInstance.dismiss('cancel');
    };
};