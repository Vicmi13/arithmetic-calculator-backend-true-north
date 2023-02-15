/* eslint-disable no-param-reassign */
const Logger = require("../logger");

/**
 * Event listener for HTTP server "error" event.
 */
exports.onErrorListener = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind =
    typeof port === "string"
      ? `Pipe ${process.env.PORT}`
      : `Port ${process.env.PORT}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      Logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      Logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

exports.sanitizeUserList = (userList) =>
  userList.map((user) => {
    delete user.dataValues.password;
    return user;
  });

exports.sanitizeUser = (user) => {
  delete user.dataValues.password;
  return user;
};

exports.validateQueryParams = (bodyQuery) => {
  const where = {};
  Object.entries(bodyQuery).forEach(([key, value]) => {
    if (value !== "" && value !== undefined) {
      where[key] = value;
    }
  });
  return where;
};

exports.getFieldOrderCondition = (name) => {
  const orderArray = [[]];
  // order: [["operation", "type", "ASC"]],
  switch (name) {
    case "id":
      orderArray[0] = "id";
      break;

    case "operation":
      orderArray[0] = "operation";
      orderArray[1] = "type";
      break;

    case "response":
      orderArray[0] = "operation_response";
      break;

    case "cost":
      orderArray[0] = "operation";
      orderArray[1] = "cost";
      break;

    case "balance":
      orderArray[0] = "user_balance";
      break;

    case "date":
      orderArray[0] = "createdAt";
      break;

    default:
      // orderArray[0] = "record";
      orderArray[0] = "id";
      break;
  }

  return orderArray;
};
