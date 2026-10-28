export class homePage {
  static visit() {
   cy.env(['basicAuthUsername', 'basicAuthPassword']).then(({ basicAuthUsername, basicAuthPassword }) => {
    
    return cy.visit('/', {
      auth: {
        username: basicAuthUsername,
        password: basicAuthPassword,
      },
    });
  });
}
}