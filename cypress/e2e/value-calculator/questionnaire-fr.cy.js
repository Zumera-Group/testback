describe('fills the French calculator', {
    retries: {
      runMode: 3,
      openMode: 0,
    },
  }, () => {
  const baseUrl = Cypress.config('baseUrl');
  const radioButton = '[class*="RadioButtonItem"]';
  const checkboxItem = '[class*="CheckboxItem"]';


  it('long calculator funnel and see the calendly', () => {
    cy.visit(`${baseUrl}/fr/des-questionnaires/%C3%A9valuationdesentreprises`);
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
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('4 / 33');
    cy.get(checkboxItem).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('5 / 33');
    cy.get('input[type="number"]').type('2015');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('6 / 33');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('7 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('8 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('9 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('10 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('11 / 33');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('12 / 33');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('13 / 33');
    cy.get('input[type="text"]').type('9999999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('14 / 33');
    cy.get('input[type="text"]').type('999999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('15 / 33');
    cy.get('input[type="text"]').type('9999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('16 / 33');
    cy.get('input[type="text"]').type('99999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('17 / 33');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('18 / 33');
    cy.get('input[type="text"]').type('50');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('19 / 33');
    cy.get('input[type="text"]').type('99999999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('20 / 33');
    cy.get('input[type="text"]').type('9999999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('21 / 33');
    cy.get('input[type="text"]').type('99999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('22 / 33');
    cy.get('input[type="text"]').type('99999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('23 / 33');
    cy.get('input[type="text"]').clear().type('30');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('24 / 33');
    cy.get('input[type="text"]').type('10000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('25 / 33');
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

    cy.contains('points');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('[class*="Checkbox"] span').first().click();

    cy.submitForm();

    cy.get('.calendly-inline-widget', { timeout: 10000 }).should('be.visible');
  })

  it('short calculator funnel and see the calendly', () => {
    cy.visit(`${baseUrl}/fr/des-questionnaires/%C3%A9valuationdesentreprisesnoma`);
    cy.get(radioButton, { timeout: 10000 }).should('be.visible');

    cy.contains('1 / 26');
    cy.wait(1000);
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('2 / 26');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('3 / 26');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('4 / 26');
    cy.get(checkboxItem).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('5 / 26');
    cy.get('input[type="number"]').type('2015');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('6 / 26');
    cy.get('input[type="text"]').type('99999999999');

    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('7 / 26');
    cy.get('input[type="text"]').type('999999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('8 / 26');
    cy.get('input[type="text"]').type('99999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('9 / 26');
    cy.get('input[type="text"]').type('9999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('10 / 26');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('11 / 26');
    cy.get('input[type="text"]').clear().type('30');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('12 / 26');
    cy.get('input[type="text"]').type('99999999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('13 / 26');
    cy.get('input[type="text"]').type('999999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('14 / 26');
    cy.get('input[type="text"]').type('99999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('15 / 26');
    cy.get('input[type="text"]').type('9999999');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('16 / 26');
    cy.get('input[type="text"]').type('50');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('17 / 26');
    cy.get('input[type="text"]').type('10000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('18 / 26');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('19 / 26');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('20 / 26');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('21 / 26');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('22 / 26');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('23 / 26');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('24 / 26');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('25 / 26');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('26 / 26');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('points');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('[class*="Checkbox"] span').first().click();

    cy.submitForm();

    cy.get('.calendly-inline-widget', { timeout: 10000 }).should('be.visible');
  })
})
