import { execFileSync } from "node:child_process";

process.loadEnvFile?.(".env");
if (!process.env.TEST_DATABASE_URL) throw new Error("Set TEST_DATABASE_URL to a separate PostgreSQL test database.");
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
const npx = process.platform === "win32" ? "npx.cmd" : "npx";
execFileSync(npx, ["prisma", "migrate", "deploy"], { stdio:"inherit", env:process.env });
execFileSync(npx, ["vitest", "run", "src/lib/promo.integration.test.ts"], { stdio:"inherit", env:process.env });
