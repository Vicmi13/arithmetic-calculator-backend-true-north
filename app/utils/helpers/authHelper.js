/* eslint-disable implicit-arrow-linebreak */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.verifyPasssword = async (passwordFromLogin, user) => {
  const isPasswordmatch = await bcrypt.compare(
    passwordFromLogin,
    user.password
  );
  if (isPasswordmatch) return isPasswordmatch;
  throw Error("Incorrect password, please try again");
};

exports.generateJwtToken = (userInfo) => {
  const { email, status, id } = userInfo;
  return jwt.sign({ email, status, id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRATION_IN_MINUTES}m`,
  });
};
