/// <reference types="cypress-mailslurp" />

describe("user sign up test with mailslurp plugin", function () {
    // we will add tests here
    // use cypress-mailslurp plugin to create an email address before test
    before(function () {
        return cy.mailslurp()
            .then(mailslurp => mailslurp.createInbox())
            .then(inbox => {
            // save inbox id and email address to this (make sure you use function and not arrow syntax)
                cy.wrap(inbox.id).as('inboxId')
                cy.wrap(inbox.emailAddress).as('emailAddress')
            })
    });

    it("01 - can load the demo application", function () {
        // get wrapped email address and assert contains a mailslurp email address
        expect(this.emailAddress).to.contain("@mailslurp");
        // visit the demo application
        cy.visit("https://playground.mailslurp.com")
        cy.title().should('contain', 'React App');
    });

    it("02 - can sign up using email address", function () {
        // click sign up and fill out the form
        cy.clickElement('[data-test=sign-in-create-account-link]');
        // use the email address and a test password
        cy.enterText("[name=email]",this.emailAddress);
        cy.enterText("[name=password]",`${Cypress.env('USER_PASSWORD')}`);
        // click the submit button
        cy.clickElement("[data-test=sign-up-create-account-button]");
    });

    it("03 - can receive confirmation code by email", function () {
        // app will send user an email containing a code, use mailslurp to wait for the latest email
        cy.readCode(this.inboxId);
    });

    it("04 - validate subject", function () {
        const subject = 'Please confirm your email address'
        cy.validateSubject(this.inboxId,subject);
    });
    
    it("05 - can sign in with confirmed account", function () {
        // use the email address and a test password
        cy.enterText("[data-test=username-input]",this.emailAddress);
        cy.enterText("[data-test=sign-in-password-input]",`${Cypress.env('USER_PASSWORD')}`);
        // click the submit button
        cy.clickElement("[data-test=sign-in-sign-in-button]");
    });

    it("06 - can see welcome screen", function () {
        // click sign up and fill out the form
        cy.get("h1").should("contain", "Welcome");
    });

    
});