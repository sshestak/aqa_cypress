import { GaragePage } from '../support/garagePage';

describe('Garage page', () => {
  const garagePage = new GaragePage();
  const auth = Cypress.config('env') || {};

  beforeEach(() => {
    cy.env(['userEmail', 'userPassword', 'basicAuthUsername', 'basicAuthPassword']).then(({ userEmail, userPassword, basicAuthUsername, basicAuthPassword }) => {
      cy.login(userEmail, userPassword, basicAuthUsername, basicAuthPassword);
      cy.get('h1').should('have.text', 'Garage');
    });
  });

  it('Should display the Add car button', () => {
    cy.contains('button', 'Add car').should('be.visible');
  });

  context('Check Add a car modal elements', () => {
    beforeEach(() => {
      garagePage.openAddCarModal();
    });

    it('Should display title Add a car', () => {
      garagePage.getAddCarButton().should('be.visible').and('have.text', 'Add car');
    });

    it('Should display Brand field', () => {
      garagePage.getBrandSelect().should('be.visible');
    });

    it('Should verify all options in the Brand dropdown', () => {
      const expectedBrands = ['Audi', 'BMW', 'Ford', 'Porsche', 'Fiat'];

      cy.get('#addCarBrand option').then(($options) => {
        const actualBrands = [...$options].map((option) => option.textContent.trim());

        expectedBrands.forEach((brand) => {
          expect(actualBrands).to.include(brand);
        });
      });
    });

    it('should allow selecting each car brand', () => {
      const brands = ['Audi', 'BMW', 'Ford', 'Porsche', 'Fiat'];

      brands.forEach((brand) => {
        cy.get('#addCarBrand').select(brand);
        cy.get('#addCarBrand option:selected').should('have.text', brand);
      });
    });

    it('Should display Model field', () => {
      garagePage.getModelSelect().should('be.visible');
    });

    it('should display correct models for Audi', () => {
      cy.get('#addCarBrand').select('Audi');

      const expectedModels = ['TT', 'R8', 'Q7', 'A6', 'A8'];

      cy.get('#addCarModel option').then(($options) => {
        const actualModels = [...$options]
          .map((option) => option.textContent.trim())
          .filter(Boolean);

        expectedModels.forEach((model) => {
          expect(actualModels).to.include(model);
        });
      });
    });

    it('Should verify the Mileage field', () => {
      garagePage.getMileageInput().should('be.visible');
    });

    it('Should display Cancel button', () => {
      cy.contains('.modal button', 'Cancel').should('be.visible');
      
    });

    it('Should display Add button', () => {
      cy.contains('.modal button', 'Add').should('be.visible');
    });
  });

  context('Adding car', () => {
    let createdCarId;
    const carId = 575625;

    const expenseData = {
        reportedAt: '2026-10-28',
        mileage: 1500,
        liters: 40,
        totalCost: 2400,
    };

    beforeEach(() => {
      garagePage.openAddCarModal();
    });

    it('should create a car and save its ID', () => {
      const newCar = {
        brand: 'Audi',
        model: 'TT',
        mileage: 1000,
      };

      cy.intercept('POST', '**/api/cars').as('createCar');

      cy.get('#addCarBrand').select(newCar.brand);
      cy.get('#addCarModel').select(newCar.model);
      cy.get('#addCarMileage').clear().type(String(newCar.mileage));
      cy.contains('.modal button', 'Add').click();

      cy.wait('@createCar').then(({ response }) => {
        expect(response.statusCode).to.be.oneOf([200, 201]);
        createdCarId = response.body.data.id;
        expect(createdCarId).to.exist;
      });

      cy.request('GET', `${Cypress.config('baseUrl')}/api/cars`).then((response) => {
        expect(response.status).to.eq(200);

        const createdCar = response.body.data.find((item) => item.id === createdCarId);

        expect(createdCar, 'created car should exist in the list').to.exist;
        expect(createdCar.brand).to.eq(newCar.brand);
        expect(createdCar.model).to.eq(newCar.model);
        expect(createdCar.mileage).to.eq(newCar.mileage);
      });
    });

  it('Should create expense and validate response', () => {
  const newCar = {
    brand: 'Audi',
    model: 'TT',
    mileage: 1000,
  };

  const expenseData = {
    reportedAt: '2026-10-28',
    mileage: 1500,
    liters: 40,
    totalCost: 2400,
  };

  cy.intercept('POST', '**/api/cars').as('createCar');

  cy.get('#addCarBrand').select(newCar.brand);
  cy.get('#addCarModel').select(newCar.model);
  cy.get('#addCarMileage').clear().type(String(newCar.mileage));
  cy.contains('.modal button', 'Add').click();

  cy.wait('@createCar').then(({ response }) => {
    expect(response.statusCode).to.be.oneOf([200, 201]);

    const createdCarId = response.body.data.id;

    cy.createExpense(createdCarId, expenseData).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body).to.have.property('status', 'ok');
      expect(response.body).to.have.property('data');

      const createdExpense = response.body.data;

      expect(createdExpense).to.include({
        carId: createdCarId,
        mileage: expenseData.mileage,
        liters: expenseData.liters,
        totalCost: expenseData.totalCost,
      });

      expect(createdExpense).to.have.property('id');
    });
  });
});
});
});
