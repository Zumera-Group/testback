describe('fills the German calculator', {
    retries: {
      runMode: 3,
      openMode: 0,
    },
  }, () => {
  const baseUrl = Cypress.config('baseUrl');
  const radioButton = '[class*="RadioButtonItem"]';
  const checkboxItem = '[class*="CheckboxItem"]';

  beforeEach(() => {
    cy.visit(`${baseUrl}/de/fragenkatalog/unternehmensbewertung/`);
    cy.get(radioButton, { timeout: 10000 }).should('be.visible');

    // if the cookie banner is visible, click the button to accept all cookies
    if (!baseUrl.includes('localhost')) {
      cy.acceptCookiesIfPresent();
    }
  });

  it('should go through all the steps of the calculator and see the calendly in the end', () => {
    cy.contains('1 / 35');
    cy.wait(1000);
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('2 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('3 / 35');
    cy.get('input[type="number"]').type('2020');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('4 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // employees number
    cy.contains('5 / 35');
    cy.get('input[type="text"]').type('900');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('6 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('7 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('8 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('9 / 35');
    cy.get(checkboxItem).eq(0).click();
    cy.get(checkboxItem).eq(1).click();
    cy.get(checkboxItem).eq(2).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('10 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('11 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // How much investment is required in the next 12 months?
    cy.contains('12 / 35');
    cy.get('input[type="text"]').type('5000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('13 / 35');
    cy.get('input[type="text"]').type('50');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('14 / 35');
    cy.get('input[type="text"]').type('90000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('15 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('16 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('17 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('18 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('19 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('20 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('21 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('22 / 35');
    cy.get('input[type="text"]').type('10000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('23 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('24 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('25 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('26 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('27 / 35');
    cy.get(checkboxItem).eq(0).click();
    cy.get(checkboxItem).eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('28 / 35');
    cy.get(checkboxItem).eq(0).click();
    cy.get(checkboxItem).eq(1).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('29 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('30 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('31 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('32 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('33 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('34 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('35 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('35 / 35');
    cy.get('[aria-label="Finish questionnaire button"]').click();
    cy.wait(1000);

    cy.contains('45');
    cy.contains('pkt');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('[class*="Checkbox"] span').first().click();
    cy.get('button[role="button"][type="submit"]').click();

    cy.get('.calendly-inline-widget', { timeout: 10000 }).should('be.visible');
  })

  it('should go through all the steps of the calculator and NOT see the calendly in the end', () => {
    cy.contains('1 / 35');
    cy.wait(1000);
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('2 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('3 / 35');
    cy.get('input[type="number"]').type('2020');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('4 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // employees number
    cy.contains('5 / 35');
    cy.get('input[type="text"]').type('900');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('6 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('7 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('8 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('9 / 35');
    cy.get(checkboxItem).eq(0).click();
    cy.get(checkboxItem).eq(1).click();
    cy.get(checkboxItem).eq(2).click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('10 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('11 / 35');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    // How much investment is required in the next 12 months?
    cy.contains('12 / 35');
    cy.get('input[type="text"]').type('1');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('13 / 35');
    cy.get('input[type="text"]').type('50');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('14 / 35');
    cy.get('input[type="text"]').type('900000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('15 / 35');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('16 / 35');
    cy.get('input[type="text"]').type('9000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('17 / 35');
    cy.get('input[type="text"]').type('900000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('18 / 35');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('19 / 35');
    cy.get('input[type="text"]').type('9000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('20 / 35');
    cy.get('input[type="text"]').type('900000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('21 / 35');
    cy.get('input[type="text"]').type('90000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('22 / 35');
    cy.get('input[type="text"]').type('9000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('23 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('24 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('25 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('26 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('27 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('28 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('29 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('30 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('31 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('32 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('33 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('34 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('35 / 35');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('35 / 35');
    cy.get('[aria-label="Finish questionnaire button"]').click();
    cy.wait(1000);

    cy.contains('45');
    cy.contains('pkt');
    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('[class*="Checkbox"] span').first().click();
    cy.get('button[role="button"][type="submit"]').click();

    cy.get('.calendly-inline-widget', { timeout: 5000 }).should('not.exist');
    cy.get('[class*="Result_successMessage"]').should('be.visible');
  })
})
