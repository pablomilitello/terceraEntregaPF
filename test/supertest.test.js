import '../src/DAL/mongoDB/dbConfig.js';
import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import { ROLE_ADMIN, ROLE_USER } from '../src/DAL/mongoDB/models/users.model.js';

const productTest = {
  title: 'Gloves',
  description: 'red gloves winter',
  category: 'winter',
  price: 5,
  thumbnail: [],
  code: 'ABCRTS',
  stock: 1500,
  status: true,
  owner: ROLE_ADMIN,
};

describe('Testing Products Router from Mongo DB', function () {
  it('Must return all products', async function () {
    const response = await request(app).get('/api/products');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.equal('success');
    expect(response.body.payload).to.be.an('array');
  });

  it('The test must add a product to the DB', async function () {
    const response = await request(app).post('/api/products').send(productTest);
    expect(response.status).to.equal(201);
    expect(response.body).to.be.an('object');
  });
});

describe('The test should test a user registration', function () {
  it('Must return ', async function () {
    const userTest = {
      firstName: 'Prueba',
      lastName: 'Test',
      email: 'ptest@mail.com',
      age: 1,
      password: '12345',
      role: ROLE_USER,
    };
    const response = await request(app).post('/register/login').send(userTest).followRedirect(true);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
});
