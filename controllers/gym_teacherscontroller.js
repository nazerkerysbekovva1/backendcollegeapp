'use strict';

const db = require('../config/db');
const response = require('../response');

// Get all gym_teachers
exports.getAllGymTeachers = (req, res) => {
    const sql = "SELECT * FROM `gum_teachers`";
    db.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            return response.status({ error: 'Database error' }, res);
        }
        response.status(rows, res);
    });
};

// Get teacher by ID
exports.getGymTeacherById = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM `gum_teachers` WHERE `id` = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) return response.status({ error: 'Database error' }, res);
        if (rows.length === 0) return response.status({ error: 'Teacher not found' }, res);
        response.status(rows[0], res);
    });
};

// Add new teacher
exports.addGymTeacher = (req, res) => {
    const { teacher_name, position, email, facebook, instagram, achievements } = req.body;
    const sql = "INSERT INTO `gum_teachers` (`teacher_name`, `position`, `email`, `facebook`, `instagram`, `achievements`) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [teacher_name, position, email, facebook, instagram, achievements], (error, result) => {
        if (error) return response.status({ error: 'Database error' }, res);
        response.status({ message: 'Added successfully', id: result.insertId }, res);
    });
};

// Update teacher
exports.updateGymTeacher = (req, res) => {
    const id = req.params.id;
    const { teacher_name, position, email, facebook, instagram, achievements } = req.body;
    const sql = "UPDATE `gum_teachers` SET `teacher_name` = ?, `position` = ?, `email` = ?, `facebook` = ?, `instagram` = ?, `achievements` = ? WHERE `id` = ?";
    db.query(sql, [teacher_name, position, email, facebook, instagram, achievements, id], (error, result) => {
        if (error) return response.status({ error: 'Database error' }, res);
        if (result.affectedRows === 0) return response.status({ error: 'Teacher not found' }, res);
        response.status({ message: 'Updated successfully' }, res);
    });
};

// Delete teacher
exports.deleteGymTeacher = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM `gum_teachers` WHERE `id` = ?";
    db.query(sql, [id], (error, result) => {
        if (error) return response.status({ error: 'Database error' }, res);
        if (result.affectedRows === 0) return response.status({ error: 'Teacher not found' }, res);
        response.status({ message: 'Deleted successfully' }, res);
    });
};
