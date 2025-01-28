'use strict' 

const response = require('../response')
const db = require('../config/db');

exports.getAllLessons = (req, res) => {
    const sql = `
        SELECT 
            lessons.id AS lesson_id, 
            lessons.lesson_number, 
            lessons.start_time, 
            lessons.end_time, 
            shifts.shift_name 
        FROM lessons 
        LEFT JOIN shifts 
        ON lessons.shift_id = shifts.id
    `;

    db.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else {
            response.status(rows, res);
        }
    });
};

