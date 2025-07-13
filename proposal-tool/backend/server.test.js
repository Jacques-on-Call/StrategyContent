const request = require('supertest');
const app = require('./server'); // This will not work as server.js does not export the app

describe('API Endpoints', () => {
  it('should fetch all services', async () => {
    const res = await request(app).get('/api/services');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
