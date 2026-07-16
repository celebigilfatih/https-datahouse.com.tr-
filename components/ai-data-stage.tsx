import type { CSSProperties } from "react";

type AiDataStageProps = {
  variant: "cinematic" | "service";
};

const desktopPaths = [
  "M20 566 H190 L274 492 H472 L548 430 H770",
  "M20 474 H156 L244 418 H420 L510 374 H770",
  "M54 660 H238 L326 566 H520 L588 492 H790",
  "M1160 586 H1040 L970 520 H850 L790 462 H710",
  "M1180 438 H1050 L984 396 H870 L808 388 H700",
  "M1120 678 H1000 L928 586 H820 L752 500 H676",
];

const mobilePaths = [
  "M18 604 H118 L176 548 H282 L340 486 H506",
  "M22 492 H128 L194 438 H304 L364 400 H512",
  "M38 716 H146 L216 628 H332 L388 548 H526",
  "M682 632 H604 L554 572 H482 L432 508 H344",
  "M678 472 H594 L548 432 H470 L420 410 H336",
];

const desktopDocuments = [
  { x: 116, y: 418, delay: "-.4s" },
  { x: 250, y: 596, delay: "-1.4s" },
  { x: 352, y: 354, delay: "-2.1s" },
  { x: 932, y: 338, delay: "-.9s" },
  { x: 1030, y: 524, delay: "-1.8s" },
];

const mobileDocuments = [
  { x: 88, y: 442, delay: "-.4s" },
  { x: 174, y: 644, delay: "-1.4s" },
  { x: 544, y: 392, delay: "-2.1s" },
  { x: 588, y: 588, delay: "-.9s" },
];

function DataPaths({ paths, gradientId }: { paths: string[]; gradientId: string }) {
  return (
    <>
      <g className="ai-data-paths ai-data-paths-base">
        {paths.map((path) => <path key={`base-${path}`} d={path} pathLength="1" />)}
      </g>
      <g className="ai-data-paths ai-data-paths-signal">
        {paths.map((path, index) => <path key={`signal-${path}`} d={path} pathLength="1" style={{ "--path-delay": `${index * -.42}s` } as CSSProperties} />)}
      </g>
      <g className="ai-data-paths ai-data-paths-pulse" stroke={`url(#${gradientId})`}>
        {paths.map((path, index) => <path key={`pulse-${path}`} d={path} pathLength="1" style={{ "--path-delay": `${index * -.58}s` } as CSSProperties} />)}
      </g>
    </>
  );
}

function Documents({ items }: { items: Array<{ x: number; y: number; delay: string }> }) {
  return (
    <g className="ai-document-icons">
      {items.map((item) => (
        <g key={`${item.x}-${item.y}`} className="ai-document-icon" transform={`translate(${item.x} ${item.y})`} style={{ "--document-delay": item.delay } as CSSProperties}>
          <path d="M0 0 H19 L28 9 V38 H0 Z M19 0 V9 H28" />
          <path d="M6 17 H21 M6 23 H21 M6 29 H16" />
          <circle cx="0" cy="38" r="2.4" />
        </g>
      ))}
    </g>
  );
}

export default function AiDataStage({ variant }: AiDataStageProps) {
  const desktopGradient = `ai-data-pulse-${variant}-desktop`;
  const mobileGradient = `ai-data-pulse-${variant}-mobile`;

  return (
    <div className={`ai-data-stage ai-data-stage-${variant}`} aria-hidden="true">
      <div className="ai-stage-halo"><span /><i /></div>
      <svg className="ai-data-svg ai-data-svg-desktop" viewBox="0 0 1200 720" preserveAspectRatio="none" role="presentation">
        <defs>
          <linearGradient id={desktopGradient} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e42b20" stopOpacity="0" />
            <stop offset=".48" stopColor="#ff3b2f" />
            <stop offset=".55" stopColor="#fff" />
            <stop offset="1" stopColor="#e42b20" stopOpacity="0" />
          </linearGradient>
        </defs>
        <DataPaths paths={desktopPaths} gradientId={desktopGradient} />
        <Documents items={desktopDocuments} />
      </svg>
      <svg className="ai-data-svg ai-data-svg-mobile" viewBox="0 0 700 820" preserveAspectRatio="none" role="presentation">
        <defs>
          <linearGradient id={mobileGradient} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e42b20" stopOpacity="0" />
            <stop offset=".48" stopColor="#ff3b2f" />
            <stop offset=".55" stopColor="#fff" />
            <stop offset="1" stopColor="#e42b20" stopOpacity="0" />
          </linearGradient>
        </defs>
        <DataPaths paths={mobilePaths} gradientId={mobileGradient} />
        <Documents items={mobileDocuments} />
      </svg>
    </div>
  );
}
