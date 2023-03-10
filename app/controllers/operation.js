const operationModel = require("../../models/operation");
const {
  HTTP_CODES: { SUCCESS, NOT_FOUND },
} = require("../constants");
const Logger = require("../utils/logger");
const { errorResponse, successResponse } = require("../utils/response-handler");

const findAllOperations = async (req, res) => {
  try {
    const operations = await operationModel.findAll();
    Logger.info({ operations }, "Operations catalog ");
    successResponse(
      req,
      res,
      {
        message: operations.length
          ? "Operations registered"
          : "Operations not found in catalog",
        operations,
      },
      SUCCESS
    );
  } catch (error) {
    Logger.error(error);
    errorResponse(res, "Error recover users", error);
  }
};

const findOperationById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID OPERATION", req.params);
    const operationFound = await operationModel.findByPk(id);
    if (!operationFound) {
      return errorResponse(
        res,
        `Operation not found with id ${id}`,
        { message: "" },
        NOT_FOUND
      );
    }
    return res.status(200).json({
      message: "Operation found ",
      operation: operationFound,
    });
  } catch (error) {
    Logger.error({ error }, "Error recover operations from catalog");
    errorResponse(res, "Error recover users", error);
  }
};

module.exports = { findAllOperations, findOperationById };
