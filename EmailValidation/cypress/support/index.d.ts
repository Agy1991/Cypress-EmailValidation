/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable {
      clickElement(element: string): Chainable<Element>;
      enterText(element: string,text: string): Chainable<Element>;
      readCode(inboxID: any): Chainable<Element>;
      validateSubject(inboxId: any,subject: string): Chainable<Element>;
    }
  }