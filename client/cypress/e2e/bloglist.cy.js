/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Test User',
      username: 'tester',
      password: 'test',
    };

    const userTwo = {
      username: 'tester2',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.request('POST', 'http://localhost:3003/api/users/', userTwo);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester');
      cy.get('#password').type('test');
      cy.get('#login-btn').click();
      cy.contains('Test User logged in');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('tester');
      cy.get('#password').type('wrong');
      cy.get('#login-btn').click();

      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'Test User logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: 'test' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('.title').type('Test Blog');
      cy.get('.author').type('John Doe');
      cy.get('.url').type('https://www.test.com');
      cy.get('.create-btn').click();

      cy.get('.notification')
        .should('contain', 'added a new blog Test Blog by John Doe')
        .and('have.css', 'color', 'rgb(0, 128, 0)');

      cy.contains('Test Blog John Doe');
    });

    describe('And a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Blog',
          author: 'John Doe',
          url: 'https://www.test.com',
          likes: 3,
        });
      });

      it('Can be liked', function () {
        cy.get('.view-btn').click();
        cy.get('.like-btn').click();
        cy.get('.like').contains(4);
      });

      it('Can only be removed by creator', function () {
        cy.get('.view-btn').click();
        cy.get('.remove-btn').click();

        cy.get('.notification')
          .should('contain', 'Removed Test Blog')
          .and('have.css', 'color', 'rgb(0, 128, 0)');

        cy.get('html').should('not.contain', 'Test Blog John Doe');
      });

      it('Cant be removed by other users', function () {
        cy.logout();
        cy.login({ username: 'tester2', password: 'test' });
        cy.get('.view-btn').click();
        cy.get('html').should('not.contain', '.remove-btn');
      });

      it('Is ordered by likes', function () {
        cy.createBlog({
          title: 'Blog with most likes',
          author: 'John doe',
          url: 'https://www.test.com',
          likes: 3,
        });
        cy.contains('Blog with most likes')
          .parent()
          .find('.view-btn')
          .as('view');
        cy.get('@view').click();

        cy.contains('Blog with most likes')
          .parent()
          .find('.like-btn')
          .as('like');
        cy.get('@like').click();

        cy.get('.like').contains(4);

        cy.get('.blog').eq(0).should('contain', 'Blog with most likes');
        cy.get('.blog').eq(1).should('contain', 'Test Blog');
      });
    });
  });
});
