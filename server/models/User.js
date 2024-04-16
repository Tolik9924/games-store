const sequelize = require('../db')
const {DataTypes} = require('sequelize');

// models
const { Student } = require('./Student');
const { Teacher } = require('./Teacher');
const { Token } = require('./Token');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    fullName: {type: DataTypes.STRING},
    dateOfBirth: {type: DataTypes.DATE}
})

User.hasOne(Student);
Student.belongsTo(User);

User.hasOne(Teacher);
Teacher.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

module.exports = {
  User
};