import { myServer } from '../src/server';

import { default as request } from 'supertest';

let newUserId = '';

describe('API testing. First route', () => {
  it('should get all users', async () => {
    const res = await request(myServer).get('/api/users').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0);
  });

  it('should create a new user', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .send({
        username: 'Petya',
        age: 45,
        hobbies: ['diplomacy'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toBe('Petya');
    expect(res.body.age).toBe(45);
  });

  it('should get user by id', async () => {
    const res1 = await request(myServer).get(`/api/users`).send();
    newUserId = res1.body[0].id;
    const res = await request(myServer).get(`/api/users/${newUserId}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toBe('Petya');
  });

  it('should update a user', async () => {
    const res = await request(myServer)
      .put(`/api/users/${newUserId}`)
      .send({
        hobbies: ['diplomacy', 'history'],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.hobbies[0]).toEqual('diplomacy');
  });

  it('should delete a user', async () => {
    const res = await request(myServer)
      .delete(`/api/users/${newUserId}`)
      .send();
    expect(res.statusCode).toEqual(204);
  });

  it('should get error 404 when getting deleted user', async () => {
    const res = await request(myServer).get(`/api/users/${newUserId}`).send();
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toMatch(new RegExp("I don't know user"));
  });
});

afterAll((done) => {
  myServer.close();
  done();
});
