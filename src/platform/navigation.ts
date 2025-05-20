export function navigate(url: string) {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
}
