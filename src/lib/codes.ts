import { createHmac, randomBytes } from "node:crypto";
import { requireSecret } from "@/lib/env";

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CHUNK_SIZE = 4;
const CHUNKS = 4;
const UNBIASED_BOUND = Math.floor(256 / ALPHABET.length) * ALPHABET.length;

export function normalizePromoCode(input: string) {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function isPromoCodeFormatValid(code: string) {
  return new RegExp(`^[${ALPHABET}]{${CHUNK_SIZE * CHUNKS}}$`).test(normalizePromoCode(code));
}

export function formatPromoCode(code: string) {
  const normalized = normalizePromoCode(code);
  return normalized.match(new RegExp(`.{1,${CHUNK_SIZE}}`, "g"))?.join("-") ?? normalized;
}

export function hashPromoCode(code: string) {
  return createHmac("sha256", requireSecret("CODE_HMAC_SECRET"))
    .update(normalizePromoCode(code))
    .digest("hex");
}

export function generatePromoCode() {
  let result = "";
  while (result.length < CHUNK_SIZE * CHUNKS) {
    for (const byte of randomBytes(32)) {
      if (byte >= UNBIASED_BOUND) continue;
      result += ALPHABET[byte % ALPHABET.length];
      if (result.length === CHUNK_SIZE * CHUNKS) break;
    }
  }
  return formatPromoCode(result);
}

export function generateUniquePromoCodes(count: number) {
  if (!Number.isInteger(count) || count < 1 || count > 100_000) {
    throw new Error("Code batch size must be between 1 and 100000.");
  }
  const codes = new Set<string>();
  while (codes.size < count) codes.add(generatePromoCode());
  return [...codes];
}
