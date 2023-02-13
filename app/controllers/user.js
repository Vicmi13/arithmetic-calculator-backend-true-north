const bcrypt = require("bcrypt");
const {
  HTTP_CODES: { CREATED, SUCCESS },
} = require("../constants");
const { errorResponse, successResponse } = require("../utils/response-handler");
const Logger = require("../utils/logger");
const UserModel = require("../../models/user");
const { sanitizeUserList, sanitizeUser } = require("../utils/helpers");

const findAllUsers = async (__, res) => {
  try {
    const allActiveUsers = await UserModel().findAll({ is_active: true });
    const users = sanitizeUserList(allActiveUsers);
    Logger.info({ users }, "Users recovered");
    return successResponse(
      res,
      {
        message: users.length ? "Users recovered" : "Users not found",
        users,
      },
      SUCCESS
    );
  } catch (error) {
    Logger.error(error);
    errorResponse(res, "Error recover users", error);
  }
};

const findOneById = async (req, res) => {
  const { id } = req.params;

  try {
    const userFound = await UserModel().findByPk(id, { is_active: true });
    if (!userFound) {
      return res.status(404).json({ message: "User not found or inactive" });
    }
    return res.status(200).json({
      message: "User found ",
      user: userFound,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      message: "Error user not found",
      error,
    });
  }
};

/** TODO move function fromm here   */
const usernameExists = async (email) => {
  const response = await UserModel().findOne({ where: { username: email } });
  return response;
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!(await usernameExists(username))) {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.GEN_SALT, 10)
      );
      Logger.info(`BCRYPT password ${hashedPassword}`);

      const userCreated = await UserModel().create({
        username,
        password: hashedPassword,
      });
      const userSanitize = sanitizeUser(userCreated);
      Logger.info({ user: userSanitize }, "User created");
      successResponse(
        res,
        {
          message: "User created successfully",
          user: userSanitize,
        },
        CREATED
      );
    } else throw Error("The email is already registered");
  } catch (error) {
    errorResponse(res, "Error creating user", error);
  }
};

module.exports = { findAllUsers, findOneById, createUser, usernameExists };
