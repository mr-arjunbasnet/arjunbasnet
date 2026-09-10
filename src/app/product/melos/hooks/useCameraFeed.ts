"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { track } from "../lib/analytics";

export type CameraStatus = "off" | "requesting" | "on";

function friendlyCamError(err: unknown): string {
  if (err instanceof DOMException) {
    switch (err.name) {
      case "NotAllowedError":
      case "SecurityError":
        return "Camera access was denied — recording will use the brand background instead.";
      case "NotFoundError":
      case "OverconstrainedError":
        return "No camera found — recording will use the brand background.";
      case "NotReadableError":
      case "AbortError":
        return "The camera is busy in another app. Close it and try again.";
    }
  }
  return "Couldn't start the camera. Recording will use the brand background.";
}

/**
 * Camera is requested separately from the mic, with its own button and copy —
 * permission prompts are never bundled. Toggling works mid-recording: the
 * compositor just switches to the brand background while the camera is off.
 */
export function useCameraFeed(videoRef: RefObject<HTMLVideoElement | null>) {
  const [status, setStatus] = useState<CameraStatus>("off");
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const turnOff = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus("off");
  }, [videoRef]);

  const turnOn = useCallback(async () => {
    setStatus("requesting");
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        await video.play().catch(() => {
          // iOS may reject play() here; muted+autoplay attributes cover it.
        });
      }
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          setError("The camera was disconnected — recording continues on the brand background.");
          turnOff();
        };
      }
      setStatus("on");
      track("camera_granted");
    } catch (err) {
      setError(friendlyCamError(err));
      setStatus("off");
    }
  }, [videoRef, turnOff]);

  useEffect(
    () => () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    },
    []
  );

  return { status, error, turnOn, turnOff };
}
