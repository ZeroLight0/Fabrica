import { uploadLimitBytes } from "../data/constants";
import { toDisplayFileSize } from "./format";

export function validateUpload(file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are supported.");
  }

  if (file.size > uploadLimitBytes) {
    throw new Error(`Please upload an image smaller than ${toDisplayFileSize(uploadLimitBytes)}.`);
  }
}

export function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result);
    reader.onerror = () => reject(new Error("The selected image could not be read."));
    reader.readAsDataURL(file);
  });
}

export function analyzeImageSignal(src, size = 64) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d", { willReadFrequently: true });

      if (!context) {
        reject(new Error("Image analysis is unavailable in this browser."));
        return;
      }

      context.drawImage(image, 0, 0, size, size);
      const { data } = context.getImageData(0, 0, size, size);
      let red = 0;
      let green = 0;
      let blue = 0;
      let luminanceTotal = 0;
      let contrastTotal = 0;
      let edgeTotal = 0;
      let topLuminance = 0;
      let bottomLuminance = 0;

      const getPixelIndex = (x, y) => (y * size + x) * 4;

      for (let index = 0; index < data.length; index += 4) {
        red += data[index];
        green += data[index + 1];
        blue += data[index + 2];

        const luminance = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
        luminanceTotal += luminance;

        const pixel = index / 4;
        const y = Math.floor(pixel / size);
        if (y < size / 2) {
          topLuminance += luminance;
        } else {
          bottomLuminance += luminance;
        }
      }

      for (let y = 0; y < size - 1; y += 1) {
        for (let x = 0; x < size - 1; x += 1) {
          const currentIndex = getPixelIndex(x, y);
          const rightIndex = getPixelIndex(x + 1, y);
          const bottomIndex = getPixelIndex(x, y + 1);

          const current = data[currentIndex] * 0.299 + data[currentIndex + 1] * 0.587 + data[currentIndex + 2] * 0.114;
          const right = data[rightIndex] * 0.299 + data[rightIndex + 1] * 0.587 + data[rightIndex + 2] * 0.114;
          const bottom = data[bottomIndex] * 0.299 + data[bottomIndex + 1] * 0.587 + data[bottomIndex + 2] * 0.114;

          contrastTotal += Math.abs(current - right);
          edgeTotal += Math.abs(current - right) + Math.abs(current - bottom);
        }
      }

      const pixels = data.length / 4;
      const average = {
        r: Math.round(red / pixels),
        g: Math.round(green / pixels),
        b: Math.round(blue / pixels),
      };
      const brightness = Math.round((average.r + average.g + average.b) / 3);
      const spread = Math.max(average.r, average.g, average.b) - Math.min(average.r, average.g, average.b);
      const averageLuminance = luminanceTotal / pixels;
      const contrast = Math.round(contrastTotal / ((size - 1) * (size - 1)));
      const edgeDensity = Math.round(edgeTotal / (((size - 1) * (size - 1)) * 2));
      const verticalBalance = Number(((bottomLuminance - topLuminance) / Math.max(1, luminanceTotal)).toFixed(3));
      const texture = brightness > 208 ? "Sheer" : brightness < 90 ? "Structured" : brightness < 150 ? "Ribbed" : "Soft";

      resolve({
        color: `rgb(${average.r}, ${average.g}, ${average.b})`,
        brightness,
        spread,
        averageLuminance,
        contrast,
        edgeDensity,
        verticalBalance,
        aspectRatio: Number((image.width / Math.max(1, image.height)).toFixed(2)),
        texture,
      });
    };
    image.onerror = () => reject(new Error("The uploaded image could not be analyzed."));
    image.src = src;
  });
}

export function analyzeFabricImage(src) {
  return analyzeImageSignal(src, 56);
}

export function analyzeStyleImage(src) {
  return analyzeImageSignal(src, 72);
}
