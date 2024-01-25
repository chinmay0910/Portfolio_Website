const mongoose = require('mongoose');

const skillSchema  = new mongoose.Schema({
    "SkillName": String,
    "ImgLink": String,
})

// Collection
const skillData = new mongoose.model("skills",skillSchema);

module.exports = skillData;