const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.verifyPasssword = async (passwordFromLogin, user) => {
  const isPasswordmatch = await bcrypt.compare(
    passwordFromLogin,
    user.password
  );
  if (isPasswordmatch) return isPasswordmatch;
  throw Error("Password incorrect, try again");
};

exports.generateJwtToken = (userInfo) => {
  const {
    dataValues: { username, status },
  } = userInfo;
  return jwt.sign({ email: username, status }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRATION_IN_MINUTES}m`,
  });
};
