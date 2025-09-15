import express from "express";
import "dotenv/config";
import apirouter from "./router/userrouter";
import cookieparser from "cookie-parser";
import workerrouter from "./router/workflowrouter";
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use("/api/v1", apirouter);
app.get("/healthCheck", (req, res) => {
  res.send("api is working fine");
});
app.get("/workflow", workerrouter);
app.listen(process.env.PORT);
