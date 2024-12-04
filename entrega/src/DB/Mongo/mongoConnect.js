import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoDBConection = async () => {
  mongoose.connect(process.env.MONGO_URI);

  return mongoose.connection;
};

export default mongoDBConection;
