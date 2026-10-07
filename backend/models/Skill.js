const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    level: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Skill", skillSchema);