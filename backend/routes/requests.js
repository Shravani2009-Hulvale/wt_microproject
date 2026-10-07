const express = require("express");
const router = express.Router();

const Request = require("../models/Request");
const Student = require("../models/Student");


// =====================================================
// CREATE REQUEST
// =====================================================
router.post("/", async (req, res) => {
    try {
        const request = new Request(req.body);

        const savedRequest = await request.save();

        res.status(201).json({
            success: true,
            message: "Request sent successfully",
            data: savedRequest
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


// =====================================================
// GET RECENT 5 REQUESTS FOR DASHBOARD
// =====================================================
router.get("/recent/all", async (req, res) => {
    try {

        const requests = await Request.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const studentIds = [];

        requests.forEach(request => {

            if (!studentIds.includes(request.fromStudentId)) {
                studentIds.push(request.fromStudentId);
            }

            if (!studentIds.includes(request.toStudentId)) {
                studentIds.push(request.toStudentId);
            }

        });

        const students = await Student.find({
            studentId: {
                $in: studentIds
            }
        });

        const result = requests.map(request => {

            const fromStudent = students.find(
                student => student.studentId === request.fromStudentId
            );

            const toStudent = students.find(
                student => student.studentId === request.toStudentId
            );

            return {

                _id: request._id,

                fromStudentId: request.fromStudentId,

                fromStudentName: fromStudent
                    ? fromStudent.name
                    : request.fromStudentId,

                toStudentId: request.toStudentId,

                toStudentName: toStudent
                    ? toStudent.name
                    : request.toStudentId,

                skillName: request.skillName,

                message: request.message,

                status: request.status,

                createdAt: request.createdAt

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
// GET REQUESTS FOR A PARTICULAR STUDENT
// =====================================================
router.get("/:studentId", async (req, res) => {

    try {

        const studentId = req.params.studentId;

        const requests = await Request.find({

            $or: [
                {
                    fromStudentId: studentId
                },
                {
                    toStudentId: studentId
                }
            ]

        }).sort({
            createdAt: -1
        });


        res.json({

            success: true,

            data: requests

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// =====================================================
// UPDATE REQUEST STATUS
// =====================================================
router.put("/:id", async (req, res) => {

    try {

        const { status } = req.body;

        const request = await Request.findByIdAndUpdate(

            req.params.id,

            {
                status: status
            },

            {
                new: true
            }

        );


        if (!request) {

            return res.status(404).json({

                success: false,

                message: "Request not found"

            });

        }


        res.json({

            success: true,

            message: "Request status updated",

            data: request

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


module.exports = router;