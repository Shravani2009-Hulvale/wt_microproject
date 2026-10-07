const mongoose = require("mongoose");

const mySkillSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },

    skillName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    level: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("MySkill", mySkillSchema);