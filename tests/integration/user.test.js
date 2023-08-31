const request = require("supertest");
const faker = require("faker");
const app = require("../../index");
const { User } = require("../../src/models/user.model");
const setupTestDB = require("../utils/setupTestDB");
const {
  userOne,
  userTwo,
  admin,
  insertUsers,
  accessToken,
} = require("../fixtures/user.fixture");

setupTestDB();

describe("User routes", () => {
  describe("POST /api/user", () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        userName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
        role: "user",
      };
    });

    test("should return 201 and successfully create new user if  data is ok", async () => {
      await insertUsers([admin]);

      const res = await request(app)
        .post("/api/user")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(newUser)
        .expect(201);

      expect(res.body).not.toHaveProperty("password");
      expect(res.body).toEqual({
        id: expect.anything(),
        userName: newUser.userName,
        email: newUser.email,
        role: newUser,
      });
    });
  });
});
