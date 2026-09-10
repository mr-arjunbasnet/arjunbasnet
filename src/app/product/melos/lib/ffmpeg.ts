// Lazy, single-threaded ffmpeg.wasm. Loaded only on the first export action —
// never on initial page view — and only to fix container metadata (or, for
// WebM recordings, to transcode to an MP4 every player accepts.)
import type { FFmpeg } from "@ffmpeg/ffmpeg";

const CORE_URL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

let loader: Promise<FFmpeg | null> | null = null;

async function getFFmpeg(): Promise<FFmpeg | null> {
  if (!loader) {
    loader = (async () => {
      try {
        const [{ FFmpeg }, { toBlobURL }] = await Promise.all([
          import("@ffmpeg/ffmpeg"),
          import("@ffmpeg/util"),
        ]);
        const ffmpeg = new FFmpeg();
        await ffmpeg.load({
          coreURL: await toBlobURL(`${CORE_URL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${CORE_URL}/ffmpeg-core.wasm`, "application/wasm"),
        });
        return ffmpeg;
      } catch (err) {
        console.warn("[melos] ffmpeg unavailable — exporting the original file", err);
        return null;
      }
    })();
  }
  return loader;
}

export interface ExportResult {
  blob: Blob;
  mime: string;
}

/**
 * MP4 input → remux with +faststart so duration metadata is correct
 * everywhere. WebM input → transcode to H.264/AAC MP4. Any failure falls
 * back to the original blob untouched.
 */
export async function optimizeForExport(
  blob: Blob,
  mime: string,
  onProgress: (p: number) => void
): Promise<ExportResult> {
  const original: ExportResult = { blob, mime };
  const ffmpeg = await getFFmpeg();
  if (!ffmpeg) return original;

  const isMp4 = mime.includes("mp4");
  const inName = isMp4 ? "in.mp4" : "in.webm";
  const handleProgress = ({ progress }: { progress: number }) =>
    onProgress(Math.max(0, Math.min(1, progress)));

  try {
    const { fetchFile } = await import("@ffmpeg/util");
    await ffmpeg.writeFile(inName, await fetchFile(blob));
    ffmpeg.on("progress", handleProgress);
    const args = isMp4
      ? ["-i", inName, "-c", "copy", "-movflags", "+faststart", "out.mp4"]
      : [
          "-i", inName,
          "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
          "-pix_fmt", "yuv420p",
          "-c:a", "aac", "-b:a", "128k",
          "-movflags", "+faststart",
          "out.mp4",
        ];
    await ffmpeg.exec(args);
    const data = await ffmpeg.readFile("out.mp4");
    ffmpeg.off("progress", handleProgress);
    await ffmpeg.deleteFile(inName).catch(() => {});
    await ffmpeg.deleteFile("out.mp4").catch(() => {});
    if (typeof data === "string") return original;
    const out = new Blob([new Uint8Array(data)], { type: "video/mp4" });
    if (out.size === 0) return original;
    return { blob: out, mime: "video/mp4" };
  } catch (err) {
    ffmpeg.off("progress", handleProgress);
    console.warn("[melos] ffmpeg processing failed — exporting the original file", err);
    return original;
  }
}
