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


Cypress.Commands.add('login', (email, password) => {
  cy.visit('/', {
    auth: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  });

  cy.get('[class*="header_signin"]')
    .should('be.visible')
    .click();

  cy.get('#signinEmail').type(email);
  cy.get('#signinPassword').type(password, { sensitive: true });

  cy.contains('button', 'Login').click();
});


Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
  if (options.sensitive) {
    options.log = false;

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }

  return originalFn(element, text, options);
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
