const TEST = 'test';
const TESTING = 'testing';

let mongoose = require('mongoose'),
	Task = require('../models/task'),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	server = require('../server'),
	should = chai.should();

chai.use(chaiHttp);

describe('/task', () => {
	describe('/task GET', () => {
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
	describe('/task POST', () => {
		it('POST creates a new task', done => {
			let task = {name: TEST, description: TESTING, hoursEstimated: 8, hoursComplete: 0};
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
	describe('/task GET', () => {
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

describe('/task/:id', () => {
	let task;
	before(done => {
		chai.request(server)
		.get('/task')
		.then(res => {
			res.should.have.status(200);
			res.body.should.be.a('array');
			res.body.length.should.be.eql(1);
			task = res.body[0];
			done();
		})
		.catch(error => console.error(error));
	});

	describe('/task/:id GET', () => {
		it('GET task by id', done => {
			chai.request(server)
			.get('/task/' + task._id)
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
	describe('/task/:id PUT', () => {
		it('PUT task by id and updates it', done => {
			task.hoursComplete = 4;
			chai.request(server)
			.put('/task/' + task._id)
			.send(task)
			.then(res => {
                res.should.have.status(200);
                res.body.should.be.a('object');
				res.body.task.should.have.property('name');
				res.body.task.name.should.be.eql(TEST);
				res.body.task.description.should.be.eql(TESTING);
				res.body.task.should.have.property('hoursComplete');
				res.body.task.hoursComplete.should.be.eql(4);
				done();
			})
			.catch(error => console.error(error));
		});
	});
	describe('/task/:id DELETE', () => {
		it('DELETE task with the specified id', done => {
			chai.request(server)
			.delete('/task/' + task._id)
			.then(res => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Deleted');
                res.body.result.should.have.property('ok').eql(1);
                res.body.result.should.have.property('n').eql(1);
                done();
			})
			.catch(error => console.error(error));
		});
	});
	describe('/task/:id GET', () => {
		it('GET deleted task and find nothing', done => {
			chai.request(server)
			.get('/task/' + task._id)
			.then(res => {
				should.equal(res.body, null);
				done();
			})
			.catch(error => console.error(error));
		});
	});
});