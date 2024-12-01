import mongoose from "mongoose";
import serverData from "../config/config";

export default function connectDb() {
  if (!serverData.mongoUrl) {
    console.error("Mongo URL is undefined. Check your environment variables.");
    return;
  }
  mongoose.Promise = Promise;
  mongoose.connect(serverData.mongoUrl);
  mongoose.connection.on("error", (error: Error) => console.log(error));
  console.log("Connected to database");
}
