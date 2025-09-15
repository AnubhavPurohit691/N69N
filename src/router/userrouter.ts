import { Router } from "express";
import {
  signincontroller,
  signupcontroller,
} from "../controller/authcontroller";
import credentialrouter from "./credentialrouter";
import workflowrouter from "./workflowrouter";
import { authmiddleware, type Authrequest } from "../middleware/authmiddleware";
const router = Router();
router.post("/signup", signupcontroller);
router.post("/signin", signincontroller);
router.use("/workflow", authmiddleware, workflowrouter);
router.use("/credential", authmiddleware, credentialrouter);
export default router;
