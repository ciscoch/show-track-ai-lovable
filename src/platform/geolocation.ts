export function getCurrentPosition(
  success: PositionCallback,
  error?: PositionErrorCallback
) {
  return navigator.geolocation.getCurrentPosition(success, error);
}
