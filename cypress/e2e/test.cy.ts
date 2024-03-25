describe('Viewport Testing', () => {
  it('should display location graphics image when viewport width is greater than 390 pixels', () => {
    cy.visit('http://localhost:3000/test');
    // Test on viewport greater than 390 pixels
    cy.viewport(1470, 498);
    cy.get('img').should('be.visible');
  });
  it('should wait for the form submission and generate itinerary', () => {
    cy.visit('http://localhost:3000/test');
    cy.get('form').submit();
    cy.get('.loading-spinner', { timeout: 10000 }).should('not.exist'); 
    cy.wait(2000); // Wait for 2 seconds 

  });
});

