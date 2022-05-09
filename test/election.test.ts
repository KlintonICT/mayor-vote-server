import assert from 'assert';
import request from 'supertest';

const API = 'http://localhost:4000/api';

describe('GET /election/status', () => {
  test('should return the enable status whether true of false', (done) => {
    request(API)
      .get('/election/status')
      .expect(200)
      .then((response) => {
        const { enable } = response.body;
        expect(typeof enable).toBe('boolean');

        done();
      })
      .catch((err) => done(err));
  });
});

describe('POST /election/toggle', () => {
  test('should return status or list of votedCount when open or close the vote', (done) => {
    request(API)
      .post('/election/toggle')
      .expect(200)
      .then((response) => {
        const data = response.body;

        if (data?.enable) {
          // when the vote is opening
          expect(data?.status).toBe('ok');
          expect(typeof data?.enable).toBe('boolean');
        } else {
          // when the vote is closed
          assert(data.length > 0);
        }

        done();
      })
      .catch((err) => done(err));
  });
});

describe('GET /election/result', () => {
  test('should return the list of voted result or empty array', (done) => {
    request(API)
      .get('/election/result')
      .expect(200)
      .then((response) => {
        const data = response.body;
        assert(data.length >= 0);

        done();
      })
      .catch((err) => done(err));
  });
});
