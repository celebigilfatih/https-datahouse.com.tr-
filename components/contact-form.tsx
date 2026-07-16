"use client";

import { ArrowRight, CheckCircle2, LoaderCircle, ShieldCheck } from "lucide-react";
import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
      kvkkAccepted: data.get("kvkk") === "on",
      website: data.get("website"),
      startedAt: startedAt.current,
      turnstileToken: data.get("cf-turnstile-response") ?? "",
    };

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Talebiniz gönderilemedi.");
      setState("success");
      setMessage(result.message || "Talebiniz bize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.");
      form.reset();
      startedAt.current = Date.now();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Bir bağlantı sorunu oluştu. Lütfen tekrar deneyin.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
      <div className="form-grid">
        <label>
          <span>Adınız ve soyadınız</span>
          <input name="name" autoComplete="name" minLength={2} maxLength={100} required placeholder="Ad Soyad" />
        </label>
        <label>
          <span>Firma</span>
          <input name="company" autoComplete="organization" minLength={2} maxLength={120} required placeholder="Firma adı" />
        </label>
        <label>
          <span>E-posta</span>
          <input name="email" type="email" autoComplete="email" maxLength={160} required placeholder="isim@firma.com" />
        </label>
        <label>
          <span>Telefon</span>
          <input name="phone" type="tel" autoComplete="tel" minLength={10} maxLength={24} required placeholder="+90 5xx xxx xx xx" />
        </label>
        <label className="form-message">
          <span>Nasıl yardımcı olabiliriz?</span>
          <textarea name="message" rows={4} minLength={10} maxLength={2000} required placeholder="İhtiyacınızı kısaca anlatın" />
        </label>
      </div>
      <label className="honeypot" aria-hidden="true">
        Website<input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </label>
      <div className="form-footer">
        <div className="form-footer-primary">
          <p className="form-trust"><ShieldCheck aria-hidden="true" />Talebiniz doğrudan teknik ekibimize iletilir.</p>
          <label className="consent">
            <input type="checkbox" name="kvkk" required />
            <span><a href="/kvkk/" target="_blank">KVKK aydınlatma metnini</a> okudum ve talebimin işlenmesini kabul ediyorum.</span>
          </label>
        </div>
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-theme="dark" />}
        <button type="submit" disabled={state === "sending"}>
          {state === "sending" ? <LoaderCircle className="spin" aria-hidden="true" /> : state === "success" ? <CheckCircle2 aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
          {state === "sending" ? "Gönderiliyor" : state === "success" ? "Gönderildi" : "Talebi gönder"}
        </button>
      </div>
      {message && <p className={`form-status ${state}`} role="status">{message}</p>}
    </form>
  );
}
