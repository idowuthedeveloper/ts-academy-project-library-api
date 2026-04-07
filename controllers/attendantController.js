import Attendant from "../models/Attendant.js";
import dbConnection from "../config/DB.js";

dbConnection();

const attendantController = {
  options: {
    select: "_id name staffId createdAt",
  },

  // Create new Attendant record in the database
  async createNewAttendant(req, res) {
    // get the data coming from the request
    const { name, staffId } = req.body;

    // return an error if name is empty
    if (!name) {
      return res.status(412).json({ error: "Name is required" });
    }
    // return an error if name is not a string
    if (typeof name !== "string") {
      return res.status(412).json({ error: "Name must be a string" });
    }

    // return an error if staffId is empty
    if (!staffId) {
      return res.status(412).json({ error: "staffId is required" });
    }
    // return an error if staffId is not a string
    if (typeof staffId !== "string") {
      return res.status(412).json({ error: "staffId must be a string" });
    }

    const attendant = new Attendant();
    attendant.name = name;
    attendant.staffId = staffId;
    await attendant.save();
    res.status(201).json({
      message: "New Attendant created successfully!",
    });
  },

  async allAttendants(req, res) {
    const attendants = await Attendant.find().setOptions(
      attendantController.options,
    );
    return res.status(200).json({ data: attendants });
  },
};

export default attendantController;
