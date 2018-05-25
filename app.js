require('dotenv').config();
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var expressJWT = require('express-jwt');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var app = express();


// Mongoose connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/travelers', {useMongoClient: true});

// Set up middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true}));

// Controllers:
app.use('/trip', require('./routes/trip')); // worry about late: expressJWT({ secret: process.env.JWT_SECRET }), 
app.use('/destination', require('./routes/destination'));
app.use('/profile', require('./routes/triplist'));
app.use('/viewtrip', require('./routes/viewtrip'));


app.use('/auth', expressJWT({
	secret: process.env.JWT_SECRET,
	getToken: function fromRequest(req){
		if(req.body.headers.Authorization && 
			req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
			return req.body.headers.Authorization.split(' ')[1];
		}
		return null;
	}
}).unless({
	// paths for the login or signup POST method are UNprotected (not need to be an active user to see these pages)
	path: [
	{url: '/auth/login', methods: ['POST']},
	{url: '/auth/signup', methods: ['POST']}
	]
}), require('./routes/auth'));

app.listen(process.env.PORT || 3001)
