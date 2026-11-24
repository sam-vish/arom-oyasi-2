import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Share image for every page, in the "Voice" look: bone paper, a letterbox band of the Apostle
// ministering (the site's signature opening), the page title underneath. Poppins and the
// gold → copper brand gradient, as on the original site.

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Towards the rebirth of Apostolic Christianity").slice(0, 90);

  const root = process.cwd();
  const [medium, semibold, photo] = await Promise.all([
    readFile(path.join(root, "assets/fonts/Poppins-Medium.ttf")),
    readFile(path.join(root, "assets/fonts/Poppins-SemiBold.ttf")),
    readFile(path.join(root, "public/images/photos/hero-pointing.jpg")),
  ]);
  const band = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#ede8de", color: "#16130f" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "44px 64px 0", fontFamily: "Poppins", fontWeight: 600, fontSize: 17, letterSpacing: 4, textTransform: "uppercase" }}>
          <span style={{ color: "#a35b56" }}>Apostle Arome Osayi</span>
          <span style={{ color: "#6f665b" }}>aromeosayi.org</span>
        </div>
        <div style={{ display: "flex", marginTop: 34, height: 230, width: "100%", overflow: "hidden", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={band} alt="" width={1200} height={634} style={{ position: "absolute", top: -40, left: 0, width: 1200, height: 634, objectFit: "cover", filter: "grayscale(1)" }} />
        </div>
        <div style={{ display: "flex", height: 5, width: "100%", background: "linear-gradient(93.51deg, #e7c585 2.84%, #a35b56 99.18%)" }} />
        <div
          style={{
            display: "flex",
            padding: "30px 64px 0",
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: title.length > 44 ? 52 : 66,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            maxWidth: 1100,
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" },
    },
  );
}
