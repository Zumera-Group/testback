
describe('fills the English calculator', () => {
  const baseUrl = Cypress.config('baseUrl');
  beforeEach(() => {
  });

  it('should go through all the steps of the calculator and see the calendly in the end', () => {
    cy.visit(`${baseUrl}/en/questionnaires/companyvaluation/`);
    cy.get('[aria-label="Radio Button"]', { timeout: 10000 }).should('be.visible');
    cy.contains('Question 1 / 31');
    cy.wait(1000);
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 2 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 3 / 31');
    cy.get('input[type="number"]').type('2020');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 4 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // employees number
    cy.contains('Question 5 / 31');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 6 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 7 / 31');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Checkbox"]').eq(1).click();
    cy.get('[aria-label="Checkbox"]').eq(2).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 8 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 9 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // How much investment is required in the next 12 months?
    cy.contains('Question 10 / 31');
    cy.get('input[type="text"]').type('5000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 11 / 31');
    cy.get('input[type="text"]').type('50');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 12 / 31');
    cy.get('input[type="text"]').type('90000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 13 / 31');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 14 / 31');
    cy.get('input[type="text"]').type('5000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 15 / 31');
    cy.get('input[type="text"]').type('10000000');
    // Intercepting a POST request to a specific URL
    cy.intercept('POST', 'https://zumera-api.herokuapp.com/lead_entries', {
      statusCode: 200,
      body: { success: true },
    }).as('formSubmit');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait('@formSubmit').its('response.statusCode').should('eq', 200);

    cy.wait(1000);

    cy.contains('Question 16 / 31');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 17 / 31');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 18 / 31');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 19 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 20 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 21 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 22 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 23 / 31');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Checkbox"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 24 / 31');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Checkbox"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 25 / 31');
    cy.get('[aria-label="Radio Button"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 26 / 31');
    cy.get('[aria-label="Radio Button"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 27 / 31');
    cy.get('[aria-label="Radio Button"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 28 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 29 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 30 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 31 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 31 / 31');
    cy.get('[aria-label="Finish questionnaire button"]').click();
    cy.wait(1000);

    cy.contains('42');
    cy.contains('pts');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('#checkbox_parent span').first().click();
    cy.get('input[type="checkbox"][id="result_checkBox"]').should('have.attr', 'aria-checked', 'true');
    cy.get('button[role="button"][type="submit"]').click();

    cy.get('.calendly-inline-widget', { timeout: 10000 }).should('be.visible');
  });

  it('should go through all the steps of the calculator and NOT see the calendly in the end', () => {
    cy.visit(`${baseUrl}/en/questionnaires/companyvaluation/`);
    cy.get('[aria-label="Radio Button"]', { timeout: 10000 }).should('be.visible');
    cy.contains('Question 1 / 31');
    cy.wait(1000);
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 2 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 3 / 31');
    cy.get('input[type="number"]').type('2023');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 4 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // employees number
    cy.contains('Question 5 / 31');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 6 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 7 / 31');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Checkbox"]').eq(1).click();
    cy.get('[aria-label="Checkbox"]').eq(2).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 8 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 9 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // How much investment is required in the next 12 months?
    cy.contains('Question 10 / 31');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 11 / 31');
    cy.get('input[type="text"]').type('50');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 12 / 31');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 13 / 31');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 14 / 31');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 15 / 31');
    cy.get('input[type="text"]').type('1');
    // Intercepting a POST request to a specific URL
    cy.intercept('POST', 'https://zumera-api.herokuapp.com/lead_entries', {
      statusCode: 200,
      body: { success: true },
    }).as('formSubmit');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait('@formSubmit').its('response.statusCode').should('eq', 200);

    cy.wait(1000);

    cy.contains('Question 16 / 31');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 17 / 31');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 18 / 31');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 19 / 31');
    cy.get('#radioButton').first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 20 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 21 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 22 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 23 / 31');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 24 / 31');
    cy.get('[aria-label="Checkbox"]').eq(0).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 25 / 31');
    cy.get('[aria-label="Radio Button"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 26 / 31');
    cy.get('[aria-label="Radio Button"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 27 / 31');
    cy.get('[aria-label="Radio Button"]').eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 28 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 29 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 30 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 31 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('Question 31 / 31');
    cy.get('[aria-label="Finish questionnaire button"]').click();
    cy.wait(1000);

    cy.contains('42');
    cy.contains('pts');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('#checkbox_parent span').first().click();
    cy.get('input[type="checkbox"][id="result_checkBox"]').should('have.attr', 'aria-checked', 'true');
    cy.get('button[role="button"][type="submit"]').click();

    cy.get('.calendly-inline-widget', { timeout: 5000 }).should('not.exist');
    cy.contains('Thank you for filling out your information.');
  });

});
