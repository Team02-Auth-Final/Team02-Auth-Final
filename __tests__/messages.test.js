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
let blastoiseToken;
let charizardToken;
let venusaurToken;


describe('Testing the authorized message router paths', () => {
  it('should create a record using POST', async () => {
    //create an admin user and grab token
    const blastoise = await request.post('/signup').send({
      username: 'Blastoise',
      password: 'password',
      role: 'admin',
    });

    const charizard = await request.post('/signup').send({
      username: 'Charizard',
      password: 'password',
      role: 'mod',
    });

    const venusaur = await request.post('/signup').send({
      username: 'Venusaur',
      password: 'password',
      role: 'user',
    });

    blastoiseToken = blastoise.body.user.token;
    charizardToken = charizard.body.user.token;
    venusaurToken = venusaur.body.user.token;

    const response = await request.post('/api/message').send({
      username: 'Blastoise',
      content: 'Use hydropump!',
      private: 'false',
    }).set({ authorization: blastoiseToken });

    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('Blastoise');
  });

  it('should read a list of records using GET', async () => {
    await request.post('/api/message').send({
      username: 'Charizard',
      content: 'I am not a fan of water.',
      private: 'false',
    }).set({ authorization: charizardToken });

    const response = await request.get('/api/message');

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it('should read a record using GET', async () => {
    const response = await request.get('/api/message/2');

    expect(response.status).toEqual(200);
    expect(response.body.content).toEqual('I am not a fan of water.');
  });

  it('Update a record using PUT', async () => {
    const response = await request.put('/api/message/2').send({
      name: 'Charizard',
      content: 'I am not a fan of Wartortle.',
      private: 'false',
    }).set({ authorization: charizardToken });

    expect(response.status).toEqual(200);
    expect(response.body.content).toEqual('I am not a fan of Wartortle.');
  });

  it('should destroy a record using DELETE', async () => {
    const response = await request.delete('/api/message/2').set({ authorization: blastoiseToken });
    const getAttempt = await request.get('/api/message/2');

    expect(response.status).toEqual(200);
    expect(response.header.data).toEqual(undefined);
    expect(getAttempt.body).toEqual(null);
  });
});