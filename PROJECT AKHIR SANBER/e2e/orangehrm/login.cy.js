import loginPage from "../../pages/LoginPage";
import data from "../../fixtures/orangeData.json";

describe('Login OrangeHRM', () => {

    beforeEach(() => {
        loginPage.visit();
    });

    it('TC001 - Valid Login', () => {
        cy.intercept('POST', '**/auth/validate').as('loginApi');

        loginPage.login(data.validUsername, data.validPassword);

        cy.wait('@loginApi').then((intercept) => {
    expect([200, 302]).to.include(intercept.response.statusCode);
    });
    });

    it('TC002 - Wrong Username', () => {
        loginPage.login(data.wrongUsername, data.validPassword);
        loginPage.elements.errorMsg().should('contain', 'Invalid credentials');
    });

    it('TC003 - Wrong Password', () => {
        loginPage.login(data.validUsername, data.wrongPassword);
        loginPage.elements.errorMsg().should('contain', 'Invalid credentials');
    });

    it('TC004 - Empty Username & Password', () => {
    loginPage.login(data.empty, data.empty);

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
      .and('have.length', 2); 
});

});