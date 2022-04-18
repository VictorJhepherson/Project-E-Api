const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const BookController = require('../controllers/book-controller');

const storage = multer.memoryStorage({
    destination: function (req, file, cb){
        cb(null, '');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'application/epub+zip' ){
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

router.get('/getGenre', login, BookController.getGenre);
router.get('/:user', login, BookController.getBooks);
router.post('/byGen', login, BookController.getBookByGen);
router.post('/byName', login, BookController.getBooksByName);
router.post('/', login, BookController.insertBook);
router.get('/:BOOK_ID', login, BookController.getBooksById);
router.patch('/:BOOK_ID', login, BookController.updateBook);
router.delete('/:BOOK_ID', login, BookController.deleteBook);
router.post('/locates', login, BookController.getBookLocate);
router.post('/locatesByUserName', login, BookController.getBookLocateByUserName);
router.post('/locatesByBookName', login, BookController.getBookLocateByBookName);

module.exports = router;