
describe('Login', () => {

    beforeEach(()=> {
        cy.visit("/", {
            auth: {
                username: "guest",
                password: "welcome2qauto",
            },
        });
        cy.openLoginForm();
    }); 

    context('Check Login form elements', () => {
        it('Should display the title', () => {
            cy.get('.modal-title').should("be.visible").and('have.text', 'Log in');
        });

        it('Should display the Email field', () => {
            cy.get('#signinEmail').should("be.visible");
        });


        it('Should display the Password field', () => {
            cy.get('#signinPassword').should("be.visible");
        });

        it('Should display the Remember me option', () => {
            cy.get('.form-check').should("be.visible");
        });

        it('Should display the Forgot password button', () => {
            cy.get('[class*="btn-link"]').eq(0).should("be.visible").and('have.text', 'Forgot password');
        });

         it('Should display the Remember me option', () => {
            cy.get('.form-check').should("be.visible");
        });

        it('Should display the Registration button', () => {
            cy.get('[class*="btn-link"]').eq(1).should("be.visible").and('have.text', 'Registration');
        });

        it('Should display the Login button', () => {
            cy.get('[class*="btn-primary"]').should("be.visible").and("be.disabled");
        });
    });

    context('Check user Login', () => {
        it('Should log in with valid credentials', () => {
            const email = `fixietest14@gmail.com`;
            const password = 'Abcdefghijk1Lmn';

            cy.login(email, password);

            cy.get('h1').should('have.text', 'Garage');
        });
    });
});
