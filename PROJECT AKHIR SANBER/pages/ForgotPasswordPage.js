class ForgotPasswordPage {

    elements = {
        forgotLink: () => cy.get('.orangehrm-login-forgot-header'),
        usernameInput: () => cy.get('input[name="username"]'),
        resetBtn: () => cy.get('button[type="submit"]'),
        notif: () => cy.get('.oxd-text--subtitle-2') 
    }

    openForgot() {
        this.elements.forgotLink().click();
    }

    reset(username) {
        if (username !== "") {
            this.elements.usernameInput().type(username);
        }
        this.elements.resetBtn().click();
    }
}

module.exports = new ForgotPasswordPage();