import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server';

chai.use(chaiHttp);

describe('Default API Route', () => {
  it(`should return 200 HTTP success 
  code when pointed to the default route`, async () => {
    const res = await chai.request(app).get('/api/v1');
    expect(res).to.have.status(200);
  });
});
