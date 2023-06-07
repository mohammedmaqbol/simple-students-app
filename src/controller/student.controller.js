import Student from '../models/student.models.js';

// Get all students
export const getAllStudent = async (req, res) => {
    try {
        const students = await Student.find();
        res.render('home', { students });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// Get student by ID
export const getStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findOne({ id: studentId });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('student-details', { student });
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

// Edit student mark
export const editStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findOne({ id: studentId });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('edit-student', { student });
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

// Create new student mark
export const createStudentMark = async (req, res, next) => {
    try {
        const student = new Student({
            name: req.body.name,
            id: req.body.id,
            quiz1: req.body.quiz1,
            quiz2: req.body.quiz2,
            medExam: req.body.medExam,
            finalExam: req.body.finalExam
        });

        await student.save();
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};

// Update student mark
export const updateStudentMark = async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedData = req.body;
        console.log(updatedData);
        const updatedMark = await Student.findByIdAndUpdate(
            studentId,
            updatedData,
            { new: true }
        );

        if (!updatedMark) {
            return res.status(404).send('Student not found, unable to update mark');
        }

        // Recalculate totalMarks and grade using the function in the student model
        updatedMark.totalMarks = updatedMark.quiz1 + updatedMark.quiz2 + updatedMark.medExam + updatedMark.finalExam;
        if (updatedMark.totalMarks >= 90) {
            updatedMark.grade = 'A';
        } else if (updatedMark.totalMarks >= 80 && updatedMark.totalMarks < 90) {
            updatedMark.grade = 'B';
        } else if (updatedMark.totalMarks >= 70 && updatedMark.totalMarks < 80) {
            updatedMark.grade = 'C';
        } else if (updatedMark.totalMarks >= 60 && updatedMark.totalMarks < 70) {
            updatedMark.grade = 'D';
        } else {
            updatedMark.grade = 'F';
        }

        // Save the updated student data
        await updatedMark.save();

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete student mark
export const deleteStudentMark = async (req, res, next) => {

    try {
        // Find the student to delete
        const studentId = req.params.id;
        const student = await Student.findByIdAndDelete(studentId);

        if (!student) {
            // If the student is not found
            return res.status(404).send('Student not found.');
        }
        res.redirect('/').status(200);
    } catch (err) {
        next(err);
    }
};