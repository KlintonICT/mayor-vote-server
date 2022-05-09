import assert from 'assert';
import request from 'supertest';

const API = 'http://localhost:4000/api';

describe('POST /status', () => {
  test('should return status true or false if voter can vote or not', (done) => {
    request(API)
      .post('/vote/status')
      .send({ nationalId: '8518391881351' })
      .then((response) => {
        const { status } = response.body;
        assert(typeof status === 'boolean');

        done();
      })
      .catch((err) => done(err));
  });
});

describe('POST /', () => {
  test('should return the status for vote request', (done) => {
    request(API)
      .post('/vote')
      .send({ nationalId: '8518391881351', candidateId: '1' })
      .expect(200)
      .then((response) => {
        const { status, message } = response.body;

        assert(typeof status === 'string');
        if (status !== 'ok') {
          assert(typeof message === 'string');
        }

        done();
      })
      .catch((err) => done(err));
  });
});
