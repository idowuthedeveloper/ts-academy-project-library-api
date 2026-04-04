import mongoose from "mongoose";

const dbConnection = async function () {
  try {
    await mongoose.connect("mongodb://localhost:27017/library-api-db");
    mongoose.ConnectionStates = 1;
    console.log("connection successful!");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
