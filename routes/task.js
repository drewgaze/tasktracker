let mongoose = require('mongoose'),
	Task = require('../models/task');

const getTasks = (req, res) => {
	let query = Task.find({});
	query.exec((error, tasks) => {
		if (error) res.send(error);
		res.json(tasks);
	});
};
const createTask = (req, res) => {
	let task = new Task(req.body);
	task.save((error, task) => {
		if (error) {
			res.send(error);
		} else {
			res.json(task);
		}
	});
};
const getTask = (req, res) => {
	Task.findById(req.params.id, (error, task) => {
		if (error) res.send(error);
		res.json(book);
	});
};
const deleteTask = (req, res) => {
	Task.remove({_id: req.params.id}, (error, result) => {
		res.json({message: 'Deleted', result});
	});
};
const updateTask = (req, res) => {
	Task.findById({_id: req.params.id}, (error, task) => {
		if (error) res.send(error);
		Object.assign(task, req.body).save((error, task) => {
			if (error) res.send(error);
			res.json({message: 'Updated', task});
		});
	});
};

module.exports = {getTasks, createTask, getTask, deleteTask, updateTask};