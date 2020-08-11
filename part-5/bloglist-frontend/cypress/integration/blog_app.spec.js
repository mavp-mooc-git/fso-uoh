/**
 *  Mocha recommends that arrow functions are not used.
 */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('BLOGS')
    cy.contains('Blog app, Full Stack Open 2020, University of Helsinki.')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

})
