import express from "express";
import studentsRoute from "./routes/students.js";
import authorsRoute from "./routes/authors.js";
import dbConnection from "./config/DB.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// dbConnection();

app.use("/api/students", studentsRoute);
app.use("/api/authors", authorsRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to my SCHOOL LIBRARY MANAGEMENT API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
