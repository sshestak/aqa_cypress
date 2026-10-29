export class ExpensePage {
  visit() {
    return cy.env(['basicAuthUsername', 'basicAuthPassword']).then(
      ({ basicAuthUsername, basicAuthPassword }) => {
        cy.visit('/panel/expenses', {
          auth: {
            username: basicAuthUsername,
            password: basicAuthPassword,
          },
        });
      }
    );
  }
}