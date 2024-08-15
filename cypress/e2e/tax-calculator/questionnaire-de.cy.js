describe('fills the German calculator', {
    retries: {
      runMode: 3,
      openMode: 0,
    },
  }, () => {
  const baseUrl = Cypress.config('baseUrl');
  const radioButton = '[class*="RadioButtonItem"]';
  const checkboxItem = '[class*="CheckboxItem"]';

  it('long calculator funnel and shows success message', () => {
    cy.visit(`${baseUrl}/de/tax-calculator/steuerrechner/`);
    cy.get(radioButton, { timeout: 10000 }).should('be.visible');

    cy.contains('1 / 8');
    cy.wait(1000);
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('2 / 8');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('3 / 8');
    cy.get('input[type="text"]').type('99');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('4 / 8');
    cy.get('input[type="text"]').type('2');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('5 / 8');
    cy.get('input[type="text"]').type('55');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('6 / 8');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);


    cy.contains('7 / 8');
    cy.get('input[type="text"]').type('1000000');
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.contains('8 / 8');
    cy.get(radioButton).first().click();
    cy.get('[aria-label="Go to next question button"]').click();
    cy.wait(1000);

    cy.get('input[type="text"]').first().type('Automated Testing suite');
    cy.get('input[type="email"]').first().type('automates-tests@test.com');
    cy.get('input[type="tel"]').first().type('+4917000000000');
    cy.get('[class*="Checkbox"] span').first().click();

    cy.submitForm([
      'LastName',
      'email',
      'phone',
      'Calculator_Type__c'
    ]);
    cy.get('#result-message',{ timeout: 10000 }).should('be.visible');
  })
})
