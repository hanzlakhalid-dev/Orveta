"use client";

import * as React from "react";
import { Podcast } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  estimatePodcastFileSize,
  bitratePresets,
  type PodcastFormat,
  type ChannelLayout,
} from "@/lib/generators/podcast-file-size";

export function PodcastFileSizeEstimatorTool() {
  const [hours, setHours] = React.useState("0");
  const [minutes, setMinutes] = React.useState("45");
  const [seconds, setSeconds] = React.useState("0");
  const [channels, setChannels] = React.useState<ChannelLayout>("mono");
  const [format, setFormat] = React.useState<PodcastFormat>("mp3");
  const [bitrateKbps, setBitrateKbps] = React.useState("96");
  const [sampleRateHz, setSampleRateHz] = React.useState("44100");
  const [bitDepth, setBitDepth] = React.useState("16");
  const [downloads, setDownloads] = React.useState("1000");

  const result = estimatePodcastFileSize({
    hours: Number(hours) || 0,
    minutes: Number(minutes) || 0,
    seconds: Number(seconds) || 0,
    channels,
    format,
    bitrateKbps: Number(bitrateKbps) || 0,
    sampleRateHz: Number(sampleRateHz) || 44100,
    bitDepth: Number(bitDepth) || 16,
    downloadsPerEpisode: Number(downloads) || 0,
  });

  const isCompressed = format === "mp3" || format === "aac";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Episode settings</CardTitle>
          <CardDescription>Duration and export settings for this episode.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label>Duration</Label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Input type="number" min={0} value={hours} onChange={(e) => setHours(e.target.value)} placeholder="0" />
                <p className="mt-1 text-center text-[11px] text-muted-foreground">hours</p>
              </div>
              <div>
                <Input type="number" min={0} max={59} value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="45" />
                <p className="mt-1 text-center text-[11px] text-muted-foreground">minutes</p>
              </div>
              <div>
                <Input type="number" min={0} max={59} value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="0" />
                <p className="mt-1 text-center text-[11px] text-muted-foreground">seconds</p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Channels</Label>
            <Tabs value={channels} onValueChange={(v) => setChannels(v as ChannelLayout)}>
              <TabsList>
                <TabsTrigger value="mono">Mono</TabsTrigger>
                <TabsTrigger value="stereo">Stereo</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-1.5">
            <Label>Export format</Label>
            <Tabs value={format} onValueChange={(v) => setFormat(v as PodcastFormat)}>
              <TabsList>
                <TabsTrigger value="mp3">MP3</TabsTrigger>
                <TabsTrigger value="aac">AAC</TabsTrigger>
                <TabsTrigger value="wav">WAV</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isCompressed ? (
            <div className="space-y-1.5">
              <Label>Bitrate</Label>
              <Select value={bitrateKbps} onValueChange={setBitrateKbps}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bitratePresets.map((preset) => (
                    <SelectItem key={preset.kbps} value={String(preset.kbps)}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Sample rate</Label>
                <Select value={sampleRateHz} onValueChange={setSampleRateHz}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="44100">44.1 kHz</SelectItem>
                    <SelectItem value="48000">48 kHz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Bit depth</Label>
                <Select value={bitDepth} onValueChange={setBitDepth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16">16-bit</SelectItem>
                    <SelectItem value="24">24-bit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="downloads">Expected downloads for this episode (optional)</Label>
            <Input id="downloads" type="number" min={0} value={downloads} onChange={(e) => setDownloads(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Podcast className="h-4 w-4 text-primary" />
            Estimated size
          </CardTitle>
          <CardDescription>Based on the settings on the left.</CardDescription>
        </CardHeader>
        <CardContent>
          {!result ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Enter a duration greater than zero.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-secondary/30 p-5 text-center">
                <p className="text-3xl font-semibold text-foreground">{result.megabytes.toFixed(1)} MB</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  ≈ {result.perMinuteMb.toFixed(2)} MB per minute
                </p>
                <p className="mt-1 text-xs text-muted-foreground">1 MB = 1,048,576 bytes</p>
              </div>

              {Number(downloads) > 0 && (
                <div className="rounded-lg border border-border bg-secondary/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Bandwidth for {Number(downloads).toLocaleString()} downloads
                  </p>
                  <p className="mt-1 text-xl font-semibold text-foreground">
                    {result.monthlyBandwidthGb < 1
                      ? `${(result.monthlyBandwidthGb * 1024).toFixed(0)} MB`
                      : `${result.monthlyBandwidthGb.toFixed(2)} GB`}
                  </p>
                </div>
              )}

              <p className="text-xs leading-relaxed text-muted-foreground">
                {format === "wav"
                  ? "WAV is uncompressed — great for editing masters, but far too large for a public podcast feed. Export your final episode as MP3 or AAC."
                  : channels === "mono"
                  ? "Mono is a common choice for spoken-word podcasts. A single voice sounds the same, and a mono file can use a lower bitrate (for example 64 instead of 128 kbps) with similar quality. In this tool, size depends on the bitrate you choose, not on the mono or stereo setting."
                  : "Stereo suits music-heavy or multi-microphone recordings and is often given a higher bitrate. In this tool, size depends on the bitrate you choose, not on the mono or stereo setting."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
