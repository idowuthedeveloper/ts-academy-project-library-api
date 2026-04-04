import express from "express";
import studentController from "../controllers/studentController.js";

const router = express.Router();

router.get("/", studentController.allStudents);

router.get("/:id", studentController.oneStudent);

router.post("/", studentController.createNewStudent);

router.put("/:id", studentController.updateStudent);

router.delete("/:id", studentController.deleteStudent);

export default router;
