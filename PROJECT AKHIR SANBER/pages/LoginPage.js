class LoginPage {

    elements = {
        username: () => cy.get('input[name="username"]'),
        password: () => cy.get('input[name="password"]'),
        loginBtn: () => cy.get('button[type="submit"]'),
        errorMsg: () => cy.get('.oxd-alert-content-text')
    }

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
            timeout: 20000
        })
    }

    login(username, password) {
        if (username !== "") {
            this.elements.username().type(username)
        }

        if (password !== "") {
            this.elements.password().type(password)
        }

        this.elements.loginBtn().click()
    }
}

module.exports = new LoginPage()