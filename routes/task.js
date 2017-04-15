let mongoose = require('mongoose'),
	Task = require('../models/task');

const getTasks = (req, res) => {
	let query = Task.find({});
	query.exec()
	.then(tasks => res.json(tasks))
	.catch(error => res.send(error));
};
const createTask = (req, res) => {
	let task = new Task(req.body);
	task.save()
	.then(task => res.json(task))
	.catch(error => res.send(error));
};
const getTask = (req, res) => {
	Task.findById(req.params.id).exec()
	.then(task => res.json(task))
	.catch(error => res.send(error));
};
const deleteTask = (req, res) => {
	Task.remove({_id: req.params.id})
	.then(result => res.json({message: 'Deleted', result}))
	.catch(error => res.send(error));
};
const updateTask = (req, res) => {
	Task.findById({_id: req.params.id}).exec()
	.then(task => Object.assign(task, req.body).save())
	.then(task => res.json({message: 'Updated', task}))
	.catch(error => res.send(error));
};

module.exports = {getTasks, createTask, getTask, deleteTask, updateTask};