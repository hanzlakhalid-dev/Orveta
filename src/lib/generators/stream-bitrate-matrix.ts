export type Platform = "twitch" | "youtube";
export type FrameRate = 30 | 60;

export interface ResolutionOption {
  id: string;
  label: string;
  width: number;
  height: number;
}

export const resolutionOptions: ResolutionOption[] = [
  { id: "1080p", label: "1080p", width: 1920, height: 1080 },
  { id: "900p", label: "900p", width: 1600, height: 900 },
  { id: "720p", label: "720p", width: 1280, height: 720 },
  { id: "480p", label: "480p", width: 854, height: 480 },
  { id: "360p", label: "360p", width: 640, height: 360 },
];

/**
 * Video bitrates (kbps) for H.264 with constant bitrate. A value is taken from the platform's own
 * published guidance unless it is marked estimate: true, which means the platform does not publish
 * that combination and the value is this tool's own estimate.
 *  - Twitch: Broadcasting Guidelines (1080p60 6000, 1080p30 4500, 900p60 6000, 720p60 4500, 720p30 3000).
 *  - YouTube: "Choose live encoder settings, bitrates, and resolutions", recommended H.264 column
 *    (1080p60 17000, 1080p30 14000, 720p 8000, 480p and 360p at 30 fps 4000). Platforms change their
 *    guidance, so re-check these against the current help pages from time to time.
 */
interface BitrateValue {
  kbps: number;
  estimate?: boolean;
}

const BITRATE_TABLE: Record<Platform, Record<string, Record<FrameRate, BitrateValue>>> = {
  twitch: {
    "1080p": { 30: { kbps: 4500 }, 60: { kbps: 6000 } },
    "900p": { 30: { kbps: 4500, estimate: true }, 60: { kbps: 6000 } },
    "720p": { 30: { kbps: 3000 }, 60: { kbps: 4500 } },
    "480p": { 30: { kbps: 2000, estimate: true }, 60: { kbps: 2500, estimate: true } },
    "360p": { 30: { kbps: 1000, estimate: true }, 60: { kbps: 1500, estimate: true } },
  },
  youtube: {
    "1080p": { 30: { kbps: 14000 }, 60: { kbps: 17000 } },
    "900p": { 30: { kbps: 11000, estimate: true }, 60: { kbps: 12500, estimate: true } },
    "720p": { 30: { kbps: 8000 }, 60: { kbps: 8000 } },
    "480p": { 30: { kbps: 4000 }, 60: { kbps: 4000, estimate: true } },
    "360p": { 30: { kbps: 4000 }, 60: { kbps: 4000, estimate: true } },
  },
};

export const AUDIO_BITRATE_KBPS = 160;

/** Keep total stream bitrate at or below this fraction of tested upload speed, to leave headroom for network overhead. */
const UPLOAD_HEADROOM_FACTOR = 0.8;

export interface BitrateMatrixResult {
  videoKbps: number;
  /** True when the platform does not publish this combination and the value is an estimate. */
  isEstimate: boolean;
  audioKbps: number;
  totalKbps: number;
  requiredUploadMbps: number;
  uploadIsSufficient: boolean;
  uploadMarginPercent: number;
  keyframeIntervalSeconds: number;
  rateControl: string;
  profile: string;
  recommendedPreset: string;
}

export function getBitrateRecommendation(
  platform: Platform,
  resolutionId: string,
  fps: FrameRate,
  uploadMbps: number
): BitrateMatrixResult | null {
  const table = BITRATE_TABLE[platform]?.[resolutionId];
  if (!table) return null;

  const videoKbps = table[fps].kbps;
  const audioKbps = AUDIO_BITRATE_KBPS;
  const totalKbps = videoKbps + audioKbps;
  const requiredUploadKbps = totalKbps / UPLOAD_HEADROOM_FACTOR;
  const requiredUploadMbps = requiredUploadKbps / 1000;

  const availableUploadKbps = Math.max(0, uploadMbps) * 1000;
  const uploadIsSufficient = availableUploadKbps >= requiredUploadKbps;
  const uploadMarginPercent = requiredUploadKbps > 0 ? ((availableUploadKbps - requiredUploadKbps) / requiredUploadKbps) * 100 : 0;

  return {
    videoKbps,
    isEstimate: table[fps].estimate === true,
    audioKbps,
    totalKbps,
    requiredUploadMbps,
    uploadIsSufficient,
    uploadMarginPercent,
    keyframeIntervalSeconds: 2,
    rateControl: "CBR (Constant Bitrate)",
    profile: "High",
    recommendedPreset: fps === 60 ? "Quality / fast (NVENC) or veryfast (x264)" : "Quality / medium (NVENC) or fast (x264)",
  };
}
