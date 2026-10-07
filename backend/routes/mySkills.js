const express = require("express");
const router = express.Router();

const MySkill = require("../models/MySkill");


// GET MY SKILLS
router.get("/:studentId", async (req, res) => {
    try {
        const skills = await MySkill.find({
            studentId: req.params.studentId
        });

        res.json({
            success: true,
            data: skills
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// ADD MY SKILL
router.post("/", async (req, res) => {
    try {
        const skill = new MySkill(req.body);

        const savedSkill = await skill.save();

        res.status(201).json({
            success: true,
            message: "Skill added successfully",
            data: savedSkill
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


// DELETE MY SKILL
router.delete("/:id", async (req, res) => {
    try {
        const deletedSkill =
            await MySkill.findByIdAndDelete(req.params.id);

        if (!deletedSkill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.json({
            success: true,
            message: "Skill removed successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;