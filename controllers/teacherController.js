'use strict'

const db = require('../config/db');
const response = require('../response');  // Adjust according to your response handling logic

// Get all teachers
exports.getAllTeachers = (req, res) => {
    const sql = "SELECT * FROM `teachers`";
    db.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            return response.status({ error: 'Database error' }, res);
        }
        response.status(rows, res);
    });
};

// Get a teacher by ID
exports.getTeacherById = (req, res) => {
    const teacherId = req.params.id;
    const sql = "SELECT * FROM `teachers` WHERE `id` = ?";
    db.query(sql, [teacherId], (error, rows) => {
        if (error) {
            console.error(error);
            return response.status({ error: 'Database error' }, res);
        }
        if (rows.length === 0) {
            return response.status({ error: 'Teacher not found' }, res);
        }
        response.status(rows[0], res);
    });
};

// Get a teacher by name
exports.getTeacherByName = (req, res) => {
    const teacherName = req.params.name;  // Get the teacher name from URL parameters
    const sql = "SELECT * FROM `teachers` WHERE `teacher_name` = ?";
    db.query(sql, [teacherName], (error, rows) => {
        if (error) {
            console.error(error);
            return response.status({ error: 'Database error' }, res);
        }
        if (rows.length === 0) {
            return response.status({ error: 'Teacher not found' }, res);
        }
        response.status(rows[0], res);
    });
};


// Add a new teacher
exports.addTeacher = (req, res) => {
    const teacherName = req.body.teacher_name;  // Assuming teacher_name is sent in the body
    const sql = "INSERT INTO `teachers` (`teacher_name`) VALUES (?)";
    db.query(sql, [teacherName], (error, results) => {
        if (error) {
            console.error(error);
            return response.status({ error: 'Database error' }, res);
        }
        response.status({ message: 'Teacher added successfully', id: results.insertId }, res);
    });
};

// Update a teacher by ID
exports.updateTeacher = (req, res) => {
    const teacherId = req.params.id;
    const teacherName = req.body.teacher_name;
    const sql = "UPDATE `teachers` SET `teacher_name` = ? WHERE `id` = ?";
    db.query(sql, [teacherName, teacherId], (error, results) => {
        if (error) {
            console.error(error);
            return response.status({ error: 'Database error' }, res);
        }
        if (results.affectedRows === 0) {
            return response.status({ error: 'Teacher not found' }, res);
        }
        response.status({ message: 'Teacher updated successfully' }, res);
    });
};

// Delete a teacher by ID
exports.deleteTeacher = (req, res) => {
    const teacherId = req.params.id;
    const sql = "DELETE FROM `teachers` WHERE `id` = ?";
    db.query(sql, [teacherId], (error, results) => {
        if (error) {
            console.error(error);
            return response.status({ error: 'Database error' }, res);
        }
        if (results.affectedRows === 0) {
            return response.status({ error: 'Teacher not found' }, res);
        }
        response.status({ message: 'Teacher deleted successfully' }, res);
    });
};
