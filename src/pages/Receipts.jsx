// src/pages/Receipts.jsx
import { Card, Btn } from "../components/UI";

export const ReceiptsPage = ({ t, transactions }) => {
  // فیلتر کردن تراکنش‌هایی که عکس فاکتور دارن
  const receiptTxs = transactions.filter(tx => tx.receiptUrl);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: t.text }}>Receipts Gallery</h2>
          <p style={{ color: t.text3, fontSize: 13, marginTop: 2 }}>All uploaded invoices and receipts</p>
        </div>
      </div>

      {receiptTxs.length === 0 ? (
        <Card style={{ padding: 60, textAlign: "center", background: t.surface, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>📎</div>
          <div style={{ color: t.text2, fontWeight: 600 }}>No receipts found</div>
          <div style={{ color: t.text3, fontSize: 13, marginTop: 6 }}>Upload a receipt when adding a new transaction.</div>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {receiptTxs.map(tx => (
            <Card key={tx.id} style={{ padding: 0, overflow: "hidden", background: t.surface, border: `1px solid ${t.border}`, cursor: "pointer", transition: "transform 0.2s" }} onClick={() => window.open(tx.receiptUrl, "_blank")}>
              {/* بخش عکس فاکتور */}
              <div style={{ height: 160, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={tx.receiptUrl} alt="Receipt" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* بخش اطلاعات تراکنش */}
              <div style={{ padding: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: t.text, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tx.desc}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                  <div style={{ fontSize: 11, color: t.text3 }}>{new Date(tx.date).toLocaleDateString()}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: tx.type === "expense" ? t.red : t.green }}>
                    {/* 👇 مشکل اینجا بود که اصلاح شد 👇 */}
                    CHF {Math.abs(Number(tx.amount)).toLocaleString("de-CH", {minimumFractionDigits: 2})}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};