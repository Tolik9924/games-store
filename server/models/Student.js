const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Student = sequelize.define('student', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  number: {type: DataTypes.STRING},
  url: {type: DataTypes.STRING}
})

module.exports = {
  Student
};