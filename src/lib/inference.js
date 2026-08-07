import { measurementConfig, styleTemplates } from "../data/constants";
import { clampValue } from "./format";

export function inferFabricType(signal) {
  const candidates = [
    { name: "Cotton", score: 54 },
    { name: "Silk", score: 50 },
    { name: "Linen", score: 50 },
    { name: "Chiffon", score: 48 },
    { name: "Lace", score: 46 },
    { name: "Wool", score: 46 },
  ];

  const scores = candidates.map((candidate) => {
    let score = candidate.score;

    if (candidate.name === "Chiffon") {
      score += signal.brightness > 205 ? 20 : 0;
      score += signal.texture === "Sheer" ? 22 : 0;
      score += signal.contrast < 18 ? 8 : 0;
    }

    if (candidate.name === "Silk") {
      score += signal.brightness >= 150 && signal.brightness <= 225 ? 12 : 0;
      score += signal.spread > 40 ? 10 : 0;
      score += signal.texture === "Soft" || signal.texture === "Sheer" ? 10 : 0;
      score += signal.edgeDensity < 30 ? 5 : 0;
    }

    if (candidate.name === "Linen") {
      score += signal.texture === "Ribbed" ? 16 : 0;
      score += signal.contrast >= 18 && signal.contrast <= 34 ? 8 : 0;
      score += signal.brightness >= 135 && signal.brightness <= 185 ? 7 : 0;
    }

    if (candidate.name === "Cotton") {
      score += signal.texture === "Soft" || signal.texture === "Ribbed" ? 10 : 0;
      score += signal.brightness >= 120 && signal.brightness <= 185 ? 10 : 0;
      score += signal.spread <= 55 ? 6 : 0;
    }

    if (candidate.name === "Lace") {
      score += signal.brightness > 165 ? 14 : 0;
      score += signal.texture === "Sheer" || signal.texture === "Soft" ? 10 : 0;
      score += signal.contrast >= 16 && signal.contrast <= 36 ? 8 : 0;
      score += signal.spread > 38 ? 5 : 0;
    }

    if (candidate.name === "Wool") {
      score += signal.brightness < 130 ? 10 : 0;
      score += signal.texture === "Structured" ? 12 : 0;
      score += signal.contrast >= 20 && signal.contrast <= 38 ? 8 : 0;
      score += signal.edgeDensity < 40 ? 4 : 0;
    }

    return { name: candidate.name, score };
  });

  scores.sort((left, right) => right.score - left.score);
  const winner = scores[0];
  const runnerUp = scores[1];
  const confidence = clampValue(Math.round(62 + (winner.score - runnerUp.score) * 2), 62, 94);

  return {
    type: winner.name,
    confidence,
    alternatives: scores.slice(1, 3).map((item) => item.name),
  };
}

export function inferStyleProfile(signal, gender) {
  const styleScores = styleTemplates[gender].map((candidate) => {
    let score = 50;

    if (signal.aspectRatio < 0.85 && ["Evening gown", "Kaftan", "Native set"].includes(candidate.name)) {
      score += 14;
    }

    if (signal.aspectRatio >= 0.85 && signal.aspectRatio <= 1.05 && ["A-line dress", "Long sleeve shirt", "Jumpsuit"].includes(candidate.name)) {
      score += 10;
    }

    if (signal.verticalBalance > 0.08 && ["Evening gown", "A-line dress", "Kaftan"].includes(candidate.name)) {
      score += 12;
    }

    if (signal.edgeDensity > 34 && ["Two-piece suit", "Jumpsuit", "Long sleeve shirt"].includes(candidate.name)) {
      score += 12;
    }

    if (signal.edgeDensity < 28 && ["Evening gown", "Blouse and skirt", "Kaftan"].includes(candidate.name)) {
      score += 8;
    }

    if (signal.contrast > 26 && ["Two-piece suit", "Native set", "Jumpsuit"].includes(candidate.name)) {
      score += 9;
    }

    if (signal.brightness > 175 && ["Evening gown", "Blouse and skirt", "Long sleeve shirt"].includes(candidate.name)) {
      score += 5;
    }

    if (signal.verticalBalance < -0.02 && ["Long sleeve shirt", "Two-piece suit"].includes(candidate.name)) {
      score += 6;
    }

    return { name: candidate.name, score };
  });

  styleScores.sort((left, right) => right.score - left.score);
  const silhouette =
    signal.verticalBalance > 0.08 ? "elongated" : signal.edgeDensity > 34 ? "tailored" : signal.aspectRatio < 0.9 ? "draped" : "balanced";

  return {
    silhouette,
    preferredStyles: styleScores.slice(0, 3).map((item) => item.name),
    confidence: clampValue(Math.round(60 + (styleScores[0].score - styleScores[1].score) * 2), 60, 92),
  };
}

export function estimateMeasurementsFromStyleSignal(signal, gender) {
  const base =
    gender === "Female"
      ? { chest: 36, waist: 30, hip: 40, shoulder: 15, sleeve: 22, length: 58 }
      : { chest: 40, waist: 34, hip: 41, shoulder: 18, sleeve: 24, length: 54 };

  const sizeShift = clampValue(((signal.edgeDensity - 30) / 28) + (0.92 - signal.aspectRatio) + signal.verticalBalance * 3.2, -0.28, 0.36);
  const scale = {
    chest: 1 + sizeShift * 0.12,
    waist: 1 + sizeShift * 0.1,
    hip: 1 + sizeShift * 0.12,
    shoulder: 1 + sizeShift * 0.08,
    sleeve: 1 + sizeShift * 0.09,
    length: 1 + sizeShift * 0.15 + (signal.verticalBalance > 0.06 ? 0.03 : 0),
  };

  const estimate = {};
  measurementConfig.forEach((field) => {
    const raw = base[field.key] * scale[field.key];
    const bounded = clampValue(raw, field.min, field.max);
    estimate[field.key] = Number(bounded.toFixed(1)).toString();
  });

  return estimate;
}
