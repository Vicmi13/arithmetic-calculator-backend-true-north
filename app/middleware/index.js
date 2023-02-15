const jwt = require("jsonwebtoken");
const { generateJwtToken } = require("../utils/helpers/authHelper");

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
    console.log("error_token ", err);

    if (err) return res.sendStatus(403);
    // TODO handle differente JWT errors
    // console.log("error_token NAME", err.name);
    // console.log("error_token MESSAGE", err.message);

    const { email, status, id } = userData;
    const refreshToken = generateJwtToken({ email, status, id });
    req.tokenRefreshed = refreshToken;
    next();
  });
};

module.exports = { authenticateToken };
