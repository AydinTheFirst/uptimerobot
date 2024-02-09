import express from "express";
import { ApiRouter } from "./api";

const app = express.Router();
export const router = app;

router.use("/api", ApiRouter);

router.get("*", (req, res) => {
  res.sendFile("index.html", { root: "../client/dist" });
});
