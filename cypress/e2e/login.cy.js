describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      {
        timeout: 120000,
        failOnStatusCode: false
      }
    )

    cy.get('input[name="username"]', { timeout: 30000 })
      .should('be.visible')
  })

  it('TC001 - Login berhasil', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.get('h6').should('contain.text', 'Dashboard')
  })

  it('TC002 - Password Salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin12')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('contain.text', 'Invalid')
  })

  it('TC003 - Username Salah', () => {
    cy.get('input[name="username"]').type('Admins')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('contain.text', 'Invalid')
  })

  it('TC004 - Username Kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group__message')
      .should('contain.text', 'Required')
  })

  it('TC005 - Password Kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group__message')
      .should('contain.text', 'Required')
  })

  it('TC006 - Kedua kolom dikosongkan', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group__message')
      .should('have.length.at.least', 1)
  })

it('TC007 - Username lowercase', () => {
  cy.get('input[name="username"]').type('admin')
  cy.get('input[name="password"]').type('admin123')
  cy.get('button[type="submit"]').click()

  cy.url().should('include', '/dashboard')
  cy.get('h6').should('contain.text', 'Dashboard')
  })

})