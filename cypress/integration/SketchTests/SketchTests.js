// SketchTests.js created with Cypress
//

describe('Sketch Page test', () =>{
    it ('Happy Path login', () => {
        cy.visit('https://www.sketch.com/signin')

        // set username and password in the cypress.env.json file

        cy.get("#text-input").should('be.visible').type(Cypress.env('user_name')).should('have.value', Cypress.env('user_name'))

        cy.get('[data-testid="input"]').should('be.visible').type(Cypress.env('user_password'), {log: false})

        cy.get(".sc-jWa-DWe > .sc-hiwReK").click()

        // "Get Started for Free" popup

        cy.get(".sc-fXMSbX > :nth-child(1) > .sc-hiwReK" , { timeout: 10000 }).click() // the timeout is to ensure the popup 
                                                                                       // is deployed

        cy.wait(5000) // shows the main user screen and quits
    })

    it ('Bad username syntax login', () => {
        cy.visit('https://www.sketch.com/signin')

        // We use a username with a bad syntax to force an error

        cy.get("#text-input").should('be.visible').type('Bad Username')
        cy.get('[data-testid="input"]').should('be.visible').type(Cypress.env('user_password'), {log: false})

        cy.get(".sc-jftGvU").should('be.visible') // check the message error is shown

        cy.wait(2500) // shows the Valid Email error message and quits
    })

    it ('Bad user password', () => {
        cy.visit('https://www.sketch.com/signin')

        cy.get("#text-input").should('be.visible').type(Cypress.env('user_name')).should('have.value', Cypress.env('user_name'))

        // We use an incorrect password to force an error

        cy.get('[data-testid="input"]').should('be.visible').type('PasswordIncorrect')

        cy.get(".sc-jWa-DWe > .sc-hiwReK").click()

        cy.get(".sc-jftGvU").should('be.visible') // check if the error message is visible
  
        cy.wait(2500) // shows the bad password error message and quits  
    })

    it ('User does not exist', () => {
        cy.visit('https://www.sketch.com/signin')

        cy.get("#text-input").should('be.visible').type(Cypress.env('user_name')).should('have.value', Cypress.env('user_name'))

        // We use an incorrect password to force an error

        cy.get('[data-testid="input"]').should('be.visible').type('PasswordIncorrect')

        cy.get(".sc-jWa-DWe > .sc-hiwReK").click()

        cy.get(".sc-jftGvU").should('be.visible') // check if the error message is visible
  
        cy.wait(2500) // shows the bad password error message and quits  
    })

    it ('Forgot Password?', () => {
        cy.visit('https://www.sketch.com/signin')

        cy.get(".sc-furvIG > .sc-bTfYlY").click()

        cy.get("#email-input").should('be.visible').type(Cypress.env('user_name')).should('have.value', Cypress.env('user_name'))

        cy.get(".sc-jWa-DWe > .sc-hiwReK").click() // Reset Password button

        cy.get('.sc-iutpoz > .sc-hiwReK').click() // Go back to Sign in

        cy.wait(2500) // shows the bad password error message and quits  
    })
})