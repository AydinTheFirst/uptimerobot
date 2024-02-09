import express from "express";
import { AuthRouter } from "./auth.router";
import { MonitorRouter } from "./monitor";
import { isLoggedIn } from "@/passport";

const router = express.Router();
export { router as ApiRouter };

router.use("/auth", AuthRouter);
router.use("/monitors", isLoggedIn, MonitorRouter);

router.get("/", (req, res) => {
  res.send({ message: "API is working!" });
});
