let express = require('express'),
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	port = 3000,
	config = require('./config/config'),
	task = require('./routes/task');
let app = express();
let options = {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 
mongoose.connect(config.host, options).then(
	() => console.log('connected to database'),
	error => console.error(error)	
);
let db = mongoose.connection;

app.use(bodyParser.json());

app.get("/", (req, res) => res.json({message: "Hello world!"}));

app.route("/task")
	.get(task.getTasks)
	.post(task.createTask);
app.route("/task/:id")
	.get(task.getTask)
	.delete(task.deleteTask)
	.put(task.updateTask);

app.listen(port, () => console.log('app listening on port ' + port));

module.exports = app;