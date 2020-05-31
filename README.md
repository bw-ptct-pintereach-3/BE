# Pintereach Back-End API User Guide

## Back-End URL

[https://pintereach-3-be.herokuapp.com/](https://pintereach-3-be.herokuapp.com/)

## Categories Available

| category_id | category      |
| ----------- | ------------- |
| 1           | Education     |
| 2           | Recreation    |
| 3           | Cooking       |
| 4           | Shopping      |
| 5           | Technology    |
| 6           | Entertainment |
| 7           | Professional  |
| 8           | Health        |
| 9           | Sports        |
| 10          | Other         |

## Endpoints

### Categories Endpoints


| Method | URL                 | Requires | Description                                    |
| ------ | ------------------- | -------- | ---------------------------------------------- |
| GET    | /api/categories     | `token`  | Returns all categories.                        |
| GET    | /api/categories/:id | `token`  | Returns an categories with the specified `id`. |

##### GET Categories Data Returned

```js
[
  {
    "id": 1,
    "category": "Education"
  },
  {
    "id": 2,
    "category": "Recreation"
  },
  {
    "id": 3,
    "category": "Cooking"
  },
  {
    "id": 4,
    "category": "Shopping"
  },
  {
    "id": 5,
    "category": "Technology"
  },
  {
    "id": 6,
    "category": "Entertainment"
  },
  {
    "id": 7,
    "category": "Professional"
  },
  {
    "id": 8,
    "category": "Health"
  },
  {
    "id": 9,
    "category": "Sports"
  },
  {
    "id": 10,
    "category": "Other"
  }
]
```

##### GET Category by ID Data Returned

```js
{
  "id": 5,
  "category": "Technology"
}
```

### Register and Login Endpoints


| Method | URL                | Requires                      | Description                                                                  |
| ------ | ------------------ | ----------------------------- | ---------------------------------------------------------------------------- |
| POST   | /api/auth/register | `username` `password`         | Creates a user account using the information sent inside the `request body`. |
| POST   | /api/auth/login    | `username` `password` `token` | Logs user into app.                                                          |

##### POST Register Data Returned

```js
{
  "id": 3,
  "username": "dob"
}
```

##### POST Login Data Returned

```js
{
  "message": "Welcome, song!",
  "username": "song",
  "id": 2,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbmciLCJ1c2VyX2lkIjoyLCJpYXQiOjE1OTAyMTQ4NTgsImV4cCI6MTU5MDIyMjA1OH0.GjN2X1uIo6r8AjMmVwcRe_46YDm-NiIJWFsRYZK3Ass"
}
```

### Articles Endpoints

| Method | URL               | Requires                    | Description                                                                                                   |
| ------ | ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| GET    | /api/articles     | `token`                     | Returns an array of articles.                                                                                 |
| GET    | /api/articles/:id | `token`                     | Returns an article with the specified `id`.                                                                   |
| POST   | /api/articles     | `url` `category_id` `token` | Creates an article using the information sent inside the `request body`. Returns the new article.             |
| PUT    | /api/articles/:id | `url` `category_id` `token` | Updates the article with the specified `id` using data from the `request body`. Returns the modified article. |
| DELETE | /api/articles/:id | `token`                     | Removes the article with the specified `id`.                                                                  |

##### GET Article Data Returned

```js
[
  {
    "id": 9,
    "url": "https://slack.com",
    "user_id": 1,
    "category_id": 9,
  },
  {
    "id": 10,
    "url": "https://youtube.com",
    "user_id": 1,
    "category_id": 10,
  },
];
```

##### GET with ID, POST, and PUT Article Data Returned

```js
{
  "id": 9,
  "url": "https://slack.com",
  "user_id": 1,
  "category_id": 9
}
```

##### DELETE Article Data Returned

```js
{
  "message": "The article has been deleted."
}
```


### Users Endpoints

| Method | URL        | Description                                                                   |
| ------ | ---------- | ----------------------------------------------------------------------------- |
| GET    | /api/users | Returns all users. Only to be used for development purposes. No requirements. |

##### GET Users Data Returned

```js
[
  {
    "id": 1,
    "username": "note",
  },
  {
    "id": 2,
    "username": "song",
  },
];
```
