import mongoose from "mongoose";

export enum UserState {
  Active = "active",
  Inactive = "inactive",
  Blocked = "blocked",
}

interface ISchema {
  id: string;
  username: string;
  displayName: string;
  email: string;
  password: string;
  token: string;
  createdAt: number;
}

const schema = new mongoose.Schema({
  id: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Number, required: true },
});

export const userModel = mongoose.model<ISchema & mongoose.Document>(
  "User",
  schema
);

export type IUser = ISchema;
