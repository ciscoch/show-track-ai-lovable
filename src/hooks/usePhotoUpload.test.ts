import { describe, it, vi, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePhotoUpload } from "./usePhotoUpload";
import * as huggingfaceService from "@/services/huggingfaceService";

describe("usePhotoUpload", () => {
  it("triggers analyzeAnimalPhoto when photo is uploaded", async () => {
    const mockAnalyze = vi.spyOn(huggingfaceService, "analyzeAnimalPhoto").mockResolvedValue({
      result: "Show-readiness: 82%"
    });

    const mockToast = vi.fn();
    vi.mock("@/hooks/use-toast", () => ({
      toast: mockToast
    }));

    const file = new File(["dummy"], "goat.jpg", { type: "image/jpeg" });

    const { result } = renderHook(() =>
      usePhotoUpload({ animalId: "mock-animal-id" })
    );

    await act(async () => {
      await result.current.uploadPhoto(file);
    });

    expect(mockAnalyze).toHaveBeenCalledWith(file, "mock-animal-id");
  });
});