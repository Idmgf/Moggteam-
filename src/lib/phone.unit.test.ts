import { describe, expect, it } from "vitest";
import { normalizeKzPhone } from "@/lib/phone";

describe("Kazakhstan phone normalization", () => {
  it("normalizes common local variants to E.164", () => {
    expect(normalizeKzPhone("8 (747) 377-15-29")).toBe("+77473771529");
    expect(normalizeKzPhone("7473771529")).toBe("+77473771529");
  });
  it("rejects invalid input", () => { expect(normalizeKzPhone("+1 212 555 0100")).toBeNull(); });
});
