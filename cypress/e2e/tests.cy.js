
describe("Header & Footer", () => {

    beforeEach(()=> {
        cy.visit("/", {
            auth: {
                username: "guest",
                password: "welcome2qauto",
            },
        });
    }); 
    context ('Header tests',() => {
        it("Should display the header", () => {
            cy.get("header").should("be.visible");
        });

        it("Should display the logo", () => {
            cy.get("header").find(".header_logo").should("be.visible");
        });

        it("Should display the navigation menu", () => {
            cy.get("header").find("nav").should("be.visible");
        });

        it("Should display the Home option", () => {
            cy.get("header").find("nav").contains("a", "Home").should("be.visible");
        });

        it("Should display the About option", () => {
            cy.get("header").find("nav").contains("button", "About").should("be.visible");
        });

        it("Should display the Contacts option", () => {
            cy.get("header").find("nav").contains("button", "Contacts").should("be.visible");
        });

        it("Should verify the Home option is active", () => {
            cy.get("header").find("nav").contains("a", "Home").should("have.class", "-active");
        });

        it("Should navigate to the home page when clicking Home", () => {
            cy.get("header").find("nav").contains("a", "Home").click();
            cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
        });

        it("Should navigate to the About section when clicking About", () => {
            cy.get("header").find("nav").contains("button", "About").click();
            cy.get("#aboutSection").should("be.visible");
        });

        it("Should navigate to the Contacts section when clicking Contacts", () => {
            cy.get("header").find("nav").contains("button", "Contacts").click();
            cy.get("#contactsSection").should("be.visible");
        });

        it("Should verify the Guest log in button", () => {
            cy.get(".header-link").should("be.visible");
        })

        it("Should verify the Sign in button", () => {
            cy.get('[class*="header_signin"]').should("be.visible");
        })
    });

    context("Tests for Footer", () => {

        beforeEach(()=> {
            cy.visit("/", {
                auth: {
                    username: "guest",
                    password: "welcome2qauto",
                },
            });
        }); 

    const getSocials = () => cy.get('.contacts_socials');

        it("Should display the Facebook icon and link", () => {
            getSocials().find('.icon-facebook').should('be.visible');
            getSocials().find('a[href="https://www.facebook.com/Hillel.IT.School"]').should('be.visible');
        });

        it("Should display the Telegram icon and link", () => {
            getSocials().find('.icon-telegram').should('be.visible');
            getSocials().find('a[href="https://t.me/ithillel_kyiv"]').should('be.visible');
        });

        it("Should display the Youtube icon and link", () => {
            getSocials().find('.icon-youtube').should('be.visible');
            getSocials().find('a[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]').should('be.visible');
        });

        it("Should display the Instagram icon and link", () => {
            getSocials().find('.icon-instagram').should('be.visible');
            getSocials().find('a[href="https://www.instagram.com/hillel_itschool/"]').should('be.visible');
        });

        it("Should display the Linkedin icon and link", () => {
            getSocials().find('.icon-linkedin').should('be.visible');
            getSocials().find('a[href="https://www.linkedin.com/school/ithillel/"]').should('be.visible');
        });

        it("Should display the Hillel school link", () => {
            cy.get('.contacts_link').first().should('be.visible').and('have.text', 'ithillel.ua');
        });

        it("Should display the support link", () => {
            cy.get('.contacts_link').last().should('be.visible').and('have.text', 'support@ithillel.ua');
        });

        it('Should display Footer text', () => {
            cy.get('.col-7 > :nth-child(2)').should('be.visible');
        })

        it('Should display Footer logo', () => {
            cy.get('.footer_logo').should('be.visible');
        });
    });
});