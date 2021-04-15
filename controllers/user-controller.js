const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUserById = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * 
                         FROM USERS
                        WHERE USR_ID = ?`;
        conn.query(query, [req.params.user], (error, results, fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error }) }
            
            return res.status(200).send({ data: results });
        });
    });
};

exports.locateBook = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        conn.query(`CALL VERIFY_LOCATE(?)`, [req.body.user], (error, results) => {
            console.log(results[0]);
            if(results[0].length < 3) {
                const query = `CALL LOCATE_BOOK(?, ?, ?)`;
                conn.query(query, [req.body.user, req.body.BOOK_ID, req.body.LOC_DATE_RETIRADA], (error, result, fields) => {
                    conn.release();
                    if(error) { return res.status(500).send({ error: error }) }
            
                    return res.status(200).send({ status: 'Livro locado com sucesso' });
                });
            } else {
                res.status(409).send({ mensagem: 'Você já realizou 3 locações nos últimos 30 dias desde a primeira locação' })
            }
        })
    });
};

exports.giveBackBook = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        const query = `CALL GIVE_BACK_BOOK(?, ?)`;
        conn.query(query, [ req.body.user, req.body.BOOK_ID ], (error, results, fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error }) }
            
            return res.status(200).send({ mensagem: 'Livro entregue com sucesso' });
        });
    });
};

exports.getLocates = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        const query = `SELECT LEASED.LOC_DATE_RETIRADA,
                              LEASED.LOC_DATE_ENTREGA,
                              LEASED.LOC_STATUS,
                              USERS.USR_NAME,
                              USERS.USR_ID,
                              BOOKS.BOOK_NAME,
                              BOOKS.BOOK_ID,
                              BOOKS.BOOK_PATH 
                         FROM LEASED
                        INNER JOIN USERS
                           ON USERS.USR_ID = LEASED.USR_ID
                        INNER JOIN BOOKS
                           ON BOOKS.BOOK_ID = LEASED.BOOK_ID
                        WHERE LEASED.USR_ID = ?
                          AND LEASED.LOC_STATUS = 'l'`;
        conn.query(query, [req.params.user], (error, results, fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error }) }
            
            return res.status(200).send({ data: results });
        });
    });
};