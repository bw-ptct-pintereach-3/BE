const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/dbconfig");

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe("users integration test", () => {
  const data = {
    "category_id": "1",
    "url": "http://hi.com",
  };

  /////////////////////////////////
  // Register

  // correct values
  it("GET /articles", async () => {
    const res = await supertest(server)
      .get("/api/articles")
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].url).toBe("https://google.com")
    expect(res.body[1].url).toBe("https://twitter.com")
  });

  // correct values
  it("GET /articles/:id", async () => {
    const res = await supertest(server)
      .get("/api/articles/1")
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toBe("https://google.com")
  });

  // invalid article id
  it("GET /articles/:id", async () => {
    const res = await supertest(server)
      .get("/api/articles/30")
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("The article id was not found.")
  });

  /////////////////////////////////
  // Login

  // correct values
  it("GET /articles", async () => {
    const res = await supertest(server)
      .get("/api/articles")
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].url).toBe("https://google.com")
    expect(res.body[1].url).toBe("https://twitter.com")
  });

  // correct values
  it("GET /articles/:id", async () => {
    const res = await supertest(server)
      .get("/api/articles/1")
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toBe("https://google.com")
  });

  // invalid article id
  it("GET /articles/:id", async () => {
    const res = await supertest(server)
      .get("/api/articles/30")
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("The article id was not found.")
  });
});
