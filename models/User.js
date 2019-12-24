const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        password: {type: String, required: true },
        phonenumber: String,
        email: {  type: String, unique: true,required: true  },
        username:String,
        link:String,
        role: Number// 1-developer 2-employer
        

    },
    { timestamps: true });


const Users = mongoose.model("Users", userSchema);
module.exports = Users;