import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: String,
    id: { type: String, unique: true },
    quiz1: Number,
    quiz2: Number,
    medExam: Number,
    finalExam: Number,
    totalMarks: Number,
    grade: String,
});


studentSchema.pre('save', function (next) {
    this.totalMarks = this.quiz1 + this.quiz2 + this.medExam + this.finalExam;
    if (this.totalMarks >= 90) {
        this.grade = 'A';
    } else if (this.totalMarks >= 80 && this.totalMarks < 90) {
        this.grade = 'B';
    } else if (this.totalMarks >= 70 && this.totalMarks < 80) {
        this.grade = 'C';
    } else if (this.totalMarks >= 60 && this.totalMarks < 70) {
        this.grade = 'D';
    } else {
        this.grade = 'F';
    }
    next();
});

const Student = mongoose.model('marks', studentSchema);

export default Student;