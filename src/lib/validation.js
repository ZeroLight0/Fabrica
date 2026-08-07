import { measurementConfig } from "../data/constants";
import { clampValue } from "./format";

export function sanitizeMeasurements(measurements) {
  return measurementConfig.reduce((accumulator, field) => {
    const parsed = Number.parseFloat(measurements[field.key]);
    accumulator[field.key] = Number.isFinite(parsed) ? clampValue(parsed, field.min, field.max) : field.min;
    return accumulator;
  }, {});
}

export function getValidationState(measurements, fabricPrice, fabricPreview, stylePreview) {
  const issues = [];
  let completed = 0;
  const totalChecks = measurementConfig.length + 4;

  measurementConfig.forEach((field) => {
    const rawValue = Number.parseFloat(measurements[field.key]);
    if (!Number.isFinite(rawValue)) {
      issues.push(`${field.label} is missing.`);
      return;
    }

    if (rawValue < field.min || rawValue > field.max) {
      issues.push(`${field.label} should stay between ${field.min} and ${field.max} inches.`);
      return;
    }

    completed += 1;
  });

  const parsedPrice = Number.parseFloat(fabricPrice);
  if (Number.isFinite(parsedPrice) && parsedPrice > 0) {
    completed += 1;
  } else {
    issues.push("Fabric price must be greater than zero.");
  }

  if (Number.isFinite(Number.parseFloat(measurements.availableYardage)) && Number.parseFloat(measurements.availableYardage) > 0) {
    completed += 1;
  } else {
    issues.push("Available material quantity should be greater than zero.");
  }

  if (fabricPreview) {
    completed += 1;
  } else {
    issues.push("Adding a fabric image improves the recommendation quality.");
  }

  if (stylePreview) {
    completed += 1;
  } else {
    issues.push("A style reference helps Fabrica align finishing details.");
  }

  return {
    score: Math.round((completed / totalChecks) * 100),
    issues,
  };
}
