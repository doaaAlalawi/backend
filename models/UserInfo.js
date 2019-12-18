const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userInfoSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: "Users"},
        img:String,
        jobPosition:String,
        brandstatment:String,
        github:String,
        linkdin:String,
        twitter:String,
        education:String,
    }, { timestamps: true });
const userInfo = mongoose.model("userInfo", userInfoSchema);
module.exports = userInfo;