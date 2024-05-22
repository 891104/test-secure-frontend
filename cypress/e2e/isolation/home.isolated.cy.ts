/// <reference types="cypress" />

import users from '../../fixtures/users.json'
import { deleteUserMocks } from '../../mocks/deleteUser'
import { homePage } from '../../pages/homePageObject'

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
    it('should correctly delete an user', () => {
        // given
        const userToDelete = users[1]
        deleteUserMocks.success(userToDelete.username)
        const userToDeleteName = `${userToDelete.firstName} ${userToDelete.lastName}`

        // when
        cy.wait(1000)
        homePage.deleteUser(userToDeleteName)

        // then
        cy.get(homePage.selectors.rowSelector).contains(userToDeleteName).should('not.exist')
        cy.wait(1000)
        cy.get(homePage.selectors.rowSelector).should('have.length', users.length - 1)
    })

    it('should not delete an user if confirmation cancelled', () => {
        // given
        const userToDelete = users[1]
        const userToDeleteName = `${userToDelete.firstName} ${userToDelete.lastName}`
        Cypress.on('window:confirm', (confirmationText) => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        // when
        homePage.deleteUser(userToDeleteName)

        // then
        cy.get(homePage.selectors.rowSelector).contains(userToDeleteName).should('exist')
        cy.get(homePage.selectors.rowSelector).should('have.length', users.length)
    })

})