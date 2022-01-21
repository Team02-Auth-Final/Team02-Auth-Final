'use strict';

const { server } = require('../lib/server');
const { db } = require('../lib/models');
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Testing signup route:', () => {
  it('should POST to /signup to create a new admin user', async () => {
    const response = await request.post('/signup').send({
      username: 'admin',
      password: 'password',
      role: 'admin',
    });
    const user = response.body.user;
    console.log('USER TOKEN:', response.body.user.token);
    expect(response.status).toEqual(201);
    expect(user.username).toEqual('admin');
    expect(user.role).toEqual('admin');
    expect(user.capabilities.length).toEqual(4);
    expect(user.capabilities[3]).toEqual('delete');

  });

  it('should POST to /signup to create a new mod user', async () => {
    const response = await request.post('/signup').send({
      username: 'mod',
      password: 'password',
      role: 'mod',
    });
    const user = response.body.user;
    expect(response.status).toEqual(201);
    expect(user.username).toEqual('mod');
    expect(user.role).toEqual('mod');
    expect(user.capabilities.length).toEqual(3);
    expect(user.capabilities[2]).toEqual('update');
  });

  it('should POST to /signup to create a new user user', async () => {
    const response = await request.post('/signup').send({
      username: 'user',
      password: 'password',
      role: 'user',
    });
    const user = response.body.user;
    expect(response.status).toEqual(201);
    expect(user.username).toEqual('user');
    expect(user.role).toEqual('user');
    expect(user.capabilities.length).toEqual(2);
    expect(user.capabilities[0]).toEqual('read');
  });
});

describe('Testing signin route:', () => {
  it('should POST to /signin to signin an admin user', async () => {
    const response = await request.post('/signin').set({
      authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
    });

    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('admin');

  });

  it('should POST to /signin to signin an mod user', async () => {
    const response = await request.post('/signin').set({
      authorization: 'Basic bW9kOnBhc3N3b3Jk',
    });

    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('mod');

  });

  it('should POST to /signin to signin an user user', async () => {
    const response = await request.post('/signin').set({
      authorization: 'Basic dXNlcjpwYXNzd29yZA==',
    });

    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('user');
  });
});