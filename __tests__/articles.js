const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/dbconfig");

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1OTA2MzI0MjksImV4cCI6MTU5MDYzOTYyOX0.z2i2w-fVlVPcXzX--eVDKXQOeUzwRjNwAYCvopJ-JSI'

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE1OTA2MzYzMDUsImV4cCI6MTU5MDY0MzUwNX0.vriaEv2sXu-tX26Tx0v2Ga0sPbvxJgLZEGJEFhoi0JM'

describe("users integration test", () => {
  const data = {
    "category_id": "1",
    "url": "http://hi.com",
  };

  const data_no_category_id = {
    "url": "http://hi.com",
  };

  const data_no_url = {
    "category_id": "1",
  };

  const data_category_id_high = {
    "category_id": "11",
    "url": "http://hi.com",
  };

  const data_category_id_low = {
    "category_id": "0",
    "url": "http://hi.com",
  };

  const data_url_empty_string = {
    "category_id": "1",
    "url": "",
  };


  /////////////////////////////////
  // Gets

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


  ////////////////////////////////
  // Posts

  // correct data
  it("POST /articles", async () => {
    const res = await supertest(server)
      .post("/api/articles")
      .send(data)
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(201);
    expect(res.body.url).toBe("http://hi.com")
    expect(res.body.user_id).toBe(1)
  });

  // no data
  it("POST /articles", async () => {
    const res = await supertest(server)
      .post("/api/articles")
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Request missing url and category.")
  });

  // no url
  it("POST /articles", async () => {
    const res = await supertest(server)
      .post("/api/articles")
      .send(data_no_url)
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Request missing required field: url")
  });

  // url empty string
  it("POST /articles", async () => {
    const res = await supertest(server)
      .post("/api/articles")
      .send(data_url_empty_string)
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("The url cannot be an empty string.")
  });

  // no category_id
  it("POST /articles", async () => {
    const res = await supertest(server)
      .post("/api/articles")
      .send(data_no_category_id)
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Request missing required field: category_id")
  });

  // invalid category_id range - too low
  it("POST /articles", async () => {
    const res = await supertest(server)
      .post("/api/articles")
      .send(data_category_id_low)
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("The category_id must be in the range of 1 to 10.")
  });

  // invalid category_id range - too high
  it("POST /articles", async () => {
    const res = await supertest(server)
      .post("/api/articles")
      .send(data_category_id_high)
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("The category_id must be in the range of 1 to 10.")
  });


  ////////////////////////////////
  // Puts

  // correct data
  it("PUT /articles/1", async () => {
    const res = await supertest(server)
      .put("/api/articles/1")
      .send(data)
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toBe("http://hi.com")
    expect(res.body.user_id).toBe(1)
  });

  // article belongs to another user
  it("PUT /articles/1", async () => {
    const res = await supertest(server)
      .put("/api/articles/1")
      .send(data)
      .set('Authorization', token2);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("The article id is not associated with this user.")
  });

  // invalid article id
  it("PUT /articles/30", async () => {
    const res = await supertest(server)
      .put("/api/articles/30")
      .send(data)
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("The article id was not found.")
  });

  // no data
  it("PUT /articles/1", async () => {
    const res = await supertest(server)
      .put("/api/articles/1")
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Request missing url and category.")
  });


  ////////////////////////////////
  // Deletes

  // correct data
  it("DELETE /articles/1", async () => {
    const res = await supertest(server)
      .delete("/api/articles/1")
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("The article has been deleted.")
  });

  // invalid article id
  it("DELETE /articles/30", async () => {
    const res = await supertest(server)
      .delete("/api/articles/30")
      .set('Authorization', token);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("The article id was not found.")
  });

});
