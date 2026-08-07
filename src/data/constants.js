export const colors = [
  { name: "Porcelain", value: "#f3eee5" },
  { name: "Dune Rose", value: "#c88e8a" },
  { name: "Olive Mist", value: "#8d9a80" },
  { name: "Midnight Ink", value: "#21364a" },
  { name: "Espresso", value: "#3d3027" },
  { name: "Burnished Gold", value: "#b2874e" },
  { name: "Mulberry", value: "#6f435e" },
  { name: "Slate Blue", value: "#5d708e" },
];

export const fabricTypes = ["Cotton", "Silk", "Linen", "Chiffon", "Lace", "Wool"];
export const textures = ["Smooth", "Crisp", "Soft", "Ribbed", "Sheer", "Structured"];
export const patterns = ["Plain", "Stripes", "Check", "Floral"];
export const genders = ["Female", "Male"];
export const collectionModes = ["Pickup", "Delivery"];
export const uploadLimitBytes = 6 * 1024 * 1024;

export const styleTemplates = {
  Female: [
    { name: "A-line dress", complexity: 1.2, labor: 18000, days: 4, silhouette: "Balanced and easy to fit through waist and hip." },
    { name: "Blouse and skirt", complexity: 1.1, labor: 16000, days: 3, silhouette: "Versatile two-piece option for daywear collections." },
    { name: "Jumpsuit", complexity: 1.35, labor: 22000, days: 5, silhouette: "Requires careful rise and length calibration." },
    { name: "Evening gown", complexity: 1.68, labor: 32000, days: 7, silhouette: "Formal drape-led style suited for premium fabrics." },
  ],
  Male: [
    { name: "Native set", complexity: 1.22, labor: 17000, days: 4, silhouette: "Relaxed ceremonial set with forgiving ease." },
    { name: "Long sleeve shirt", complexity: 1.0, labor: 12000, days: 2, silhouette: "Fast turnaround staple for clean shirting fabrics." },
    { name: "Kaftan", complexity: 1.28, labor: 19000, days: 4, silhouette: "Roomy line with emphasis on shoulder and length." },
    { name: "Two-piece suit", complexity: 1.72, labor: 38000, days: 8, silhouette: "Most exacting fit with higher pressing and finishing time." },
  ],
};

export const patternClasses = {
  Plain: "pattern-plain",
  Stripes: "pattern-stripes",
  Check: "pattern-check",
  Floral: "pattern-floral",
};

export const measurementConfig = [
  { key: "neck", label: "Neck / Collar", min: 10, max: 24 },
  { key: "chest", label: "Chest / Bust", min: 24, max: 70 },
  { key: "shoulder", label: "Shoulder Width", min: 10, max: 30 },
  { key: "sleeve", label: "Sleeve Length", min: 12, max: 40 },
  { key: "wrist", label: "Wrist / Cuff", min: 5, max: 12 },
  { key: "waist", label: "Waist", min: 22, max: 65 },
  { key: "hip", label: "Hips / Seat", min: 26, max: 75 },
  { key: "thigh", label: "Thigh / Crotch", min: 14, max: 40 },
  { key: "length", label: "Full Length / Other", min: 20, max: 75 },
];

export const upperBodyMeasurementKeys = ["neck", "chest", "shoulder", "sleeve", "wrist"];
export const lowerBodyMeasurementKeys = ["waist", "hip", "thigh", "length"];

export const initialMeasurements = {
  neck: "16",
  chest: "38",
  shoulder: "16",
  sleeve: "23",
  wrist: "7",
  waist: "32",
  hip: "40",
  thigh: "22",
  length: "42",
};

export const formatMoney = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export const statHighlights = [
  { label: "Fast", value: "Quick estimate" },
  { label: "Simple", value: "Easy inputs" },
  { label: "Clear", value: "Print-ready summary" },
];

export const conversionStats = [
  { label: "Measurements", value: "6" },
  { label: "Uploads", value: "2" },
  { label: "Summary", value: "1" },
];

export const workflowSteps = [
  { step: "01", title: "Fabric Context", detail: "Infer tonal balance and texture from cloth upload before pricing." },
  { step: "02", title: "Fit Brief", detail: "Range-guarded measurements for credible studio and client review." },
  { step: "03", title: "Clean Estimate", detail: "Clear yardage, lead time, and finishing costs for clear ops." },
];

export const atelierProfile = {
  name: "Fabrica Atelier",
  address: "104 Studio Lane, Fashion District, NG 500485",
  phone: "+243 (705) 019-8821",
  footerNote: "Fabrica Atelier Console App · Digital Brief & Auto-Yard Recommendation",
  footerUrl: "fabrica-sand.vercel.app/#atelier-console",
};
