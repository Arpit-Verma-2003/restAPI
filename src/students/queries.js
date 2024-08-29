const getStudents = "SELECT * FROM students";
const getStudentsById = "SELECT * FROM students WHERE id = $1";
const checkMailExists = "SELECT s FROM students s WHERE s.email = $1";
const addStudents = "INSERT INTO students (name,email,age,dob) VALUES($1,$2,$3,$4)";
const removeStudentsById = "DELETE FROM students WHERE id = $1";
const updateStudentById = "UPDATE students SET name = $1 where id = $2"
module.exports = {
  getStudents,
  getStudentsById,
  checkMailExists,
  addStudents,
  removeStudentsById,
  updateStudentById,
};
