const express = require("express");
const router = new express.Router();
const contactController = require("../controllers/contactController");
const validation = require('../utilities/validate');



router.get('/', contactController.getAll);

router.get('/:id', contactController.getSingle);

router.post('/', validation.saveContact, contactController.createUser);

router.put('/:id', validation.saveContact, contactController.updateUser);

router.delete('/:id', validation.saveContact, contactController.deleteUser);

module.exports = router;