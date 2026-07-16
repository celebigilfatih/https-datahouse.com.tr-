"use client";

import { useEffect, useRef } from "react";
import AiDataStage from "./ai-data-stage";

export type ScrollKeyframe = {
  progress: number;
  productX: number;
  productY: number;
  productScale: number;
  productOpacity: number;
  firewallX: number;
  firewallY: number;
  firewallScale: number;
  firewallOpacity: number;
  aiX: number;
  aiY: number;
  aiScale: number;
  aiOpacity: number;
  pulseX: number;
  pulseY: number;
};

export type CinematicChapter = {
  id: "hero" | "network" | "firewall" | "server" | "ai" | "maintenance" | "backup";
  index: number;
  desktop: ScrollKeyframe;
  mobile: ScrollKeyframe;
  reducedMotion: ScrollKeyframe;
};

export const cinematicChapters: CinematicChapter[] = [
  { id: "hero", index: 0, desktop: { progress: 0, productX: 18, productY: 6, productScale: 1.08, productOpacity: 1, firewallX: 18, firewallY: 6, firewallScale: .8, firewallOpacity: 0, aiX: 18, aiY: 5, aiScale: .82, aiOpacity: 0, pulseX: 70, pulseY: 50 }, mobile: { progress: 0, productX: 0, productY: 22, productScale: 1.18, productOpacity: .78, firewallX: 0, firewallY: 25, firewallScale: .72, firewallOpacity: 0, aiX: 0, aiY: 22, aiScale: .9, aiOpacity: 0, pulseX: 50, pulseY: 64 }, reducedMotion: { progress: 0, productX: 18, productY: 6, productScale: 1, productOpacity: 1, firewallX: 18, firewallY: 6, firewallScale: .8, firewallOpacity: 0, aiX: 18, aiY: 5, aiScale: .82, aiOpacity: 0, pulseX: 70, pulseY: 50 } },
  { id: "network", index: 1, desktop: { progress: .1667, productX: -22, productY: 1, productScale: .64, productOpacity: 0, firewallX: 8, firewallY: 2, firewallScale: .74, firewallOpacity: 0, aiX: 12, aiY: 5, aiScale: .78, aiOpacity: 0, pulseX: 25, pulseY: 36 }, mobile: { progress: .1667, productX: -14, productY: 26, productScale: .72, productOpacity: 0, firewallX: 2, firewallY: 29, firewallScale: .65, firewallOpacity: 0, aiX: 0, aiY: 23, aiScale: .88, aiOpacity: 0, pulseX: 28, pulseY: 32 }, reducedMotion: { progress: .1667, productX: -22, productY: 1, productScale: .64, productOpacity: 0, firewallX: 8, firewallY: 2, firewallScale: .74, firewallOpacity: 0, aiX: 12, aiY: 5, aiScale: .78, aiOpacity: 0, pulseX: 25, pulseY: 36 } },
  { id: "firewall", index: 2, desktop: { progress: .3333, productX: -16, productY: 3, productScale: .58, productOpacity: 0, firewallX: 25, firewallY: 6, firewallScale: 1, firewallOpacity: 1, aiX: 12, aiY: 5, aiScale: .78, aiOpacity: 0, pulseX: 72, pulseY: 54 }, mobile: { progress: .3333, productX: -8, productY: 26, productScale: .6, productOpacity: 0, firewallX: 0, firewallY: 30, firewallScale: .94, firewallOpacity: .96, aiX: 0, aiY: 23, aiScale: .88, aiOpacity: 0, pulseX: 63, pulseY: 66 }, reducedMotion: { progress: .3333, productX: -16, productY: 3, productScale: .58, productOpacity: 0, firewallX: 25, firewallY: 6, firewallScale: .96, firewallOpacity: 1, aiX: 12, aiY: 5, aiScale: .78, aiOpacity: 0, pulseX: 72, pulseY: 54 } },
  { id: "server", index: 3, desktop: { progress: .5, productX: 16, productY: 1, productScale: .9, productOpacity: 1, firewallX: 21, firewallY: 1, firewallScale: .88, firewallOpacity: 0, aiX: 14, aiY: 4, aiScale: .84, aiOpacity: 0, pulseX: 66, pulseY: 46 }, mobile: { progress: .5, productX: 8, productY: 24, productScale: .98, productOpacity: .82, firewallX: 2, firewallY: 26, firewallScale: .9, firewallOpacity: 0, aiX: 0, aiY: 22, aiScale: .92, aiOpacity: 0, pulseX: 66, pulseY: 55 }, reducedMotion: { progress: .5, productX: 16, productY: 1, productScale: .86, productOpacity: 1, firewallX: 21, firewallY: 1, firewallScale: .88, firewallOpacity: 0, aiX: 14, aiY: 4, aiScale: .84, aiOpacity: 0, pulseX: 66, pulseY: 46 } },
  { id: "ai", index: 4, desktop: { progress: .6667, productX: -18, productY: 1, productScale: .58, productOpacity: 0, firewallX: 20, firewallY: 2, firewallScale: .8, firewallOpacity: 0, aiX: 16, aiY: 4, aiScale: 1, aiOpacity: 1, pulseX: 70, pulseY: 55 }, mobile: { progress: .6667, productX: -8, productY: 25, productScale: .64, productOpacity: 0, firewallX: 0, firewallY: 27, firewallScale: .8, firewallOpacity: 0, aiX: 0, aiY: 22, aiScale: 1, aiOpacity: .96, pulseX: 58, pulseY: 72 }, reducedMotion: { progress: .6667, productX: -18, productY: 1, productScale: .58, productOpacity: 0, firewallX: 20, firewallY: 2, firewallScale: .8, firewallOpacity: 0, aiX: 16, aiY: 4, aiScale: .96, aiOpacity: 1, pulseX: 70, pulseY: 55 } },
  { id: "maintenance", index: 5, desktop: { progress: .8333, productX: -17, productY: -1, productScale: .74, productOpacity: 0, firewallX: -8, firewallY: 2, firewallScale: .7, firewallOpacity: 0, aiX: 12, aiY: 5, aiScale: .82, aiOpacity: 0, pulseX: 34, pulseY: 52 }, mobile: { progress: .8333, productX: -7, productY: 24, productScale: .82, productOpacity: 0, firewallX: -3, firewallY: 26, firewallScale: .65, firewallOpacity: 0, aiX: 0, aiY: 23, aiScale: .9, aiOpacity: 0, pulseX: 34, pulseY: 61 }, reducedMotion: { progress: .8333, productX: -17, productY: -1, productScale: .74, productOpacity: 0, firewallX: -8, firewallY: 2, firewallScale: .7, firewallOpacity: 0, aiX: 12, aiY: 5, aiScale: .82, aiOpacity: 0, pulseX: 34, pulseY: 52 } },
  { id: "backup", index: 6, desktop: { progress: 1, productX: 0, productY: 3, productScale: .54, productOpacity: .16, firewallX: 0, firewallY: 3, firewallScale: .6, firewallOpacity: 0, aiX: 0, aiY: 4, aiScale: .7, aiOpacity: 0, pulseX: 50, pulseY: 50 }, mobile: { progress: 1, productX: 0, productY: 26, productScale: .62, productOpacity: .14, firewallX: 0, firewallY: 26, firewallScale: .62, firewallOpacity: 0, aiX: 0, aiY: 24, aiScale: .8, aiOpacity: 0, pulseX: 50, pulseY: 58 }, reducedMotion: { progress: 1, productX: 0, productY: 3, productScale: .54, productOpacity: .16, firewallX: 0, firewallY: 3, firewallScale: .6, firewallOpacity: 0, aiX: 0, aiY: 4, aiScale: .7, aiOpacity: 0, pulseX: 50, pulseY: 50 } },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (value: number) => value * value * (3 - 2 * value);

function sample(progress: number, mobile: boolean, reducedMotion: boolean) {
  const scaled = clamp(progress) * (cinematicChapters.length - 1);
  const index = Math.min(cinematicChapters.length - 2, Math.floor(scaled));
  const from = cinematicChapters[index][reducedMotion ? "reducedMotion" : mobile ? "mobile" : "desktop"];
  const to = cinematicChapters[index + 1][reducedMotion ? "reducedMotion" : mobile ? "mobile" : "desktop"];
  const amount = ease(scaled - index);
  const mix = (a: number, b: number) => a + (b - a) * amount;
  return {
    productX: mix(from.productX, to.productX), productY: mix(from.productY, to.productY),
    productScale: mix(from.productScale, to.productScale), productOpacity: mix(from.productOpacity, to.productOpacity),
    firewallX: mix(from.firewallX, to.firewallX), firewallY: mix(from.firewallY, to.firewallY),
    firewallScale: mix(from.firewallScale, to.firewallScale), firewallOpacity: mix(from.firewallOpacity, to.firewallOpacity),
    aiX: mix(from.aiX, to.aiX), aiY: mix(from.aiY, to.aiY),
    aiScale: mix(from.aiScale, to.aiScale), aiOpacity: mix(from.aiOpacity, to.aiOpacity),
    pulseX: mix(from.pulseX, to.pulseX), pulseY: mix(from.pulseY, to.pulseY),
  };
}

export default function CinematicExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLImageElement>(null);
  const firewallRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLImageElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const mount = canvasRef.current;
    const product = productRef.current;
    const firewall = firewallRef.current;
    const aiProduct = aiRef.current;
    const pulse = pulseRef.current;
    if (!root || !mount || !product || !firewall || !aiProduct || !pulse) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) root.classList.add("reduced-motion");
    const story = document.querySelector<HTMLElement>("[data-cinematic-story]");
    let stopped = false;
    let webglRequested = false;
    let target = 0;
    let current = 0;
    let raf = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let particles: import("three").Points | null = null;
    let pulseMesh: import("three").Mesh | null = null;
    let elapsed = 0;
    let last = performance.now();

    const onScroll = () => {
      if (!story) return;
      const storyBottom = story.offsetTop + story.offsetHeight - innerHeight;
      target = clamp(scrollY / Math.max(1, storyBottom));
      const sceneIndex = Math.min(cinematicChapters.length - 1, Math.round(target * (cinematicChapters.length - 1)));
      root.dataset.scene = cinematicChapters[sceneIndex].id;
      root.classList.toggle("is-dimmed", scrollY > story.offsetTop + story.offsetHeight - innerHeight * .25);
      document.documentElement.style.setProperty("--story-progress", String(target));
      if (scrollY > 4 && !webglRequested && !reduced.matches) requestWebgl();
    };

    const onResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1.15 : 1.5));
    };

    const updateVisuals = (time: number) => {
      const delta = Math.min(.05, (time - last) / 1000);
      last = time;
      elapsed += delta;
      const smoothing = reduced.matches ? 1 : 1 - Math.pow(.0008, delta);
      current += (target - current) * smoothing;
      const state = sample(current, innerWidth < 768, reduced.matches);
      const productTransform = `translate3d(calc(-50% + ${state.productX}vw), calc(-50% + ${state.productY}vh), 0) scale(${state.productScale})`;
      if (product.style.transform !== productTransform) product.style.transform = productTransform;
      const productOpacity = String(state.productOpacity);
      if (product.style.opacity !== productOpacity) product.style.opacity = productOpacity;
      const firewallTransform = `translate3d(calc(-50% + ${state.firewallX}vw), calc(-50% + ${state.firewallY}vh), 0) scale(${state.firewallScale})`;
      if (firewall.style.transform !== firewallTransform) firewall.style.transform = firewallTransform;
      const firewallOpacity = String(state.firewallOpacity);
      if (firewall.style.opacity !== firewallOpacity) firewall.style.opacity = firewallOpacity;
      const aiTransform = `translate3d(calc(-50% + ${state.aiX}vw), calc(-50% + ${state.aiY}vh), 0) scale(${state.aiScale})`;
      if (aiProduct.style.transform !== aiTransform) aiProduct.style.transform = aiTransform;
      const aiOpacity = String(state.aiOpacity);
      if (aiProduct.style.opacity !== aiOpacity) aiProduct.style.opacity = aiOpacity;
      pulse.style.transform = `translate3d(${state.pulseX}vw, ${state.pulseY}vh, 0) translate(-50%, -50%) scale(${.7 + Math.sin(elapsed * 3) * .08})`;

      if (renderer && scene && camera) {
        if (particles) {
          particles.rotation.y = elapsed * .018 + current * .65;
          particles.rotation.z = current * .08;
        }
        if (pulseMesh) {
          pulseMesh.position.x = (state.pulseX / 100 - .5) * 9;
          pulseMesh.position.y = -(state.pulseY / 100 - .5) * 5.2;
          pulseMesh.scale.setScalar(.75 + Math.sin(elapsed * 4) * .08);
        }
        camera.position.x = Math.sin(current * Math.PI * 2) * .28;
        camera.position.y = Math.cos(current * Math.PI) * .12;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      }
      if (!stopped && !document.hidden) raf = requestAnimationFrame(updateVisuals);
    };

    const onVisibility = () => {
      if (!document.hidden) {
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(updateVisuals);
      }
    };

    const initialize = async () => {
      if (reduced.matches) {
        root.classList.add("reduced-motion");
        return;
      }
      try {
        const THREE = await import("three");
        if (stopped) return;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, .1, 100);
        camera.position.z = 8;
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: innerWidth > 768, powerPreference: "high-performance" });
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const count = innerWidth < 768 ? 65 : 150;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i += 1) {
          positions[i * 3] = (Math.random() - .5) * 13;
          positions[i * 3 + 1] = (Math.random() - .5) * 7;
          positions[i * 3 + 2] = (Math.random() - .5) * 5;
          colors[i * 3] = 1;
          colors[i * 3 + 1] = Math.random() > .72 ? .18 : .72;
          colors[i * 3 + 2] = Math.random() > .72 ? .14 : .72;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        particles = new THREE.Points(geometry, new THREE.PointsMaterial({ size: .025, transparent: true, opacity: .58, vertexColors: true, blending: THREE.AdditiveBlending }));
        scene.add(particles);

        pulseMesh = new THREE.Mesh(
          new THREE.IcosahedronGeometry(.16, 3),
          new THREE.MeshBasicMaterial({ color: 0xff2a1a, transparent: true, opacity: .36, blending: THREE.AdditiveBlending }),
        );
        scene.add(pulseMesh);
        onResize();
      } catch {
        root.classList.add("no-webgl");
      }
    };

    const requestWebgl = () => {
      if (webglRequested || reduced.matches) return;
      webglRequested = true;
      initialize();
    };

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    onScroll();
    raf = requestAnimationFrame(updateVisuals);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer?.dispose();
      renderer?.domElement.remove();
      particles?.geometry.dispose();
      (particles?.material as import("three").Material | undefined)?.dispose();
      pulseMesh?.geometry.dispose();
      (pulseMesh?.material as import("three").Material | undefined)?.dispose();
    };
  }, []);

  return (
    <div className="cinematic-experience" ref={rootRef} data-scene="hero" aria-hidden="true">
      <div className="cinematic-grid" />
      <div className="cinematic-lines"><i /><i /><i /><i /><i /></div>
      <div className="cinematic-canvas" ref={canvasRef} />
      <div className="product-halo" />
      <img ref={productRef} className="powerstore-product" src="/images/dell-powerstore.png" alt="" width="6255" height="1977" fetchPriority="high" />
      <div ref={firewallRef} className="firewall-product-stage">
        <svg className="firewall-flow" viewBox="0 0 1000 360" preserveAspectRatio="none" role="presentation">
          <path className="firewall-flow-base" d="M10 182 H154 L214 126 H392 L454 182 H990" pathLength="1" />
          <path className="firewall-flow-signal" d="M10 182 H154 L214 126 H392 L454 182 H990" pathLength="1" />
          <path className="firewall-flow-pulse" d="M10 182 H154 L214 126 H392 L454 182 H990" pathLength="1" />
          <circle cx="214" cy="126" r="5" /><circle cx="454" cy="182" r="5" /><circle cx="830" cy="182" r="5" />
        </svg>
        <div className="firewall-rack">
          <span className="firewall-rack-label">PERIMETER NODE / FG-2600F</span>
          <img className="firewall-device" src="/images/fortigate-firewall.webp" alt="" width="1000" height="300" />
          <div className="firewall-rack-status"><i /><i /><i /><b>POLICY SYNC / READY</b></div>
        </div>
      </div>
      <AiDataStage variant="cinematic" />
      <img ref={aiRef} className="ai-product" src="/images/ai/rtx-spark-device.webp" alt="" width="1738" height="905" loading="lazy" decoding="async" />
      <div ref={pulseRef} className="data-pulse"><span /><i /></div>
      <div className="network-stage">
        <svg className="network-flow-diagram" viewBox="0 0 960 430" preserveAspectRatio="none" role="presentation">
          <g className="network-flow-base">
            <path d="M76 78 H230 L414 194" /><path d="M76 352 H230 L414 236" />
            <path d="M884 78 H730 L546 194" /><path d="M884 352 H730 L546 236" />
          </g>
          <g className="network-flow-signal">
            <path d="M76 78 H230 L414 194" /><path d="M76 352 H230 L414 236" />
            <path d="M884 78 H730 L546 194" /><path d="M884 352 H730 L546 236" />
          </g>
          <g className="network-flow-packet">
            <path pathLength="1" d="M76 78 H230 L414 194" /><path pathLength="1" d="M76 352 H230 L414 236" />
            <path pathLength="1" d="M884 78 H730 L546 194" /><path pathLength="1" d="M884 352 H730 L546 236" />
          </g>
        </svg>
        {[
          ["CORE / 01", "8%", "12%"], ["BRANCH / 02", "8%", "79%"],
          ["CLIENT / 24", "86%", "12%"], ["SERVICE / 08", "86%", "79%"],
        ].map(([label, x, y]) => (
          <span className="network-node" key={label} style={{ "--node-x": x, "--node-y": y } as React.CSSProperties}><i />{label}</span>
        ))}
        <div className="network-switch">
          <header><span><i /> SWITCH FABRIC / ACTIVE</span><b>24 PORT</b></header>
          <div className="network-switch-body">
            <div className="network-ports">
              {Array.from({ length: 24 }, (_, index) => <i className={index % 4 === 0 || index === 21 ? "is-live" : ""} key={index} />)}
            </div>
            <div className="network-uplinks"><i /><i /><span>UPLINK<br />10G</span></div>
          </div>
          <footer><span>VLAN SEGMENTATION / READY</span><span>PACKET FLOW / STABLE</span></footer>
        </div>
      </div>
      <div className="maintenance-stage">
        <div className="maintenance-rack-shell">
          <header><span>RACK HEALTH / LIVE</span><b><i /> OBSERVED</b></header>
          <div className="maintenance-rack-units">
            {Array.from({ length: 3 }, (_, unit) => (
              <div className="maintenance-rack-unit" key={unit}>
                <span>U{unit + 1}</span>
                <div>{Array.from({ length: 12 }, (_, port) => <i className={(port + unit) % 5 === 0 ? "is-live" : ""} key={port} />)}</div>
                <b>{unit === 0 ? "COMPUTE" : unit === 1 ? "STORAGE" : "SERVICE"}</b>
              </div>
            ))}
          </div>
          <div className="maintenance-scan-plane"><i /></div>
        </div>
        <div className="maintenance-telemetry">
          <header><span><i /> HEALTH TELEMETRY</span><b>ACTIVE</b></header>
          <strong>99.8<small>%</small></strong>
          <dl>
            <div><dt>POWER</dt><dd>NOMINAL</dd></div>
            <div><dt>THERMAL</dt><dd>STABLE</dd></div>
            <div><dt>EVENTS</dt><dd>MONITORED</dd></div>
          </dl>
        </div>
      </div>
      <div className="firewall-scan"><span>POLICY / ACTIVE</span><i /><i /><i /><b>SECURE</b></div>
      <div className="ai-status-panel">
        <span><i /> LOCAL MODEL / ACTIVE</span>
        <span>KNOWLEDGE INDEX / READY</span>
        <span>DATA BOUNDARY / ON-PREMISE</span>
      </div>
      <div className="backup-core"><span /><i /><b>VERİ KORUNUYOR</b></div>
      <div className="cinematic-vignette" />
      <div className="cinematic-noise" />
    </div>
  );
}
