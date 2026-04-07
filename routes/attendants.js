import express from "express";
import attendantController from "../controllers/attendantController.js";

const router = express.Router();

router.get("/", attendantController.allAttendants);

router.post("/", attendantController.createNewAttendant);

export default router;
