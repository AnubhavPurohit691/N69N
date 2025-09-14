import { Router } from "express";
import {
  signincontroller,
  signupcontroller,
} from "../controller/authcontroller";
const router = Router();
router.post("/signup", signupcontroller);
router.post("/signin", signincontroller);
export default router;
