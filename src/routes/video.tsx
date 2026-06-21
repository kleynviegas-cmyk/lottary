import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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

        <LiveChat />
      </main>

      <Footer />
      <style>{lotteryStyles}</style>
      <style>{videoStyles}</style>
    </div>
  );
}

type ChatMsg = { initials: string; name: string; color: string; text: string };

const INITIAL_MSGS: ChatMsg[] = [
  { initials: "TN", name: "Thandi N.", color: "#ef4444", text: "Just joined!! Is this real? 😱" },
  { initials: "SM", name: "Sipho M.", color: "#3b82f6", text: "I received mine last week, R32,500!! Watch the whole video" },
  { initials: "ZD", name: "Zanele D.", color: "#10b981", text: "This is legit 🔥🔥🔥" },
  { initials: "MN", name: "Mandla N.", color: "#a855f7", text: "My cousin told me about this, she got R45,000" },
  { initials: "NK", name: "Nomsa K.", color: "#f97316", text: "I'm watching from Soweto, praying this works 🙏" },
];

const EXTRA_MSGS: ChatMsg[] = [
  { initials: "LP", name: "Lerato P.", color: "#ec4899", text: "Just got R28,000 in my FNB account!! 🎉" },
  { initials: "BK", name: "Bongani K.", color: "#14b8a6", text: "Don't skip the video, watch all of it" },
  { initials: "AM", name: "Ayanda M.", color: "#f59e0b", text: "R51,000 received!!! Thank you 🙏🙏" },
  { initials: "TS", name: "Themba S.", color: "#8b5cf6", text: "Capitec confirmed my deposit, this is real!" },
  { initials: "PD", name: "Precious D.", color: "#06b6d4", text: "My family won't believe this 😭❤️" },
  { initials: "JM", name: "Jabu M.", color: "#22c55e", text: "Standard Bank just notified me, R36,500!!" },
  { initials: "NN", name: "Nandi N.", color: "#e11d48", text: "Watching from Durban, please work 🙌" },
  { initials: "SK", name: "Sizwe K.", color: "#6366f1", text: "I almost gave up but kept watching... R42,000 in!" },
  { initials: "MM", name: "Mpho M.", color: "#0ea5e9", text: "ABSA account received 💰💰💰" },
  { initials: "RT", name: "Refilwe T.", color: "#d946ef", text: "Best day ever, paying my rent today!" },
];

function LiveChat() {
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_MSGS);
  const [viewers, setViewers] = useState(3544);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = EXTRA_MSGS[Math.floor(Math.random() * EXTRA_MSGS.length)];
        const updated = [...prev, next];
        return updated.length > 30 ? updated.slice(-30) : updated;
      });
      setViewers((v) => v + Math.floor(Math.random() * 5) - 1);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <section className="chat">
      <div className="chat__head">
        <span className="chat__title"><span className="chat__dot" /> Live Chat</span>
        <span className="chat__viewers">👤 {viewers.toLocaleString("en-ZA")}</span>
      </div>
      <div className="chat__list" ref={listRef}>
        {messages.map((m, i) => (
          <div className="chat__msg" key={i}>
            <span className="chat__avatar" style={{ background: m.color }}>{m.initials}</span>
            <span className="chat__name" style={{ color: m.color }}>{m.name}</span>
            <span className="chat__text">{m.text}</span>
          </div>
        ))}
      </div>
      <div className="chat__input">
        <span className="chat__avatar chat__avatar--me">👤</span>
        <input className="chat__field" placeholder="Send a message..." disabled />
        <button className="chat__send" type="button" disabled>➤</button>
      </div>
    </section>
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

.chat { background: #0f172a; border-radius: 10px; margin-top: 18px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
.chat__head { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #1e293b; color: #fff; }
.chat__title { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; }
.chat__dot { width: 8px; height: 8px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 0 0 rgba(239,68,68,0.7); animation: chatPulse 1.6s infinite; }
@keyframes chatPulse { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.7);} 70% { box-shadow: 0 0 0 8px rgba(239,68,68,0);} 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0);} }
.chat__viewers { color: #cbd5e1; font-size: 13px; font-weight: 600; }
.chat__list { display: flex; flex-direction: column; gap: 4px; padding: 10px 0; max-height: 360px; overflow-y: auto; }
.chat__msg { display: flex; align-items: center; gap: 8px; padding: 8px 16px; color: #e2e8f0; font-size: 14px; flex-wrap: wrap; }
.chat__msg:nth-child(even) { background: rgba(255,255,255,0.03); }
.chat__avatar { flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; color: #fff; font-weight: 800; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; }
.chat__avatar--me { background: #475569; }
.chat__name { font-weight: 700; font-size: 13px; }
.chat__text { color: #e2e8f0; }
.chat__input { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-top: 1px solid #1e293b; background: #0b1322; }
.chat__field { flex: 1; background: #1e293b; border: none; outline: none; color: #e2e8f0; padding: 10px 14px; border-radius: 999px; font-size: 14px; }
.chat__send { background: transparent; border: none; color: #60a5fa; font-size: 18px; cursor: pointer; padding: 4px 10px; }

@media (max-width: 640px) {
  .video-title { font-size: 16px; }
  .chat__list { max-height: 300px; }
  .chat__msg { font-size: 13px; }
}
`;
