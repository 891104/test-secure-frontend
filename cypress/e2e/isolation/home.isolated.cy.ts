/// <reference types="cypress" />

import users from '../../fixtures/users.json'

describe('home page tests in isolation', () => {
    beforeEach(() => {
       cy.openHomePage()
       cy.get('li').should('have.length',users.length)
    })

    it('should correctly display all users', () => {
        cy.get('li').each(($row, i)=>{
            cy.wrap($row).should('contain.text',`${users[i].firstName} ${users[i].lastName}`)
        })
        cy.percySnapshot('Full home page')
    })

})