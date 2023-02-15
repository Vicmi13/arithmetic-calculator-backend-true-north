"use strict";

const { DataTypes } = require("sequelize");
const sequelizeConnection = require("../config/sequelize");

const Operation = sequelizeConnection.define("operation", {
  type: { type: DataTypes.STRING },
  cost: { type: DataTypes.FLOAT },
});

module.exports = Operation;
