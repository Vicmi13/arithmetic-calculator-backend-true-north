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
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
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
