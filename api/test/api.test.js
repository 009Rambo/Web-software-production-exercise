const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /api/v1/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
  describe('Endpoint /api/v1/books', () => {
    it('should respond with 200 when called with GET request', (done) => {
      request(app)
        .get('/api/v1/books')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  
  
  it('should return a list of books when called with GET', (done) => {
    const expected = [
      {
        id: 1,
        name: 'Parijat',
      },
      {
        id: 2,
        name: 'Setodharti',
      },
      {
        id: 3,
        name: 'Radha',
      },
    ];
    request(app)
      .get('/api/v1/books')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });
  
  
  it('should return the books when called with GET id', (done) => {
    const expected = {
      id: 2,
      name: 'Setodharti',
    };
    request(app)
      .get('/api/v1/books/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });
  
  
  it('should return 404 if nothing was found with the id', (done) => {
    request(app)
      .get('/api/v1/books/20')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Not found' }, done);
  });
  
  
  it('should return 201 when new books was added', async () => {
    await request(app)
      .post('/api/v1/books/')
      .set('Accept', 'application/json')
      .send({ id: 4, name: 'Mahadev' })
      .expect('Content-Type', /json/)
      .expect(201, { message: 'Created' });
    // Check that it was actually added as well
    const expected = {
      id: 4,
      name: 'Mahadev',
    };
    await request(app)
      .get('/api/v1/books/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected);
    });
  
  
  it('should return 200 when books was updated', async () => {
    await request(app)
      .patch('/api/v1/books/3')
      .set('Accept', 'application/json')
      .send({ name: 'Casino Royale' })
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Updated' });
    // Check that it was actually added as well
    const expected = {
      id: 3,
      name: 'Casino Royale',
    };
    await request(app)
      .get('/api/v1/books/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected);
  });
  
  
  it('should return 200 when books was deleted', async () => {
    await request(app)
      .delete('/api/v1/books/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Deleted' });
      
    await request(app)
      .get('/api/v1/books/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Not found' });
  });
  });
  
  
});
