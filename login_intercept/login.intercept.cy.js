describe('OrangeHRM Login Feature - Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible')
  })

  it('TCI001 - Login berhasil', () => {
    cy.intercept('GET', '**/dashboard/**').as('getDashboard')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@getDashboard')
    cy.url().should('include', '/dashboard')
  })

  it('TCI002 - Password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin12')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidPassword')
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid')
  })

  it('TCI003 - Username salah', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidUsername')

    cy.get('input[name="username"]').type('Admins')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidUsername')
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid')
  })

  it('TCI004 - Username kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('noUsername')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group__message').should('contain.text', 'Required')
  })

  it('TCI005 - Password kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('noPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group__message').should('contain.text', 'Required')
  })

  it('TCI006 - Kedua kolom dikosongkan', () => {
    cy.intercept('POST', '**/auth/validate').as('emptyCredential')

    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('contain.text', 'Required')
  })

  it('TCI007 - Username lowercase', () => {
    cy.intercept('GET', '**/api/v2/dashboard/**').as('dashboardData')

    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@dashboardData')
    cy.url().should('include', '/dashboard')
  })

})