// src/components/TxItem.jsx
export const TxItem = ({ tx, onDelete }) => {
  const colors = { income: { bg: "#ECFDF5", color: "#059669" }, expense: { bg: "#FEF2F2", color: "#DC2626" }, transfer: { bg: "#F0F9FF", color: "#0EA5E9" } };
  const c = colors[tx.type] || colors.expense;
  const prefix = tx.type === "income" ? "+" : tx.type === "transfer" ? "⇄" : "−";
  
  const iconMap = { "Software & Tools": "⚡", "Meals": "🍕", "Office": "🖇️", "Travel": "✈️", "Income": "💰" };
  const txIcon = tx.icon || iconMap[tx.category] || "💸";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid #E8EAED" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{txIcon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13.5, color: "#111827" }}>{tx.desc}</div>
        <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
          {tx.ledger} · {tx.date}
        </div>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 14, color: c.color, textAlign: "right" }}>
        {prefix}{Math.abs(tx.amount || 0).toLocaleString("de-CH", { minimumFractionDigits: 2 })}
      </div>
      {/* 👇 دکمه حذف تراکنش 👇 */}
      <button onClick={() => onDelete && onDelete(tx.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#EF4444", padding: 5, display: "flex" }}>
        <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    </div>
  );
};