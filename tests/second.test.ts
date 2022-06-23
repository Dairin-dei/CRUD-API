import { myServer } from '../src/server';

import { default as request } from 'supertest';

let newUserId = '';

describe("API testing. Second route: creates user, doesn't create user with mistakes in data, gets all users, update user", () => {
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

  it("shouldn't create a new user with mistakes in data", async () => {
    const res = await request(myServer)
      .post('/api/users')
      .send({
        username: 'John',
        age: 'my age',
        hobbies: ['music'],
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toMatch(
      new RegExp('You should send non-empty username')
    );
  });

  let newUserId = '';

  it('should get all users', async () => {
    const res = await request(myServer).get('/api/users').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    newUserId = res.body[0].id;
  });

  it('should update a user', async () => {
    const res = await request(myServer).put(`/api/users/${newUserId}`).send({
      age: 25,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.age).toEqual(25);
  });
});

afterAll((done) => {
  myServer.close();
  done();
});
