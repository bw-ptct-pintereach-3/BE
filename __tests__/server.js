const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/dbconfig");

describe("users integration test", () => {
  it("GET /users", async () => {
    const res = await supertest(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.api).toBe("up");
  });
});
