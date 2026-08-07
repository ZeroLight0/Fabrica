import { clampValue } from "./format";

export function calculateSummary({ gender, style, fabricType, pattern, texture, measurements, collectionMode, fabricPrice, hasFabricImage }) {
  const baseYardage = gender === "Female" ? 4 : 3.25;
  const bodyFactor =
    (measurements.chest / 40) * 0.24 +
    (measurements.waist / 34) * 0.2 +
    (measurements.hip / 42) * 0.24 +
    (measurements.shoulder / 16) * 0.1 +
    (measurements.sleeve / 24) * 0.1 +
    (measurements.length / 45) * 0.12;
  const patternAllowance = pattern === "Plain" ? 0 : pattern === "Floral" ? 0.4 : 0.25;
  const fabricAllowance = ["Chiffon", "Silk"].includes(fabricType) ? 0.25 : fabricType === "Wool" ? 0.15 : 0;
  const textureAllowance = texture === "Structured" ? 0.2 : texture === "Sheer" ? 0.3 : 0.1;
  const yardage = Math.ceil((baseYardage + bodyFactor * style.complexity + patternAllowance + fabricAllowance + textureAllowance) * 2) / 2;
  const deliveryFee = collectionMode === "Delivery" ? 3500 : 0;
  const materialEstimate = yardage * fabricPrice;
  const pressingFee = style.complexity > 1.5 ? 4500 : 2000;
  const total = materialEstimate + style.labor + deliveryFee + pressingFee;
  const completionDays = Math.ceil(style.days + (style.complexity > 1.5 ? 1 : 0) + (fabricType === "Wool" ? 1 : 0));
  const confidence = clampValue(
    Math.round(
      72 +
        (hasFabricImage ? 9 : 0) +
        (texture === "Structured" && style.complexity > 1.5 ? 5 : 0) +
        (pattern !== "Plain" ? 3 : 0) -
        (fabricType === "Chiffon" && style.complexity > 1.5 ? 4 : 0)
    ),
    72,
    96
  );

  return {
    yardage,
    completionDays,
    materialEstimate,
    labor: style.labor,
    deliveryFee,
    pressingFee,
    total,
    confidence,
  };
}
