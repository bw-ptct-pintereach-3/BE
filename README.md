# Back-End Guide

## Endpoints

Add the code necessary to create a Web API and implement the following _endpoints_:

| Method | URL                | Requires                      | Description                                                                  |
| ------ | ------------------ | ----------------------------- | ---------------------------------------------------------------------------- |
| POST   | /api/auth/register | `username` `password`         | Creates a user account using the information sent inside the `request body`. |
| POST   | /api/auth/login    | `username` `password` `token` | Logs user into app.                                                          |

### Register Data Returned

```js
{
  "id": 3,
  "username": "dob"
}
```

### Login Data Returned

```js
{
  "message": "Welcome, song!",
  "id": 2,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbmciLCJ1c2VyX2lkIjoyLCJpYXQiOjE1OTAyMTQ4NTgsImV4cCI6MTU5MDIyMjA1OH0.GjN2X1uIo6r8AjMmVwcRe_46YDm-NiIJWFsRYZK3Ass"
}
```

| Method | URL               | Requires                    | Description                                                                                                   |
| ------ | ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| GET    | /api/articles     | `token`                     | Returns an array of articles.                                                                                 |
| GET    | /api/articles/:id | `token`                     | Returns an article with the specified `id`.                                                                   |
| POST   | /api/articles     | `url` `category_id` `token` | Creates an article using the information sent inside the `request body`. Returns the new article.             |
| PUT    | /api/articles/:id | `url` `category_id` `token` | Updates the article with the specified `id` using data from the `request body`. Returns the modified article. |
| DELETE | /api/articles/:id | `token`                     | Removes the article with the specified `id`.                                                                  |

### Get Article Data Returned

```js
[
  {
    id: 9,
    url: "https://slack.com",
    user_id: 1,
    category_id: 9,
  },
  {
    id: 10,
    url: "https://youtube.com",
    user_id: 1,
    category_id: 10,
  },
];
```

### Get Article with Specified ID Data Returned

```js
{
  "id": 9,
  "url": "https://slack.com",
  "user_id": 1,
  "category_id": 9
}
```

| Method | URL        | Description                                                                   |
| ------ | ---------- | ----------------------------------------------------------------------------- |
| GET    | /api/users | Returns all users. Only to be used for development purposes. No requirements. |

### Users Get Data Returned

```js
[
  {
    id: 1,
    username: "note",
  },
  {
    id: 2,
    username: "song",
  },
];
```
