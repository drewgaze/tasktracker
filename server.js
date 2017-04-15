let express = require('express'),
	mongoose = require('mongoose'),
	Mockgoose = require('mockgoose').Mockgoose,
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	port = 3000,	
	config = require('./config/config'),
	task = require('./routes/task');
const connect = () => {
	mongoose.connect(config.host, options)
	.then(() => console.log('connected to database'))
	.catch(error => console.error(error));	
};
let app = express();
let options = {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              };
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
	let mockgoose = new Mockgoose(mongoose);
	mockgoose.prepareStorage().then(connect);
} else {
	connect();
}

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