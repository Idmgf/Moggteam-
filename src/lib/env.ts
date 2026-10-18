const required = ["DATABASE_URL", "CODE_HMAC_SECRET", "SESSION_SECRET", "OTP_HMAC_SECRET"] as const;

export function requireEnv(name: (typeof required)[number] | "ADMIN_PHONE" | "ADMIN_NAME") {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function requireSecret(name: "CODE_HMAC_SECRET" | "SESSION_SECRET" | "OTP_HMAC_SECRET") {
  const value = requireEnv(name);
  if (value.length < 32) throw new Error(`${name} must contain at least 32 characters.`);
  return value;
}

export const isProduction = () => process.env.NODE_ENV === "production";
export const isDemoMode = () => process.env.DEMO_MODE === "true";
