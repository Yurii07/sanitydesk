# Mock Server

Used to mock server API calls, based on json-server.

## Requirements

* Node.js latest is recommended.

## Base structure

* `server.js` - json-server config file;
* `db.json` - database file.

## Instalation

`npm install`

## Usage

* `npm run start` - run mock server on http://localhost:3000

Also, you can see subtasks in `package.json`.

## Routes

Based on the `db.json` file, here are all the default routes:

```
/cities
/countries
/states
/users
```

To access and modify resources, you can use any HTTP method:
 
`GET` `POST` `PUT` `PATCH` `DELETE` `OPTIONS`

## Examples

**Get all cities:**

```javascript
// GET /cities

[
    {
        "id": "1",
        "name": "Cherkasy",
        "state_id": "1"
    },
    // ...
    {
        "id": "24",
        "name": "Zhytomyr",
        "state_id": "24"
    }
]
```

**Get city by ID:**

```javascript
// GET /cities/24

[
    {
        "id": "24",
        "name": "Zhytomyr",
        "state_id": "24"
    }
]
```

**Add new user:**

```javascript
// POST /users

{
  "name": "Randolph Franklin",
  "email": "randolph.franklin@gmail.com",
  "phone_number": "380631213141",
  "address": null,
  "about_me": null,
  "country_id": "1",
  "state_id": "13",
  "city_id": "13"
}
```

## Related links

* [Node.js](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)
* [JSON Server](https://github.com/typicode/json-server)
