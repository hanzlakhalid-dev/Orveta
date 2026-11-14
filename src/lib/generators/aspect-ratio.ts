function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function trimNum(value: number, maxDecimals = 2): string {
  const fixed = value.toFixed(maxDecimals);
  if (!fixed.includes(".")) return fixed;
  return fixed.replace(/0+$/, "").replace(/\.$/, "");
}

export interface AspectRatioResult {
  width: number;
  height: number;
  simplifiedW: number;
  simplifiedH: number;
  decimalRatio: number;
  paddingTopPercent: number;
  modernCss: string;
  legacyCss: string;
}

/** Computes the simplified ratio, decimal ratio, and both modern and legacy CSS snippets for a given width/height. */
export function calculateAspectRatio(width: number, height: number): AspectRatioResult | null {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;

  let simplifiedW: number;
  let simplifiedH: number;
  if (Number.isInteger(width) && Number.isInteger(height)) {
    const divisor = gcd(width, height) || 1;
    simplifiedW = width / divisor;
    simplifiedH = height / divisor;
  } else {
    // Decimal input: keep the exact ratio (width over 1) instead of rounding the inputs first.
    simplifiedW = Number((width / height).toPrecision(4));
    simplifiedH = 1;
  }
  const decimalRatio = width / height;
  const paddingTopPercent = (height / width) * 100;

  const modernCss = `.container {\n  aspect-ratio: ${trimNum(simplifiedW, 6)} / ${trimNum(simplifiedH, 6)};\n}`;

  const legacyCss = `.container {\n  position: relative;\n  width: 100%;\n  padding-top: ${trimNum(paddingTopPercent, 4)}%;\n}\n\n.container > * {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}`;

  return {
    width,
    height,
    simplifiedW,
    simplifiedH,
    decimalRatio,
    paddingTopPercent,
    modernCss,
    legacyCss,
  };
}

export interface RatioPreset {
  label: string;
  width: number;
  height: number;
}

export const ratioPresets: RatioPreset[] = [
  { label: "16:9", width: 16, height: 9 },
  { label: "4:3", width: 4, height: 3 },
  { label: "1:1", width: 1, height: 1 },
  { label: "21:9", width: 21, height: 9 },
  { label: "9:16", width: 9, height: 16 },
  { label: "3:2", width: 3, height: 2 },
  { label: "2:3", width: 2, height: 3 },
  { label: "4:5", width: 4, height: 5 },
];
