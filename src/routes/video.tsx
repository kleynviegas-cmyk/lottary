import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { z } from "zod";
import { TopBar, Header, Footer, lotteryStyles } from "@/components/lottery-layout";

const videoSearchSchema = z.object({
  name: z.string().catch("Player"),
  bank: z.string().catch(""),
  amount: z.coerce.number().catch(0),
  initials: z.string().catch("FNB"),
  color: z.string().catch("#00945E"),
});

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Watch Video — South African National Lottery" },
      { name: "description", content: "Watch the video to release your prize." },
    ],
  }),
  validateSearch: videoSearchSchema,
  component: VideoPage,
});

function formatRand(n: number, decimals = 0) {
  return (
    "R " +
    n.toLocaleString("en-ZA", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

function VideoPage() {
  const { name, bank, amount, initials, color } = Route.useSearch();
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playerContainerRef.current) return;
    if (document.getElementById("vid-6a345be866e88e75bd60ab2a")) return;

    const vturb = document.createElement("vturb-smartplayer");
    vturb.id = "vid-6a345be866e88e75bd60ab2a";
    vturb.style.display = "block";
    vturb.style.margin = "0 auto";
    vturb.style.width = "100%";
    playerContainerRef.current.appendChild(vturb);

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src =
      "https://scripts.converteai.net/1f5d397a-238e-4844-a2ce-eeeb38037cd2/players/6a345be866e88e75bd60ab2a/v4/player.js";
    s.async = true;
    document.head.appendChild(s);

    return () => {
      const existing = document.getElementById("vid-6a345be866e88e75bd60ab2a");
      if (existing && playerContainerRef.current) {
        playerContainerRef.current.removeChild(existing);
      }
      const scripts = document.querySelectorAll('script[src*="converteai.net"]');
      scripts.forEach((sc) => sc.remove());
    };
  }, []);

  return (
    <div className="page">
      <TopBar />
      <Header />

      <main className="main">
        <section className="card info-card">
          <div className="info-card__col">
            <div
              className="info-card__avatar"
              style={{ background: color }}
            >
              {initials}
            </div>
            <div className="info-card__label">NAME</div>
            <div className="info-card__value">{name}</div>
          </div>
          <div className="info-card__col" style={{ textAlign: "center" }}>
            <div className="info-card__label">BANK</div>
            <div className="info-card__value" style={{ fontWeight: 700 }}>
              {bank}
            </div>
          </div>
          <div className="info-card__col" style={{ textAlign: "right" }}>
            <div className="info-card__label">AMOUNT</div>
            <div className="info-card__amount">{formatRand(amount, 2)}</div>
          </div>
        </section>

        <h1 className="video-title">
          WATCH UNTIL THE END TO RELEASE YOUR {formatRand(amount, 2)}
        </h1>
        <p className="video-subtitle">
          {name}, your deposit to <strong>{bank}</strong> will be released as
          soon as you finish watching this short video.
        </p>

        <div className="video-box">
          <div className="video-box__bar">
            <span className="live-now">🔴 LIVE NOW</span>
            <span className="watchers">👤 3,542 watching</span>
          </div>
          <div ref={playerContainerRef} />
        </div>
      </main>

      <Footer />
      <style>{lotteryStyles}</style>
      <style>{videoStyles}</style>
    </div>
  );
}

const videoStyles = `
.info-card { display: flex; align-items: center; justify-content: space-between; }
.info-card__col { display: flex; flex-direction: column; gap: 2px; }
.info-card__label { font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.info-card__value { font-size: 14px; font-weight: 600; color: #0f172a; }
.info-card__amount { color: #16a34a; font-size: 16px; font-weight: 800; }
.info-card__avatar { width: 44px; height: 44px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 14px; margin-bottom: 4px; }

.video-title { text-align: center; font-size: 18px; font-weight: 800; margin: 24px 0 8px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.3px; }
.video-subtitle { text-align: center; font-size: 15px; color: #475569; margin: 0 0 24px; }
.video-subtitle strong { color: #0f172a; }

.video-box { background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
.video-box__bar { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #fff; border-bottom: 1px solid #f1f5f9; }
.live-now { background: #dc2626; color: #fff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px; }
.watchers { font-size: 12px; color: #475569; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }

@media (max-width: 640px) {
  .video-title { font-size: 16px; }
}
`;
