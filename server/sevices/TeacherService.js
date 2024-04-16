const { Teacher } = require("../models/Teacher");

exports.getAllTeachers = async () => {
  return await Teacher.findAll();
};

exports.createTeacher = async (teacher) => {
  console.log('Teacher: ', teacher);
  const userId = teacher.id;
  console.log('userId: ', userId);
  return await Teacher.create({ userId });
};

exports.getTeacherById = async (id) => {
  return await Teacher.findByPk(id);
};

exports.updateTeacher = async (id, body) => {
  const teacher =  await Teacher.findOne({where: { id }});
  return await teacher.update(body);
};

exports.deleteTeacher = async (id) => {
  return await Teacher.destroy({
    where: { id }
  });
};