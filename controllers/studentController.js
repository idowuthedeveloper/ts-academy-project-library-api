import Student from "../models/Student.js";

const studentController = {
  options: {
    select: "_id name email studentId createdAt",
  },
  // Create new Student record in the database
  async createNewStudent(req, res) {
    // get the data coming from the request
    const { name, email, studentId } = req.body;

    // return an error if name is empty
    if (!name) {
      return res.status(412).json({ error: "Name is required" });
    }
    // return an error if name is empty
    if (!email) {
      return res.status(412).json({ error: "Email is required" });
    }
    // return an error if name is empty
    if (!studentId) {
      return res.status(412).json({ error: "Student ID is required" });
    }

    // return an error if name is not a string
    if (typeof name !== "string") {
      return res.status(412).json({ error: "Name must be a string" });
    }

    // return an error if email is not a string
    if (typeof email !== "string") {
      return res.status(412).json({ error: "Email must be a string" });
    }

    // return an error if studentId is not a string
    if (typeof studentId !== "string") {
      return res.status(412).json({ error: "Student ID must be a string" });
    }

    const student = new Student();
    student.name = name;
    student.email = email;
    student.studentId = studentId;
    await student.save();
    res.status(201).json({
      message: "New Student created successfully!",
    });
  },

  async allStudents(req, res) {
    const Students = await Student.find().setOptions(studentController.options);
    return res.status(200).json({ data: Students });
  },

  async oneStudent(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(503).json({ error: "Student identity is missing!" });
    const student = await Student.findById(id, null, studentController.options);
    if (!student)
      return res.status(404).json({ error: "Student cannot be found!" });
    return res.status(200).json({ data: student });
  },

  async updateStudent(req, res) {
    const { name, email, studentId } = req.body;
    // console.log(name, bio, req.body);
    // return;

    const StudentDataFromReq = {};
    if (name && typeof name == "string") StudentDataFromReq["name"] = name;
    if (email && typeof email == "string") StudentDataFromReq["email"] = email;
    if (studentId && typeof studentId == "string")
      StudentDataFromReq["studentId"] = studentId;

    const { id } = req.params;

    if (!id)
      return res.status(503).json({ error: "Student identity is missing!" });
    const student = await Student.findByIdAndUpdate(id, StudentDataFromReq, {
      ...studentController.options,
      returnDocument: "after",
    });

    if (!student) {
      return res.status(404).json({
        error: "Student could not be found!",
      });
    }

    return res.status(200).json({ data: student });
  },

  async deleteStudent(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(503).json({ error: "Student identity is missing!" });
    const student = await Student.findByIdAndDelete(id);

    if (!student)
      return res.status(404).json({
        error: "Student could not be deleted because we couldn't found it!",
      });

    return res.status(200).json({ message: "Student deleted successfully!" });
  },
};

export default studentController;
