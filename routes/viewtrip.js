var express 		= require('express');
var request			= require('request');
var router 			= express.Router();
var mongoose		= require('mongoose');
// Renders the specific trip information

// router.get('/:id/trips/:id', function(req, res){
// 	User.find({ _id: req.params.id }, function(err, user) {
// 		res.send(user);
// 	})
// });


router.get('/:id', function(req, res) {
  console.log('req.params:', req.params);
  Trip.findById(req.params.id, (err, trip) => {
    res.send(trip);
  })
});

module.exports = router;