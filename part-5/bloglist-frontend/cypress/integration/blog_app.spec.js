/**
 *  Mocha recommends that arrow functions are not used.
 */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Initial page',function() {
    it('front page can be opened', function() {
      cy.contains('BLOGS')
      cy.contains('Blog app, Full Stack Open 2020, University of Helsinki.')
    })

    it('Login form is shown', function() {
      cy.contains('login').click()
    })
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('otherpass')
      cy.get('#login-button').click()
    })
  })

})
