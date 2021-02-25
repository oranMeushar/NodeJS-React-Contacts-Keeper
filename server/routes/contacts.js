const express = require('express');

const router = express.Router();
const contactsController = require('../controllers/contactsController');
const protected = require('../middleware/protected');

router.post('/', protected, contactsController.postContact);
router.get('/', protected, contactsController.getContact);
router.delete('/:id', protected, contactsController.deleteContact);
router.patch('/:id', protected, contactsController.patchContact);

module.exports = router;