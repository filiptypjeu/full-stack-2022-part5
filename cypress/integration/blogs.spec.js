import login from "../../src/services/login";

describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser("Filip Stenbacka", "filip", "filip");
    cy.createUser("Legolas Greenleaf", "legolas", "greenleaf");
    cy.visit("http://localhost:3000");
  });

  it("login form is shown by default", () => {
    cy.contains("Log in to application");
  });

  it("login successful with correct credentials", () => {
    cy.get("#username").type("filip");
    cy.get("#password").type("filip");
    cy.get("#login-button").click();
    cy.contains("Filip Stenbacka logged in");
  });


  it("login fails with wrong password", () => {
    cy.get("#username").type("filip");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();
    cy.get(".error")
      .contains("Wrong credentials")
      .should("have.css", "color", "rgb(255, 0, 0)");
    cy.contains("Filip Stenbacka logged in").should("not.exist");
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.login("filip", "filip");
    });

    it("a new blog can be created", () => {
      cy.contains("new blog").click();

      const title = "How to write a good blog";
      cy.contains(title).should("not.exist");

      cy.get("#title").type("How to write a good blog");
      cy.get("#author").type("Filip");
      cy.get("#url").type("a url");
      cy.contains("create").click();

      cy.get(".notification").contains("Blog added");
      cy.contains(title);
    });
  });

  describe("additional blogs by other users", () => {
    beforeEach(() => {
      cy.login("legolas", "greenleaf");
      cy.createBlog("Blog1", "User1", "Url1");
      cy.createBlog("Blog2", "User2", "Url2");
      cy.createBlog("Blog3", "User3", "Url3");

      cy.login("filip", "filip");
    });

    it("view blog information", () => {
      cy.contains("Added by Legolas Greenleaf").should("not.exist");
      cy.contains("User2").contains("view").click();
      cy.contains("Added by Legolas Greenleaf");
    });

    it("like a blog", () => {
      cy.contains("User2").contains("view").click();
      cy.contains("Likes: 0");
      cy.contains("Likes: 1").should("not.exist");
      cy.contains("Likes: 2").should("not.exist");
      cy.contains("like").click();
      cy.contains("Likes: 0").should("not.exist");
      cy.contains("Likes: 1");
      cy.contains("Likes: 2").should("not.exist");
      cy.contains("like").click();
      cy.contains("Likes: 0").should("not.exist");
      cy.contains("Likes: 1").should("not.exist");
      cy.contains("Likes: 2");
    });

    it("remove button does not exists if user is wrong", () => {
      cy.contains("User2").contains("view").click();
      cy.contains("remove").should("not.exist");
    });

    it("remove blog", () => {
      cy.login("legolas", "greenleaf");
      cy.contains("User2").contains("view").click();
      cy.contains("remove").click();
      cy.get(".notification").contains("Blog removed");
      cy.contains("User2").should("not.exist");
    });

    it("blogs are ordered by likes", () => {
      cy.contains("User1").contains("view").click();
      cy.contains("User1").contains("like").click();
  
      cy.contains("User2").contains("view").click();
      cy.contains("User2").contains("like").click();
      cy.contains("User2").contains("like").click();

      cy.contains("User3").contains("view").click();
      cy.contains("User3").contains("like").click();
      cy.contains("User3").contains("like").click();
      cy.contains("User3").contains("like").click();

      cy.get(".blog").eq(0).contains("User3").contains("Likes: 3");
      cy.get(".blog").eq(1).contains("User2").contains("Likes: 2");
      cy.get(".blog").eq(2).contains("User1").contains("Likes: 1");
    });
  });
});
