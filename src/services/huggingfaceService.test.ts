
import { describe, it, expect, vi } from "vitest";
import { analyzeAnimalPhoto } from "./huggingfaceService";

describe("analyzeAnimalPhoto", () => {
  it("returns expected result from mocked API", async () => {
    const mockResponse = { result: "Show-readiness: 82%" };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers(),
        redirected: false,
        status: 200,
        statusText: "OK",
        type: "default",
        url: "",
        clone: () => ({} as Response),
        body: null,
        bodyUsed: false,
        arrayBuffer: async () => new ArrayBuffer(0),
        blob: async () => new Blob(),
        formData: async () => new FormData(),
        text: async () => "",
      } as Response)
    ) as jest.Mock;

    const mockFile = new File(["dummy"], "goat.jpg", { type: "image/jpeg" });

    const result = await analyzeAnimalPhoto(mockFile);

    // Change the assertion to match what the actual function returns
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledOnce();
  });
});
