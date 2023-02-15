const bcrypt = require("bcrypt");
const {
  HTTP_CODES: { CREATED, SUCCESS, NOT_FOUND },
} = require("../constants");
const { errorResponse, successResponse } = require("../utils/response-handler");
const Logger = require("../utils/logger");
const UserModel = require("../../models/user");
const { sanitizeUserList, sanitizeUser } = require("../utils/helpers");

const findAllUsers = async (req, res) => {
  try {
    const allActiveUsers = await UserModel.findAll({ is_active: true });
    const users = sanitizeUserList(allActiveUsers);
    Logger.info({ users }, "Users recovered");
    return successResponse(
      req,
      res,
      {
        message: users.length ? "Users recovered" : "Users not found",
        users,
      },
      SUCCESS
    );
  } catch (error) {
    Logger.error({ error }, "Error recover users");
    errorResponse(res, "Error recover users", error);
  }
};

const findOneById = async (req, res) => {
  const { id } = req.params;

  try {
    const userFound = await UserModel.findByPk(id, { is_active: true });
    if (!userFound) {
      errorResponse(res, "Error user not found", {}, NOT_FOUND);
    }
    return successResponse(
      req,
      res,
      {
        message: "User found ",
        user: userFound,
      },
      SUCCESS
    );
  } catch (error) {
    Logger.error({ error }, "Error user not found");
    errorResponse(res, "Error user not found", error);
  }
};

/** TODO move function fromm here   */
const usernameExists = async (email) => {
  const response = await UserModel.findOne({ where: { username: email } });
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

      const userCreated = await UserModel.create({
        username,
        password: hashedPassword,
      });
      const userSanitize = sanitizeUser(userCreated);
      Logger.info({ user: userSanitize }, "User created");
      successResponse(
        req,
        res,
        {
          message: "User created successfully",
          user: userSanitize,
        },
        CREATED
      );
    } else throw Error("The email is already registered");
  } catch (error) {
    console.log(error);
    errorResponse(res, "Error creating user", error);
  }
};

module.exports = { findAllUsers, findOneById, createUser, usernameExists };
