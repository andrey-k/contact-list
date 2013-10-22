'use strict';

describe('contact list', function() {

    beforeEach(function() {
        browser().navigateTo('../../app/index.html');
    });

    it('should render main page when user navigates to app/index.html', function() {
        expect(element('.full-list .page-header h1').text()).
            toMatch(/Contact list simple app to store contacts/);
    });  

    it('should filter the contact list as user types into the search box', function() {
        expect(repeater('.contact-list .row').count()).toBe(11);
 
        input('query').enter('Vasja');
        expect(repeater('.contact-list .row').count()).toBe(2);
 
        input('query').enter('05');
        expect(repeater('.contact-list .row').count()).toBe(5);
    });

    it('should render contact details in a form by clicking contact row', function() {
        input('query').enter('Vasja');
        element('.contact-list .row').click();
        expect(element('.contact-info .form-group p:first').text()).
            toMatch(/Vasja/);
    });

    it('should render contact details in a form by clicking edit icon', function() {
        input('query').enter('Vasja');
        element('.contact-list .row .glyphicon-edit').click();
        expect(element('#contact-first-name').val()).
            toMatch(/Vasja/);
    });

    it('should render contact details in a form by clicking edit button', function() {
        input('query').enter('Vasja');
        element('.contact-list .row').click();
        element('.edit-btn').click();
        expect(element('#contact-first-name').val()).
            toMatch(/Vasja/);
    });

    it('should render contact details in a form by clicking delete icon', function() {
        input('query').enter('Vasja');
        element('.contact-list .row .glyphicon-remove').click();
        expect(element('.modal-body p.ng-binding').text()).
            toMatch(/Vasja/);
    });

    it('should render contact details in a form by clicking delete button', function() {
        input('query').enter('Vasja');
        element('.contact-list .row').click();
        element('.contact-info .delete-btn').click();
        expect(element('.modal-body p.ng-binding').text()).
            toMatch(/Vasja/);
    });

    it('should update contact details in a form by clicking edit button', function() {
        input('query').enter('Vasja');
        element('.contact-list .row').click();
        element('.edit-btn').click();
        
        input('contact.first_name').enter("Petja");
        element('#save').click();
        
        input('query').enter('Petja');
        expect(repeater('.contact-list .row').count()).toBe(2);
        element('.contact-list .row').click();
        expect(element('.contact-info .form-group p:first').text()).
            toMatch(/Petja/);
    });

    it('should delete contact by clicking delete button', function() {
        input('query').enter('Vasja');
        element('.contact-list .row').click();
        element('.contact-info .delete-btn').click();
        expect(element('.modal-body p.ng-binding').text()).toMatch(/Vasja/);
        element('.modal-footer .btn-primary').click();
        
        input('query').enter('Vasja');
        expect(repeater('.contact-list .row').count()).toBe(1); 
    });

    it('should not add new contact if not all fields are filled in', function() {
        element('a#add-new').click();
        input('contact.first_name').enter("Petja");
        element('#add').click();
        
        input('query').enter('Petja');
        expect(repeater('.contact-list .row').count()).toBe(1);
    });

    it('should add new contact', function() {
        element('a#add-new').click();
        input('contact.first_name').enter("Petja");
        input('contact.last_name').enter("Petrov");
        input('contact.phone').enter("+123456789");
        input('contact.email').enter("Petrov@gmail.com");
        element('#add').click();
      
        input('query').enter('Petja');
        expect(repeater('.contact-list .row').count()).toBe(2);
        element('.contact-list .row').click();
        expect(element('.contact-info .form-group p:first').text()).
            toMatch(/Petja/);   
    });

    it('should show error if email in edit form has incorrect format', function() {
        input('query').enter('Vasja');
        element('.contact-list .row').click();
        element('.edit-btn').click();
        
        input('contact.email').enter("Petja");
        expect(element('.contact-info ul.help-block li:visible').count()).toBe(1);
    });

    it('should show alert after deleting contact', function() {
        expect(repeater('.contact-list .row').count()).toBe(11);
        input('query').enter('Vasja');
        element('.contact-list .row').click();
        element('.contact-info .delete-btn').click();
        expect(element('.modal-body p.ng-binding').text()).toMatch(/Vasja/);
        element('.modal-footer .btn-primary').click();
        expect(repeater('.contact-list .row').count()).toBe(10);
        expect(element('.alert-success').text()).toMatch(/Contact deleted/);
    });
});
