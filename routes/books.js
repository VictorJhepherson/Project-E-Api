const express = require('express');
const router = express.Router();
const multer = require('multer');

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

router.get('/', BookController.getBooks);
router.post('/byName', BookController.getBooksByName);
router.post('/', upload.single('BOOK_IMAGE'), BookController.insertBook);
router.get('/:BOOK_ID', BookController.getBooksById);
router.patch('/:BOOK_ID', BookController.updateBook);
router.delete('/:BOOK_ID', BookController.deleteBook);

module.exports = router;