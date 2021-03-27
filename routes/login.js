const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const LoginController = require('../controllers/login-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './userPhotos/');
    },
    filename: function(req, file, cb){
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/login', LoginController.login);
router.post('/logout', login, LoginController.logout);
router.post('/refresh', login, LoginController.refresh);
router.post('/register', upload.single('USR_PHOTO'), LoginController.registerUsers);
router.pacth('/update', upload.single('USR_PHOTO'), LoginController.updateUsers);

module.exports = router;