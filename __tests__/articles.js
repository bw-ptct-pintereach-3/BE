const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbconfig");

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe("users integration test", () => {
  let data = {
    "user_id": "1",
    "category_id": "1",
    "url": "http://hi.com",
  };

  it("GET /articles", async () => {
    const res = await request(server)
      .get("/articles")
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1OTA2MzI0MjksImV4cCI6MTU5MDYzOTYyOX0.z2i2w-fVlVPcXzX--eVDKXQOeUzwRjNwAYCvopJ-JSI');
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
  });
});
