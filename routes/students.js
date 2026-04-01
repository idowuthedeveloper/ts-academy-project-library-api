import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "All Students -> studentController.getAllStudents" });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  return res.status(200).json({
    message: `Find Students -> studentController.findStudent with id: ${id}`,
  });
});

router.post("/", (req, res) => {
  return res.status(201).json({
    message: "Create Students -> studentController.createNewStudents",
  });
});

export default router;
