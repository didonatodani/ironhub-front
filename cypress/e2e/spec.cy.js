describe("IronHub", () => {
  // it("Load content, visit the about page, and return to the home page", () => {
  //   cy.visit("https://ironhub-front.netlify.app/#/");
  //   cy.get("#home-button").click();
  //   cy.wait(5000);
  //   cy.get(".nig").click();
  //   cy.wait(8000);
  //   cy.get(".false").contains("I am a web").click();
  //   cy.wait(3000);
  //   cy.get(".dan").click();
  //   cy.wait(8000);
  //   cy.get(".false").contains("I have always been").click();
  //   cy.wait(3000);
  //   cy.get(".pie").click();
  //   cy.wait(8000);
  //   cy.get(".false").contains("Hi! I’m Piet-Hein,").click();
  //   cy.get(".logo").click();
  // });

  it("Log in and visit all posts page", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#nav-login").contains("Login").click();
    cy.get('input[name="email"]').type(Cypress.env("email"));
    cy.get('input[name="password"]').type(Cypress.env("password"));
    cy.get('button.primary-button[type="submit"]').click();
    cy.get(".logo").click();
  });
  it("Create a post, search for it and see details", ()=> {
    cy.visit("http://localhost:5173/");
    cy.get("#nav-login").contains("Login").click();
    cy.get('input[name="email"]').type(Cypress.env("email"));
    cy.get('input[name="password"]').type(Cypress.env("password"));
    cy.get('button.primary-button[type="submit"]').click();
    cy.get(".logo").click();
    cy.get(".primary-button").contains("Add a post").click()
  })
});
