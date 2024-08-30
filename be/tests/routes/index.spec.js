
const request = require('supertest');
let app;

describe('GET /', () => {
  beforeEach(async () => {
    app = require('../../app');     
  });
  it('should return a list from the db as just a sanity check that connection is there', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body[0]).toBeDefined();
  });
  afterEach(async () => {
    await app.close();        
  });
});