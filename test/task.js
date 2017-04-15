process.env.NODE_ENV = 'test';

let mongoose = require('mongoose'),
	Task = require('../models/task'),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	server = require('../server'),
	should = chai.should();

chai.use(chaiHttp);

describe('Tasks', () => {
	beforeEach(done => {
		Task.remove({}, err => done());
	});
});

describe('/GET task', () => {
	it('GET all tasks', done => {
		chai.request(server)
			.get('/task')
			.end((error, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
	});
});