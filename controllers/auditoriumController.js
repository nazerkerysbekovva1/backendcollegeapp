'use strict';

const response = require('../response');
const db = require('../config/db');

exports.getAllAuditoriums = (req, res) => {
    const sql = "SELECT * FROM `auditoriums`";

    db.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else {
            response.status(rows, res);
        }
    });
};


exports.getAuditoriumById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM `auditoriums` WHERE `id` = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (rows.length === 0) {
            response.status({ error: 'Auditorium not found' }, res);
        } else {
            response.status(rows[0], res);
        }
    });
};


exports.addAuditorium = (req, res) => {
    const { room_number, room_name } = req.body;

    if (!room_number || !room_name) {
        return response.status({ error: 'Missing required fields' }, res);
    }

    const sql = "INSERT INTO `auditoriums` (`room_number`, `room_name`) VALUES (?, ?)";
    const values = [room_number, room_name];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else {
            response.status({ message: 'Auditorium added successfully', results }, res);
        }
    });
};


exports.updateAuditorium = (req, res) => {
    const { id } = req.params;
    const { room_number, room_name } = req.body;

    if (!room_number || !room_name) {
        return response.status({ error: 'Missing required fields' }, res);
    }

    const sql = "UPDATE `auditoriums` SET `room_number` = ?, `room_name` = ? WHERE `id` = ?";
    const values = [room_number, room_name, id];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (results.affectedRows === 0) {
            response.status({ error: 'Auditorium not found' }, res);
        } else {
            response.status({ message: 'Auditorium updated successfully' }, res);
        }
    });
};


exports.deleteAuditorium = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM `auditoriums` WHERE `id` = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (results.affectedRows === 0) {
            response.status({ error: 'Auditorium not found' }, res);
        } else {
            response.status({ message: 'Auditorium deleted successfully' }, res);
        }
    });
};
