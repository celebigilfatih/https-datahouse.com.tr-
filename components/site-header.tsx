"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HeaderTone = "dark" | "light" | "red";

const links = [
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/#sertifika", label: "Sertifika" },
  { href: "/#partnerler", label: "Partnerler" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<HeaderTone>("dark");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-tone]"));
    if (!sections.length) return;

    let observer: IntersectionObserver | null = null;
    const updateTone = () => {
      const probe = (headerRef.current?.offsetHeight ?? 88) + 1;
      const active = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= probe && bounds.bottom > probe;
      });
      setTone((active?.dataset.headerTone as HeaderTone | undefined) ?? "dark");
    };

    const connect = () => {
      observer?.disconnect();
      const probe = (headerRef.current?.offsetHeight ?? 88) + 1;
      const bottomMargin = Math.max(0, innerHeight - probe - 1);
      observer = new IntersectionObserver(updateTone, {
        rootMargin: `-${probe}px 0px -${bottomMargin}px 0px`,
        threshold: 0,
      });
      sections.forEach((section) => observer?.observe(section));
      updateTone();
    };

    connect();
    addEventListener("resize", connect);
    return () => {
      observer?.disconnect();
      removeEventListener("resize", connect);
    };
  }, []);

  return (
    <header className="site-header" data-tone={tone} ref={headerRef}>
      <Link href="/" className="brand" aria-label="Datahouse ana sayfa">
        <img src="/images/datahouse-logo.png" alt="Datahouse" width="643" height="117" />
      </Link>
      <nav className="desktop-nav" aria-label="Ana navigasyon">
        {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <Link className="header-cta" href="/#iletisim">
        Projenizi konuşalım <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!open}>
        <div className="mobile-menu-links">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>0{index + 1}</span>{link.label}
            </Link>
          ))}
          <Link href="/#iletisim" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <span>05</span>İletişim
          </Link>
        </div>
        <Link className="mobile-menu-cta" href="/#iletisim" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
          Projenizi konuşalım <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <p>BURSA · TÜRKİYE<br />0 (224) 272 93 90</p>
      </div>
    </header>
  );
}
