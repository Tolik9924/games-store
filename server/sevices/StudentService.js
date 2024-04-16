const { Student } = require("../models/Student");

exports.getAllStudents = async () => {
  return await Student.findAll();
};

exports.createStudent = async (student) => {
  console.log('Student: ', student);
  const userId = student.id;
  console.log('userId: ', userId);
  return await Student.create({ userId });
};

exports.getStudentById = async (id) => {
  return await Student.findByPk(id);
}

exports.updateStudent = async (id, body) => {
  const student =  await Student.findOne({where: { id }});
  return await student.update(body);
};

exports.deleteStudent = async (id) => {
  return await Student.destroy({
    where: { id }
  });
};