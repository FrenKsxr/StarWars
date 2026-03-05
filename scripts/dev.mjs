import { spawn } from "node:child_process";
import net from "node:net";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const PORT = 3001;

function waitForPort(port, maxWait = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tryConnect = () => {
      const socket = new net.Socket();
      socket.setTimeout(500);
      socket.on("connect", () => {
        socket.destroy();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - start > maxWait) return reject(new Error("Timeout"));
        setTimeout(tryConnect, 200);
      });
      socket.on("timeout", () => socket.destroy());
      socket.connect(port, "127.0.0.1");
    };
    tryConnect();
  });
}

const server = spawn("node", ["server/index.js"], {
  cwd: root,
  stdio: "inherit",
});

server.on("error", (err) => {
  console.error("No se pudo iniciar el servidor:", err);
  process.exit(1);
});

await waitForPort(PORT);
console.log(`Servidor listo en http://localhost:${PORT}\n`);

const vite = spawn("node", ["node_modules/vite/bin/vite.js"], {
  cwd: root,
  stdio: "inherit",
});

function exit() {
  server.kill();
  vite.kill();
  process.exit(0);
}

process.on("SIGINT", exit);
process.on("SIGTERM", exit);

vite.on("exit", (code) => {
  server.kill();
  process.exit(code ?? 0);
});
server.on("exit", (code) => {
  vite.kill();
  process.exit(code ?? 0);
});
