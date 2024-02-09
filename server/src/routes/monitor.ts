import { uptime } from "@/helpers/uptime";
import { APIError, uuid } from "@/helpers/utils";
import { monitorModel } from "@/mongodb/monitor";
import { Router } from "express";
import { LogsRouter } from "./logs";

const router = Router();
export { router as MonitorRouter };

router.use(
  "/:id/logs",
  (req, res, next) => {
    req.monitorId = req.params.id;
    next();
  },
  LogsRouter
);

router.get("/", async (req, res) => {
  const userId = req.user.id;
  const monitors = await monitorModel.find({ userId });

  res.send(monitors);
});

router.get("/:id", async (req, res) => {
  const userId = req.user.id;
  const monitor = await monitorModel.findOne({
    userId,
    id: req.params.id,
  });

  if (!monitor) {
    return res.status(404).send({ message: "Monitor not found" });
  }

  res.send(monitor);
});

router.post("/", async (req, res) => {
  const userId = req.user.id;
  const monitor = new monitorModel({
    ...req.body,
    userId,
    id: uuid(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  await monitor.save();

  uptime.addMonitor(monitor);

  res.send(monitor);
});

router.put("/:id", async (req, res) => {
  const userId = req.user.id;
  const monitor = await monitorModel.findOne({
    userId,
    id: req.params.id,
  });

  if (!monitor) return APIError(res, "Monitor not found");

  monitor.set(req.body);
  await monitor.save();

  uptime.removeMonitor(monitor.url);
  uptime.addMonitor(monitor);

  res.send(monitor);
});

router.delete("/:id", async (req, res) => {
  const userId = req.user.id;
  const monitor = await monitorModel.findOne({
    userId,
    id: req.params.id,
  });

  if (!monitor) return APIError(res, "Monitor not found");

  await monitor.deleteOne();

  uptime.removeMonitor(monitor.url);

  res.send({ message: "Monitor deleted" });
});
