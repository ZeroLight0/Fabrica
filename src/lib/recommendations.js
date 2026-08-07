import { clampValue } from "./format";
import { calculateSummary } from "./pricing";

export function getStyleCompatibilityNote(style, fabricType, texture, pattern, availableYardage, requiredYardage) {
  if (availableYardage > 0 && requiredYardage > availableYardage) {
    return `Needs ${requiredYardage.toFixed(1)} yards, which is above the available ${availableYardage.toFixed(1)} yards.`;
  }

  if (style.name === "Evening gown") {
    return "Best for premium finishing and enough cloth to support drape, lining, and flare.";
  }

  if (style.name === "Two-piece suit") {
    return "Works best when you can support structure, pressing, and fitting checkpoints.";
  }

  if (pattern === "Floral") {
    return "Pattern placement remains manageable without wasting too much cloth.";
  }

  if (texture === "Structured") {
    return `The ${texture.toLowerCase()} hand of this ${fabricType.toLowerCase()} supports this silhouette well.`;
  }

  return `Balanced option for ${fabricType.toLowerCase()} with ${texture.toLowerCase()} handling and standard cutting ease.`;
}

export function getTemplateAlignmentScore(candidate, selectedTemplate) {
  const complexityDelta = Math.abs(candidate.complexity - selectedTemplate.complexity);
  const dayDelta = Math.abs(candidate.days - selectedTemplate.days);
  const laborDelta = Math.abs(candidate.labor - selectedTemplate.labor) / 5000;

  return Math.max(0, 18 - complexityDelta * 12 - dayDelta * 1.5 - laborDelta * 2);
}

export function getFabricSignalScore(candidate, fabricType, texture, pattern, imageSignal) {
  let score = 0;
  const brightness = imageSignal?.brightness ?? null;
  const spread = imageSignal?.spread ?? 0;

  if (["Silk", "Chiffon"].includes(fabricType) && ["Evening gown", "Blouse and skirt", "A-line dress"].includes(candidate.name)) {
    score += 8;
  }

  if (["Wool"].includes(fabricType) && ["Two-piece suit", "Jumpsuit", "Native set", "Long sleeve shirt"].includes(candidate.name)) {
    score += 8;
  }

  if (fabricType === "Lace" && ["Evening gown", "Blouse and skirt", "A-line dress"].includes(candidate.name)) {
    score += 8;
  }

  if (["Cotton", "Linen"].includes(fabricType) && ["Native set", "Kaftan", "Long sleeve shirt", "Blouse and skirt"].includes(candidate.name)) {
    score += 6;
  }

  if (texture === "Structured" && ["Two-piece suit", "Native set", "Jumpsuit"].includes(candidate.name)) {
    score += 6;
  }

  if (texture === "Sheer" && ["Evening gown", "Blouse and skirt", "A-line dress"].includes(candidate.name)) {
    score += 6;
  }

  if (pattern === "Floral" && ["Evening gown", "A-line dress", "Blouse and skirt"].includes(candidate.name)) {
    score += 5;
  }

  if (pattern === "Check" && ["Long sleeve shirt", "Native set", "Two-piece suit"].includes(candidate.name)) {
    score += 4;
  }

  if (brightness !== null) {
    if (brightness > 195 && ["Evening gown", "Blouse and skirt"].includes(candidate.name)) {
      score += 4;
    }

    if (brightness < 105 && ["Two-piece suit", "Jumpsuit", "Native set"].includes(candidate.name)) {
      score += 4;
    }

    if (brightness >= 105 && brightness <= 185 && ["Kaftan", "Long sleeve shirt", "A-line dress"].includes(candidate.name)) {
      score += 3;
    }
  }

  if (spread > 55 && ["A-line dress", "Blouse and skirt", "Evening gown"].includes(candidate.name)) {
    score += 3;
  }

  return score;
}

export function getBodyFitScore(candidate, measurements) {
  let score = 0;
  const frame = measurements.chest + measurements.waist + measurements.hip;
  const lengthProfile = measurements.length;

  if (frame > 112 && candidate.complexity <= 1.22) {
    score += 4;
  }

  if (frame < 100 && candidate.complexity >= 1.55) {
    score += 3;
  }

  if (lengthProfile > 48 && ["Evening gown", "Kaftan", "Native set"].includes(candidate.name)) {
    score += 4;
  }

  if (measurements.shoulder >= 18 && ["Two-piece suit", "Long sleeve shirt", "Native set"].includes(candidate.name)) {
    score += 3;
  }

  return score;
}

