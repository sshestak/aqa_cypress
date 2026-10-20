describe("Registration form", () => {

    beforeEach(()=> {
        cy.visit("/", {
            auth: {
                username: "guest",
                password: "welcome2qauto",
            },
        });
    }); 
    
    it('Should open and display the Registration form', () => {
        cy.openRegistrationForm();
        cy.get('.modal-title').contains('Registration');
    });

    it('Should display all fields of the Registration form', () => {
        // Name, Last name, Email, Password, Re-enter password
        cy.openRegistrationForm();
        cy.get('#signupName').should('be.visible');
        cy.get('#signupLastName').should('be.visible');
        cy.get('#signupEmail').should('be.visible');
        cy.get('#signupPassword').should('be.visible');
        cy.get('#signupRepeatPassword').should('be.visible');
    });

    context("Name validation", () => {
        it('Should show a required error when Name is empty', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').click().blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Name required');
        });

        it('Should show an invalid error when Name contains non-English characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').click().type('Світлана').blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Name is invalid');
        });

        it('Should show a length error when Name contains fewer than 2 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').click().type('a').blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Name has to be from 2 to 20 characters long');
        });

        it('Should show a length error when Name contains more than 20 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').click().type('Svitlaaaaaaaaaaaaaana').blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Name has to be from 2 to 20 characters long');
        });

        it('Should accept Name with minimum length of 2 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').type('Al').blur();
            cy.get('#signupName').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Should accept Name with maximum length of 20 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').type('ABCDEFGHIJKLMNOPQRST').blur();
            cy.get('#signupName').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Should display a red border when Name is invalid', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').click().type('Світлана').blur();
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context("Last name validation", () => {
        it('Should show a required error when Last Name is empty', () => {
            cy.openRegistrationForm();
            cy.get('#signupLastName').click().blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Last name required');
        });

        it('Should show an invalid error when Last Name contains non-English characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupLastName').click().type('Шестак').blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Last name is invalid');
        });

        it('Should show a length error when Last Name contains fewer than 2 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupLastName').click().type('a').blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Last name has to be from 2 to 20 characters long');
        });

        it('Should show a length error when Last Name contains more than 20 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupLastName').click().type('Sheeeeeeeeeeeeeeetaaak').blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Last name has to be from 2 to 20 characters long');
        });

        it('Should accept Last Name with minimum length of 2 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupLastName').type('Al').blur();
            cy.get('#signupLastName').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Should accept Last Name with maximum length of 20 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupLastName').type('ABCDEFGHIJKLMNOPQRST').blur();
            cy.get('#signupLastName').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Should display a red border when Last Name is invalid', () => {
            cy.openRegistrationForm();
            cy.get('#signupLastName').click().type('Шестак').blur();
            cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context("Email validation", () => {
        it('Should show a required error when Email is empty', () => {
            cy.openRegistrationForm();
            cy.get('#signupEmail').click().blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Email required');

        });

        it('Should show an invalid error when Email has an incorrect format', () => {
            cy.openRegistrationForm();
            cy.get('#signupEmail').click().type('test2@test').blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Email is incorrect');
        });

        it('Should display a red border when Email is invalid', () => {
            cy.openRegistrationForm();
            cy.get('#signupEmail').click().type('test2@test').blur();
            cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context("Password validation", () => {
        it('Should show a required error when Password is empty', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').click().blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Password required');
        });

        it('Should show a validation error when Password contains fewer than 8 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').click().type('testpas').blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('Should show a validation error when Password contains more than 15 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').click().type('testpasswooooord').blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('Should display a red border when Password is invalid', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').click().type('testpasswooooord').blur();
            cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Should show a validation error when Password has no digits', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').type('Abcdefghijklmno', { sensitive: true }).blur();
            cy.get('.invalid-feedback').should('be.visible')
            .and(
                'contain.text',
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
            );
        });

        it('Should show a validation error when Password has no uppercase letters', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').type('abcdefghijklm1', { sensitive: true }).blur();
            cy.get('.invalid-feedback').should('be.visible')
            .and(
                'contain.text',
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
            );
        });

        it('Should show a validation error when Password has no lowercase letters', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').type('ABCDEFGHIJKLM1', { sensitive: true }).blur();
            cy.get('.invalid-feedback').should('be.visible')
            .and(
                'contain.text',
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
            );
        });

        it('Should accept Password with minimum length of 8 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').type('Abcdef1g', { sensitive: true }).blur();
            cy.get('#signupPassword').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Should accept Password with maximum length of 15 characters', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').type('Abcdefghijk1Lmn', { sensitive: true }).blur();
            cy.get('#signupPassword').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context("Re-enter password validation", () => {
         it('Should show a required error when Re-enter password is empty', () => {
            cy.openRegistrationForm();
            cy.get('#signupRepeatPassword').click().blur();
            cy.get('.invalid-feedback').should('be.visible');
            cy.get('.invalid-feedback').contains('Re-enter password required');
        });

        it('Should display a red border when Re-enter password is invalid', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').click().type('testpasswooooord').blur();
            cy.get('#signupRepeatPassword').click().type('testpassword').blur();
            cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Should show an error when passwords do not match', () => {
            cy.openRegistrationForm();
            cy.get('#signupPassword').type('Abcdefghijk1Lmn', { sensitive: true });
            cy.get('#signupRepeatPassword').type('Abcdefghijk1Lmo', { sensitive: true }).blur();
            cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
            cy.get('.invalid-feedback').should('be.visible').and('contain.text', 'Passwords do not match');
        });
    });

    context("Register button", () => {
        it('Should be disabled when all fields are empty', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').should('be.empty');
            cy.get('#signupLastName').should('be.empty');
            cy.get('#signupEmail').should('be.empty');
            cy.get('#signupPassword').should('be.empty');
            cy.get('#signupRepeatPassword').should('be.empty');
            cy.get('[class*="btn btn-primary"]').eq(1).should('have.text', 'Register').and('be.disabled');
        });

        it('Should be disabled when at least one field contains invalid data', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').type('Svitlana');
            cy.get('#signupLastName').type('Shestak');
            cy.get('#signupEmail').type('invalid-email');
            cy.get('#signupPassword').type('Abcdefghijk1Lmn', { sensitive: true });
            cy.get('#signupRepeatPassword').type('Abcdefghijk1Lmn', { sensitive: true });
            cy.get('[class*="btn btn-primary"]').eq(1).should('be.disabled');
        });

        it('Should be enabled when all fields contain valid data', () => {
            cy.openRegistrationForm();
            cy.get('#signupName').click().type('Svitlana');
            cy.get('#signupLastName').click().type('Shestak');
            cy.get('#signupEmail').click().type('fixietest14@gmail.com');
            cy.get('#signupPassword').click().type('Abcdefghijk1Lmn');
            cy.get('#signupRepeatPassword').click().type('Abcdefghijk1Lmn');
            cy.get('[class*="btn btn-primary"]').eq(1).should('have.text', 'Register').and('be.enabled');
        });

        it('Should register a new user when Register is clicked with valid data', () => {
            const email = `fixietest14.${Date.now()}@gmail.com`;
            const password = 'Abcdefghijk1Lmn';

            cy.openRegistrationForm();
            cy.get('#signupName').click().type('Svitlana');
            cy.get('#signupLastName').click().type('Shestak');
            cy.get('#signupEmail').click().type(email);
            cy.get('#signupPassword').click().type(password, { sensitive: true });
            cy.get('#signupRepeatPassword').click().type(password, { sensitive: true });
            cy.get('[class*="btn btn-primary"]').eq(1).click();
            cy.get('h1').should('have.text', 'Garage');
        })
    });
});
