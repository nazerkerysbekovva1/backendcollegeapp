'use strict';

const response = require('../response');
const db = require('../config/db');

exports.getAllGroups = (req, res) => {
    const sql = `
        SELECT 
            groups.id AS group_id, 
            groups.group_name, 
            curators.curator_name 
        FROM groups 
        LEFT JOIN curators 
        ON groups.curator_id = curators.id
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


exports.getGroupById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            groups.id AS group_id, 
            groups.group_name, 
            curators.curator_name 
        FROM groups 
        LEFT JOIN curators 
        ON groups.curator_id = curators.id 
        WHERE groups.id = ?
    `;

    db.query(sql, [id], (error, rows) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (rows.length === 0) {
            response.status({ error: 'Group not found' }, res);
        } else {
            response.status(rows[0], res);
        }
    });
};


exports.addGroup = (req, res) => {
    const { group_name, curator_id } = req.body;

    if (!group_name || !curator_id) {
        return response.status({ error: 'Missing required fields' }, res);
    }

    const sql = "INSERT INTO `groups` (`group_name`, `curator_id`) VALUES (?, ?)";
    const values = [group_name, curator_id];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else {
            response.status({ message: 'Group added successfully', results }, res);
        }
    });
};


exports.updateGroup = (req, res) => {
    const { id } = req.params;
    const { group_name, curator_id } = req.body;

    if (!group_name || !curator_id) {
        return response.status({ error: 'Missing required fields' }, res);
    }

    const sql = "UPDATE `groups` SET `group_name` = ?, `curator_id` = ? WHERE `id` = ?";
    const values = [group_name, curator_id, id];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (results.affectedRows === 0) {
            response.status({ error: 'Group not found' }, res);
        } else {
            response.status({ message: 'Group updated successfully' }, res);
        }
    });
};

exports.deleteGroup = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM `groups` WHERE `id` = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            console.error(error);
            response.status({ error: 'Database error' }, res);
        } else if (results.affectedRows === 0) {
            response.status({ error: 'Group not found' }, res);
        } else {
            response.status({ message: 'Group deleted successfully' }, res);
        }
    });
};

