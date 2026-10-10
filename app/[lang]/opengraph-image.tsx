import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview: full logo on white, headline on the navy brand panel. */
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(hasLocale(lang) ? lang : defaultLocale);
  const logo = await readFile(join(process.cwd(), "public/brand/logo-full.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", fontFamily: "sans-serif" }}>
        <div
          style={{
            width: 520,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
          }}
        >
          <img src={logoSrc} width={428} height={314} alt="" />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            background: "#0e2240",
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: "#7fa7f5", letterSpacing: 1 }}>{dict.hero.eyebrow}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 60, lineHeight: 1.08, letterSpacing: -1.5 }}>
            {dict.hero.titleLines[0]}
          </div>
          <div style={{ display: "flex", fontSize: 60, lineHeight: 1.08, letterSpacing: -1.5, color: "#b4bfcd" }}>
            {dict.hero.titleLines[1]}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
