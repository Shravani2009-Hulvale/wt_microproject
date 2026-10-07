const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Skill = require("../models/Skill");
const MySkill = require("../models/MySkill");
const Request = require("../models/Request");


// GET PROJECT REPORTS
router.get("/", async (req, res) => {
    try {

        // Total students
        const totalStudents = await Student.countDocuments();

        // Total available skills
        const totalSkills = await Skill.countDocuments();

        // Total student skills
        const totalMySkills = await MySkill.countDocuments();

        // Total requests
        const totalRequests = await Request.countDocuments();

        // Request status counts
        const pendingRequests =
            await Request.countDocuments({
                status: "Pending"
            });

        const acceptedRequests =
            await Request.countDocuments({
                status: "Accepted"
            });

        const rejectedRequests =
            await Request.countDocuments({
                status: "Rejected"
            });

        const cancelledRequests =
            await Request.countDocuments({
                status: "Cancelled"
            });


        // Department statistics
        const departmentStats =
            await Student.aggregate([
                {
                    $group: {
                        _id: "$department",
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]);


        // Skill level statistics
        const skillLevelStats =
            await MySkill.aggregate([
                {
                    $group: {
                        _id: "$level",
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]);


        res.json({

            success: true,

            data: {

                totalStudents,

                totalSkills,

                totalMySkills,

                totalRequests,

                requests: {
                    pending: pendingRequests,
                    accepted: acceptedRequests,
                    rejected: rejectedRequests,
                    cancelled: cancelledRequests
                },

                departments: departmentStats,

                skillLevels: skillLevelStats

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
});


module.exports = router;