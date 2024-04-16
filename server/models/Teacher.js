const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Teacher = sequelize.define('teacher', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  language: {type: DataTypes.STRING},
  biography: {type: DataTypes.STRING},
  phone: {type: DataTypes.STRING},
  url: {type: DataTypes.STRING},
  age: {type: DataTypes.NUMBER},
  preferences: {type: DataTypes.STRING},
  socialMedia: {type: DataTypes.STRING},
});

module.exports = {
  Teacher
};