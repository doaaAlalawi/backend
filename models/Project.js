const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        title: String,
        description: String,
        image: String,
        github: String,
        link:String,
        user: { type: Schema.Types.ObjectId, ref: "Users" }
    },
    { timestamps: true });


const Projects = mongoose.model("Projects", projectSchema);
module.exports = Projects;
