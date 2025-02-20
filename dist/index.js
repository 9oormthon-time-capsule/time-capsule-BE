"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routerCategory_1 = __importDefault(require("./router/routerCategory"));
const routerLetter_1 = __importDefault(require("./router/routerLetter"));
const routerReflect_1 = __importDefault(require("./router/routerReflect"));
const routerTodo_1 = __importDefault(require("./router/routerTodo"));
const sessionConfig_1 = require("./config/sessionConfig");
const kakaoRoutes_1 = require("./router/kakaoRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(
  (0, cors_1.default)({
    origin: "https://tcapsule.shop",
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("Hello, Time Capsule!");
});
app.use(sessionConfig_1.sessionConfig);
app.use(kakaoRoutes_1.kakaoRouter);
app.use("/api", routerCategory_1.default);
app.use("/api", routerLetter_1.default);
app.use("/api", routerReflect_1.default);
app.use("/api", routerTodo_1.default);
app.listen(port, () => {
  console.log(`서버 실행 성공! http://localhost:${port}`);
});
