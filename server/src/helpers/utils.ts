import { type Response } from "express";
import { userModel } from "../mongodb/userSchema.js";

export const APIError = (res: Response, message: string): any => {
  return res.status(400).send({ message });
};

export const uuid = () => {
  return crypto.randomUUID();
};

export const genToken = async (): Promise<string> => {
  const users = await userModel.find();

  const token = uuid();

  const isExist = users.find((user) => user.token === token);

  if (isExist) return genToken();

  return token;
};

export const formatTime = (time: number): string => {
  const date = new Date(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
};
