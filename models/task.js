let mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let TaskSchema = new Schema(
	{
		ownerId: {type: String},
		storyId: {type: String},
		sprintId: {type: String},
		projectId: {type: String},
		hoursEstimated: {type: Number},
		hoursComplete: {type: Number},
		name: {type: String},
		description: {type: String}
	},
	{
		versionKey: false
	}
);

module.exports = mongoose.model('task', TaskSchema);