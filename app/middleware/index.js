const jwt = require("jsonwebtoken");

/** TODO validate expiration time */
const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);

  let token;
  if (authorization.includes("Bearer")) {
    token = authorization && authorization.split(" ")[1];
  } else {
    token = authorization;
  }
  console.log(`token ${token}`);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log("error_token NAME", err.name);
    console.log("error_token MESSAGE", err.message);
    if (err) return res.sendStatus(403);

    /** TODO  CREATE NEW TOKEN IF token validated successfully
     * add in req and return at the end in RESPONSE
     */
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
