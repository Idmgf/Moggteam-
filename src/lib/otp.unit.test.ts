import { afterEach, describe, expect, it, vi } from "vitest";
import { getDevOtpCode } from "@/lib/otp";

describe("dev OTP helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses a fixed test code in local development mode", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ALLOW_DEV_OTP", "true");
    expect(getDevOtpCode()).toBe("000000");
  });
});
