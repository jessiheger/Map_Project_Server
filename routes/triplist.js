var express 		= require('express');
var request			= require('request');
var router 			= express.Router();
var mongoose		= require('mongoose');

var User 			= require('../models/user');
var Trip 			= require('../models/tripmodel');

// takes userID info from the triplist compononent and finds the user in the DB
// THEN sends the user's trips to the front end
router.get('/:id/trips', function(req, res){
	User.find({ _id: req.params.id }, function(err, user) {
		res.send(user);
	})
});

router.get('/:userId', function(req, res) {
	console.log(req.params.userId);
	User.findById(req.params.userId)
	.populate('trips')
	.exec((err, user) => {
		if (err){
			console.log("error is", err);
			res.status(500).send('uh oh');
		}
		else {
			console.log("this is the user trips", user.trips);
			res.json({user: user, trips: user.trips})
		};
	});
});


module.exports = router;