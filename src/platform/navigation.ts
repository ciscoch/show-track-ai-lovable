
export function navigate(url: string) {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
}

// Add a helper function to handle navigation without page reload
export function navigateWithoutReload(url: string, navigate: (url: string) => void) {
  navigate(url);
}
