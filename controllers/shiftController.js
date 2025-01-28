'use strict' 

const response = require('../response')
const db = require('../config/db');

exports.getAllShifts = (req, res) => {
    const sql = "SELECT * FROM `shifts`";

    db.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else {
            response.status(rows, res);
        }
    });
};


// exports.getShiftById = (req, res) => {
//     const { id } = req.params;

//     const sql = "SELECT * FROM `shifts` WHERE `id` = ?";
//     db.query(sql, [id], (error, rows) => {
//         if (error) {
//             console.error(error);
//             response.status({ error: 'Database error' }, res);
//         } else if (rows.length === 0) {
//             response.status({ error: 'Shift not found' }, res);
//         } else {
//             response.status(rows[0], res);
//         }
//     });
// };
