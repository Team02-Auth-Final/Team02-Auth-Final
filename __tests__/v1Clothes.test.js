'use strict';

const { server } = require('../lib/server');
const { db } = require('../lib/models');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Testing the v1 unauthorized router paths', () => {
  it('should create a record using POST', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 't-shirt',
      color: 'red',
      size: 'large',
    });

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('t-shirt');
  });

  it('should read a list of records using GET', async () => {
    await request.post('/api/v1/clothes').send({
      name: 'jeans',
      color: 'blue',
      size: 'large',
    });

    const response = await request.get('/api/v1/clothes');

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it('should read a record using GET', async () => {
    const response = await request.get('/api/v1/clothes/2');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('jeans');
  });

  it('Update a record using PUT', async () => {
    const response = await request.put('/api/v1/clothes/2').send({
      name: 't-shirt',
      color: 'gray',
      size: 'large',
    });

    expect(response.status).toEqual(200);
    expect(response.body.color).toEqual('gray');
  });

  it('should destroy a record using DELETE', async () => {
    const response = await request.delete('/api/v1/clothes/2');
    const getAttempt = await request.get('/api/v1/clothes/2');

    expect(response.status).toEqual(200);
    expect(response.header.data).toEqual(undefined);
    expect(getAttempt.body).toEqual(null);
  });
});