import { exec } from "node:child_process";
import packageJson from "./package.json";

const port = packageJson.config.dev_server_port || 3099;

console.log(`Starting dev server on port ${port}...`);

const devProcess = exec(
  `pnpm vite --port ${port} --host`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(stdout);
    if (stderr) console.error(stderr);
  },
);

devProcess.stdout?.pipe(process.stdout);
devProcess.stderr?.pipe(process.stderr);

process.on("SIGINT", () => {
  devProcess.kill();
  process.exit();
});
