"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

type BackupRecoveryStageProps = {
  variant: "cinematic" | "service";
};

type BackupStep = "source" | "backup" | "verify" | "restore";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function getStep(progress: number): BackupStep {
  if (progress < .2) return "source";
  if (progress < .5) return "backup";
  if (progress < .75) return "verify";
  return "restore";
}

export default function BackupRecoveryStage({ variant }: BackupRecoveryStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const section = variant === "cinematic" ? root.closest<HTMLElement>(".backup-section") : null;
    let visible = true;
    let target = reducedMotion.matches ? 1 : 0;
    let current = target;
    let raf = 0;
    let loopStarted = performance.now();

    const render = (progress: number, serviceOpacity = 1) => {
      const source = clamp(progress / .2);
      const job = clamp((progress - .2) / .3);
      const verify = clamp((progress - .5) / .25);
      const restore = clamp((progress - .75) / .25);
      root.style.setProperty("--backup-progress", progress.toFixed(4));
      root.style.setProperty("--backup-source", source.toFixed(4));
      root.style.setProperty("--backup-job", job.toFixed(4));
      root.style.setProperty("--backup-verify", verify.toFixed(4));
      root.style.setProperty("--backup-restore", restore.toFixed(4));
      root.style.setProperty("--backup-source-opacity", String(.36 + source * .64));
      root.style.setProperty("--backup-source-shift", `${(1 - source) * -28}px`);
      root.style.setProperty("--backup-repository-opacity", String(.18 + job * .82));
      root.style.setProperty("--backup-repository-shift", `${(1 - job) * 28}px`);
      root.style.setProperty("--backup-block-travel", `${job * 47}%`);
      root.style.setProperty("--backup-block-rotation", `${job * 90}deg`);
      root.style.setProperty("--backup-job-shift", `${(1 - job) * 20}px`);
      root.style.setProperty("--backup-job-width", `${7 + job * 93}%`);
      root.style.setProperty("--backup-verify-scale", String(.72 + verify * .28));
      root.style.setProperty("--backup-verify-rotation", `${verify * 160}deg`);
      root.style.setProperty("--backup-restore-shift", `${(1 - restore) * 20}px`);
      root.style.setProperty("--backup-service-opacity", serviceOpacity.toFixed(4));
      root.dataset.backupStep = getStep(progress);
    };

    const measure = () => {
      if (!section || reducedMotion.matches) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - innerHeight);
      target = clamp(-rect.top / distance);
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const frame = (time: number) => {
      raf = 0;
      if (!visible) return;

      if (reducedMotion.matches) {
        render(1);
        return;
      }

      if (variant === "service") {
        const phase = ((time - loopStarted) % 10000) / 10000;
        const progress = phase < .84 ? phase / .84 : 1;
        const opacity = phase < .92 ? 1 : 1 - ((phase - .92) / .08) * .65;
        render(progress, opacity);
      } else {
        current += (target - current) * .16;
        if (Math.abs(target - current) < .0008) current = target;
        render(current);
      }

      raf = requestAnimationFrame(frame);
    };

    const visibilityTarget = variant === "service"
      ? root.closest<HTMLElement>(".service-hero") ?? root
      : root;

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (variant === "service") loopStarted = performance.now();
        measure();
        if (!raf) raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { rootMargin: "0px", threshold: .01 });

    observer.observe(visibilityTarget);
    render(reducedMotion.matches ? 1 : 0);
    if (variant === "cinematic") {
      addEventListener("scroll", measure, { passive: true });
      addEventListener("resize", measure);
      measure();
    } else if (!reducedMotion.matches) {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      if (variant === "cinematic") {
        removeEventListener("scroll", measure);
        removeEventListener("resize", measure);
      }
    };
  }, [variant]);

  return (
    <div
      ref={rootRef}
      className={`backup-recovery-stage backup-recovery-${variant}`}
      data-backup-step="source"
    >
      <div className="backup-recovery-visual" aria-hidden="true">
        <div className="backup-veeam-signature">
          <span>BACKUP ORCHESTRATION</span>
          <img src="/images/partners/veeam.png" alt="" width="500" height="148" />
        </div>

        <div className="backup-source-cluster">
          <span><i /> 01 / SOURCE DISCOVERY</span>
          <img src="/images/backup/backup-source-systems.webp" alt="" width="1536" height="1024" loading={variant === "cinematic" ? "lazy" : "eager"} fetchPriority={variant === "service" ? "high" : "auto"} decoding="async" />
          <div><b>VM</b><b>PHYSICAL</b><b>CRITICAL DATA</b></div>
        </div>

        <svg className="backup-flow-map" viewBox="0 0 1000 520" preserveAspectRatio="none" role="presentation">
          <path className="backup-flow-base" d="M228 210 C350 210 382 262 500 262 S650 210 774 210" />
          <path className="backup-flow-active" pathLength="1" d="M228 210 C350 210 382 262 500 262 S650 210 774 210" />
          <path className="backup-restore-base" d="M790 264 C720 350 650 396 548 410" />
          <path className="backup-restore-active" pathLength="1" d="M790 264 C720 350 650 396 548 410" />
        </svg>

        <div className="backup-data-blocks">
          {Array.from({ length: 8 }, (_, index) => <i key={index} style={{ "--block-offset": `${index * 6}%` } as CSSProperties} />)}
        </div>

        <div className="backup-repository-cluster">
          <span><i /> 03 / REPOSITORY</span>
          <img src="/images/backup/backup-repository.webp" alt="" width="1536" height="1024" loading={variant === "cinematic" ? "lazy" : "eager"} fetchPriority={variant === "service" ? "high" : "auto"} decoding="async" />
          <b>RECOVERY POINTS / STORED</b>
          <div className="backup-verify-ring"><i /><i /><span>VERIFY</span></div>
        </div>

        <div className="backup-job-console">
          <header>
            <span><i /> 02 / BACKUP JOB</span>
            <b className="backup-status-processing">PROCESSING</b>
            <b className="backup-status-success">SUCCESS</b>
          </header>
          <div className="backup-job-progress"><i /></div>
          <dl>
            <div><dt>SOURCE</dt><dd>WORKLOAD_SET</dd></div>
            <div><dt>TARGET</dt><dd>BACKUP_REPOSITORY</dd></div>
            <div><dt>VERIFY</dt><dd className="backup-status-processing">QUEUED</dd><dd className="backup-status-success">VERIFIED</dd></div>
          </dl>
        </div>

        <div className="backup-restore-points">
          {Array.from({ length: 5 }, (_, index) => <i key={index}><span>RP-{String(index + 1).padStart(2, "0")}</span></i>)}
        </div>

        <div className="backup-restore-target">
          <span><i /> 04 / TEST RESTORE</span>
          <div className="backup-restore-machine"><i /><i /><i /><b>VM</b></div>
          <strong>TEST RESTORE / READY</strong>
        </div>
      </div>

      <ol className="backup-stage-steps" aria-label="Veeam tabanlı yedekleme ve geri dönüş aşamaları">
        <li data-step="source"><span>01</span><div><strong>KAYNAKLARI KEŞFET</strong><small>VM / SUNUCU / KRİTİK VERİ</small></div></li>
        <li data-step="backup"><span>02</span><div><strong>YEDEKLEME İŞİ</strong><small>POLİTİKA / AKTARIM</small></div></li>
        <li data-step="verify"><span>03</span><div><strong>GERİ DÖNÜŞ NOKTASINI DOĞRULA</strong><small>RESTORE POINT / VERIFIED</small></div></li>
        <li data-step="restore"><span>04</span><div><strong>TEST GERİ DÖNÜŞÜ</strong><small>TEST RESTORE / READY</small></div></li>
      </ol>
    </div>
  );
}
