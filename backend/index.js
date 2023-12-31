const express = require('express');
const dotenv = require("dotenv");
const { default: mongoose } = require('mongoose');
const friendRoutes = require("./routes/friendRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
    })
  );
app.use(express.json());

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected");
    } catch (error) {
        console.log("db not connected");
    }
}
connectDb();

app.get('/', (req,res) => {
    res.send("API running");
});
app.use("/friend", friendRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, console.log("Server running"));
const socketio = require("socket.io")(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});
socketio.on("connection", (socket) => {
    socket.on("setup", (user) => {
        socket.join(user.data._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
    });

    socket.on("newMessage", (newMessageReceived) => {
        newMessageReceived.data.chat.friends.forEach((friend) => {
            if (newMessageReceived.data.sender._id == friend._id) {
                return; 
            }
            socket.in(friend._id).emit("message received", newMessageReceived);
        })
    });
});