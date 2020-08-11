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
      cy.get('.fail')
        .should('contain', 'Error: Request failed with status code 401')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        // border-style: chromium OK, firefox-dev fail.
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged-in')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.io')
      cy.get('#create-btn').click()
      cy.contains('a note created by cypress')
    })
  })

})
