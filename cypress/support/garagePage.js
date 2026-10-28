export class GaragePage {

    closeAddCarModal() {
        cy.get('body').then(($body) => {
            const $modal = $body.find('.modal.show');

            if ($modal.length) {
                cy.wrap($modal).find('button.close').click();
            }
        });
    }

    openAddCarModal() {
        cy.get('.btn.btn-primary').first().should('be.visible').click();
        cy.get('.modal-title').should('have.text', 'Add a car');
    }

    getAddCarButton() {
         return cy.get('.btn.btn-primary').first();
    }

    getBrandSelect() {
        return cy.get('#addCarBrand');
    }

    getModelSelect() {
        return cy.get('#addCarModel');

    }

    getMileageInput() {
        return cy.get('#addCarMileage');
    }

    getAddButton() {
        return cy.get('.modal-footer').contains('button', 'Add');
    }

    getCarCard(brand, model) {
        return cy.contains('.car_name', `${brand} ${model}`).first().closest('.car');
    }

}

export default new GaragePage();