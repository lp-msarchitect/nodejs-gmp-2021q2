/**
 * Tests Foo class
 *
 * @group int
 */
import request, { Response } from 'supertest';
import app from '../src/app';
import db from '../src/db/models/index';

jest.mock('../src/db/models/index', () => ({
  User: {
    findOne: jest.fn().mockResolvedValue({
      id: 'ae7493c3-5976-4725-8270-79004a1599f0',
      login: 'nagibator666',
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        id: '667fbb60-0215-4079-84d7-41116632e9ca',
        login: 'nagibator666',
        age: 16,
        groups: [],
      },
    ]),
    create: jest.fn().mockImplementation((user) => ({
      ...user,
      id: '$$',
      groups: [],
    })),
  },
}));

let token: string;

//get auth token
beforeAll((done) => {
  process.env.TOKEN_SECRET = 'secret';
  request(app)
    .post('/login')
    .send({
      login: 'nagibator666',
      password: 'q1w2e3',
    })
    .then((response: Response) => {
      token = response.body.token;
      done();
    });
});

describe('/users', () => {
  process.env.TOKEN_SECRET = 'secret';
  test('It should response the GET method with users list', (done) => {
    request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(
        200,
        [
          {
            id: '667fbb60-0215-4079-84d7-41116632e9ca',
            login: 'nagibator666',
            age: 16,
            groups: [],
          },
        ],
        done,
      );
  });
  test('It should response the POST method with created user', (done) => {
    const userRequest = {
      login: 'testuser',
      password: 'aaaaa3',
      age: 32,
    };
    request(app).post('/users').set('Authorization', `Bearer ${token}`).send(userRequest).expect(
      201,
      {
        id: '$$',
        login: userRequest.login,
        age: userRequest.age,
        groups: [],
      },
      done,
    );
  });
});
