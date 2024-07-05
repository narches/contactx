// Needed Resources 
const express = require("express")
const router = new express.Router()
const swaggerDocument = require('../swagger.json');

router.use('/', require('./swagger'));

router.get("/", (req, res) => {
  //#swagger.tags = ['Hello World']
  res.send('Backend Programming is the BEST!');
});

router.use('/contacts', require('./contacts'));




module.exports = router;