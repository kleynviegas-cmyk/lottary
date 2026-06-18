import type { ReactNode } from "react";

export function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__inner">
        <div className="topbar__contact">
          <span>📞 0861 101 101</span>
          <span>✉️ info@nationallottery.co.za</span>
        </div>
        <div className="topbar__official">Official Licensed National Lottery</div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="brand">
          <div className="brand__badges">
            <span className="badge badge--y">
              PHANDA
              <br />
              PUSHA
              <br />
              PLAY
            </span>
            <span className="badge badge--g">🇿🇦</span>
          </div>
          <div className="brand__name">South African National Lottery</div>
        </div>
        <div className="jackpot">
          <div className="jackpot__label">🏆 JACKPOT PRIZE</div>
          <div className="jackpot__amount">R 150,000,000</div>
        </div>
      </div>
      <div className="header__stripe" />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <div className="footer__title">Customer Support</div>
          <div className="footer__line">📞 0861 101 101</div>
        </div>
        <div>
          <div className="footer__title">Security</div>
          <div className="footer__line">🛡️ Licensed Draws</div>
        </div>
        <div>
          <div className="footer__title">About Us</div>
          <div className="footer__line">
            Official lottery platform in South Africa. Transparency and security guaranteed.
          </div>
        </div>
      </div>
    </footer>
  );
}

