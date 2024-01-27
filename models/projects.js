const mongoose = require('mongoose');

const projectSchema  = new mongoose.Schema({
    "projectTitle": String,
    "projectDescription": String,
    "projectLink": String,
    "projectCodeLink": String,
    "ImgLink": String,
})

// Collection
const projectData = new mongoose.model("projects",projectSchema);

module.exports = projectData;