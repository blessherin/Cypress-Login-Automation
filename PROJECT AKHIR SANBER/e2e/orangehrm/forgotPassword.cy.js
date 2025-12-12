import forgotPage from "../../pages/ForgotPasswordPage";
import data from "../../fixtures/orangeData.json";

describe('Forgot Password OrangeHRM', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('TC005 - Open Forgot Password Page', () => {
        forgotPage.openForgot();
        cy.url().should('include', '/requestPasswordResetCode');
    });

    it('TC006 - Click Reset With Empty Field', () => {
        forgotPage.openForgot();
        forgotPage.reset(data.empty);
        cy.url().should('include', '/requestPasswordResetCode');
        cy.get('button[type="submit"]').should('exist');
    });

});