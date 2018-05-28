var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Model for each destination 
var destinationSchema = new Schema (
	{
		landmark: {
			type: String, 
			required: false
			},
		city: {
			type: String,
			required: true
			},
		state: {
			type: String, 
			required: false
			},
		country: {
			type: String,
			required: false
			},
		lat: {
			type: String, 
			required: false
			},
		lng: {
			type: String, 
			required: false
			},
		image: {
			type: String,
			required: false
			},
	}
);

var Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
