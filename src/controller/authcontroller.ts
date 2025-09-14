import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/db";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
export async function signupcontroller(req: Request, res: Response) {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return;
  }
  const existinguser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (existinguser) {
    return res.json({
      message: "user already exist",
    });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const userdb = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedpassword,
    },
  });
  const token = jwt.sign({ id: userdb.id }, process.env.Secret || "");
  res.cookie("token", token);
  return res.json({
    token,
  });
}

export async function signincontroller(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return;
  }
  const existinguser = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      username: true,
      id: true,
      email: true,
    },
  });
  if (!existinguser) {
    return res.json({
      message: "user already exist",
    });
  }
  const token = jwt.sign({ id: existinguser.id }, process.env.Secret || "");
  res.cookie("token", token);
  return res.json({
    existinguser,
  });
}
