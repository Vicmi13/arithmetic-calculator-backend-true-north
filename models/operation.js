"use strict";

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

module.exports = () => {
  class OperationCatalog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OperationCatalog.init(
    {
      type: DataTypes.STRING,
      cost: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Operation",
    }
  );
  return OperationCatalog;
};
