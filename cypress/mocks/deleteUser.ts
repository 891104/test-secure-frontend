export const deleteUserMocks = {

    success: (username: string) => {
        cy.intercept('DELETE', `**/users/${username}`, (req) => {
            req.reply({
                statusCode: 204
            })
        })
    }

}