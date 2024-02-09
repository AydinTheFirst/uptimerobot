import { logModel } from "@/mongodb/log";
import { Router } from "express";

const router = Router();
export { router as LogsRouter };

router.get("/", async (req, res) => {
  const logs = await logModel.find({ monitorId: req.monitorId });
  res.send(logs);
});

router.get("/:logId", async (req, res) => {
  const log = await logModel.findOne({
    monitorId: req.monitorId,
    id: req.params.logId,
  });

  if (!log) {
    return res.status(404).send({ message: "Log not found" });
  }

  res.send(log);
});

router.delete("/:logId", async (req, res) => {
  await logModel.deleteOne({
    monitorId: req.monitorId,
    id: req.params.logId,
  });

  res.send({ message: "Log deleted" });
});

router.delete("/", async (req, res) => {
  await logModel.deleteMany({ monitorId: req.monitorId });
  res.send({ message: "Logs deleted" });
});
