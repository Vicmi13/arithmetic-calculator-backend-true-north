"use strict";

const { DataTypes } = require("sequelize");
const sequelizeConnection = require("../config/sequelize");
const Operation = require("./operation");
const User = require("./user");

const Record = sequelizeConnection.define("record", {
  amount: { type: DataTypes.FLOAT },
  user_balance: { type: DataTypes.FLOAT },
  operation_response: { type: DataTypes.STRING },
  is_archived: { type: DataTypes.BOOLEAN, defaultValue: false },
  operationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "operationId is required",
      },
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "userId is required",
      },
    },
  },
});

Record.belongsTo(Operation);
Operation.hasOne(Record);

Record.belongsTo(User);
User.hasOne(Record);

module.exports = Record;
