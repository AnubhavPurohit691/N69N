import { Router } from "express";
import {
  signincontroller,
  signupcontroller,
} from "../controller/authcontroller";
import workflowrouter from "./workflowrouter";
import { authmiddleware, type Authrequest } from "../middleware/authmiddleware";
const router = Router();
router.post("/signup", signupcontroller);
router.post("/signin", signincontroller);
router.use("/workflow", authmiddleware, workflowrouter);
export default router;
