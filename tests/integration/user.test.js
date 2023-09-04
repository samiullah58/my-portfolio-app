const request = require("supertest");
const app = require("../../index");
const { User } = require("../../src/models/user.model");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const clearDatabase = require("../utils/db");
const { mock } = require("nodemailer");

describe("User routes", () => {
  describe("POST /api/user", () => {
    beforeEach(async () => {
      await clearDatabase();
    });
    // Define your test user data
    const testUser = {
      userName: "Test User",
      email: "test@example.com",
      password: "password1",
    };

    it("should create a new user and send a verification email", async () => {
      // Send a POST request to the createUser route
      const response = await request(app)
        .post("/api/user")
        .send(testUser)
        .expect(httpStatus.OK);

      // Ensure the response body contains the expected success message
      expect(response.body).toEqual({
        message: "User added successfully. Verification email sent.",
      });

      // Retrieve the sent emails after sending the request
      const sentEmails = mock.getSentMail();

      // Perform assertions on the sent emails
      expect(sentEmails.length).toBe(1);
      expect(sentEmails[0].to).toBe("samiullahrashid4@gmail.com");

      // Verify that the user was saved to the database and other assertions as needed
      const user = await User.findOne({ email: testUser.email });
      expect(user).toBeDefined();
      expect(user.password).not.toEqual(testUser.password);
      expect(user).toMatchObject({
        userName: user.userName,
        email: user.email,
        role: user.role,
        isVerified: false,
      });
    });
  });
});
