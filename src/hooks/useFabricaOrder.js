import { useMemo, useRef, useState } from "react";
import { colors, initialMeasurements, styleTemplates } from "../data/constants";
import { generateJobReference } from "../lib/format";
import { analyzeFabricImage, analyzeStyleImage, readImage, validateUpload } from "../lib/imageAnalysis";
import { estimateMeasurementsFromStyleSignal, inferFabricType, inferStyleProfile } from "../lib/inference";
import { calculateSummary } from "../lib/pricing";
import { buildStyleRecommendations, getRecommendation } from "../lib/recommendations";
import { getValidationState, sanitizeMeasurements } from "../lib/validation";

export function useFabricaOrder() {
  const [selectedColor, setSelectedColor] = useState(colors[4]);
  const [fabricType, setFabricType] = useState("Cotton");
  const [texture, setTexture] = useState("Smooth");
  const [pattern, setPattern] = useState("Plain");
  const [gender, setGenderRaw] = useState("Female");
  const [selectedStyle, setSelectedStyle] = useState(styleTemplates.Female[0].name);
  const [collectionMode, setCollectionMode] = useState("Pickup");
  const [fabricPrice, setFabricPriceRaw] = useState("3500");
  const [availableYardage, setAvailableYardageRaw] = useState("6");
  const [measurements, setMeasurements] = useState(initialMeasurements);
  const [fabricPreview, setFabricPreview] = useState("");
  const [stylePreview, setStylePreview] = useState("");
  const [imageSignal, setImageSignal] = useState(null);
  const [styleImageSignal, setStyleImageSignal] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Upload a fabric image.");
  const [uploadError, setUploadError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [assignedTailor, setAssignedTailor] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [fabricLabel, setFabricLabel] = useState("");
  const [styleLabel, setStyleLabel] = useState("");
  const [jobReference] = useState(() => generateJobReference());
  const [createdAt] = useState(() => new Date());
  const fabricInputRef = useRef(null);
  const styleInputRef = useRef(null);

  const availableStyles = styleTemplates[gender];
  const style = availableStyles.find((item) => item.name === selectedStyle) || availableStyles[0];
  const safeMeasurements = useMemo(() => sanitizeMeasurements(measurements), [measurements]);
  const parsedFabricPrice = useMemo(() => {
    const value = Number.parseFloat(fabricPrice);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }, [fabricPrice]);
  const parsedAvailableYardage = useMemo(() => {
    const value = Number.parseFloat(availableYardage);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }, [availableYardage]);
  const inferredFabric = useMemo(() => (imageSignal ? inferFabricType(imageSignal) : null), [imageSignal]);
  const styleInsight = useMemo(() => (styleImageSignal ? inferStyleProfile(styleImageSignal, gender) : null), [styleImageSignal, gender]);

  const styleRecommendations = useMemo(
    () =>
      buildStyleRecommendations({
        styles: availableStyles,
        selectedStyleName: selectedStyle,
        gender,
        fabricType,
        pattern,
        texture,
        measurements: safeMeasurements,
        collectionMode,
        fabricPrice: parsedFabricPrice,
        hasFabricImage: Boolean(fabricPreview),
        availableYardage: parsedAvailableYardage,
        imageSignal,
        styleInsight,
      }),
    [availableStyles, selectedStyle, gender, fabricType, pattern, texture, safeMeasurements, collectionMode, parsedFabricPrice, fabricPreview, parsedAvailableYardage, imageSignal, styleInsight]
  );
  const selectedRecommendation = styleRecommendations.find((item) => item.name === selectedStyle) || styleRecommendations[0];
  const activeStyle = selectedRecommendation || style;
  const summary = selectedRecommendation?.summary ||
    calculateSummary({
      gender,
      style,
      fabricType,
      pattern,
      texture,
      measurements: safeMeasurements,
      collectionMode,
      fabricPrice: parsedFabricPrice,
      hasFabricImage: Boolean(fabricPreview),
    });
  const viableAlternatives = styleRecommendations.filter((item) => item.name !== selectedStyle && item.worksWithAvailableFabric).slice(0, 3);

  const validation = useMemo(
    () => getValidationState({ ...measurements, availableYardage }, fabricPrice, fabricPreview, stylePreview),
    [measurements, availableYardage, fabricPrice, fabricPreview, stylePreview]
  );
  const jobStatus = validation.score >= 100 ? "Confirmed" : "Draft";
  const recommendation = useMemo(
    () => getRecommendation(activeStyle, fabricType, imageSignal?.texture || texture, pattern, summary.confidence),
    [activeStyle, fabricType, imageSignal, texture, pattern, summary.confidence]
  );

  async function handleImageUpload(kind, file) {
    try {
      validateUpload(file);
      setUploadError("");
      setStatusMessage(kind === "fabric" ? "Checking fabric image..." : "Style image uploaded.");

      const src = await readImage(file);
      if (typeof src !== "string") {
        throw new Error("The selected image could not be prepared.");
      }

      if (kind === "fabric") {
        setIsAnalyzing(true);
        setFabricPreview(src);
        const signal = await analyzeFabricImage(src);
        const inferred = inferFabricType(signal);
        setImageSignal(signal);
        setTexture(signal.texture);
        if (inferred.confidence >= 72) {
          setFabricType(inferred.type);
          setStatusMessage(`Fabric scan done. Fabric type set to ${inferred.type}.`);
        } else {
          setStatusMessage("Fabric scan done. Please confirm fabric type.");
        }
      } else {
        setStylePreview(src);
        const signal = await analyzeStyleImage(src);
        const inferred = inferStyleProfile(signal, gender);
        const estimatedMeasurements = estimateMeasurementsFromStyleSignal(signal, gender);
        setMeasurements((current) => ({ ...current, ...estimatedMeasurements }));
        setStyleImageSignal(signal);
        const suggestedStyle = inferred.preferredStyles[0];
        if (suggestedStyle && styleTemplates[gender].some((item) => item.name === suggestedStyle)) {
          setSelectedStyle(suggestedStyle);
        }
        setStatusMessage(
          `Style image uploaded. ${suggestedStyle ? `Style set to ${suggestedStyle}.` : ""} Image estimate loaded. Edit sizes if needed. Yardage updates automatically.`
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "The upload could not be completed.";
      setUploadError(message);
      setStatusMessage("Upload failed. Try another image.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  function updateMeasurement(name, rawValue) {
    if (rawValue === "") {
      setMeasurements((current) => ({ ...current, [name]: "" }));
      return;
    }

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setMeasurements((current) => ({
      ...current,
      [name]: rawValue,
    }));
  }

  function handleGenderChange(nextGender) {
    setGenderRaw(nextGender);
    setSelectedStyle(styleTemplates[nextGender][0].name);
  }

  function handlePriceChange(rawValue) {
    if (rawValue === "" || /^\d*\.?\d*$/.test(rawValue)) {
      setFabricPriceRaw(rawValue);
    }
  }

  function handleAvailableYardageChange(rawValue) {
    if (rawValue === "" || /^\d*\.?\d*$/.test(rawValue)) {
      setAvailableYardageRaw(rawValue);
    }
  }

  function handleReliabilityBadgeClick() {
    const summarySection = document.getElementById("summary");
    summarySection?.scrollIntoView({ behavior: "smooth", block: "start" });
    setStatusMessage(`Current confidence score: ${summary.confidence}%.`);
  }

  function handlePrintSummary() {
    window.print();
  }

  return {
    selectedColor,
    setSelectedColor,
    fabricType,
    setFabricType,
    texture,
    setTexture,
    pattern,
    setPattern,
    gender,
    setGender: handleGenderChange,
    selectedStyle,
    setSelectedStyle,
    collectionMode,
    setCollectionMode,
    fabricPrice,
    setFabricPrice: handlePriceChange,
    availableYardage,
    setAvailableYardage: handleAvailableYardageChange,
    measurements,
    updateMeasurement,
    fabricPreview,
    stylePreview,
    imageSignal,
    styleImageSignal,
    statusMessage,
    uploadError,
    isAnalyzing,
    clientName,
    setClientName,
    clientPhone,
    setClientPhone,
    clientEmail,
    setClientEmail,
    assignedTailor,
    setAssignedTailor,
    collectionDate,
    setCollectionDate,
    fabricLabel,
    setFabricLabel,
    styleLabel,
    setStyleLabel,
    jobReference,
    createdAt,
    fabricInputRef,
    styleInputRef,
    handleImageUpload,
    handlePrintSummary,
    handleReliabilityBadgeClick,

    availableStyles,
    style,
    safeMeasurements,
    parsedFabricPrice,
    parsedAvailableYardage,
    inferredFabric,
    styleInsight,
    selectedRecommendation,
    activeStyle,
    summary,
    viableAlternatives,
    validation,
    jobStatus,
    recommendation,
  };
}
