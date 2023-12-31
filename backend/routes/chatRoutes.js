const express = require("express");
const {
  accessChat,
  getChats,
  deleteChat
} = require("../controllers/chatControllers");
const { verifyToken } = require("../authentication/verifyToken");

const router = express.Router();

router.route("/").post(verifyToken, accessChat);
router.route("/").get(verifyToken, getChats);
router.route("/").put(verifyToken, deleteChat);

module.exports = router;