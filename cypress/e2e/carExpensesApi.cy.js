import { GaragePage } from '../support/garagePage';
import { ExpensePage } from '../support/expensePage';

describe('Garage page', () => {
  const garagePage = new GaragePage();
  const expensePage = new ExpensePage();
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

    context('Car Expenses', () => {
        const getTodayDate = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
        };

        const newCar = {
            brand: 'Audi',
            model: 'TT',
            mileage: 1000,
        };

        const expenseData = {
            reportedAt: getTodayDate(),
            mileage: 1500,
            liters: 40,
            totalCost: 2400,
        };

        it('Should create a car, create an expense via API and verify it in UI', () => {
        // 1. Create car and intercept the response
            cy.intercept('POST', '**/api/cars').as('createCar');

            garagePage.openAddCarModal();

            cy.get('#addCarBrand').select(newCar.brand);
            cy.get('#addCarModel').select(newCar.model);
            cy.get('#addCarMileage').clear().type(String(newCar.mileage));

            cy.contains('.modal button', 'Add').click();

            cy.wait('@createCar').then(({ response }) => {
            expect(response.statusCode).to.be.oneOf([200, 201]);

            const carId = response.body.data.id;

        expect(carId).to.exist;

        // 2. Get cars and verify the created car exists in the response
        cy.request('GET', '/api/cars').then((carsResponse) => {
            expect(carsResponse.status).to.eq(200);

            const createdCar = carsResponse.body.data.find(
                (car) => car.id === carId
            );

            expect(createdCar).to.exist;
            expect(createdCar).to.include({
            id: carId,
            brand: newCar.brand,
            model: newCar.model,
            mileage: newCar.mileage,
            });

        // 3. Create expense
        cy.createExpense(carId, expenseData).then((expenseResponse) => {
            expect(expenseResponse.status).to.be.oneOf([200, 201]);
            expect(expenseResponse.body).to.have.property('status', 'ok');

        const createdExpense = expenseResponse.body.data;

            expect(createdExpense).to.include({
                carId,
                mileage: expenseData.mileage,
                liters: expenseData.liters,
                totalCost: expenseData.totalCost,
            });

            expect(createdExpense.id).to.exist;

        // 4. Verify the created expense in UI
        expensePage.visit();
        cy.contains(String(expenseData.mileage)).should('be.visible');
        cy.contains(String(expenseData.liters)).should('be.visible');
        cy.contains(String(expenseData.totalCost)).should('be.visible');
        });
      });
    });
  });
});
});

