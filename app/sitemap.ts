import type { MetadataRoute } from "next";
import { services } from "@/data/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://datahouse.com.tr";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({ url: `${base}/hizmetler/${service.slug}/`, changeFrequency: "monthly" as const, priority: .8 })),
    { url: `${base}/kvkk/`, changeFrequency: "yearly", priority: .2 },
  ];
}
