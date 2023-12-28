const express = require('express');
const { loginController, registerController, getFriendsController} = require('../controllers/friendController');
const { verifyToken } = require('../authentication/verifyToken');

const Router = express.Router(); 

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.get("/getFriends", verifyToken, getFriendsController);

module.exports = Router; 