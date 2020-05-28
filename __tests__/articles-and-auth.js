const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/dbconfig");

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1OTA2NDU1MTEsImV4cCI6MTU5MDY1MjcxMX0.bovBIxZJ4chd9yeJSsHvVFCIW3VksqHoYHoR467QSXc'

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE1OTA2NDU1MzksImV4cCI6MTU5MDY1MjczOX0.u8YReEE1lUqavm1gmCnRbZ8wJoDLBRA4DNti5HGfJqQ'

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//
// Articles
//
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

describe("articles integration test", () => {
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

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//
// Auth
//
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

describe("auth integration test", () => {
  const data_register = {
    "username": "notesong",
    "password": "pw",
  };

  const data_login = {
    "username": "note",
    "password": "pw",
  };

  const data_no_username = {
    "password": "pw",
  };

  const data_no_password = {
    "username": "note",
  };

  const data_username_empty_string = {
    "username": "",
    "password": "pw",
  };

  const data_password_empty_string = {
    "username": "note",
    "password": "",
  };

  /////////////////////////////////
  // Register

  // correct values
  it("POST /auth/register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(data_register);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("notesong")
  });

  // duplicate username
  it("POST /auth/register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(data_login);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Username is already taken.")
  });

  // no data
  it("POST /auth/register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Request missing username and password.")
  });

  // no username
  it("POST /auth/register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(data_no_username);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Request missing required field: username.")
  });

  // no password
  it("POST /auth/register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(data_no_password);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Request missing required field: password.")
  });

  // empty username
  it("POST /auth/register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(data_username_empty_string);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("A username cannot be an empty string.")
  });

  // empty password
  it("POST /auth/register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(data_password_empty_string);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("A password cannot be an empty string.")
  });

  /////////////////////////////////
  // Login

  // valid data
  it("POST /auth/login", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send(data_login);
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toContain("note")
  });

  // no data
  it("POST /auth/login", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Request missing username and password.")
  });
});
