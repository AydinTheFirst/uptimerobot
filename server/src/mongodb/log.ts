import mongoose from "mongoose";

interface ISchema {
  id: string;
  monitorId: string;
  ok: boolean;
  statusText: string;
  status: number;
  startedAt: number;
  endedAt: number;
  headers: string;
}

const schema = new mongoose.Schema({
  id: { type: String, required: true },
  monitorId: { type: String, required: true },
  ok: { type: Boolean, required: true },
  statusText: { type: String, required: true },
  status: { type: Number, required: true },
  startedAt: { type: Number, required: true },
  endedAt: { type: Number, required: true },
  headers: { type: String, required: true },
});

export const logModel = mongoose.model<ISchema & mongoose.Document>(
  "Log",
  schema
);

export type ILog = ISchema;
