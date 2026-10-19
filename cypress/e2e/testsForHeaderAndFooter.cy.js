import { FooterPage, HeaderPage } from "../support/header-footer";

describe("Header & Footer", () => {

    beforeEach(()=> {
        cy.visit("/", {
            auth: {
                username: "guest",
                password: "welcome2qauto",
            },
        });
    }); 

    const headerPage = new HeaderPage();
    const footerPage = new FooterPage();

    context ('Header tests',() => {
        it("Should display the header", () => {
            headerPage.header.should("be.visible");
        });

        it("Should display the logo", () => {
            headerPage.logo.should("be.visible");
        });

        it("Should display the navigation menu", () => {
            headerPage.navigation.should("be.visible");
        });

        it("Should display the Home option", () => {
            headerPage.homeLink.should("be.visible");
        });

        it("Should display the About option", () => {
            headerPage.aboutButton.should("be.visible");
        });

        it("Should display the Contacts option", () => {
            headerPage.contactsButton.should("be.visible");
        });

        it("Should verify the Home option is active", () => {
            headerPage.homeLink.should("have.class", "-active");
        });

        it("Should navigate to the home page when clicking Home", () => {
            headerPage.homeLink.click();
            cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
        });

        it("Should navigate to the About section when clicking About", () => {
            headerPage.aboutButton.click();
            cy.get("#aboutSection").should("be.visible");
        });

        it("Should navigate to the Contacts section when clicking Contacts", () => {
            headerPage.contactsButton.click();
            cy.get("#contactsSection").should("be.visible");
        });

        it("Should verify the Guest log in button", () => {
            headerPage.guestLoginButton.should("be.visible");
        })

        it("Should verify the Sign in button", () => {
            headerPage.signInButton.should("be.visible");
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

    //const getSocials = () => cy.get('.contacts_socials');

        it("Should display the Facebook icon and link", () => {
            footerPage.facebookIcon.should('be.visible');
            footerPage.facebookLink.should('be.visible');
        });

        it("Should display the Telegram icon and link", () => {
            footerPage.telegramIcon.should('be.visible');
            footerPage.telegramLink.should('be.visible');
        });

        it("Should display the Youtube icon and link", () => {
            footerPage.youtubeIcon.should('be.visible');
            footerPage.youtubeLink.should('be.visible');
        });

        it("Should display the Instagram icon and link", () => {
            footerPage.instagramIcon.should('be.visible');
            footerPage.instagramLink.should('be.visible');
        });

        it("Should display the Linkedin icon and link", () => {
            footerPage.linkedinIcon.should('be.visible');
            footerPage.linkedinLink.should('be.visible');
        });

        it("Should display the Hillel school link", () => {
            footerPage.hillelLink.should('be.visible').and('have.text', 'ithillel.ua');
        });

        it("Should display the support link", () => {
            footerPage.supportLink.should('be.visible').and('have.text', 'support@ithillel.ua');
        });

        it('Should display Footer text', () => {
            footerPage.footerText.should('be.visible');
        })

        it('Should display Footer logo', () => {
            footerPage.logo.should('be.visible');
        });
    });
});