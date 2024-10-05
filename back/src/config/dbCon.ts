import mongoose from "mongoose";
import { DB_URI } from "../config/envs";

const dbCon = async () => {
  await mongoose.connect(`${DB_URI}`);
};

export default dbCon;
