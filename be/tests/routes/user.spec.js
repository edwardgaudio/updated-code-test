
const request = require('supertest');
const { getDB } = require('../../db/');
const db = getDB();
let app;

describe('User Routes /routes/user', () => {
  describe('Login /user/login', () => {
    beforeEach(async () => {
      app = require('../../app');     
    });
    it('Should log in the user and return a token', async () => {
      

      const response = await request(app)
                              .post('/user/login')
                              .send({
                                username: 'edwardgaudio',
                                password: 'password1'
                              })
                              .set('Accept', 'application/json')

      expect(response.status).toBe(200);
      expect(response.body?.data?.token).toBeDefined();
    });
    it('Should return 422, unprocessable entity because of no password', async () => {
      

      const response = await request(app)
                              .post('/user/login')
                              .send({
                                username: 'edwarddgaudio',
                              })
                              .set('Accept', 'application/json')

      expect(response.status).toBe(422);
      expect(response.body?.data?.token).toBeUndefined();
      expect(response.body?.message).toBe('Missing username or password');
    });
    it('Should return 401, unprocessable entity because of bad username and password', async () => {
      

      const response = await request(app)
                              .post('/user/login')
                              .send({
                                username: 'edwarddgaudio',
                                password: 'Password1'
                              })
                              .set('Accept', 'application/json')

      expect(response.status).toBe(401);
      expect(response.body?.data?.token).toBeUndefined();
      expect(response.body?.message).toBe('Mismatching username and username');
    });
    it('Should return 401, unauthorized because wrong username', async () => {
      

      const response = await request(app)
                              .post('/user/login')
                              .send({
                                username: 'edwardddio',
                                password: 'Password1'
                              })
                              .set('Accept', 'application/json')

      expect(response.status).toBe(401);
      expect(response.body?.data?.token).toBeUndefined();
      expect(response.body?.message).toBe('Mismatching username and username');
    });
    it('Should return 401, unauthorized because wrong password', async () => {
      

      const response = await request(app)
                              .post('/user/login')
                              .send({
                                username: 'edwarddgaudio',
                                password: 'Passd1'
                              })
                              .set('Accept', 'application/json')

      expect(response.status).toBe(401);
      expect(response.body?.data?.token).toBeUndefined();
      expect(response.body?.message).toBe('Mismatching username and username');
    });
    afterEach(async () => {
      await app.close();        
    });
  });

  describe('Signup /user/login', () => {
    beforeAll( async () => {
      await db('users').delete().where({'is_test': true});
    });

    beforeEach(async () => {
      app = require('../../app');     
    });
    it('Should sign up and create a user', async () => {
      const response = await request(app)
                              .post('/user/signup')
                              .send({
                                username: 'edward_test',
                                password: 'password1P',
                                is_test: true,
                              })
                              .set('Accept', 'application/json')

      expect(response.status).toBe(200);
      expect(response.body?.data?.token).toBeDefined();
    });
    it('Should error on signup, no username', async () => {
      

      const response = await request(app)
                              .post('/user/signup')
                              .send({
                                password: 'password1P'
                              })
                              .set('Accept', 'application/json')

      expect(response.status).toBe(422);
      expect(response.body?.message).toContain('Missing Username or password')
    });
    it('Should error on signup, no password', async () => {
      

      const response = await request(app)
                              .post('/user/signup')
                              .send({
                                username: 'passwioujoiu1P'
                              })
                              .set('Accept', 'application/json')

      expect(response.status).toBe(422);
      expect(response.body?.message).toContain('Missing Username or password')
    });
    it('Should error on signup, password doesn\'t pass regex', async () => {
      

      const response = await request(app)
                              .post('/user/signup')
                              .send({
                                username: 'passwioujoiu1P',
                                password:'www'
                              })
                              .set('Accept', 'application/json')

      expect(response.status).toBe(422);
      expect(response.body?.message).toContain('Password can only contain letters, numbers or')
    });
    afterEach(async () => {
      await app.close();        
    });
    // afterAll( async () => {
    //   await db('users').delete().where({'is_test': true});
    // });
  });
});