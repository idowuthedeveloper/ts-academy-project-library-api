import mongoose from "mongoose";

const { Schema } = mongoose;

const attendantSchema = new Schema({
  name: { type: String, required: true },
  staffId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Attendant = mongoose.model("Attendant", attendantSchema);

export default Attendant;
