import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import db from "./config/db";
import cors from "cors";
import mainRouter from "./routes/mainRoutes";
dotenv.config();

db
const corsOptions = {
  origin: "*",
  credentials: true,
  //  access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/", mainRouter)
app.listen(`${process.env.PORT}`, () => {
  console.log(`Server is running on this PORT: - ${process.env.PORT}`);
});
