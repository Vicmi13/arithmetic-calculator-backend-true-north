const express = require("express");
const {
  findAllRecords,
  createRecordOperation,
  softDeleteRecord,
  findLastRecordByUserId,
} = require("../controllers/record");
const { authenticateToken } = require("../middleware");

const router = express.Router();

router.get("/", authenticateToken, findAllRecords);
router.get(
  "/last-operation/:userId",
  authenticateToken,
  findLastRecordByUserId
);
router.post("/", authenticateToken, createRecordOperation);
router.patch("/:id", authenticateToken, softDeleteRecord);

module.exports = router;
