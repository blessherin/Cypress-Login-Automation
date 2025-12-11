const loginPage = require('./LoginPage');
const data = require('./loginData.json');

describe('OrangeHRM Login Feature (POM Version)', () => {

  beforeEach(() => {
    loginPage.visit();

    cy.intercept('POST', '**/auth/validate').as('loginApi');

    cy.get('input[name="username"]').should('be.visible');
  });

  it('TC001 - Login berhasil', () => {
    loginPage.login(data.validUsername, data.validPassword);

    cy.wait('@loginApi')
  .its('response.statusCode')
  .should('be.oneOf', [200, 302]);

    cy.url().should('include', '/dashboard');
    loginPage.dashboard().should('contain.text', 'Dashboard');
  });

  it('TC002 - Password Salah', () => {
    loginPage.login(data.validUsername, data.wrongPassword);

    cy.wait('@loginApi');

    loginPage.errorMessage().should('contain.text', 'Invalid');
  });

  it('TC003 - Username Salah', () => {
    loginPage.login(data.wrongUsername, data.validPassword);

    cy.wait('@loginApi');

    loginPage.errorMessage().should('contain.text', 'Invalid');
  });

  it('TC004 - Username Kosong', () => {
    loginPage.login(data.empty, data.validPassword);

    loginPage.requiredMessage().should('contain.text', 'Required');
  });

  it('TC005 - Password Kosong', () => {
    loginPage.login(data.validUsername, data.empty);

    loginPage.requiredMessage().should('contain.text', 'Required');
  });

  it('TC006 - Kedua kolom kosong', () => {
    loginPage.login(data.empty, data.empty);

    loginPage.requiredMessage().should('have.length.at.least', 1);
  });

  it('TC007 - Username lowercase tapi valid', () => {
    loginPage.login('admin', data.validPassword);

    cy.wait('@loginApi');

    cy.url().should('include', '/dashboard');
    loginPage.dashboard().should('contain.text', 'Dashboard');
  });

});