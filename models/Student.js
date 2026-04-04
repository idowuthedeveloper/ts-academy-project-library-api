import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  studentId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
