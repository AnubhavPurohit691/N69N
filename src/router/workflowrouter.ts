import { Router, type Request, type Response } from "express";
import type { Authrequest } from "../middleware/authmiddleware";
import prisma from "../db/db";
const router = Router();

router.get("/workflow/:id", async (req: Authrequest, res: Response) => {
  const workerId = req.params.id;

  const workflows = await prisma.workflow.findFirst({
    where: {
      id: workerId,
    },
  });
  return res.json(workflows);
});

router.post("/", async (req: Authrequest, res: Response) => {
  const workflow = req.body;
  const workflowcreated = await prisma.workflow.create({
    data: {
      id: workflow.id,
      enable: workflow.enable,
      title: workflow.title,
      nodes: workflow.nodes,
      connections: workflow.connections,
    },
  });
  return res.json({
    message: "workflow created",
    workflowcreated,
  });
});

router.get("/", async (req: Authrequest, res: Response) => {
  const userId = req.userId;
  const workflows = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      workflow: true,
    },
  });
  return res.json({
    workflows,
  });
});

router.patch("/:id", async (req: Request, res: Response) => {
  const workflowId = req.params.id;
  const workflowbody = req.body;
  const workflow = await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      connections: workflowbody.connections,
      nodes: workflowbody.nodes,
      enable: workflowbody.enable,
      title: workflowbody.title,
    },
  });
  return res.json({
    workflow,
  });
});
export default router;
