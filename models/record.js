"use strict";

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const operationModel = require("./operation");

module.exports = () => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(operationModel());
      Record().hasOne(models.operation);
    }
  }
  Record.init(
    {
      amount: DataTypes.FLOAT,
      user_balance: DataTypes.FLOAT,
      operation_response: DataTypes.STRING,
      is_archived: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Record",
    }
  );
  return Record;
};
