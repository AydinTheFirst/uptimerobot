import multer from "multer";
import crypto from "crypto";
import fs from "fs";

const dirName = "public/uploads";
const dir = fs.existsSync(dirName);
if (!dir) fs.mkdirSync(dirName);

const storage = multer.diskStorage({
  destination: dirName,
  filename: (req: any, file: any, cb: any) => {
    cb(null, crypto.randomUUID() + "." + file.mimetype.split("/")[1]);
  },
});

export const upload = multer({ storage });
