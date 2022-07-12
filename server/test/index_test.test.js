const request = require('supertest');
const assert = require('assert');
const express = require('express');
const mongoose = require('mongoose');



const app = require('../index');

test('check the endpoint', async () => {

    await request(app)
        .get('/products')
        .expect('Content-Type', /json/)
        .expect(200);

},100000)

afterAll(() => {
    mongoose.connection.close()
})
