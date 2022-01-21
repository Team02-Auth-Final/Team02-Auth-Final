# Auth-Final

Creates an authenticated API server that utilizes Role Based Access Control (RBAC) using an Access Control List (ACL) for a simulated messages/forum module.

Deployed link: https://pokemon-fourm.herokuapp.com/ 

## Brainstorm:
1. Car Sales (car models and (Fianance, Sales, user))
2. Pokemon (Trainer - Pokemon organizer (Gen1))
- trainer is an admin
- viewer can see other trainers 6 person teams
4. Resturant (resurant with a (user, owner, employee))
5. Recipes (with different foods)


## Chosen Idea:
Pokemon Forum 
- public message (stretch goal)
 - non-auth viewer - read public
 - user - read write - read public and private
 - mod - read write edit - read public and private
 - admin - read write edit delete - read public and private

![Data Flow](/UML.png)

## Installation
- to install run `git@github.com:Team02-Auth-Final/pokemon-forum.git`
- `cd` into pokemon-forum
- run `npm install`

## Usage
- To start server run : `npm start`
- To test server run: `npm run test`

## Models

### User
```
'Users', {
    username: string, required,
    password: string, required,
    role: one of('user', 'writer', 'editor', 'admin'), required,
    token: required,
    capabilities: acl ['read', 'create', 'update', 'delete'],
}
```

### Messages
```
'Message', {
  username: string, required,
  content: string, required,
  private: string, required,
}
```

## Routes

### api/ 
- POST `/message` (authentication required)
  - requires model param, obj, token and acl with create permissions
  - returns created obj from database
- GET `/message`
  - requires model param
  - returns all objs from model database table
- GET `/message/:id`
  - requires model and id params
  - returns object in model database with that specific id
- PUT `/message/:id` (authentication required)
  - requires model and id params plus obj to update, token and acl with write permissions
  - returns updated obj
- DELETE `/message/:id` (authentication required)
  - requires model and id params, token and acl with delete permissions
  - returns status code either successful or not

### Signup
-  POST `/signup`
   -  requires a user object
   -  returns created user object from database

### Signin
-  POST `/signin`
   -  requires a user object
   -  returns validated user object from database with token

### Users
-  GET `/users`
   -  requires a validated token
   -  returns array of usernames in the database

## Features
- Error Handling
  - sends 404 if route or method is unavailable

## Testing
Verifies the following:
- complete testing of the routers bearer auth middleware, and the basic auth middleware

## Resources
- sequelize docs
- jest docs
- supertest docs
- http cats

