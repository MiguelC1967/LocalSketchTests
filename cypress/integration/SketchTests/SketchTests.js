// SketchTests.js created with Cypress
//

describe('Sketch Sign In Page test', () =>{

    it ('Happy Path login and Workspace navigation', () => {
        cy.visit('https://www.sketch.com/signin')

        // set username and password in the cypress.env.json file

        cy.get("#text-input").should('be.visible').type(Cypress.env('user_name')).should('have.value', Cypress.env('user_name'))

        cy.get('[data-testid="input"]').should('be.visible').type(Cypress.env('user_password'), {log: false})

        cy.get(".sc-jWa-DWe > .sc-hiwReK").click() // Sign In button

        // "Get Started for Free" popup

        cy.get(".sc-fXMSbX > :nth-child(1) > .sc-hiwReK" , { timeout: 12000 }).click() // the timeout is to ensure the popup 
                                                                                       // is deployed

        cy.get (':nth-child(1) > .sc-kIoiNz > .sc-itBoPw > .sc-dnXIZM > .sc-hiwReK').click() // Click on Protect Your Account    
        
        cy.wait(2000) // Pause to show the screen

        cy.get('.sc-iaUyKn > .sc-hKwCoD').click() // Click on User's Workspace pulldown
        cy.get(':nth-child(2) > .sc-fIoroj > .sc-gjNGvZ').click() // Go back to the workspace


        // Since Cypress does not work with multiple tabs, I check the address in the attribute is ok - Save a Document to the Workspace
        cy.get(':nth-child(2) > .sc-kIoiNz > .sc-itBoPw > .sc-dnXIZM > .sc-hiwReK').should('have.attr', 'href', 'sketch://sketch.cloud/') 

        cy.get(':nth-child(3) > .sc-kIoiNz > .sc-itBoPw > .sc-dnXIZM > .sc-hiwReK').click() // Click on Start Collaborating
        cy.wait(2000) // Pause to show the screen

        cy.get('.sc-hKwCoD').click() // Click on User's Workspace pulldown
        cy.get(':nth-child(2) > .sc-fIoroj > .sc-gjNGvZ').click() // Go back to the workspace -- this does not work
        cy.go(-2)                                                 // So I have to click twice on the back browser button

       // Since Cypress does not work with multiple tabs, I check the address in the attribute is ok - Get Better at Sketch
       cy.get(':nth-child(4) > .sc-kIoiNz > .sc-itBoPw > .sc-dnXIZM > .sc-hiwReK').should('have.attr', 'href', 'https://www.sketch.com/docs/') 

       cy.get('.sc-ksDcUF > :nth-child(1) > .sc-ihIMkv').click() // Updates link
       cy.get('.sc-iaUyKn > .sc-hKwCoD').click() // Click on User's Workspace pulldown
       cy.get(':nth-child(2) > .sc-fIoroj > .sc-gjNGvZ').click() // Go back to the workspace

       cy.get(':nth-child(6) > .sc-ihIMkv').click() // Shared with me link
       cy.wait(1000)

       cy.get(':nth-child(7) > .sc-ihIMkv').click() // Libraries link

       cy.get(':nth-child(8) > .sc-ihIMkv').click() // My Drafts link
       cy.wait(1000)

       cy.get(':nth-child(9) > .sc-ihIMkv').click() // Trash link
       cy.wait(3000)
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

        cy.get(".sc-jWa-DWe > .sc-hiwReK").click() // Sign In button

        cy.get(".sc-jftGvU").should('be.visible') // check if the error message is visible
  
        cy.wait(2500) // shows the bad password error message and quits  
    })

    it ('User does not exist', () => {
        cy.visit('https://www.sketch.com/signin')

        cy.get("#text-input").should('be.visible').type(Cypress.env('user_name')).should('have.value', Cypress.env('user_name'))

        // We use an incorrect password to force an error

        cy.get('[data-testid="input"]').should('be.visible').type('PasswordIncorrect')

        cy.get(".sc-jWa-DWe > .sc-hiwReK").click() // Sign In button

        cy.get(".sc-jftGvU").should('be.visible') // check if the error message is visible
  
        cy.wait(2500) // shows the bad password error message and quits  
    })

    it ('Forgot Password?', () => {
        cy.visit('https://www.sketch.com/signin') 

        cy.get(".sc-furvIG > .sc-bTfYlY").click() // forgot Password link

        cy.get("#email-input").should('be.visible').type(Cypress.env('user_name')).should('have.value', Cypress.env('user_name'))

        cy.get(".sc-jWa-DWe > .sc-hiwReK").click() // Reset Password button

        cy.get('.sc-iutpoz > .sc-hiwReK').click() // Go back to Sign in

        cy.wait(2500) // shows the bad password error message and quits  
    })

    it ('Make password visible', () => {
        cy.visit('https://www.sketch.com/signin')

        // set username and password in the cypress.env.json file

        cy.get("#text-input").should('be.visible').type(Cypress.env('user_name')).should('have.value', Cypress.env('user_name'))

        cy.get('[data-testid="input"]').should('be.visible').type(Cypress.env('user_password'), {log: false})

        cy.get('[data-testid="eye-icon"]').click() // reveals password

        cy.wait(3000)

        cy.get('[data-testid="eye-icon"]').click() // hides password

        cy.wait(2500) // shows the main user screen and quits
    })
})