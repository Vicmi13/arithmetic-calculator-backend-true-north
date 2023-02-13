const express = require("express");
const { findAllRecords } = require("../controllers/record");
const { authenticateToken } = require("../middleware");

const router = express.Router();

router.get("/", authenticateToken, findAllRecords);
router.get("/:id", authenticateToken, findOneRecordById);
router.post("/", authenticateToken, createRecord);
router.patch("/:id", authenticateToken, softDeleteRecord);

module.exports = router;
