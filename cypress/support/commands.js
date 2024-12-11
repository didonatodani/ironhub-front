// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    // If it's an input field, prevent the text from being logged
    if (element.is('input[type="password"], input[type="email"], input[type="text"]')) {
      options = { ...options, log: false };
    }
    // Call the original type function
    return originalFn(element, text, options);
  });


Cypress.Commands.add("login", () => {
    cy.request({
      method: "POST",
      url: "https://iron-hub-backend.vercel.app/auth/login", 
      body: {
        email: "ferreresnigel@gmail.com",
        password: "Ironhack1234"
      }
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure login is successful
      const { authToken } = response.body; // Extract the JWT token
      // Save the token in localStorage to simulate authentication in the frontend
      window.localStorage.setItem("authToken", authToken);
    });
  });
  