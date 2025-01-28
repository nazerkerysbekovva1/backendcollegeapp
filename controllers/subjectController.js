'use strict' 

const response = require('../response')
const db = require('../config/db');

exports.getAllSubjects = (req, res) => {
    const sql = "SELECT * FROM `subjects`";

    db.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else {
            response.status(rows, res);
        }
    });
};


exports.getSubjectById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM `subjects` WHERE `id` = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (rows.length === 0) {
            response.status({ error: 'Subject not found' }, res);
        } else {
            response.status(rows[0], res);
        }
    });
};

exports.getSubjectByName = (req, res) => {
    const { subject_name } = req.query; // Retrieve `subject_name` from query parameters

    if (!subject_name) {
        return response.status({ error: 'Subject name is required' }, res);
    }

    const sql = "SELECT * FROM `subjects` WHERE `subject_name` = ?";
    db.query(sql, [subject_name], (error, rows) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (rows.length === 0) {
            response.status({ error: 'Subject not found' }, res);
        } else {
            response.status(rows[0], res);
        }
    });
};


exports.addSubject = (req, res) => {
    const { subject_name } = req.body;

    if (!subject_name) {
        return response.status({ error: 'Subject name is required' }, res);
    }

    const sql = "INSERT INTO `subjects` (`subject_name`) VALUES (?)";
    db.query(sql, [subject_name], (error, results) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else {
            response.status({ message: 'Subject added successfully', results }, res);
        }
    });
};


exports.updateSubject = (req, res) => {
    const { id } = req.params;
    const { subject_name } = req.body;

    if (!subject_name) {
        return response.status({ error: 'Subject name is required' }, res);
    }

    const sql = "UPDATE `subjects` SET `subject_name` = ? WHERE `id` = ?";
    db.query(sql, [subject_name, id], (error, results) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (results.affectedRows === 0) {
            response.status({ error: 'Subject not found' }, res);
        } else {
            response.status({ message: 'Subject updated successfully' }, res);
        }
    });
};

exports.deleteSubject = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM `subjects` WHERE `id` = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (results.affectedRows === 0) {
            response.status({ error: 'Subject not found' }, res);
        } else {
            response.status({ message: 'Subject deleted successfully' }, res);
        }
    });
};


