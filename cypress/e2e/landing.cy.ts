describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://localhost:4200')

        cy.get('.row .col-12 h6')
            .should('exist')
            .and('have.text', 'My Matches');

        cy.get('.row .col-12 .col-md-6:last-child i.fa-ellipsis-vertical')
            .should('exist');

        // Check if button exists
        cy.get('.row .col-md-6 .row .col-md-3 button.newbutton')
            .should('exist')
            .and('contain', '5 new'); // Check if the button contains the text '5 new'

        // Click the button and check if it's clicked
        cy.get('.row .col-md-6 .row .col-md-3 button.newbutton')
            .click();

        cy.intercept('GET', '/profile/*').as('profilePage');

        cy.get('button#selectImage')
            .contains('Yes')
            .click({ force: true });
        cy.wait(1000);

        cy.url().should('match', /\/profile\/\d+/);

        cy.get('.profilepage').should('exist'); // Ensure the profile page container exists
        cy.contains('.btn', 'Message').should('exist'); // Check for the message button text
        cy.contains('.btn', 'Call Now').should('exist'); // Check for the call button text
        cy.contains('.mb-0', 'You liked her profile').should('exist'); // Check for the liked profile text

        cy.intercept('GET', 'http://localhost:4200').as('previousPage');
        cy.wait(1000);
        // Click the "Go Back" button
        // cy.get('.header-content .backbtn').contains('arrow_back').click({ force: true });
        cy.get('.header-content .backbtn').should('be.visible').click({ force: true });
        // Wait for navigation
        cy.wait(1000);

        // Assert the URL after navigation
        cy.url().should('eq', 'http://localhost:4200/');

    })
    it('Should match fixture data', () => {
        cy.request('GET', 'http://localhost:4200/assets/data/data.json') // Replace '/api/user' with your actual API endpoint
            .its('body')
            .then((response) => {
                // Load fixture data
                cy.fixture('profileData.json').then((fixtureData) => {
                    // Compare keys and values of the response with fixture data
                    expect(response[0]).to.deep.equal(fixtureData[0]);
                });
            });
    });

})