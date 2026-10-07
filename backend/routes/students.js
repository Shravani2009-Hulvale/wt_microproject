const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const MySkill = require("../models/MySkill");


// =====================================================
// GET ALL STUDENTS
// =====================================================

router.get("/", async (req, res) => {
    try {

        const students = await Student.find();

        res.json({
            success: true,
            data: students
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});


// =====================================================
// ADD STUDENT
// =====================================================

router.post("/", async (req, res) => {
    try {

        const student = new Student(req.body);

        const savedStudent = await student.save();

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            data: savedStudent
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
});


// =====================================================
// FIND STUDENTS BY SKILL
// =====================================================

router.get("/find", async (req, res) => {
    try {

        const { skill, level } = req.query;

        if (!skill) {
            return res.status(400).json({
                success: false,
                message: "Skill is required"
            });
        }

        // Escape special characters used in regular expressions
        const escapedSkill = skill.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const query = {
            skillName: {
                $regex: escapedSkill,
                $options: "i"
            }
        };

        if (level && level !== "All") {
            query.level = {
                $regex: `^${level}$`,
                $options: "i"
            };
        }

        const mySkills = await MySkill.find(query);

        const studentIds = mySkills.map(
            mySkill => mySkill.studentId
        );

        const students = await Student.find({
            studentId: {
                $in: studentIds
            }
        });

        const result = mySkills.map(mySkill => {

            const student = students.find(
                s => s.studentId === mySkill.studentId
            );

            return {
                studentId: mySkill.studentId,

                name: student
                    ? student.name
                    : "Unknown",

                email: student
                    ? student.email
                    : "",

                department: student
                    ? student.department
                    : "",

                semester: student
                    ? student.semester
                    : "",

                skillName: mySkill.skillName,

                category: mySkill.category,

                level: mySkill.level
            };

        });

        res.json({
            success: true,
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});



// =====================================================
// GET STUDENT PROFILE
// =====================================================

router.get("/profile/:studentId", async (req, res) => {
    try {

        const student = await Student.findOne({
            studentId: req.params.studentId
        });

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        res.json({
            success: true,
            data: student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});


// =====================================================
// UPDATE STUDENT PROFILE
// =====================================================

router.put("/profile/:studentId", async (req, res) => {
    try {

        const student = await Student.findOneAndUpdate(

            {
                studentId: req.params.studentId
            },

            {
                name: req.body.name,
                email: req.body.email,
                department: req.body.department,
                semester: req.body.semester,
                primarySkill: req.body.primarySkill
            },

            {
                new: true,
                runValidators: true
            }

        );

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: student
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
});


// =====================================================
// GET STUDENT BY ID
// =====================================================

router.get("/:id", async (req, res) => {
    try {

        const student = await Student.findById(
            req.params.id
        );

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        res.json({
            success: true,
            data: student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;