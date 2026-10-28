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


Cypress.Commands.add('login', (email, password, basicUsername, basicPassword) => {
  cy.visit('/', {
    auth: {
      username: basicUsername || '',
      password: basicPassword || '',
    },
  });

  cy.get('[class*="header_signin"]')
    .should('be.visible')
    .click();

  cy.get('#signinEmail').should('be.visible').type(email);
  cy.get('#signinPassword').should('be.visible').type(password, { sensitive: true });

  cy.contains('button', 'Login').should('be.visible').click();
});

Cypress.Commands.add('createExpense', (carId, expenseData) => {
    return cy.env(['basicAuthUsername', 'basicAuthPassword']).then(
        ({ basicAuthUsername, basicAuthPassword }) => cy.request({
            method: 'POST',
            url: '/api/expenses',
            auth: {
                username: basicAuthUsername,
                password: basicAuthPassword,
            },
            body: {
                    carId,
                    ...expenseData,
                },
        })
    );
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
  const safeText = text ?? '';

  if (options.sensitive) {
    options.log = false;

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(String(safeText).length),
    });
  }

  return originalFn(element, safeText, options);
});

Cypress.Commands.add('openRegistrationForm', () => {
  cy.get('[class*="header_signin"]')
    .should('be.visible')
    .click();

  cy.contains('[class*="btn btn-link"]', 'Registration')
    .click();

  cy.get('.modal-content').should('be.visible');
});

Cypress.Commands.add('openLoginForm', () => {
  cy.get('[class*="header_signin"]')
    .should('be.visible')
    .click();
});
