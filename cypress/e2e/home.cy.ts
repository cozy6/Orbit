describe('Home page testing', () => {
  it('should navigate to the forms page when the button is clicked', () => {
    cy.visit('http://localhost:3000');
    cy.get('button').click();
    cy.url().should('include', '/test');
  });
});

describe('Header testing', () => {
  it('should display the Orbit header', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Orbit.').should('be.visible'); 
  });
});

describe('Filter out the elements', () => {
  it('should filter elements based on a selector', () => {
    cy.visit('http://localhost:3000'); 
    cy.get('button').filter(':visible').should('have.length', 1); 
  });
});