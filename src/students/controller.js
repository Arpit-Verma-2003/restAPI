const pool = require("../../db");
const queries = require("./queries");
const getStudents = (req, res) => {
  pool.query(queries.getStudents, (err, results) => {
    if (err) throw err;
    else res.status(200).json(results.rows);
  });
};
const getStudentsById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsById, [id], (err, results) => {
    if (err) throw err;
    else res.status(200).json(results.rows);
  });
};
const addStudents = (req, res) => {
  const { name, email, age, dob } = req.body;
  // logic to email duplicate check
  pool.query(queries.checkMailExists, [email], (err, results) => {
    if (results.rows.length) return res.end("Email Already Exists");

    pool.query(queries.addStudents, [name, email, age, dob], (err, results) => {
      if (err) throw err;
      else res.status(201).send("student created successfully");
    });
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsById, [id], (err, results) => {
    if (!results.rows.length) return res.end("No User Found | Can't Delete");
    pool.query(queries.removeStudentsById, [id], (err, results) => {
      if (err) throw err;
      else res.status(200).send("Deleted Successfully");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getStudentsById, [id], (err, results) => {
    if (!results.rows.length) return res.end("No User Found | Can't Delete");
    pool.query(queries.updateStudentById, [name,id], (err, results) => {
      if (err) throw err;
      return res.status(200).send("Updated Successfully");
    });
  });
};

module.exports = {
  getStudents,
  getStudentsById,
  addStudents,
  removeStudent,
  updateStudent,
};
