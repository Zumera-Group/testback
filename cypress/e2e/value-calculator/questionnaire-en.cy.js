describe('fills the English calculator',
  {
    retries: {
      runMode: 3,
      openMode: 0,
    },
  }, () => {
  const baseUrl = Cypress.config('baseUrl');
  const radioButton = '[class*="RadioButtonItem"]';
  const checkboxItem = '[class*="CheckboxItem"]';


  it('long calculator funnel and see the calendly', () => {
    cy.visit(`${baseUrl}/en/questionnaires/companyvaluation/`);
    cy.get(radioButton, { timeout: 10000 }).should('be.visible');
    cy.contains('1 / 33');
    cy.wait(1000);
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('2 / 33');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('3 / 33');
    cy.get('input[type="number"]').type('2020');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('4 / 33');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // employees number
    cy.contains('5 / 33');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('6 / 33');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('7 / 33');
    cy.get(checkboxItem).eq(0).click();
    cy.get(checkboxItem).eq(1).click();
    cy.get(checkboxItem).eq(2).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('8 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('9 / 33');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // How much investment is required in the next 12 months?
    cy.contains('10 / 33');
    cy.get('input[type="text"]').type('5000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('11 / 33');
    cy.get('input[type="text"]').type('50');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('12 / 33');
    cy.get('input[type="text"]').type('90000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('13 / 33');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('14 / 33');
    cy.get('input[type="text"]').type('5000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('15 / 33');
    cy.get('input[type="text"]').type('10000000');
    // Intercepting a POST request to a specific URL
    cy.intercept('POST', 'https://zumera-api.herokuapp.com/lead_entries', {
      statusCode: 200,
      body: { success: true },
    }).as('formSubmit');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait('@formSubmit').its('response.statusCode').should('eq', 200);

    cy.wait(1000);

    cy.contains('16 / 33');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('17 / 33');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('18 / 33');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('19 / 33');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('20 / 33');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('21 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('22 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('23 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('24 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('25 / 33');
    cy.get(checkboxItem).eq(0).click();
    cy.get(checkboxItem).eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('26 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('27 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('28 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('29 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('30 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('31 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('32 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('33 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('33 / 33');
    cy.get('[aria-label="Finish questionnaire button"]').click();
    cy.wait(1000);

    cy.contains('pts');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('[class*="Checkbox"] span').first().click();
    cy.get('button[role="button"][type="submit"]').click();

    cy.get('.calendly-inline-widget', { timeout: 10000 }).should('be.visible');
  });

});
