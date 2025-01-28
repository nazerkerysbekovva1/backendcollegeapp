'use strict' 

const response = require('../response')
const db = require('../config/db');

exports.curators = (req, res) => {

    db.query('SELECT * FROM `curators`', (error, rows, fields) => {
        if(error){
            console.log(error);
        } else {
            response.status(rows, res)
        }
    })
}

exports.add = (req, res) => {
    const sql = "INSERT INTO `curators` (`curator_name`) VALUES('" + req.query.curator_name + "') ";
    db.query(sql, (error, results) => {
        if(error){
            console.log(error);
        } else{
            response.status(results, res)
        }
    })
}