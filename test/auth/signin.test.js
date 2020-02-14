import chai, { expect } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import { signinDetails } from '../__mocks__';
import models from '../../server/database/models';
import app from '../../server';

const { User } = models;

config();

chai.use(chaiHttp);

const { BASE_URL } = process.env;

describe('Sign in test', async () => {
  it('should sign in an existing user', async () => {
    const response = await chai
      .request(app)
      .post(`${BASE_URL}/auth/login`)
      .send(signinDetails);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body.data.firstName).to.equal('Alina');
    expect(response.body.data).to.include.all.keys('email', 'token');
    expect(response.body.data).to.not.have.property('password');
    expect(response.body.data.token).to.equal(response.header.authorization);
    expect(response.body.data.email).to.equal(signinDetails.email);
  });

  context('when an existing user signs in with invalid details', () => {
    it('should return an authorised error for incorrect email address',
      async () => {
        const response = await chai
          .request(app)
          .post(`${BASE_URL}/auth/login`)
          .send({ ...signinDetails, email: 'testing123@email.com' });

        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('error');
        expect(response.body.error).to
          .have.equal('email or password incorrect');
      });

    it('should return validation error when email field is empty', async () => {
      const response = await chai
        .request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send({ ...signinDetails, email: '' });

      expect(response).to.have.status(422);
      expect(response.body).to.be.an('object');
      expect(response.body.status).to.equal('error');
      expect(response.body.errors).to.be.an('object');
      expect(response.body.errors).to.have.property('email');
    });
  });

  context('when the server encounters database error', () => {
    it('should throw server error', async () => {
      const stub = sinon.stub(User, 'findByEmail');
      const error = new Error();
      stub.yields(error);

      const response = await chai
        .request(app)
        .post(`${BASE_URL}/auth/login`)
        .send(signinDetails);

      expect(response).to.have.status(500);
      expect(response.body).to.include.key('error');
      expect(response.body.error).to.equal('internal server error');

      stub.restore();
    });
  });
});
