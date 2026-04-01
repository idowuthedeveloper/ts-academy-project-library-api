import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "All Attendants -> AttendantController.allAttendants" });
});

router.post("/", (req, res) => {
  return res.status(201).json({
    message: "Create Attendants -> AttendantController.createAttendant",
  });
});

export default router;
