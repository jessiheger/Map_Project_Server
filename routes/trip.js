var express 		= require('express');
var request			= require('request');
var router 			= express.Router();
var mongoose		= require('mongoose');

var User 			= require('../models/user');
var Trip 			= require('../models/tripmodel');

// RENDERS PAGE TO ADD A TRIP

	//TODO: Query tripmodel for list of trips
router.get('/:id', function(req, res) {
  console.log('req.params:', req.params);
  Trip.findById(req.params.id)
  .populate('destinations')
  .exec((err, trip) => {
    res.send(trip);
  })
  .catch(err => {
    console.log('error', err);
  })
});


// Adds a trip to a user
router.post('/', function(req, res) {
  console.log('POST A TRIP', req.body);
  // now my req.body has TWO keys: newTrip and user
  User.findById(req.body.user.id ).populate('trips')
    .then(user => {
  	 console.log('found a user', user);
  	Trip.create( req.body.newTrip )
      .then(myNewTrip => {
        myNewTrip.save();
		  console.log("New Trip looks like", myNewTrip);
		    user.trips.push(myNewTrip);
		    console.log("pushed the trip");
		    user.save()
          .then(result => {
			       console.log('got saved!');
			       res.json(myNewTrip);
		          })
                .catch(err => {
			             console.log('not saved', err);
			             res.send('not saved');
		            });
  	   })
        .catch(err => {
  		    console.log('rawr', err);
  		    res.send('rawr trip create fails');
  	     });
    })
      .catch(err => {
  	     console.log('darn', err);
  	     return res.status(500).send('gah');
    });		
});

module.exports = router;