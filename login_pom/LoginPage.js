class LoginPage {
    username() {
        return cy.get('input[name="username"]')
    }

    password() {
        return cy.get('input[name="password"]')
    }

    loginBtn() {
        return cy.get('button[type="submit"]')
    }

    errorMessage() {
        return cy.get('.oxd-alert-content-text')
    }

    requiredMessage() {
        return cy.get('.oxd-input-group__message')
    }

    dashboard() {
        return cy.get('h6')
    }

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
            timeout: 120000,
            failOnStatusCode: false
        })
    }

    login(username, password) {
        if (username !== '') this.username().type(username)
        if (password !== '') this.password().type(password)
        this.loginBtn().click()
    }
}

module.exports = new LoginPage();