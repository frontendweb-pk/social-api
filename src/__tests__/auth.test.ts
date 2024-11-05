import { describe } from "node:test";
import supertest from "supertest";
import app from "../app";

const register = {
  email: "pk@gmail.com",
  password: "password",
  firstname: "pk",
  lastname: "kumar",
  mobile: "1234567890",
};

const login = {
  email: "pk@gmail.com",
  password: "password",
};
beforeAll(async () => {});

describe("auth", async () => {
  // Test case to check if user already exists
  it("Check if user already exists", async () => {
    try {
      const response = await supertest(app)
        .post("/api/auth/register")
        .send(register);

      expect(response.status).toBe(400);
    } catch (e) {
      if (e instanceof Error) expect(e.message).toBe("User already exists");
    }
  });
  // Test case to register a user
  //   it("should register a user", async () => {
  //     const response = await supertest(app)
  //       .post("/api/auth/register")
  //       .send(register);
  //     expect(response.status).toBe(201);
  //   });

  // Test case to register a user
  it("Should loggedin user if user exist", async () => {
    const response = await supertest(app).post("/api/auth/login").send(login);
    expect(response.status).toBe(200);
  });
});
