import express from "express";
import studentRoutes from "./routes/students.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to my SCHOOL LIBRARY MANAGEMENT API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
