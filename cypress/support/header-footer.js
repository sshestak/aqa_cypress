
export class HeaderPage {
  get header() {
    return cy.get('header');
  }

  get logo() {
    return this.header.find('.header_logo');
  }

  get navigation() {
    return this.header.find('nav');
  }

  get homeLink() {
    return this.navigation.contains('a', 'Home');
  }

  get aboutButton() {
    return this.navigation.contains('button', 'About');
  }

  get contactsButton() {
    return this.navigation.contains('button', 'Contacts');
  }

  get guestLoginButton() {
    return cy.get('.header-link');
  }

  get signInButton() {
    return cy.get('[class*="header_signin"]');
  }
}

export class FooterPage {
  get socials() {
    return cy.get('.contacts_socials');
  }

  get facebookIcon() {
    return this.socials.find('.icon-facebook');
  }

  get facebookLink() {
    return this.socials.find(
      'a[href="https://www.facebook.com/Hillel.IT.School"]'
    );
  }

  get telegramIcon() {
    return this.socials.find('.icon-telegram');
  }

  get telegramLink() {
    return this.socials.find(
      'a[href="https://t.me/ithillel_kyiv"]'
    );
  }

  get youtubeIcon() {
    return this.socials.find('.icon-youtube');
  }

  get youtubeLink() {
    return this.socials.find(
      'a[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]'
    );
  }

  get instagramIcon() {
    return this.socials.find('.icon-instagram');
  }

  get instagramLink() {
    return this.socials.find(
      'a[href="https://www.instagram.com/hillel_itschool/"]'
    );
  }

  get linkedinIcon() {
    return this.socials.find('.icon-linkedin');
  }

  get linkedinLink() {
    return this.socials.find(
      'a[href="https://www.linkedin.com/school/ithillel/"]'
    );
  }

  get hillelLink() {
    return cy.get('.contacts_link').first();
  }

  get supportLink() {
    return cy.get('.contacts_link').last();
  }

  get footerText() {
    return cy.get('.col-7 > :nth-child(2)');
  }

  get logo() {
    return cy.get('.footer_logo');
  }
}
