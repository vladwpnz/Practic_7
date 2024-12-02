"use strict";
var StudentStatus;
(function (StudentStatus) {
    StudentStatus[StudentStatus["Active"] = 0] = "Active";
    StudentStatus[StudentStatus["Academic_Leave"] = 1] = "Academic_Leave";
    StudentStatus[StudentStatus["Graduated"] = 2] = "Graduated";
    StudentStatus[StudentStatus["Expelled"] = 3] = "Expelled";
})(StudentStatus || (StudentStatus = {}));

var CourseType;
(function (CourseType) {
    CourseType[CourseType["Mandatory"] = 0] = "Mandatory";
    CourseType[CourseType["Optional"] = 1] = "Optional";
    CourseType[CourseType["Special"] = 2] = "Special";
})(CourseType || (CourseType = {}));

var Semester;
(function (Semester) {
    Semester[Semester["First"] = 0] = "First";
    Semester[Semester["Second"] = 1] = "Second";
})(Semester || (Semester = {}));

var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (GradeValue = {}));

var Faculty;
(function (Faculty) {
    Faculty[Faculty["Computer_Science"] = 0] = "Computer_Science";
    Faculty[Faculty["Economics"] = 1] = "Economics";
    Faculty[Faculty["Law"] = 2] = "Law";
    Faculty[Faculty["Engineering"] = 3] = "Engineering";
})(Faculty || (Faculty = {}));

class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        this.registrations = [];
        this.studentIdCounter = 1;
        this.courseIdCounter = 1;
    }
    /**
     * Enrolls a new student into the university.
     * @param studentData - The data of the student excluding the ID.
     * @returns The enrolled student with an assigned ID.
     */
    enrollStudent(studentData) {
        const student = Object.assign({ id: this.studentIdCounter++ }, studentData);
        this.students.push(student);
        return student;
    }
    /**
     * Registers a student for a course.
     * @param studentId - The ID of the student.
     * @param courseId - The ID of the course.
     */
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student) {
            throw new Error('Student not found');
        }
        if (!course) {
            throw new Error('Course not found');
        }
        // Check if student is active
        if (student.status !== StudentStatus.Active) {
            throw new Error('Student is not active');
        }
        // Check if faculties match
        if (student.faculty !== course.faculty) {
            throw new Error('Student and course faculties do not match');
        }
        // Check if course has space
        const enrolledStudents = this.registrations.filter(r => r.courseId === courseId).length;
        if (enrolledStudents >= course.maxStudents) {
            throw new Error('Course has reached maximum number of students');
        }
        // Check if student is already registered for the course
        const isAlreadyRegistered = this.registrations.some(r => r.studentId === studentId && r.courseId === courseId);
        if (isAlreadyRegistered) {
            throw new Error('Student is already registered for this course');
        }
        // Register the student
        this.registrations.push({ studentId, courseId });
    }
    /**
     * Assigns a grade to a student for a course.
     * @param studentId - The ID of the student.
     * @param courseId - The ID of the course.
     * @param grade - The grade to assign.
     */
    setGrade(studentId, courseId, grade) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student) {
            throw new Error('Student not found');
        }
        if (!course) {
            throw new Error('Course not found');
        }
        // Check if student is registered for the course
        const isRegistered = this.registrations.some(r => r.studentId === studentId && r.courseId === courseId);
        if (!isRegistered) {
            throw new Error('Student is not registered for the course');
        }
        // Record the grade
        const gradeRecord = {
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester
        };
        // Remove any existing grade record for this student and course
        this.grades = this.grades.filter(g => !(g.studentId === studentId && g.courseId === courseId));
        this.grades.push(gradeRecord);
    }
    /**
     * Updates the status of a student.
     * @param studentId - The ID of the student.
     * @param newStatus - The new status to set.
     */
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error('Student not found');
        }
        // Validation: Prevent invalid status changes
        if (student.status === StudentStatus.Graduated && newStatus !== StudentStatus.Graduated) {
            throw new Error('Cannot change status of a graduated student');
        }
        if (student.status === StudentStatus.Expelled && newStatus !== StudentStatus.Expelled) {
            throw new Error('Cannot change status of an expelled student');
        }
        student.status = newStatus;
    }
    /**
     * Retrieves students belonging to a specific faculty.
     * @param faculty - The faculty to filter by.
     * @returns An array of students in the specified faculty.
     */
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    /**
     * Retrieves all grades for a specific student.
     * @param studentId - The ID of the student.
     * @returns An array of grade records for the student.
     */
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    /**
     * Retrieves available courses for a faculty and semester.
     * @param faculty - The faculty to filter by.
     * @param semester - The semester to filter by.
     * @returns An array of available courses.
     */
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }
    /**
     * Calculates the average grade for a student.
     * @param studentId - The ID of the student.
     * @returns The average grade as a number.
     */
    calculateAverageGrade(studentId) {
        const studentGrades = this.grades.filter(g => g.studentId === studentId);
        if (studentGrades.length === 0) {
            return 0;
        }
        const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return total / studentGrades.length;
    }
    /**
     * Retrieves a list of excellent students in a faculty.
     * @param faculty - The faculty to filter by.
     * @returns An array of students who have only excellent grades.
     */
    getExcellentStudents(faculty) {
        const studentsInFaculty = this.getStudentsByFaculty(faculty);
        return studentsInFaculty.filter(student => {
            const grades = this.getStudentGrades(student.id);
            return grades.length > 0 && grades.every(g => g.grade === GradeValue.Excellent);
        });
    }
    /**
     * Adds a new course to the system.
     * @param courseData - The data of the course excluding the ID.
     * @returns The added course with an assigned ID.
     */
    addCourse(courseData) {
        const course = Object.assign({ id: this.courseIdCounter++ }, courseData);
        this.courses.push(course);
        return course;
    }
}
// Приклад використання UniversityManagementSystem
const ums = new UniversityManagementSystem();
// Додавання курсів
const course1 = ums.addCourse({
    name: "Основи Програмування",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 50
});
const course2 = ums.addCourse({
    name: "Математичний Аналіз",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Engineering,
    maxStudents: 40
});
// Зарахування студента
const student1 = ums.enrollStudent({
    fullName: "Спиридонов Владислав",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-101"
});
// Реєстрація студента на курс
ums.registerForCourse(student1.id, course1.id);
// Виставлення оцінки
ums.setGrade(student1.id, course1.id, GradeValue.Excellent);
// Отримання оцінок студента
const grades = ums.getStudentGrades(student1.id);
console.log(`Оцінки студента ${student1.fullName}:`, grades);
// Обчислення середнього балу
const averageGrade = ums.calculateAverageGrade(student1.id);
console.log(`Середній бал студента ${student1.fullName}:`, averageGrade);
// Отримання списку відмінників по факультету
const excellentStudents = ums.getExcellentStudents(Faculty.Computer_Science);
console.log("Відмінники факультету Комп'ютерних Наук:");
excellentStudents.forEach(student => console.log(student.fullName));
