// Needed Resources 
const express = require("express")
const router = new express.Router()
const swaggerDocument = require('../swagger.json');
const passport = require("passport");

router.use('/', require('./swagger'));


router.use('/contacts', require('./contacts'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});




module.exports = router;