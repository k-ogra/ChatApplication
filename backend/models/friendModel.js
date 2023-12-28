const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const friendModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

friendModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  friendModel.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  });
  

const Friend = mongoose.model("Friend", friendModel);
module.exports = Friend; 