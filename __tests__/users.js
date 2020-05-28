const supertest = require("supertest");
const server = require("../api/server");

describe("users integration test", () => {
  it("GET /users", async () => {
    const res = await supertest(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(2);
    expect(res.body[0].username).toBe("note");
    expect(res.body[1].username).toBe("song");
  });
});
