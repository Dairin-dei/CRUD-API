import { myServer } from '../src/server';

import { default as request } from 'supertest';
import { v4 as uuid } from 'uuid';
import { endianness } from 'os';
import { USERS } from '../src/data';
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

describe("API testing. Third route: doesn't go to unknown route, doesn't get user with non-valid id, creates user, gets all users", () => {
  it("doesn't go to unknown route", async () => {
    const res = await request(myServer).get('/api/posts').send();
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toMatch(new RegExp("I don't know answer"));
  });

  it("doesn't get user with non-valid id", async () => {
    const res = await request(myServer).get(`/api/users/111`).send();
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(new RegExp('is not valid'));
  });

  it('should create a new user', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .send({
        username: 'Vasya',
        age: 45,
        hobbies: ['history'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toBe('Vasya');
    expect(res.body.age).toBe(45);
  });

  it('should get all users', async () => {
    const res = await request(myServer).get('/api/users').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
    newUserId = res.body[0].id;
  });
});