export const lotteryStyles = `
.page { min-height: 100vh; background: #eef2f7; color: #0f172a; font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }

/* Top bar */
.topbar { background: #0a2a5e; color: #fff; font-size: 12px; }
.topbar__inner { max-width: 1280px; margin: 0 auto; padding: 6px 16px; display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.topbar__contact { display: flex; gap: 18px; }
.topbar__official { color: #ffd166; }

/* Header */
.header { background: linear-gradient(90deg, #0b3aa0 0%, #0a6e3f 100%); color: #fff; }
.header__inner { max-width: 1280px; margin: 0 auto; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.brand { display: flex; align-items: center; gap: 14px; }
.brand__badges { display: flex; gap: 4px; background: #fff; padding: 4px; border-radius: 8px; }
.badge { width: 44px; height: 44px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; color: #111; text-align: center; line-height: 1; }
.badge--y { background: #ffcf3a; }
.badge--g { background: #0a8a3f; color: #fff; font-size: 18px; }
.brand__name { font-size: 20px; font-weight: 600; }
.jackpot { background: #ffcf3a; color: #1a1a1a; border-radius: 8px; padding: 8px 14px; min-width: 200px; text-align: center; box-shadow: 0 2px 0 rgba(0,0,0,0.15); }
.jackpot__label { font-size: 11px; font-weight: 700; }
.jackpot__amount { font-size: 20px; font-weight: 800; letter-spacing: 0.5px; }
.header__stripe { height: 4px; background: linear-gradient(90deg, #ffcf3a, #0a8a3f); }

/* Main / Card */
.main { max-width: 760px; margin: 28px auto; padding: 0 16px; display: flex; flex-direction: column; gap: 18px; }
.card { background: #fff; border-radius: 10px; padding: 28px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
.card--bordered { border: 2px solid #16a34a; padding: 0; overflow: hidden; }
.card--bordered > * { padding-left: 28px; padding-right: 28px; }
.card--bordered > .confirmed { padding: 12px 28px; }

.trophy { font-size: 32px; text-align: center; }
.title { text-align: center; font-size: 18px; font-weight: 800; margin: 10px 0 6px; text-transform: uppercase; letter-spacing: 0.3px; }
.subtitle { text-align: center; color: #475569; font-size: 14px; margin: 0 0 18px; }

.label { font-size: 13px; font-weight: 600; margin: 14px 0 6px; color: #111827; }
.input { width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; outline: none; }
.input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }

.prizes { display: flex; flex-direction: column; gap: 10px; margin-top: 6px; }
.prize { display: flex; align-items: center; justify-content: space-between; background: #f3f6fb; border: 2px solid transparent; border-radius: 8px; padding: 12px 14px; cursor: pointer; font-size: 14px; font-weight: 600; color: #0f172a; }
.prize:hover { background: #e9eff8; }
.prize--active { border-color: #2563eb; background: #eaf1ff; }
.prize__left { display: flex; align-items: center; gap: 10px; }
.prize__icon { font-size: 18px; }
.prize__amount { font-weight: 700; }

.cta { width: 100%; padding: 14px; border: none; border-radius: 8px; font-size: 15px; font-weight: 800; letter-spacing: 0.5px; cursor: pointer; margin-top: 18px; color: #fff; }
.cta--primary { background: #cbd5e1; color: #fff; }
.cta--primary:not(:disabled) { background: #f59e0b; }
.cta--success { background: #16a34a; }
.cta--success:disabled { background: #cbd5e1; cursor: not-allowed; }
.cta--ghost { background: #e5e7eb; color: #111827; margin-top: 8px; }
.cta--watch { background: #ef6b6b; }
.cta:disabled { cursor: not-allowed; opacity: 0.9; }

.micro { text-align: center; font-size: 12px; color: #6b7280; margin-top: 8px; }

/* Draw stage */
.hello { text-align: center; color: #6b7280; font-size: 14px; }
.competing { text-align: center; font-size: 16px; font-weight: 700; margin-top: 4px; }
.competing__prize { color: #2563eb; }
.amount-green { text-align: center; color: #16a34a; font-weight: 800; font-size: 22px; margin: 4px 0 8px; }
.muted { color: #475569; font-size: 13px; }
.center { text-align: center; }

.live { background: linear-gradient(180deg, #163d8a, #0a2a5e); border-radius: 10px; padding: 16px; color: #fff; margin-top: 14px; }
.live__head { display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 14px; }
.live__badge { font-weight: 700; }
.live__id { color: #cfe1ff; }
.balls { display: flex; gap: 12px; justify-content: center; }
.ball { width: 56px; height: 56px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; color: #cfe1ff; font-weight: 700; font-size: 18px; transition: transform .25s ease; }
.ball--filled { background: #fff; color: #0f172a; transform: scale(1.05); }
.ball--mine { background: #ffcf3a; color: #1a1a1a; }

.numbers { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 10px; }
.num { aspect-ratio: 1; border-radius: 50%; border: 2px solid #2563eb; background: #fff; color: #0f172a; font-weight: 700; font-size: 18px; cursor: pointer; transition: all .15s ease; }
.num:hover:not(:disabled) { background: #eaf1ff; transform: translateY(-2px); }
.num--picked { background: #ffcf3a; border-color: #f59e0b; }
.num:disabled { cursor: not-allowed; opacity: 0.7; }

/* Win card */
.win-card { background: #ecfdf5; border: 2px solid #16a34a; border-radius: 10px; padding: 24px; text-align: center; }
.win__emoji { font-size: 32px; }
.win__title { color: #15803d; font-weight: 800; letter-spacing: 0.5px; margin: 8px 0 6px; }
.win__text { color: #166534; margin: 6px 0; }
.win__label { font-weight: 700; margin-top: 8px; }
.win__amount { color: #dc2626; font-weight: 800; font-size: 26px; margin: 4px 0 12px; }

/* Bank stage */
.confirmed { background: #16a34a; color: #fff; text-align: center; font-weight: 800; }
.banks { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 6px; }
.bank { display: flex; align-items: center; gap: 12px; background: #fff; border: 2px solid #e5e7eb; border-radius: 8px; padding: 10px 12px; cursor: pointer; font-weight: 600; }
.bank:hover { border-color: #2563eb; }
.bank--active { border-color: #16a34a; background: #ecfdf5; }
.bank__chip { width: 36px; height: 36px; border-radius: 6px; color: #fff; font-weight: 800; font-size: 12px; display: flex; align-items: center; justify-content: center; }
.bank__name { font-size: 14px; }

/* Approved stage */
.check { font-size: 40px; text-align: center; background: #dcfce7; width: 64px; height: 64px; line-height: 64px; border-radius: 10px; margin: 0 auto; }
.approved { color: #15803d; font-weight: 800; text-align: center; margin: 10px 0 14px; letter-spacing: 0.5px; }
.verified { display: flex; align-items: center; gap: 12px; background: #f1f5f9; border-radius: 8px; padding: 10px 14px; justify-content: center; margin-bottom: 8px; }
.verified__label { font-size: 11px; color: #64748b; font-weight: 700; }
.verified__name { font-weight: 700; }
.warn { background: #fefce8; border: 1px solid #fde68a; border-radius: 8px; padding: 14px; margin-top: 14px; font-size: 14px; color: #713f12; }
.warn p { margin: 8px 0 0; }

/* Footer */
.footer { background: #0a2a5e; color: #fff; padding: 28px 16px; margin-top: 36px; }
.footer__grid { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.footer__title { font-weight: 700; margin-bottom: 6px; }
.footer__line { color: #cfd8e8; font-size: 14px; }

/* Modal */
.modal { position: fixed; inset: 0; background: rgba(15,23,42,0.7); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 16px; }
.modal__box { background: #fff; border-radius: 12px; padding: 26px; max-width: 420px; width: 100%; text-align: center; }
.age { width: 88px; height: 88px; border-radius: 50%; background: #dc2626; color: #fff; font-weight: 800; font-size: 26px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
.modal__title { font-weight: 800; margin: 4px 0 10px; }
.modal__text { font-size: 14px; color: #334155; margin: 0 0 10px; }
.modal__fine { font-size: 12px; color: #64748b; margin: 0 0 14px; }

/* Responsive */
@media (max-width: 640px) {
  .footer__grid { grid-template-columns: 1fr; }
  .header__inner { flex-direction: column; align-items: flex-start; }
  .jackpot { width: 100%; }
  .banks { grid-template-columns: 1fr; }
  .numbers { grid-template-columns: repeat(5, 1fr); }
  .ball { width: 44px; height: 44px; font-size: 16px; }
  .balls { gap: 8px; }
  .topbar__contact { flex-direction: column; gap: 2px; }
}
`;
