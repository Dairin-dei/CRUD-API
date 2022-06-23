import { myServer } from '../src/server';

import { default as request } from 'supertest';

let newUserId = '';

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
    expect(res.body).toHaveLength(1);
  });
});

afterAll((done) => {
  myServer.close();
  done();
});
