const URL_BASE_BACKEND = "/api/v1/arithmetic-calculator";

const LOG_LEVEL = process.env.LOG_LEVEL || "debug";

const APP_NAME = "arithmetic-calculator";

const HTTP_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const JWT_EXPIRED = "TokenExpiredError";

const JWT_INVALID_SIGNATURE = "JsonWebTokenError";

module.exports = {
  URL_BASE_BACKEND,
  HTTP_CODES,
  LOG_LEVEL,
  APP_NAME,
  JWT_EXPIRED,
  JWT_INVALID_SIGNATURE,
};
