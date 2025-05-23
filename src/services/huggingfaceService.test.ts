import { describe, it, expect, vi } from "vitest";
import { analyzeAnimalPhoto } from "./huggingfaceService";

describe("analyzeAnimalPhoto", () => {
  it("returns expected result from mocked API", async () => {
    const mockResponse = { result: "Show-readiness: 82%" };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as typeof fetch;

    const mockFile = new File(["dummy"], "goat.jpg", { type: "image/jpeg" });

    const result = await analyzeAnimalPhoto(mockFile, "mock-animal-id");

    expect(result.result).toBe("Show-readiness: 82%");
    expect(global.fetch).toHaveBeenCalledOnce();
  });
});
