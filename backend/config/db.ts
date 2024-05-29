import mongoose from "mongoose";

const db = mongoose
  .connect('mongodb://127.0.0.1:27017/article')
  .then(() => {
    console.log("Database connect successfully");
  })
  .catch((err: any) => {
    console.log("Something went wrong:-", err);
  });
export default db;