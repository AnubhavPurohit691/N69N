import type { NextFunction, Request, Response } from "express";
import cookie from "cookie-parser";
import jwt, { type JwtPayload } from "jsonwebtoken";
export interface Authrequest extends Request {
  userId?: number;
}

export function authmiddleware(
  req: Authrequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      message: "token doesn't exist",
    });
  }
  const decoded = jwt.verify(token, process.env.Secret || "") as JwtPayload;
  req.userId = decoded.id;
  next();
}
