import mongoose from "mongoose";

interface ISchema {
  id: string;
  name: string;
  userId: string;
  type: "http";
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  interval: number;
  timeout: number;
  createdAt: number;
  updatedAt: number;
}

const schema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, required: true },
  interval: { type: Number, required: true },
  timeout: { type: Number, required: true },
  createdAt: { type: Number, required: true },
  updatedAt: { type: Number, required: true },
});

export const monitorModel = mongoose.model<ISchema & mongoose.Document>(
  "Monitor",
  schema
);

export type IMonitor = ISchema;
