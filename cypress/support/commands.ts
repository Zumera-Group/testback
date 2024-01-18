/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//

// In your specific test file or in cypress/support/commands.js
Cypress.on('uncaught:exception', (err, runnable) => {
  // Check if the error message includes 'window.lintrk is not a function'
  if (err.message.includes('ttq')) {
    // Returning false here prevents Cypress from failing the test
    return false;
  }
  if (err.message.includes('window.lintrk')) {
    // Returning false here prevents Cypress from failing the test
    return false;
  }
  if (err.message.includes("#418") || err.message.includes("#423")) {
    // Returning false here prevents Cypress from failing the test
    return false;
  }

  // If the error is something else, we still want the test to fail
  return true;
});

// @ts-ignore
Cypress.Commands.add('acceptCookiesIfPresent', () => {
  cy.wait(3000);
  cy.get('body').then((body) => {
    if (body.find('[aria-label="Ok, continue"]').length > 0) {
      cy.get('[aria-label="Ok, continue"]').click();
    }
  });

});

export {};