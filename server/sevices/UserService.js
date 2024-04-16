const { ADMIN } = require('../constants/UserRoles');
const { User } = require('../models/User');

const findByEmail = async (email) => await User.findOne({ 
  where: { email },
  attributes: ['id', 'email', 'role', 'fullName', 'dateOfBirth']  
});

/* const findByEmailWithRoleId = async (email) => {
  const user = await User.findOne({ 
    where: { email },
    attributes: ['email', 'role'] 
  });
  if (user.role === ADMIN) {
    return user;
  }
  return user.populate({
    path: 'roleId',
    select: 'level',
  });
} */

const updateByID = async (id, body) => {
  const student =  await Student.findOne({where: { id }});
  return await student.updateAttributes(body);
};

const getCurrentPassword = async (id) => await User.findOne({where: { id }, attributes: ['password']});

module.exports = { findByEmail, updateByID, getCurrentPassword };