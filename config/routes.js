// routes.js
'use strict'

const express = require('express');
const router = express.Router();

// Controllers
const indexController = require('../controllers/indexController');
const curatorController = require('../controllers/curatorController');
const groupController = require('../controllers/groupController');
const auditoriumController = require('../controllers/auditoriumController');
const shiftController = require('../controllers/shiftController');
const lessonController = require('../controllers/lessonController');
const subjectController = require('../controllers/subjectController');
const teacherController = require('../controllers/teacherController');
const agrTeacherController = require('../controllers/agr_teacherscontroller');
const etbTeacherController = require('../controllers/etb_teacherscontroller');
const gymTeacherController = require('../controllers/gym_teacherscontroller');

// Define routes
router.route('/').get(indexController.index);

// Curators
router.route('/curators').get(curatorController.curators);
router.route('/curators/add').post(curatorController.add);

// Groups
router.get('/groups', groupController.getAllGroups);
router.get('/groups/:id', groupController.getGroupById);
router.post('/groups', groupController.addGroup);
router.put('/groups/:id', groupController.updateGroup);
router.delete('/groups/:id', groupController.deleteGroup);

// Auditoriums
router.get('/auditoriums', auditoriumController.getAllAuditoriums);
router.get('/auditoriums/:id', auditoriumController.getAuditoriumById);
router.post('/auditoriums', auditoriumController.addAuditorium);
router.put('/auditoriums/:id', auditoriumController.updateAuditorium);
router.delete('/auditoriums/:id', auditoriumController.deleteAuditorium);

// Shifts
router.get('/shifts', shiftController.getAllShifts);

// Lessons
router.get('/lessons', lessonController.getAllLessons);

// Subjects
router.get('/subjects', subjectController.getAllSubjects);
router.get('/subjects/:id', subjectController.getSubjectById);
router.post('/subjects', subjectController.addSubject);
router.put('/subjects/:id', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);
router.get('/subjects/name', subjectController.getSubjectByName);

// Teachers (Added routes)
router.get('/teachers', teacherController.getAllTeachers);  
router.get('/teachers/:id', teacherController.getTeacherById);  
router.post('/teachers', teacherController.addTeacher);  
router.put('/teachers/:id', teacherController.updateTeacher);  
router.delete('/teachers/:id', teacherController.deleteTeacher); 
router.get('/teachers/name/:name', teacherController.getTeacherByName);

// AGR Teachers
router.get('/agr_teachers', agrTeacherController.getAllAgrTeachers);
router.get('/agr_teachers/:id', agrTeacherController.getAgrTeacherById);
router.post('/agr_teachers', agrTeacherController.addAgrTeacher);
router.put('/agr_teachers/:id', agrTeacherController.updateAgrTeacher);
router.delete('/agr_teachers/:id', agrTeacherController.deleteAgrTeacher);

// ETB Teachers
router.get('/etb_teachers', etbTeacherController.getAllEtbTeachers);
router.get('/etb_teachers/:id', etbTeacherController.getEtbTeacherById);
router.post('/etb_teachers', etbTeacherController.addEtbTeacher);
router.put('/etb_teachers/:id', etbTeacherController.updateEtbTeacher);
router.delete('/etb_teachers/:id', etbTeacherController.deleteEtbTeacher);

// GYM Teachers
router.get('/gym_teachers', gymTeacherController.getAllGymTeachers);
router.get('/gym_teachers/:id', gymTeacherController.getGymTeacherById);
router.post('/gym_teachers', gymTeacherController.addGymTeacher);
router.put('/gym_teachers/:id', gymTeacherController.updateGymTeacher);
router.delete('/gym_teachers/:id', gymTeacherController.deleteGymTeacher);



module.exports = router;
