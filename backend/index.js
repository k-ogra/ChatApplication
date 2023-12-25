const express = require('express');
const dotenv = require("dotenv");
const { default: mongoose } = require('mongoose');
const friendRoutes = require("./routes/friendRoutes");
const cors = require("cors");


const app = express();
app.use(
    cors({
      origin: "*",
    })
  );
dotenv.config();
app.use(express.json());

const connectDb = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
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


const PORT = process.env.PORT || 9000;


app.listen(PORT, console.log("Server running"));