function setCurrentStudent(studentId) {
    localStorage.setItem("currentStudentId", studentId);
}

function getCurrentStudent() {
    return localStorage.getItem("currentStudentId");
}

function clearCurrentStudent() {
    localStorage.removeItem("currentStudentId");
}