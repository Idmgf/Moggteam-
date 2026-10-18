import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
function run(command: string, args: string[]) { execFileSync(command, args, { stdio: "inherit" }); }
function secret() { return randomBytes(32).toString("base64url"); }

if (!existsSync(".env")) {
  writeFileSync(".env", `DATABASE_URL="postgresql://tamyr:tamyr_local_password@localhost:5432/tamyr_pop?schema=public"\nCODE_HMAC_SECRET="${secret()}"\nSESSION_SECRET="${secret()}"\nOTP_HMAC_SECRET="${secret()}"\nADMIN_PHONE="+77000000000"\nADMIN_NAME="Admin TAMYR POP"\nDEMO_MODE="true"\nALLOW_DEV_OTP="true"\nNEXT_PUBLIC_APP_URL="http://localhost:3000"\n`, "utf8");
  console.info("Created a local .env with fresh development secrets.");
}
run("docker", ["compose", "up", "-d", "postgres"]);
for (let attempt = 0; attempt < 24; attempt += 1) {
  try { run("docker", ["compose", "exec", "-T", "postgres", "pg_isready", "-U", "tamyr", "-d", "tamyr_pop"]); break; }
  catch { if (attempt === 23) throw new Error("PostgreSQL did not become ready within 60 seconds."); Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 2500); }
}
run(npx, ["prisma", "generate"]);
run(npx, ["prisma", "migrate", "deploy"]);
run(npx, ["prisma", "db", "seed"]);
run(npx, ["tsx", "scripts/create-dev-codes.ts", "5"]);
console.info("Setup complete. Start the app with: npm run dev");
