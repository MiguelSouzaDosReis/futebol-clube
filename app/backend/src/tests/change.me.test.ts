import * as sinon from 'sinon';
import * as chai from 'chai';
import * as fs from 'fs/promises';
import * as Jwt from 'jsonwebtoken';
import * as path from 'path';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import validEmail from '../middleware/login';
import Teams from '../database/models/teams'

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Requesito 4', () => {
   before( () => {
     sinon.stub(User, "findOne").resolves({
       id: 1,
       username:'Admin',
       role: 'admin',
       email: 'aaaaaa@aaaa.com',
       password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
       } as User);
   });
   after(()=>{
     (User.findOne as sinon.SinonStub).restore();
   })
    it('tudo tando certo', async () => {
     const { body, status } = await chai.request(app).post('/login').send(
       { email:'aaaaaa@aaaa.com', password: 'secret_admin' })
       const secret = await fs.readFile(path.resolve(__dirname, '../../jwt.evaluation.key'));
       // console.log(body)
       // console.log(status)
     expect(body.user).to.be.deep.equal({
       id: 1, username: 'Admin', role: 'admin', email: 'aaaaaa@aaaa.com' 
     })
     expect(() => Jwt.verify(body.token, secret)).to.not.throw()
     expect(status).to.be.equal(200)
   });
 
   it('email vazio', async () => {
    const { body, status } = await chai.request(app).post('/login').send(
      { email:'', password: 'secret_admin' })
      // console.log(body)
      // console.log(status)
    expect(body).to.be.deep.equal({message: 'All fields must be filled'})
    expect(status).to.be.equal(400)
  });

   it('password vazio', async () => {
    const { body, status } = await chai.request(app).post('/login').send(
      { email:'aaaaaa@aaaa.com', password: '' })
      // console.log(body)
      // console.log(status)
    expect(body).to.be.deep.equal({message: 'All fields must be filled'})
    expect(status).to.be.equal(400)
  });
   it('email errado', async () => {
    const { body, status } = await chai.request(app).post('/login').send(
      { email:'aaaaaa@Maaa.com', password: 'secret_admin' })
      // console.log(body)
      // console.log(status)
    expect(body).to.be.deep.equal({message: 'Incorrect email or password'})
    expect(status).to.be.equal(401)
  });
   it('password errado', async () => {
    const { body, status } = await chai.request(app).post('/login').send(
      { email:'aaaaaa@aaaa.com', password: 'secretdmin' })
      // console.log(body)
      // console.log(status)
    expect(body).to.be.deep.equal({message: 'Incorrect email or password'})
    expect(status).to.be.equal(401)
  });
      it('validToke tando certo', async () => {
     const { body: { token } } = await chai.request(app).post('/login').send(
      { email:'aaaaaa@aaaa.com', password: 'secret_admin' })
      const { body, status } = await chai.request(app).get('/login/validate').set({
        Authorization: token
      })
       // console.log(body)
       // console.log(status)
       // console.log(token)
      expect(body).to.be.equal('admin')
      expect(status).to.be.equal(200)
   });
    it('validToke faltou token', async () => {
    const { body: { token } } = await chai.request(app).post('/login').send(
     { email:'aaaaaa@aaaa.com', password: 'secret_admin' })
     const { body, status } = await chai.request(app).get('/login/validate')
      // console.log(body)
      // console.log(status)
      // console.log(token)
     expect(body).to.be.deep.equal({ message: 'faltou token' })
     expect(status).to.be.equal(500)
  });
  it('validToke token errado', async () => {
    const { body: { token } } = await chai.request(app).post('/login').send(
     { email:'aaaaaa@aaaa.com', password: 'secret_admin' })
     const { body, status } = await chai.request(app).get('/login/validate').set({
      Authorization: 'asasasasa'
     })
      // console.log(body)
      // console.log(status)
      // console.log(token)
     expect(body).to.be.deep.equal({ message: 'deu erro de token' })
     expect(status).to.be.equal(500)
  })
});

/* describe('Requesito 4', () => {
  before( () => {
    sinon.stub(Teams, "findAll").resolves({
      } as Teams);
  });
  after(()=>{
    (
      Teams.findOne as sinon.SinonStub).restore();
  })

}); */

