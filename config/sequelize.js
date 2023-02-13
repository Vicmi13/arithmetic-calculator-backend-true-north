const Sequelize = require("sequelize");

const DB_NAME = process.env.DB_NAME || "true-north";
const DB_PASS = process.env.DB_PASS || "Passw0rd";
const DB_USER = process.env.DB_USER || "telcel";
const DB_HOST = process.env.DB_HOST || "127.0.0.1";

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  dialectOptions: {
    timezone: "-05:00",
    // typeCast: function (field, next) {
    //   // for reading from database
    //   if (field.type === "DATETIME") {
    //     return field.string();
    //   }
    //   return next();
    // },
  },
  timezone: "America/Mexico_City",
});
