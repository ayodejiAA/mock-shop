import chai, { expect } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import models from '../../server/database/models';
import { signupDetails } from '../__mocks__';
import app from '../../server';

const { User } = models;

config();

chai.use(chaiHttp);

const { BASE_URL } = process.env;

describe('Signup test', async () => {
  it('should sign up a new user', async () => {
    const response = await chai
      .request(app)
      .post(`${BASE_URL}/auth/signup`)
      .send(signupDetails);

    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body.data.firstName).to.equal(signupDetails.firstName);
    expect(response.body.data).to.include.all.keys('email', 'token');
    expect(response.body.data).to.not.have.property('password');
    expect(response.body.data.token).to.equal(response.header.authorization);
    expect(response.body.data.email).to.equal(signupDetails.email);
  });


  context('when user signs up with existing email address', () => {
    it('should return a conflict error response', async () => {
      const response = await chai
        .request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send(signupDetails);

      expect(response).to.have.status(409);
      expect(response.body).to.be.an('object');
      expect(response.body.status).to.equal('error');
      expect(response.body.error).to.have.equal('email has already been taken');
    });
  });

  context('when user signs up with invalid details', () => {
    it('should return validation error for not too good password', async () => {
      const response = await chai
        .request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send({ ...signupDetails, password: 'password' });

      expect(response).to.have.status(422);
      expect(response.body).to.be.an('object');
      expect(response.body.status).to.equal('error');
      expect(response.body.errors).to.be.an('object');
      expect(response.body.errors).to.have.property('password');
    });

    it('should return error is password chars is below required amount ',
      async () => {
        const response = await chai
          .request(app)
          .post(`${BASE_URL}/auth/signup`)
          .send({ ...signupDetails, password: 'pass' });

        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('error');
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors).to.have.property('password');
      });


    it('should return validation error for email being empty', async () => {
      const response = await chai
        .request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send({ ...signupDetails, email: '' });

      expect(response).to.have.status(422);
      expect(response.body).to.be.an('object');
      expect(response.body.status).to.equal('error');
      expect(response.body.errors).to.be.an('object');
      expect(response.body.errors).to.have.property('email');
      expect(response.body.errors).to.be.an('object');
      expect(response.body.errors.email)
        .to.have.equal('email is not allowed to be empty');
    });
  });


  context('when the server encounters database error', () => {
    it('should throw server error', async () => {
      const stub = sinon.stub(User, 'findByEmail');
      const error = new Error();
      stub.yields(error);

      const response = await chai
        .request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send(signupDetails);

      expect(response).to.have.status(500);
      expect(response.body).to.include.key('error');
      expect(response.body.error).to.equal(
        'internal server error'
      );

      stub.restore();
    });
  });
});
