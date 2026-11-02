import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
const port = "3011";
process.env.TEST_BASE_URL = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    port,
  ],
  { stdio: ["ignore", "pipe", "pipe"], windowsHide: true },
);
let output = "";
server.stdout.on("data", (data) => {
  output += data;
});
server.stderr.on("data", (data) => {
  output += data;
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 50; attempt++) {
    if (server.exitCode !== null) throw new Error(output);
    try {
      if ((await fetch(process.env.TEST_BASE_URL)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await delay(200);
  }
  if (!ready)
    throw new Error(`Production server did not become ready: ${output}`);
  await import("./check-routes.mjs");
} finally {
  server.kill();
}
