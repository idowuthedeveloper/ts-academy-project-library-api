import express from "express";
import dbConnection from "./config/DB.js";
import studentsRoute from "./routes/students.js";
import authorsRoute from "./routes/authors.js";
import attendantsRoute from "./routes/attendants.js";
import booksRoute from "./routes/books.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// connect to the database
dbConnection();

app.use("/api/students", studentsRoute);
app.use("/api/authors", authorsRoute);
app.use("/api/attendants", attendantsRoute);
app.use("/api/books", booksRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to my SCHOOL LIBRARY MANAGEMENT API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
