import express from "express";
import "dotenv/config";
import apirouter from "./router/userrouter";
import cookieparser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use("/api/v1", apirouter);

app.listen(process.env.PORT);
