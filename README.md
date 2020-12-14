# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate during the sprint challenge. However, you are encouraged to follow the twenty-minute rule.

_You have **three hours** to complete this challenge. Plan your time accordingly._

## Introduction

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

We need users to be able to hit the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can hit `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.
   sessions are stored on the server (in a manner specified by the developer, usually in a database, but can also be stored in memory), JWTs are stored by the client. One advantage of not storing authentication status data on the server is that no cleanup of this data is required. The JWTs can have expiration dates encoded into them which can be used as part of the authentication check that the server does upon receiving the token.
2. What does `bcryptjs` do to help us store passwords in a secure manner?
   bcryptjs hashes passwords one-directionally. A hashing algorithm runs input information through a series of steps that will always produce the same output for the same input but that algorithm cannot be run in reverse. Therefore the hashed password cannot be used to algorithmically calculate the actual password. However, since many users have similar passwords, an attacker could deduce many passwords by using a table of known password hashes. To make this difficult for attackers, bcrypt adds 'salt' to the hashes (an additional hashed input)
3. How are unit tests different from integration and end-to-end testing?
   unit tests test individual functions to ensure that they behave as expected in isolation
   integration tests are used to check that multiple functions interact with each other as expected
   end-to-end testing is used to check that the entire application works as expected
4. How does _Test Driven Development_ change the way we write applications and tests?
   TDD suggests that developers begin their work by writing the tests first and then writing their code to satisfy the tests. There are many benefits to TDD, your production code will be less buggy, more modularized, contain more 'pure functions', and of course be less buggy.

You are expected to be able to answer questions in these areas.

## Instructions

### Task 1: Project Set Up

- [ ] Create a forked copy of this project.
- [ ] Clone your OWN version of the repository (Not Lambda's by mistake!).
- [ ] Create a new branch: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [ ] Push commits: git push origin `<firstName-lastName>`

### Task 2: Project Requirements

Your finished project must include all of the following requirements:

- [ ] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [ ] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted-endpoint.js`.
- [ ] A minimum of 2 tests per API endpoint, implemented inside `api/server.test.js`.

**Notes:**

- The database already has the `users` table, but if you run into issues, the migrations are available.
- Remember to check `package.json` to see which libraries need to be installed and which don't.
- You are welcome to create additional modules for middlewares or data models, but **do not move or rename existing files** or folders.

In your solution, it is essential that you follow best practices and produce clean and professional results. You will be scored on your adherence to proper code style and good organization. Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work. It is better to submit a challenge that meets MVP than one that attempts too much and does not.

### Task 3: Stretch Goals

After finishing your required elements, you can push your work further. These goals should be attempted on a branch **different than `<firstName-lastName>`**. They may or may not be things you have learned in this module but they build on the material you just studied. Time allowing, stretch your limits and see if you can deliver on the following optional goals:

- [ ] Write at least 4 tests per endpoint.
- [ ] Extract user validation into a separate method and write unit tests for it.
- [ ] Use a separate testing database for the endpoint tests.
- [ ] Implement authentication using sessions instead of tokens.

## Submission format

Follow these steps for completing your project.

- [ ] Submit in Canvas a Pull-Request to merge `<firstName-lastName>` Branch into main (student's Repo). **Please don't merge your own pull request**
