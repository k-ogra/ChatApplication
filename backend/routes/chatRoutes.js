const express = require("express");
const {
  accessChat,
  getChats
} = require("../controllers/chatControllers");
const { verifyToken } = require("../authentication/verifyToken");

const router = express.Router();

router.route("/").post(verifyToken, accessChat);
router.route("/").get(verifyToken, getChats);

module.exports = router;