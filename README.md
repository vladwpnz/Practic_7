# 🎓 Practic 7 - University Management System

## 📝 Overview

This project implements a **University Management System** in **TypeScript**. The system provides functionality for managing students, courses, and grades, following all the requirements outlined in the task. Below is a summary of the implemented features and the methods provided by the system.

---

## ✅ Task Implementation

### 🔖 Enums

The following enums were created as required:
- **`StudentStatus`**: Defines the status of a student:
  - `Active`
  - `Academic Leave`
  - `Graduated`
  - `Expelled`
- **`CourseType`**: Represents the type of a course:
  - `Mandatory`
  - `Optional`
  - `Special`
- **`Semester`**: Represents the semester:
  - `First`
  - `Second`
- **`GradeValue`**: Contains possible grades:
  - `Excellent` = 5
  - `Good` = 4
  - `Satisfactory` = 3
  - `Unsatisfactory` = 2
- **`Faculty`**: Lists university faculties:
  - `Computer Science`
  - `Economics`
  - `Law`
  - `Engineering`

---

### 🖋️ Interfaces

The system defines the following interfaces:
- **`Student`**:
  - Represents a student, including fields such as:
    - `id`
    - `fullName`
    - `faculty`
    - `status`
    - and more.
- **`Course`**:
  - Represents a course with properties like:
    - `id`
    - `name`
    - `type`
    - `credits`
    - `faculty`
    - and more.
- **`GradeRecord`**:
  - Represents a grade record for a student in a specific course.

---

### 🚀 Class: `UniversityManagementSystem`

The `UniversityManagementSystem` class provides the following methods:

#### 📌 Student Management
1. **`enrollStudent(studentData: Omit<Student, "id">): Student`**
   - Enrolls a new student into the system.
   - Generates a unique ID for the student.

2. **`updateStudentStatus(studentId: number, newStatus: StudentStatus): void`**
   - Updates the status of a student (e.g., from `Active` to `Academic Leave`).
   - Includes validation to prevent invalid status changes.

#### 📌 Course Management
3. **`addCourse(courseData: Omit<Course, "id">): Course`**
   - Adds a new course to the system.

4. **`registerForCourse(studentId: number, courseId: number): void`**
   - Registers a student for a specific course, ensuring:
     - The student is active.
     - The student and the course belong to the same faculty.
     - The course has available slots.

5. **`getAvailableCourses(faculty: Faculty, semester: Semester): Course[]`**
   - Lists available courses for a faculty and a semester.

#### 📌 Grades Management
6. **`setGrade(studentId: number, courseId: number, grade: GradeValue): void`**
   - Assigns a grade to a student for a course.
   - Ensures the student is registered for the course.

7. **`getStudentGrades(studentId: number): GradeRecord[]`**
   - Returns all grades assigned to a specific student.

8. **`calculateAverageGrade(studentId: number): number`**
   - Calculates the average grade of a student across all courses.

9. **`getExcellentStudents(faculty: Faculty): Student[]`**
   - Retrieves a list of students from a specific faculty who have only excellent grades.

---


