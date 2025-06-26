export function formatType(serviceType: string) {
  if (!serviceType) return;
  return serviceType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
