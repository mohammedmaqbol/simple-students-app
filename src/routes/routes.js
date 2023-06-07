import express from 'express';
import {
    getStudent,
    getAllStudent,
    editStudent,
    createStudentMark,
    updateStudentMark,
    deleteStudentMark,

} from '../controller/student.controller.js';


const routes = express.Router();


routes.get('/add-mark', (req, res) => { res.render('student.ejs') })
routes.get('/', getAllStudent);
routes.get('/student/:id', getStudent);
routes.get('/student/edit/:id', editStudent);

routes.post('/add-mark', createStudentMark)
routes.put('/student/edit/:id', updateStudentMark);
routes.delete('/student/:id', deleteStudentMark);

export default routes