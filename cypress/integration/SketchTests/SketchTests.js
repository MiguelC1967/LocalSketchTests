// SketchTests.js created with Cypress
//

describe('Sketch Page test', () =>{
    it ('Happy Path login', () => {
        cy.visit('https://www.sketch.com/signin')

        // set username and password in the cypress.env.json file

        cy.get("#text-input").should('be.visible').type(Cypress.env('user_name')).should('have.value', Cypress.env('user_name'))

        cy.get('[data-testid="input"]').type(Cypress.env('user_password'), {log: false})

        cy.get(".sc-jWa-DWe > .sc-hiwReK").click()

        // "Get Started for Free" popup

        cy.get(".sc-fXMSbX > :nth-child(1) > .sc-hiwReK" , { timeout: 10000 }).click() // the timeout is to ensure the popup 
                                                                                       // is deployed

        cy.wait(5000) // show the main user screen and quits
    })

    it ('Bad username syntax login', () => {
        cy.visit('https://www.sketch.com/signin')

        // We use a username with a bad syntax to force an error

        cy.get("#text-input").should('be.visible').type('Bad Username')
        cy.get('[data-testid="input"]').type(Cypress.env('user_password'), {log: false})

        cy.get(".sc-jftGvU").should('be.visible')
    })
})