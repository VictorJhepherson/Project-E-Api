const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const BookController = require('../controllers/book-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './bookPhotos/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
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

router.get('/', login, BookController.getBooks);
router.post('/byName', login, BookController.getBooksByName);
router.post('/', upload.single('BOOK_IMAGE'), BookController.insertBook);
router.get('/:BOOK_ID', login, BookController.getBooksById);
router.patch('/:BOOK_ID', login, BookController.updateBook);
router.delete('/:BOOK_ID', login, BookController.deleteBook);

module.exports = router;