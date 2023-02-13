const express = require("express");
const {
  findOneById,
  findAllUsers,
  createUser,
} = require("../controllers/user");
const { authenticateToken } = require("../middleware");

const router = express.Router();

router.get("/", authenticateToken, findAllUsers);
router.get("/:id", authenticateToken, findOneById);
router.post("/", createUser);

module.exports = router;
