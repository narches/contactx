const express = require("express");
const router = new express.Router();
const contactController = require("../controllers/contactController");
const validation = require('../utilities/validate');
const passport = require("passport")
const {isAuthenticated} = require("../helpers/authenticate");



router.get('/', contactController.getAll);

router.get('/:id', contactController.getSingle);

router.post('/', validation.saveContact, isAuthenticated, contactController.createUser);

router.put('/:id', validation.saveContact, isAuthenticated, contactController.updateUser);

router.delete('/:id', isAuthenticated, contactController.deleteUser);

module.exports = router;