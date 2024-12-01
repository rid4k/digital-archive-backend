import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import serverData from "./config/config";
import connectDb from "./db/db";
import routes from "./routers/routes";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(serverData.port, () => {
  console.log(`Server is running on port ${serverData.port}`);
});

connectDb();

app.use("/api/v1", routes());
