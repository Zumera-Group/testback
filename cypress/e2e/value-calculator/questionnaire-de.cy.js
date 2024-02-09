describe('fills the German calculator', {
    retries: {
      runMode: 3,
      openMode: 0,
    },
  }, () => {
  const baseUrl = Cypress.config('baseUrl');
  const radioButton = '[class*="RadioButtonItem"]';
  const checkboxItem = '[class*="CheckboxItem"]';

  it('long calculator funnel and see the calendly', () => {
    cy.visit(`${baseUrl}/de/fragenkatalog/unternehmensbewertung/`);
    cy.get(radioButton, { timeout: 10000 }).should('be.visible');

    cy.contains('1 / 31');
    cy.wait(1000);
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('2 / 31');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('3 / 31');
    cy.get('input[type="number"]').type('2020');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // employees number
    cy.contains('4 / 31');
    cy.get('input[type="text"]').type('900');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('5 / 31');
    cy.get(checkboxItem).eq(0).click();
    cy.get(checkboxItem).eq(1).click();
    cy.get(checkboxItem).eq(2).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('6 / 31');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('7 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('8 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // How much investment is required in the next 12 months?
    cy.contains('9 / 31');
    cy.get('input[type="text"]').type('900000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('10 / 31');
    cy.get('input[type="text"]').type('90000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('11 / 31');
    cy.get('input[type="text"]').type('9000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('12 / 31');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('13 / 31');
    cy.get('input[type="text"]').type('40');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('14 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('15 / 31');
    cy.get('input[type="text"]').type('900000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('16 / 31');
    cy.get('input[type="text"]').type('90000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('17 / 31');
    cy.get('input[type="text"]').type('9000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('18 / 31');
    cy.get('input[type="text"]').type('900000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('19 / 31');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('20 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('21 / 31');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('22 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('23 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('24 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('25 / 31');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('26 / 31');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('27 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('28 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('29 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('30 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('31 / 31');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('31 / 31');
    cy.get('[aria-label="Finish questionnaire button"]').click();
    cy.wait(1000);

    cy.contains('pkt');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('[class*="Checkbox"] span').first().click();
    cy.get('button[role="button"][type="submit"]').click();

    cy.get('.calendly-inline-widget', { timeout: 10000 }).should('be.visible');
  })



  it('short calculator funnel and see the calendly', () => {
    cy.visit(`${baseUrl}/de/fragenkatalog/unternehmensbewertungnoma`);
    cy.get(radioButton, { timeout: 10000 }).should('be.visible');

    // if the cookie banner is visible, click the button to accept all cookies
    if (!baseUrl.includes('localhost')) {
      cy.acceptCookiesIfPresent();
    }

    cy.contains('1 / 25');
    cy.wait(1000);
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('2 / 25');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('3 / 25');
    cy.get('input[type="number"]').type('2020');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // employees number
    cy.contains('4 / 25');
    cy.get('input[type="text"]').type('900');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('5 / 25');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('6 / 25');
    cy.get(checkboxItem).eq(0).click();
    cy.get(checkboxItem).eq(1).click();
    cy.get(checkboxItem).eq(2).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('7 / 25');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('8 / 25');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // How much investment is required in the next 12 months?
    cy.contains('9 / 25');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('10 / 25');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('11 / 25');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('12 / 25');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('13 / 25');
    cy.get('input[type="text"]').type('9000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('14 / 25');
    cy.get('input[type="text"]').type('9000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('15 / 25');
    cy.get('input[type="text"]').type('900000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('16 / 25');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('17 / 25');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('18 / 25');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('19 / 25');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('20 / 25');
    cy.get('input[type="text"]').type('9000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('21 / 25');
    cy.get('input[type="text"]').type('900000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('22 / 25');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('23 / 25');
    cy.get('input[type="text"]').type('9000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('24 / 25');
    cy.get('input[type="text"]').type('900');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('25 / 25');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('25 / 25');
    cy.get('[aria-label="Finish questionnaire button"]').click();
    cy.wait(1000);

    cy.contains('pkt');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('[class*="Checkbox"] span').first().click();
    cy.get('button[role="button"][type="submit"]').click();

    cy.get('.calendly-inline-widget', { timeout: 10000 }).should('be.visible');
  })
})
