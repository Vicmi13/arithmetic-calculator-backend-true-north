"use strict";

const { DataTypes: sequelizeDataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define("user", {
  username: {
    type: sequelizeDataTypes.STRING,
    allowNull: false,
    len: [2, 50],
    trim: true,
    unique: true,
    validate: {
      notNull: { args: true, msg: "email required" },
    },
  },
  password: sequelizeDataTypes.STRING,
  status: { type: sequelizeDataTypes.BOOLEAN, defaultValue: true },
});

module.exports = User;

// module.exports = () => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init(
//     {
//       username: {
//         type: sequelizeDataTypes.STRING,
//         allowNull: false,
//         len: [2, 50],
//         trim: true,
//         unique: true,
//         validate: {
//           notNull: { args: true, msg: "email required" },
//         },
//       },
//       password: sequelizeDataTypes.STRING,
//       status: { type: sequelizeDataTypes.BOOLEAN, defaultValue: true },
//     },
//     {
//       sequelize,
//       modelName: "User",
//     }
//   );
//   return User;
// };
