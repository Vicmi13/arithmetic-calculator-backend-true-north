const express = require("express");
const {
  findAllOperations,
  findOperationById,
} = require("../controllers/operation");
const { authenticateToken } = require("../middleware");

const router = express.Router();

router.get("/", authenticateToken, findAllOperations);
router.get("/:id", authenticateToken, findOperationById);

module.exports = router;
