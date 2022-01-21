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

describe('Testing 404 error handler:', () => {
  it('should get a 404 error on a bad route', async () => {
    const response = await request.get('/badroute');
    expect(response.status).toEqual(404);
  });

  it('should get a 404 error on a bad method', async () => {
    const response = await request.patch('/badroute');
    expect(response.status).toEqual(404);
  });
});

describe('Testing 500 error handler:', () => {
  it('should get a 500 error on a bad route', async () => {
    const response = await request.post('/api/message');
    expect(response.status).toEqual(500);
  });
});