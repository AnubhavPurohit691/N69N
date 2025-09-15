import { Router, type Request, type Response } from "express";
import prisma from "../db/db";
import type { Authrequest } from "../middleware/authmiddleware";
import { createAbstractBuilder } from "typescript";
const router = Router();
router.post("/", async (req: Authrequest, res: Response) => {
  const body = req.body;
  const credential = await prisma.credential.create({
    data: {
      apiKey: body.apiKey,
      platform: body.platform,
      title: body.title,
      userId: req.userId,
    },
  });
  return res.json({
    message: "credential created",
    credential,
  });
});
router.delete("/", async (req: Request, res: Response) => {
  const id = req.body.id;
  await prisma.credential.delete({
    where: {
      id: id,
    },
  });
  return res.json({
    message: "deleted credential",
  });
});

export default router;
