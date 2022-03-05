/// <reference types="cypress-mailslurp" />

describe("Testing email operations using mailslurp plugin", function () {
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

    it("01 - verify demo application is loading", function () {
        expect(this.emailAddress).to.contain("@mailslurp");
        // visit the demo application
        cy.visit("https://playground.mailslurp.com")
        cy.title().should('contain', 'React App');
    });

    it("02 - verify if user can sign up using email address", function () {
        cy.clickElement('[data-test=sign-in-create-account-link]');
        cy.enterText("[name=email]",this.emailAddress);
        cy.enterText("[name=password]",`${Cypress.env('USER_PASSWORD')}`);
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
        cy.enterText("[data-test=username-input]",this.emailAddress);
        cy.enterText("[data-test=sign-in-password-input]",`${Cypress.env('USER_PASSWORD')}`);
        cy.clickElement("[data-test=sign-in-sign-in-button]");
    });

    it("06 - can see welcome screen", function () {
        cy.get("h1").should("contain", "Welcome");
    });
    
});