import { beforeEach, describe, expect, it } from "vitest";
import { formatPromoCode, generateUniquePromoCodes, hashPromoCode, isPromoCodeFormatValid, normalizePromoCode } from "@/lib/codes";

describe("promo codes", () => {
  beforeEach(() => { process.env.CODE_HMAC_SECRET = "a".repeat(40); });
  it("normalizes and formats a code without ambiguous characters", () => {
    expect(normalizePromoCode("abcd-efgh-jknp-qrst")).toBe("ABCDEFGHJKNPQRST");
    expect(formatPromoCode("ABCDEFGHJKNPQRST")).toBe("ABCD-EFGH-JKNP-QRST");
    expect(isPromoCodeFormatValid("ABCD-EFGH-JKNP-QRST")).toBe(true);
    expect(isPromoCodeFormatValid("ABCD-EFGH-I1O0-QRST")).toBe(false);
  });
  it("generates unique codes and stores deterministic keyed hashes", () => {
    const codes = generateUniquePromoCodes(100);
    expect(new Set(codes).size).toBe(100);
    expect(codes.every(isPromoCodeFormatValid)).toBe(true);
    expect(hashPromoCode(codes[0])).toBe(hashPromoCode(codes[0].replaceAll("-", "")));
  });
});
