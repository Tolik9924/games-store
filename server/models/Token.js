const sequelize = require('../db')
const {DataTypes} = require('sequelize');

const Token = sequelize.define('token', {
  token: {type: DataTypes.STRING, allowNull: false},
  tokenExpires: {
    type: DataTypes.DATE,
    defaultValue: Date.now() + 43200
  }
}, { timestamps: true });

module.exports = {
  Token
};