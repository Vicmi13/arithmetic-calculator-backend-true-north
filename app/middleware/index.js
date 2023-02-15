const jwt = require("jsonwebtoken");
const {
  HTTP_CODES: { FORBIDDEN },
  JWT_EXPIRED,
  JWT_INVALID_SIGNATURE,
} = require("../constants");
const { generateJwtToken } = require("../utils/helpers/authHelper");
const { errorResponse } = require("../utils/response-handler");

const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);

  let token;
  if (authorization.includes("Bearer")) {
    token = authorization && authorization.split(" ")[1];
  } else {
    token = authorization;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
    if (err) {
      const errorObject = {
        message:
          err.name === JWT_EXPIRED ? "The token has expired" : "Invalid token",
      };
      return errorResponse(res, "Error in JWT", errorObject, FORBIDDEN);
    }

    const { email, status, id } = userData;
    const refreshToken = generateJwtToken({ email, status, id });
    req.tokenRefreshed = refreshToken;
    next();
  });
};

module.exports = { authenticateToken };
