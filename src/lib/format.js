export function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function toDisplayFileSize(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function generateJobReference() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(10 + Math.random() * 90);
  return `#FAB-${year}-${suffix}`;
}

export function formatDisplayDate(date) {
  if (!date) {
    return "Not set";
  }

  const value = typeof date === "string" ? new Date(`${date}T00:00:00`) : date;
  if (Number.isNaN(value.getTime())) {
    return "Not set";
  }

  return value.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
