import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import categoryRoutes from "./router/routerCategory";
import letterRoutes from "./router/routerLetter";
import reflectRoutes from "./router/routerReflect";
import { sessionConfig } from "./config/sessionConfig";
import { kakaoRouter } from "./router/kakaoRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Time Capsule!");
});

app.use(sessionConfig);

app.use(kakaoRouter);
app.use("/api", categoryRoutes);
app.use("/api", letterRoutes);
app.use("/api", reflectRoutes);

app.listen(port, () => {
  console.log(`서버 실행 성공! http://localhost:${port}`);
});
