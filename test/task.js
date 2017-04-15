const TEST = 'test';
const TESTING = 'testing';

let mongoose = require('mongoose'),
	Task = require('../models/task'),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	server = require('../server'),
	should = chai.should();

chai.use(chaiHttp);

describe('Tasks', () => {
	describe('/GET task', () => {
		it('GET all tasks finds none', done => {
			chai.request(server)
				.get('/task')
				.then(res => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				})
				.catch(error => console.error(error));
		});
	});
	describe('/POST task', () => {
		it('POST creates a new task', done => {
			let task = {name: TEST, description: TESTING, hoursEstimaed: 8, hoursComplete: 0};
			chai.request(server)
				.post('/task')
				.send(task)
				.then(res => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name');
					res.body.name.should.be.eql(TEST);
					res.body.description.should.be.eql(TESTING);
					done();
				})
				.catch(error => console.error(error));
		});
	});
	describe('/GET task', () => {
		it('GET all tasks finds one', done => {
			chai.request(server)
				.get('/task')
				.then(res => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(1);
					done();
				})
				.catch(error => console.error(error));
		});
	});
});