export function getCurrentPosition(
  success: PositionCallback,
  error?: PositionErrorCallback
) {
  if (typeof navigator !== "undefined" && navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(success, error);
  }
  if (error) {
    // GeolocationPositionError is not available outside the browser
    error(new Error("Geolocation is not available") as any);
  }
}
