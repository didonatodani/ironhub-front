//Test
describe("IronHub - Navigation", () => {
  it("Load content, visit the about page, and return to the home page", () => {
    cy.visit("https://ironhub-front.netlify.app/#/");
    cy.get("#home-button").click();
    cy.wait(1000);
    cy.get(".nig").click();
    cy.wait(3000);
    cy.get(".false").contains("I am a web").click();
    cy.wait(1000);
    cy.get(".dan").click();
    cy.wait(3000);
    cy.get(".false").contains("I have always been").click();
    cy.wait(1000);
    cy.get(".pie").click();
    cy.wait(3000);
    cy.get(".false").contains("Hi! I’m Piet-Hein,").click();
    cy.get(".logo").click();
  });
});
describe("IronHub - Authentication", () => {
  it("Log in and visit all posts page", () => {
    cy.visit("https://ironhub-front.netlify.app/");
    cy.get("#nav-login").contains("Login").click();
    cy.get('input[name="email"]').type(Cypress.env("email"));
    cy.get('input[name="password"]').type(Cypress.env("password"));
    cy.get('button.primary-button[type="submit"]').click();
    cy.get("#ironhub-logo").click();
  });
});

describe("IronHub - Posts", () => {
  it("Create a post", () => {
    // Log in before starting the test
    cy.login();
    cy.visit("https://ironhub-front.netlify.app/");
    cy.get("#ironhub-logo").click();
    cy.get(".primary-button").click();
    cy.get('input[name="title"]').type("Cypress Test")
    cy.get('#description').type("This post has been created with cypress.")
    cy.get('input[name="link"]').type("https://docs.cypress.io/app/get-started/why-cypress")
    cy.get(".primary-button").click();
  });
});

describe("IronHub - PostDetail", () => {
  it("See post details and update it", () => {
    cy.login();
    cy.visit("https://ironhub-front.netlify.app/");
    cy.get("#ironhub-logo").click();
    cy.get(".input-search").type("cyp");
    cy.get(".post-card").first().click();
    cy.get(".primary-button").first().click();
    cy.get('#description').type("To see more information, check the next website.")
    cy.get(".primary-button").first().click();
    cy.get(".secondary-button").click();

  });
});

describe("IronHub - Delete Post", () => {
  it("See post details and delete it", () => {
    cy.login();
    cy.visit("https://ironhub-front.netlify.app/");
    cy.get("#ironhub-logo").click();
    cy.get(".input-search").type("cyp");
    cy.wait(3500)
    cy.get(".post-card").first().click();
    cy.get(".secondary-button").first().click();
    cy.get(".error-button").click()
  })
})

describe("IronHub - add Reply", () => {
  it("Search a post and add a reply", () => {
    cy.login();
    cy.visit("https://ironhub-front.netlify.app/");
    cy.get("#ironhub-logo").click();
    cy.get(".input-search").type("Taking br");
    cy.wait(3500)
    cy.get(".post-card").first().click();
    cy.get(".primary-button").first().click();
    cy.get("#description").type("You are right Aquiles, Dani should take more breaks.");
    cy.get(".primary-button").last().click()
  })
})

describe("IronHub - update Reply", () => {
  it("Search a post and update your reply", () => {
    cy.login();
    cy.visit("https://ironhub-front.netlify.app/");
    cy.get("#ironhub-logo").click();
    cy.get(".input-search").type("Taking br");
    cy.wait(3500);
    cy.get(".post-card").first().click();
    cy.get(".primary-button").last().click();
    cy.get("#description").type("Time to break!");
    cy.get(".primary-button").last().click();

  });
});

describe("IronHub - detele Reply", () => {
  it("Search a post and delete a reply", () => {
    cy.login();
    cy.visit("https://ironhub-front.netlify.app/");
    cy.get("#ironhub-logo").click();
    cy.get(".input-search").type("Taking br");
    cy.wait(3500);
    cy.get(".post-card").first().click();
    cy.get(".reply-container")
    .contains("I take a break")
    .parents(".reply-container")
    .find(".secondary-button")
    .click();
    cy.get(".error-button").last().click();
  });
});

describe("IronHub - Profile", () => {
  it("Navigate to profile page, and edit", () => {
    cy.login();
    cy.visit("https://ironhub-front.netlify.app/");
    cy.get("#ironhub-logo").click();
    cy.get(".user-picture").click();
    cy.get(".links").contains("My Profile").click();
    cy.get(".primary-button").click();
    cy.get("input#name").type(" Felix");
    cy.get("input[name=course]").eq(1).click();
    const filePath = "cypress/fixtures/Instructions.png";
    cy.get("input#picture").selectFile(filePath, { action: "select" });
    cy.get(".primary-button").click();
  });
});
