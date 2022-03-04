// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('clickElement', element => {
    cy.get(element).click();
})

Cypress.Commands.add('enterText', (element,text) => {
    cy.get(element).type(text).trigger('change');
})

Cypress.Commands.add('readCode', inboxId => {
    cy.mailslurp()
            // use inbox id and a timeout of 30 seconds
            .then(mailslurp => mailslurp.waitForLatestEmail(inboxId, 30000, true))
            // extract the confirmation code from the email body
            .then(email => /.*verification code is (\d{6}).*/.exec(email.body!!)!![1])
            // fill out the confirmation form and submit
            .then(code => {
                cy.log(code)
                cy.enterText("[name=code]",code);
                cy.clickElement("[data-test=confirm-sign-up-confirm-button]");
            })
})

Cypress.Commands.add('validateSubject', (inboxId,sub) => {
    cy.mailslurp()
            // use inbox id and a timeout of 30 seconds
            .then(mailslurp => mailslurp.waitForLatestEmail(inboxId, 30000, true))
            // extract the confirmation code from the email body
            .then(email => {
                expect(email.subject).to.have.text(sub);
            })
})
