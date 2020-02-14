import chai, { expect } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';

import { signinDetails } from '../__mocks__';
import app from '../../server';


config();

chai.use(chaiHttp);

const { BASE_URL } = process.env;
let userToken;

describe('Cart test', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post(`${BASE_URL}/auth/login`)
      .send(signinDetails);

    userToken = response.body.data.token;
  });

  it('should return user cart items when request', async () => {
    const response = await chai
      .request(app)
      .get(`${BASE_URL}/cart/`)
      .set('Authorization', userToken);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body.data).to.be.an('array');
    expect(response.body.data[0]).to.be.an('object');
    expect(response.body.data[0]).to.include.all.keys(
      'id',
      'name',
      'description',
      'price'
    );
  });

  it('should return error response if user provides invalid token', async () => {
    const response = await chai
      .request(app)
      .get(`${BASE_URL}/cart/`)
      .set('Authorization', 'token');

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.be.equal('error');
    expect(response.body.error).to.be.equal('invalid Token');
  });

  it('should return error response if token is not provided', async () => {
    const response = await chai.request(app).get(`${BASE_URL}/cart/`);

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.be.equal('error');
    expect(response.body.error).to.be.equal('Access Denied. No Token Provided');
  });
});
