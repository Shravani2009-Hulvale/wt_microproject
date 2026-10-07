const express = require("express");
const router = express.Router();

const Skill = require("../models/Skill");


// GET ALL SKILLS
router.get("/", async (req, res) => {
    try {
        const skills = await Skill.find();

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


// ADD SKILL
router.post("/", async (req, res) => {

    try {

        const skill = new Skill(req.body);

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


// DELETE SKILL
router.delete("/:id", async (req, res) => {

    try {

        const deletedSkill =
            await Skill.findByIdAndDelete(req.params.id);


        if (!deletedSkill) {

            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });

        }


        res.json({
            success: true,
            message: "Skill deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


module.exports = router;