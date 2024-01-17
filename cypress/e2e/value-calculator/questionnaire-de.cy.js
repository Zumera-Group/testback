/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('fills the German calculator', () => {
  beforeEach(() => {
  });

  it('should go through all the steps of the calculator and see the calendly in the end', () => {
    cy.visit('http://localhost:3000/de/fragenkatalog/unternehmensbewertung/');
    cy.get('[aria-label="Radio Button"]', { timeout: 10000 }).should('be.visible');
    cy.contains('Question 1 / 35');
    cy.wait(1000);
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 2 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 3 / 35');
    cy.get('input[type="number"]').type('2020');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 4 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // employees number
    cy.contains('Question 5 / 35');
    cy.get('input[type="text"]').type('900');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 6 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 7 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 8 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('Question 9 / 35');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Checkbox"]').eq(1).click();
    cy.get('[aria-label="Checkbox"]').eq(2).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 10 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 11 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // How much investment is required in the next 12 months?
    cy.contains('Question 12 / 35');
    cy.get('input[type="text"]').type('5000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 13 / 35');
    cy.get('input[type="text"]').type('50');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 14 / 35');
    cy.get('input[type="text"]').type('90000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 15 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 16 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 17 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 18 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 19 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 20 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 21 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 22 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 23 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 24 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 25 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 26 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 27 / 35');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Checkbox"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 28 / 35');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Checkbox"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 29 / 35');
    cy.get('[aria-label="Radio Button"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 30 / 35');
    cy.get('[aria-label="Radio Button"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 31 / 35');
    cy.get('[aria-label="Radio Button"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 32 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 33 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 34 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 35 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 35 / 35');
    cy.get('[aria-label="Finish questionnaire button"]').click();
    cy.wait(1000);

    cy.contains('45');
    cy.contains('pkt');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('#checkbox_parent span').first().click();
    cy.get('input[type="checkbox"][id="result_checkBox"]').should('have.attr', 'aria-checked', 'true');
    cy.get('button[role="button"][type="submit"]').click();

    cy.get('.calendly-inline-widget', { timeout: 10000 }).should('be.visible');
  })

  it.only('should go through all the steps of the calculator and NOT see the calendly in the end', () => {
    cy.visit('http://localhost:3000/de/fragenkatalog/unternehmensbewertung/');
    cy.get('[aria-label="Radio Button"]', { timeout: 10000 }).should('be.visible');
    cy.contains('Question 1 / 35');
    cy.wait(1000);
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 2 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 3 / 35');
    cy.get('input[type="number"]').type('2020');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 4 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // employees number
    cy.contains('Question 5 / 35');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 6 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 7 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 8 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('Question 9 / 35');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 10 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 11 / 35');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // How much investment is required in the next 12 months?
    cy.contains('Question 12 / 35');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 13 / 35');
    cy.get('input[type="text"]').type('50');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 14 / 35');
    cy.get('input[type="text"]').type('900000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 15 / 35');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 16 / 35');
    cy.get('input[type="text"]').type('9000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 17 / 35');
    cy.get('input[type="text"]').type('900000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 18 / 35');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 19 / 35');
    cy.get('input[type="text"]').type('9000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 20 / 35');
    cy.get('input[type="text"]').type('900000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 21 / 35');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 22 / 35');
    cy.get('input[type="text"]').type('9000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 23 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 24 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 25 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 26 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 27 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 28 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 29 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 30 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 31 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 32 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 33 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 34 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 35 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 35 / 35');
    cy.get('[aria-label="Finish questionnaire button"]').click();
    cy.wait(1000);

    cy.contains('45');
    cy.contains('pkt');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('#checkbox_parent span').first().click();
    cy.get('input[type="checkbox"][id="result_checkBox"]').should('have.attr', 'aria-checked', 'true');
    cy.get('button[role="button"][type="submit"]').click();

    cy.get('.calendly-inline-widget', { timeout: 5000 }).should('not.exist');
    cy.contains('Vielen Dank für das Ausfüllen Ihrer Informationen');  });

});
