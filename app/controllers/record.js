/* eslint-disable camelcase */
const RecordModel = require("../../models/record");
const OperationModel = require("../../models/operation");
const Logger = require("../utils/logger");
const { errorResponse, successResponse } = require("../utils/response-handler");
const {
  HTTP_CODES: { SUCCESS, CREATED, NOT_FOUND },
} = require("../constants");
const User = require("../../models/user");
const { validateQueryParams } = require("../utils/helpers");
const { getOperationResult } = require("../utils/helpers/operationHelper");

const findAllRecords = async (req, res) => {
  const paramsValidated = validateQueryParams(req.query);

  const page = paramsValidated.page ? paramsValidated.page : 0;
  const limit = paramsValidated.pageSize
    ? parseInt(paramsValidated.pageSize, 10)
    : 10;

  delete paramsValidated.page;
  delete paramsValidated.pageSize;
  console.log("tokenRefreshed CONTROLLER", req.tokenRefreshed);
  console.log("paramsValidated", paramsValidated);
  console.log("page", page);
  console.log("limit", limit);

  const offset = page * limit;
  try {
    const totalRecords = await RecordModel.count();
    Logger.info(`total records ${totalRecords}`);
    if (offset <= totalRecords) {
      const records = await RecordModel.findAll({
        offset,
        limit,
        where: paramsValidated,
        include: [
          { model: OperationModel, attributes: ["id", "type", "cost"] },
          { model: User, attributes: ["username", "id"] },
        ],
      });
      Logger.info(
        `Records found with page size and pagination ${records.length}`
      );
      return successResponse(
        req,
        res,
        {
          message: records.length ? "Records recovered" : "Records empty",
          records,
        },
        SUCCESS
      );
    }
    return errorResponse(
      res,
      "There aren't records with the pagination specified",
      { message: "" },
      NOT_FOUND
    );
  } catch (error) {
    Logger.error({ error }, "Error recover all records");
    errorResponse(res, "Error recover all records", error);
  }
};

const findLastRecordByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const latestRecord = await RecordModel.findOne({
      order: [["createdAt", "DESC"]],
      where: { userId },
      include: [{ model: User, attributes: ["username", "id"] }],
    });

    if (!latestRecord) {
      return errorResponse(
        res,
        `Record not found for user id ${userId}`,
        { message: "" },
        NOT_FOUND
      );
    }

    Logger.info(`latestRecord id ${latestRecord.id}`);
    const {
      user_balance: userBalance,
      operation_response: operationResponse,
      operationId,
      createdAt,
      id,
    } = latestRecord;
    return successResponse(
      req,
      res,
      {
        message: "Latest record",
        latestRecord: {
          id,
          userBalance,
          operationResponse,
          operationId,
          createdAt,
        },
      },
      SUCCESS
    );
  } catch (error) {
    Logger.error({ error }, "Error recover latest record ");
    errorResponse(res, "Error recover  latest record by userId", error);
  }
};

const createRecordOperation = async (req, res) => {
  /**
     * "amount" : "1",
    "firstValue": "7",
    "secondValue": "8",
    "userBalance": "99",    
    "operationId": "1",
    "userId": "1"
     */
  const { amount, valueOne, valueTwo, userBalance, operationId, userId } =
    req.body;
  try {
    const { type, cost } = await OperationModel.findByPk(operationId);
    console.log("cost", cost);
    console.log("operation", type);

    const operationResponse = getOperationResult(type, valueOne, valueTwo);
    console.log("RESULT", operationResponse);

    const result = await RecordModel.create({
      amount,
      user_balance: userBalance - amount,
      operation_response: operationResponse,
      userId,
      operationId,
    });
    Logger.info({ recordOperation: result }, "Operation executed ");
    return successResponse(
      req,
      res,
      {
        message: "Records created successfully",
        result,
      },
      CREATED
    );
  } catch (error) {
    Logger.error({ error }, "Error user not found");
    errorResponse(res, "Error store calculator operation", error);
  }
};

const softDeleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const recordFound = await RecordModel.findByPk(id);
    if (!recordFound) {
      return res.status(404).json({ message: "Record not found " });
    }
    const recordUpdated = await RecordModel.update(
      {
        is_archived: true,
      },
      { where: { id } }
    );
    Logger.info({ record: recordUpdated }, "Soft delete successfully");
    successResponse(req, res, "Record delete it successfully");
  } catch (error) {
    Logger.error({ error }, "Error recover operations from catalog");
    errorResponse(res, "Error recover users", error);
  }
};

module.exports = {
  findAllRecords,
  createRecordOperation,
  softDeleteRecord,
  findLastRecordByUserId,
};
