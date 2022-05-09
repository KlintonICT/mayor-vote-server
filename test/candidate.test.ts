import assert from 'assert';
import request from 'supertest';

const API = 'http://localhost:4000/api';

describe('GET /candidates', () => {
  test('should return the list of candidates', (done) => {
    request(API)
      .get('/candidates')
      .expect(200)
      .then((response) => {
        const candidates = response.body;
        assert(candidates.length > 0);
        
        done();
      })
      .catch((err) => done(err));
  });
});
