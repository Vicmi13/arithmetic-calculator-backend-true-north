const {
  HTTP_CODES: { BAD_REQUEST },
} = require("../constants");
const Logger = require("../utils/logger");
const { errorResponse, successResponse } = require("../utils/response-handler");
const { usernameExists } = require("./user");
const UserModel = require("../../models/user");
const {
  verifyPasssword,
  generateJwtToken,
} = require("../utils/helpers/authHelper");
const { sanitizeUser } = require("../utils/helpers");

exports.login = async (req, res) => {
  // TODO add a filed validator
  const { email, password } = req.body;
  try {
    const userFound = await usernameExists(email);
    if (userFound) {
      Logger.info({ user: userFound }, "User found");
      //   const user = UserModel.bind(userFound.dataValues);
      //   console.log("user model", user);
      if (userIsBlocked(userFound)) {
        const isPasswordMatch = await verifyPasssword(password, userFound);
        Logger.info({ isPasswordMatch }, "credentials correct");
        const {
          dataValues: { username, status, id },
        } = sanitizeUser(userFound);
        const token = await generateJwtToken({ email: username, status, id });
        console.log("TOKEN", token);
        successResponse(req, res, { token });
      }
    } else {
      throw Error("User email is not registered previously");
    }
  } catch (error) {
    Logger.error({ error }, "Error with login access");
    errorResponse(res, "Error in login", error, BAD_REQUEST);
  }
};

const userIsBlocked = (user) => {
  if (user.status) {
    return true;
  }
  throw Error("The user is inactive, please contact the admin");
};
