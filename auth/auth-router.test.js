const server = require('../api/server.js')
const request = require('supertest');
const AuthDb = require('./auth-router-model.js');
const db = require('../database/dbConfig.js')

 describe('the server', () => {
	 beforeEach( async() => {
		 await db('users').truncate();
	 })

	 it('should return status code 401 if not logged in', () => {
		 return request(server)
		 .get('/api/auth')
		 .then(res => {
			 expect(res.status).toBe(401)
		 })
	 })

	 xit('should return status code 200 if logged in', () => {
		return request(server)
		.get('/api/auth')
		.then(res => {
			expect(res.status).toBe(200)
		})
	 })

	 describe('creating new users', () => {
		beforeEach( async() => {
			await db('users').truncate();
		})  

		it('should return a new user', () => {
			const newUser = { username: 'user1', password: 'pass123' };
			request(server)
			.post('/api/auth/register')
			.send(newUser)
			.then(res => {
				console.log(res.body);
				expect(res.type).toBe('application/json')
			})
			// const newUser = { username: 'user1', password: 'pass123' };
			// const newUserInfo = await AuthDb.add(newUser)
			

			// expect(newUserInfo).toEqual({ id: 1, username: 'user1', password: 'pass123' })
		})
	 })

	 describe('logging in', () => {
		beforeEach( async() => {
			await db('users').truncate();
		})  

		 it('should return 401 for invalid cred', () => {

			const usertest = { username: "user1", password: "pass"} 

			 return request(server)
			 .post('/api/auth/login')
			 .send(usertest)
			 .then(res => {
				expect(res.status).toBe(401)
			 })
		 })

		 it('should return status 200 after login', () => {
			const newUser = { username: 'user1', password: 'pass123' };
			return request(server)
			.post('/api/auth/register')
			.send(newUser)
			.then(res => {
				return request(server)
				.post('/api/auth/login')
				.send(newUser)
				.then(res => {
					expect(res.status).toBe(200)
				})	
			})
		 })
	 })
 })