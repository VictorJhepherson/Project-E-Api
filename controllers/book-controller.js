const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getBooks = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        const query = `CALL GET_BOOKS(?)`;
        conn.query(query, [ req.params.user ], (error, results, fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error }) }
            
            return res.status(200).send({ data: results });
        });
    });
};

exports.getBooksByName = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        const query = `CALL GET_BOOKS_BYNAME(?)`;
        conn.query(query, [req.body.BOOK_NAME], (error, results, fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error }) }
            
            return res.status(200).send({ data: results[0] });
        });
    });
};

exports.getBooksById = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * 
                         FROM BOOKS
                        WHERE BOOK_ID = ?`;
        conn.query(query, [req.params.BOOK_ID], (error, results, fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error }) }
            
            return res.status(200).send({ data: results[0] });
        });
    });
};

exports.insertBook = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
            const query = `CALL INSERT_BOOKS(?, ?, ?, ?, ?, ?)`;
            conn.query(query, 
                [ 
                    req.body.BOOK_NAME, req.body.BOOK_STATUS,
                    req.body.BOOK_DESC, req.body.BOOK_GEN,
                    req.body.BOOK_AUTHOR, req.body.BOOK_PATH
                ], 
                (error, results, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error }) }
                
                return res.status(200).send({ mensagem: "Livro inserido com sucesso" });
            });
    });
};

exports.updateBook = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
            const query = `CALL UPDATE_BOOKS(?, ?, ?, ?, ?, ?, ?)`;
            conn.query(query, 
                [ 
                    req.params.BOOK_ID, req.body.BOOK_NAME, 
                    req.body.BOOK_STATUS, req.body.BOOK_DESC, 
                    req.body.BOOK_GEN, req.body.BOOK_AUTHOR,
                    req.body.BOOK_PATH
                ], 
                (error, results, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error }) }
                
                return res.status(200).send({ mensagem: 'Livro atualizado com sucesso' });
            });
    });
};

exports.deleteBook = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        const query = `DELETE FROM BOOKS WHERE BOOK_ID = ?`;
        conn.query(query, [req.params.BOOK_ID], (error, results, fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error }) }
            
            return res.status(200).send({ mensagem: 'Livro apagado com sucesso' });
        });
    });
};