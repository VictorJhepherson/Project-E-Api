const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const UserController = require('../controllers/user-controller');

router.get('/:user', login, UserController.getUserById);
router.post('/', login, UserController.locateBook);

module.exports = router;