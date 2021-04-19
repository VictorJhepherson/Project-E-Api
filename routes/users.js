const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const UserController = require('../controllers/user-controller');

router.get('/:user', login, UserController.getUserById);
router.post('/', login, UserController.locateBook);
router.post('/giveBack', login, UserController.giveBackBook);
router.get('/getLocates/:user', login, UserController.getLocates);
router.post('/addFavorite', login, UserController.addFavorites);
router.post('/removeFavorites', login, UserController.removeFavorites);

module.exports = router;