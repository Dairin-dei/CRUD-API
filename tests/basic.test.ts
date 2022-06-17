import { myServer } from '../src/server';

import { default as request } from 'supertest';
import { v4 as uuid } from 'uuid';
const newUserId = uuid();

describe('API testing. First route', () => {
  /* it('should get all users', async () => {
    const res = await request(myServer).get('/api/users').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0);
  });*/

  it('A new object is created by a POST api/users request (a response containing newly created record is expected)', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .send({
        username: 'kamran',
        age: 26,
        hobbies: ['1', '2'],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('kamran');
    expect(res.body.age).toBe(26);
    expect(res.body.hobbies).toEqual(['1', '2']);
  });

  /* it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        id: newUserId,
        username: 'Petya',
        age: 45,
        hobbies: ['diplomacy'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('Petya');
  });

  it('should get user by id', async () => {
    const res = await request(myServer).get(`/api/users/${newUserId}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('Petya');
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put(`/api/users/${newUserId}`)
      .send({
        hobbies: ['diplomacy,history'],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('history');
  });

  it('should delete a user', async () => {
    const res = await request(app)
      .delete(`/api/users/${newUserId}`)
      .send({
        hobbies: ['diplomacy,history'],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('was deleted');
  });

  it('should get all users', async () => {
    const res = await request(myServer).get(`/api/users/${newUserId}`).send();
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("I don't know user");
  });*/
});
