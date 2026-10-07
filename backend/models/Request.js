const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        fromStudentId: {
            type: String,
            required: true
        },

        toStudentId: {
            type: String,
            required: true
        },

        skillName: {
            type: String,
            required: true
        },

        message: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected", "Cancelled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Request", requestSchema);