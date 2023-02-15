const {
  HTTP_CODES: { SUCCESS, SERVER_ERROR },
} = require("../../constants");

const successResponse = (_req, _res, message, code = SUCCESS) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const messageObject = message;
  if (_req.tokenRefreshed) messageObject.refreshedToken = _req.tokenRefreshed;
  return _res.status(code).json(messageObject);
};
const errorResponse = (res, message, errorObject, code = SERVER_ERROR) => {
  const response = { message };
  if ("message" in errorObject) {
    console.log("message in ERROR", errorObject.message);
    response.errorDetail = errorObject.message || "";
  } else response.errorDetail = "Error in server, please try later";
  res.status(code).json(response);
};

module.exports = { successResponse, errorResponse };