export function getStyleReferenceScore(candidate, styleInsight) {
  if (!styleInsight) {
    return 0;
  }

  let score = 0;
  const rank = styleInsight.preferredStyles.indexOf(candidate.name);

  if (rank === 0) {
    score += 14;
  } else if (rank === 1) {
    score += 10;
  } else if (rank === 2) {
    score += 6;
  }

  if (styleInsight.silhouette === "elongated" && ["Evening gown", "Kaftan", "Native set"].includes(candidate.name)) {
    score += 5;
  }

  if (styleInsight.silhouette === "tailored" && ["Two-piece suit", "Jumpsuit", "Long sleeve shirt"].includes(candidate.name)) {
    score += 5;
  }

  if (styleInsight.silhouette === "draped" && ["Evening gown", "Blouse and skirt", "A-line dress"].includes(candidate.name)) {
    score += 5;
  }

  return score;
}

export function buildStyleRecommendations({
  styles,
  selectedStyleName,
  gender,
  fabricType,
  pattern,
  texture,
  measurements,
  collectionMode,
  fabricPrice,
  hasFabricImage,
  availableYardage,
  imageSignal,
  styleInsight,
}) {
  const selectedTemplate = styles.find((item) => item.name === selectedStyleName) || styles[0];

  return styles
    .map((candidate) => {
      const summary = calculateSummary({
        gender,
        style: candidate,
        fabricType,
        pattern,
        texture,
        measurements,
        collectionMode,
        fabricPrice,
        hasFabricImage,
      });

      const templateDelta = Math.abs(candidate.complexity - selectedTemplate.complexity);
      const availableGap = availableYardage > 0 ? Number((availableYardage - summary.yardage).toFixed(1)) : null;
      const worksWithAvailableFabric = availableGap === null ? true : availableGap >= 0;
      const complexityPenalty = fabricType === "Chiffon" && candidate.complexity > 1.45 ? 7 : 0;
      const patternPenalty = pattern === "Floral" && candidate.complexity > 1.55 ? 5 : 0;
      const templateAlignment = getTemplateAlignmentScore(candidate, selectedTemplate);
      const materialSignalScore = getFabricSignalScore(candidate, fabricType, texture, pattern, imageSignal);
      const bodyFitScore = getBodyFitScore(candidate, measurements);
      const styleReferenceScore = getStyleReferenceScore(candidate, styleInsight);
      const feasibilityAdjustment = worksWithAvailableFabric ? 8 : -14;
      const score = clampValue(
        Math.round(summary.confidence + templateAlignment + materialSignalScore + bodyFitScore + styleReferenceScore - templateDelta * 6 - complexityPenalty - patternPenalty + feasibilityAdjustment),
        52,
        99
      );

      return {
        ...candidate,
        summary,
        score,
        availableGap,
        worksWithAvailableFabric,
        scoreBreakdown: {
          base: summary.confidence,
          template: Math.round(templateAlignment),
          material: Math.round(materialSignalScore),
          body: Math.round(bodyFitScore),
          styleCue: Math.round(styleReferenceScore),
          feasibility: feasibilityAdjustment,
        },
        note: getStyleCompatibilityNote(candidate, fabricType, texture, pattern, availableYardage, summary.yardage),
      };
    })
    .sort((left, right) => {
      if (left.worksWithAvailableFabric !== right.worksWithAvailableFabric) {
        return left.worksWithAvailableFabric ? -1 : 1;
      }

      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.summary.yardage - right.summary.yardage;
    });
}

export function getRecommendation(style, fabricType, texture, pattern, confidence) {
  const note =
    style.name === "Evening gown"
      ? "Use extra care for lining and drape."
      : style.name === "Two-piece suit"
        ? "Plan one fitting before final sewing."
        : pattern === "Floral"
          ? "Align floral pattern before cutting."
          : "Good match for sewing.";

  const fitSignal = confidence >= 90 ? "Very good match" : confidence >= 82 ? "Good match" : "Check match";
  return `${fitSignal}. ${fabricType} and ${texture.toLowerCase()} texture fit ${style.name.toLowerCase()}. ${note}`;
}
