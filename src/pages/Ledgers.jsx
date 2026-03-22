// src/pages/Ledgers.jsx
import { Icons } from "../components/Icons";
import { Btn, Pill } from "../components/UI";
import { useLanguage } from "../context/LanguageContext";

export const LedgersPage = ({ onNavigate, t, ledgers, onOpenAddLedger, onLedgerClick, deletedCount }) => {
  const { tr, lang } = useLanguage();
  const dateLocale = lang === "en" ? "en-US" : "de-CH";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: t.text }}>{tr("ledgers")}</h2>
          <p style={{ color: t.text3, fontSize: 13, marginTop: 2 }}>{tr("ledgersDesc")}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {/* 👇 دکمه ورود به سطل زباله 👇 */}
          {deletedCount > 0 && (
            <Btn variant="ghost" onClick={() => onNavigate("trash")} style={{ color: t.orange }}>
              🗑️ {tr("trash")} ({deletedCount})
            </Btn>
          )}
          <Btn onClick={onOpenAddLedger}><Icons.Plus size={14} /> {tr("addNewLedger")}</Btn>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {ledgers.map((l) => (
          <div key={l.id} onClick={() => onLedgerClick(l.id)} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 20, cursor: "pointer", position: "relative", overflow: "hidden", opacity: l.included ? 1 : 0.75, transition: "all 0.15s" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: l.color }} />
            <div style={{ width: 40, height: 40, background: l.colorSoft, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 14 }}>{l.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 3 }}>{l.name}</div>
            <div style={{ fontSize: 11.5, color: t.text3, marginBottom: 16 }}>{l.type} · {l.currency}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 600, letterSpacing: -0.5, color: l.included ? t.text : t.text3 }}>
              {l.currency} {l.balance.toLocaleString(dateLocale, { minimumFractionDigits: 2 })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
              <Pill color={l.included ? "green" : "gray"}>{l.included ? tr("inTotal") : tr("hidden")}</Pill>
              <Pill color="gray">{l.txCount} {tr("tx")}</Pill>
            </div>
          </div>
        ))}
        
        <div onClick={onOpenAddLedger} style={{ border: `2px dashed ${t.border}`, borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", minHeight: 180 }}>
          <div style={{ width: 44, height: 44, background: t.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>＋</div>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: t.text2 }}>{tr("addNewLedger")}</div>
          <div style={{ fontSize: 12, color: t.text3, marginTop: 4, textAlign: "center" }}>{tr("addAccountDesc")}</div>
        </div>
      </div>
    </div>
  );
};