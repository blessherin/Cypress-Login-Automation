class DirectoryPage {

    elements = {
        directoryMenu: () => cy.get('a[href*="viewDirectory"]'),
        searchInput: () => cy.get('input[placeholder="Type for hints..."]'),
        resultCard: () => cy.get('.oxd-sheet')
    }

    openMenu() {
        this.elements.directoryMenu().click()
    }

    searchName(name) {
        this.elements.searchInput().type(name)
        cy.get('button[type="submit"]').click()
    }
}

module.exports = new DirectoryPage()