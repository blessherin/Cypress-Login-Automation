import directoryPage from "../../pages/DirectoryPage";
import loginPage from "../../pages/LoginPage";
import data from "../../fixtures/orangeData.json";

describe('Directory Menu OrangeHRM', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.login(data.validUsername, data.validPassword);
        cy.url().should('include', '/dashboard');
    });

    it('TC007 - Open Directory Menu', () => {
        directoryPage.openMenu();
        cy.url().should('include', '/directory/viewDirectory');
    });

    it('TC008 - Search Using Hint Input', () => {
        directoryPage.openMenu();
        directoryPage.searchName('Odis');    
        directoryPage.elements.resultCard().should('exist');
    });
});