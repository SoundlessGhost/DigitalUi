import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log("connecting to MONGODB URI Successfully ... ");
  } catch (error) {
    console.log("Error in connecting to MongoDB");
  }
};

export default ConnectDB;
