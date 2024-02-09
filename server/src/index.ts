import "dotenv/config";
import "@/mongodb";

// Run server
import "@/server";

import { uptime } from "@/helpers/uptime";

// Handle errors
process.on("unhandledRejection", (reason) => {
  console.log(reason);
});

// Start uptime monitor
uptime.start();
