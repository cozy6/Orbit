describe('visit the site', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('should submit a form', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  
    cy.get('button[type="button"]').type('Lets Go')

    cy.get('button').click() 
  })

})

describe('should confirm steps titles',() => {
  it('passes', () => {

    cy.visit('http://localhost:3000')

    cy.get('button').click() 

    cy.get('h1').invoke('text').should('contain', 'Where does your heart long to be?');
  })
})