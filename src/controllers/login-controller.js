const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * 
                         FROM USERS
                        INNER JOIN AVATARS
                           ON USERS.USR_PHOTO = AVATARS.AVATAR_ID
                        WHERE USR_LOGINNAME = ?`;
        conn.query(query, [req.body.USR_LOGINNAME], (error, results, fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação'});
            }
            bcrypt.compare(req.body.USR_PASSWORD, results[0].USR_PASSWORD, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação'});
                }
                if (result) {
                    let token = jwt.sign({
                        USR_LOGINNAME: results[0].USR_LOGINNAME
                    }, process.env.JWT_KEY, {expiresIn: "7d" });
                    return res.status(200).send({ mensagem: 'Autenticado com sucesso', data: results[0], token: token });
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação'});
            });
        });
    });
};

exports.logout = (req, res, next) => {
    if (req.body.token != null && req.body.token != undefined) {
        return res.status(200).send({ mensagem: 'Logout com sucesso', token: null });
    } 
};

exports.refresh = (req, res, next) => {
    if (req.body.token != null && req.body.token != undefined) {
        mysql.getConnection((error, conn) => {
            if(error) { return res.status(500).send({ error: error }) }
            const query = `SELECT * 
                             FROM USERS
                            INNER JOIN AVATARS
                               ON USERS.USR_PHOTO = AVATARS.AVATAR_ID
                            WHERE USR_ID = ?`;
            conn.query(query, [req.body.user], (error, results, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error }) }
                if (results.length < 1) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação'});
                }
                let token = jwt.sign({ USR_LOGINNAME: results[0].USR_LOGINNAME }, process.env.JWT_KEY, {expiresIn: "7d" });
                return res.status(200).send({ mensagem: 'Autenticado com sucesso', data: results[0], token: token});
            });
        });
    } else { 
        return res.status(401).send({ mensagem: 'Falha na autenticação'});
    }
};

exports.registerUsers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT USR_LOGINNAME
                      FROM USERS
                     WHERE USR_LOGINNAME = ?`, [req.body.USR_LOGINNAME], (error, results) => {
            if(error) { return res.status(500).send({ error: error }) }
            if(results.length > 0){
                res.status(409).send({ mensagem: 'Usuário já cadastrado'})
            } else {
                bcrypt.hash(req.body.USR_PASSWORD, 10, (errBcrypt, hash) => {
                    if(errBcrypt){ return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        'CALL REGISTER_USERS(?, ?, ?, ?, ?, ?, ?);', 
                        [
                            req.body.USR_NAME, req.body.USR_LOGINNAME, hash, 
                            req.body.USRDOC_CPFNUMBER, req.body.USR_PHONENUMBER, 
                            req.body.USR_DATEBIRTHDAY, req.body.USR_PHOTO
                        ],
                        (error, result, field) => {
                            conn.release();
                            if(error) { res.status(500).send({ error: error }) }

                            let token = jwt.sign({ USR_LOGINNAME: req.body.USR_LOGINNAME }, process.env.JWT_KEY, {expiresIn: "7d" });  
                            return res.status(201).send({
                                mensagem: 'Usuário criado com sucesso',
                                token: token
                            });
                        }
                    );
                });
            }
        })
    });
};

exports.updatePassword = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error}) }
        bcrypt.hash(req.body.USR_PASSWORD, 10, (errBcrypt, hash) => {
            if(errBcrypt){ return res.status(500).send({ error: errBcrypt }) }
            conn.query(
                'CALL UPDATE_PASSWORD(?, ?)',
                [ req.body.USR_ID, hash ],
                (error, result, field) => {
                    conn.release();
                    if(error) { res.status(500).send({ error: error }) }
    
                    res.status(202).send({
                        mensagem: 'Usuário atualizado com sucesso'
                    });
                }
            )
        });
    });
};

exports.updateData = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error}) }
        conn.query(
            'CALL UPDATE_DATA(?, ?, ?, ?, ?, ?)',
            [
                req.body.USR_ID, req.body.USR_NAME, req.body.USR_LOGINNAME, 
                req.body.USR_PHONENUMBER, req.body.USR_DATEBIRTHDAY, req.body.USRDOC_CPFNUMBER
            ],
            (error, result, field) => {
                conn.release();
                if(error) { res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Usuário atualizado com sucesso'
                });
            }
        )
    });
};