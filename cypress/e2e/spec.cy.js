describe('IronHub', () => {
  it('Load content and visit the about page and return to home page', () => {
    cy.visit('https://ironhub-front.netlify.app/#/');
    cy.get("#home-button").click();
    cy.wait(5000);
    cy.get(".nig").click();
    cy.wait(8000);
    cy.get(".false").contains("I am a web").click()
    cy.wait(3000);
    cy.get(".dan").click();
    cy.wait(8000);
    cy.get(".false").contains("I have always been").click()
    cy.wait(3000);
    cy.get(".pie").click();
    cy.wait(8000);
    cy.get(".false").contains("Hi! I’m Piet-Hein,").click()
    cy.get(".logo").click()
  })
}
  it('Log in and visit all post page', () => {
    cy.visit('https://ironhub-front.netlify.app/#/');
    cy.get()
  })
)