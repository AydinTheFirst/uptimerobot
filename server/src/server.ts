import express from "express";
import cors from "cors";
import passport from "passport";

import { router } from "./routes/router";
import { upload } from "./helpers/multer";

import chalk from "chalk";

const PORT = 3000;
const app = express();

// Init App
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use(passport.initialize());

// Static Files
app.use(express.static("../client/dist"));
app.use("/cdn", express.static("public"));

app.use((req, res, next) => {
  console.log(
    chalk.bold.yellow(new Date()),
    chalk.bold.blue(req.method),
    chalk.bold.green(req.url)
  );
  next();
}, router);

app.listen(3000, () => {
  console.log(`http://localhost:${PORT}`);
});
