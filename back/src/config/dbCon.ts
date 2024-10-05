import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.DB_URI;

const dbCon = async (): Promise<void> => {
  if (!DB_URI) {
    throw new Error("DB_URI is not defined in the environment variables");
  }
  await mongoose.connect(DB_URI);
};

export default dbCon;
