describe('Test Page', () => {
  it('fill in a checkbox', () => {
    // Start at index page
    cy.visit('http://localhost:3000/test');
    
    // look at the checkbox in step3
    cy.get('#checkBudget', { timeout: 10000 }).should('exist');
    cy.get('#checkBudget').check();
    cy.get('#checkBudget').should('be.checked');

  });
  

  it('have the button "submit"', () => {
    //start at test page
    cy.visit('http://localhost:3000/test')

    //look at the text of the button
    cy.get('button').should('include.text', 'Submit')
    cy.get('button').should('have.css', 'font-size', '20px');
    cy.get('button').should('have.css', 'width', '357px');
    cy.get('button').should('have.css', 'height', '72px');
    cy.get('button').should('have.css', 'border-radius', '50px');
  })
})