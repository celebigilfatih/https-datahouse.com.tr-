"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const PRELOADER_EVENT = "datahouse:preloader-complete";
const PRELOADER_SESSION_KEY = "datahouse_preloader_seen";

type PreloaderPhase = "loading" | "exiting" | "hidden";

export default function SitePreloader() {
  const [phase, setPhase] = useState<PreloaderPhase>("loading");
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.preloader !== "pending") {
      return;
    }

    const main = document.querySelector("main");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = reducedMotion ? 300 : 900;
    const exitDuration = reducedMotion ? 20 : 600;
    const forceCompleteAfter = 4000 - exitDuration;
    const startedAt = performance.now();
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let disposed = false;
    let progressFrame = 0;
    let forceTimer: ReturnType<typeof setTimeout> | undefined;
    let detachImageListeners = () => {};

    main?.setAttribute("aria-busy", "true");
    targetProgress.current = 12;

    const wait = (duration: number) => new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        resolve();
      }, duration);
      timers.add(timer);
    });

    const animateProgress = () => {
      setProgress((current) => {
        const target = targetProgress.current;
        if (current >= target) return current;
        const step = Math.max(1, Math.ceil((target - current) * .14));
        return Math.min(target, current + step);
      });
      if (!disposed) progressFrame = requestAnimationFrame(animateProgress);
    };
    progressFrame = requestAnimationFrame(animateProgress);

    const fontsReady = (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (!disposed) targetProgress.current = Math.max(targetProgress.current, 52);
    });

    const heroReady = new Promise<void>((resolve) => {
      const image = document.querySelector<HTMLImageElement>(".powerstore-product");
      if (!image) {
        targetProgress.current = Math.max(targetProgress.current, 88);
        resolve();
        return;
      }

      let settled = false;
      const finish = async () => {
        if (settled) return;
        settled = true;
        detachImageListeners();
        try {
          if (image.complete && image.naturalWidth > 0) await image.decode();
        } catch {
          // A decoded bitmap is preferred, but a loaded image is enough to open the site.
        }
        if (!disposed) targetProgress.current = Math.max(targetProgress.current, 88);
        resolve();
      };

      detachImageListeners = () => {
        image.removeEventListener("load", finish);
        image.removeEventListener("error", finish);
      };

      if (image.complete) void finish();
      else {
        image.addEventListener("load", finish, { once: true });
        image.addEventListener("error", finish, { once: true });
      }
    });

    const finishPreloader = async () => {
      const forceCompletion = new Promise<void>((resolve) => {
        forceTimer = setTimeout(() => {
          if (forceTimer) timers.delete(forceTimer);
          resolve();
        }, forceCompleteAfter);
        timers.add(forceTimer);
      });

      await Promise.race([Promise.all([fontsReady, heroReady]), forceCompletion]);
      if (forceTimer) {
        clearTimeout(forceTimer);
        timers.delete(forceTimer);
      }
      if (disposed) return;

      const remainingMinimum = Math.max(0, minimumDuration - (performance.now() - startedAt));
      if (remainingMinimum > 0) await wait(remainingMinimum);
      if (disposed) return;

      targetProgress.current = 100;
      setProgress(100);
      cancelAnimationFrame(progressFrame);
      await wait(reducedMotion ? 40 : 120);
      if (disposed) return;

      if (root.dataset.preloader !== "pending") {
        setPhase("hidden");
        main?.removeAttribute("aria-busy");
        window.dispatchEvent(new Event(PRELOADER_EVENT));
        return;
      }

      setPhase("exiting");
      root.dataset.preloader = "exiting";
      try {
        sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
      } catch {
        // Storage can be unavailable in restricted browsing modes.
      }

      await wait(exitDuration);
      if (disposed) return;

      root.removeAttribute("data-preloader");
      main?.removeAttribute("aria-busy");
      setPhase("hidden");
      window.dispatchEvent(new Event(PRELOADER_EVENT));
    };

    void finishPreloader();

    return () => {
      disposed = true;
      cancelAnimationFrame(progressFrame);
      detachImageListeners();
      timers.forEach(clearTimeout);
      root.removeAttribute("data-preloader");
      main?.removeAttribute("aria-busy");
    };
  }, []);

  if (phase === "hidden") return null;

  const progressLabel = progress === 100 ? "100" : String(progress).padStart(2, "0");
  const progressStyle = { "--preloader-progress": `${progress}%` } as CSSProperties;

  return (
    <div className={`site-preloader ${phase === "exiting" ? "is-exiting" : ""}`} style={progressStyle}>
      <div className="preloader-grid" aria-hidden="true" />
      <div className="preloader-halo" aria-hidden="true"><i /><i /></div>

      <div
        className="preloader-content"
        role="progressbar"
        aria-label="Datahouse sitesi yükleniyor"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="preloader-kicker"><span>DATA PULSE</span><b>SYSTEM INITIALIZING</b></div>
        <Image className="preloader-logo" src="/images/datahouse-logo.png" alt="Datahouse" width={643} height={117} priority />

        <div className="preloader-data-line" aria-hidden="true">
          <svg viewBox="0 0 1000 90" preserveAspectRatio="none" role="presentation">
            <path className="preloader-path-base" d="M0 48 H132 L184 25 H292 L338 48 H516 L562 67 H688 L742 48 H1000" />
            <path className="preloader-path-dots" pathLength="1" d="M0 48 H132 L184 25 H292 L338 48 H516 L562 67 H688 L742 48 H1000" />
            <path className="preloader-path-pulse" pathLength="1" d="M0 48 H132 L184 25 H292 L338 48 H516 L562 67 H688 L742 48 H1000" />
          </svg>
        </div>

        <div className="preloader-progress-row">
          <span>INFRASTRUCTURE / READY SEQUENCE</span>
          <strong>{progressLabel}<small>%</small></strong>
        </div>
        <div className="preloader-progress-track" aria-hidden="true"><i /></div>
      </div>

      <span className="preloader-corner preloader-corner-left" aria-hidden="true">DH / BOOT_01<br />BURSA · TR</span>
      <span className="preloader-corner preloader-corner-right" aria-hidden="true">SECURE SYSTEM<br />STATUS / LOADING</span>
    </div>
  );
}
