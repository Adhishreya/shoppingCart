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

}, 100000);

test('login test', async () => {
    await request(app)
        .post('/users/signin')
        // .send(JSON.stringify({name: 'john'}))
        .send({username: "admin",  password: "admin" })
    // .set('Accept','application/json')
    // .expect('Content-Type',/json/)
    .expect(200);
},10000)


// test('login test', async () => {
//     await request(app)
//         .post('/users/signin')
//         .auth('admin', 'admin')
//         .set('Accept', 'application/json')
//         // .expect('Content-Type',/json/)
//         .expect(200);
// }, 10000)

afterAll(() => {
    mongoose.connection.close()
})
