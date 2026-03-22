import { useLanguage } from "../context/LanguageContext";
import { StatCard, Card, Btn } from "../components/UI";

export const DashboardPage = ({ onNavigate, onOpenAddTx, t, transactions = [], ledgers = [], onLedgerClick, userProfile, isMobile }) => {
  const { tr, lang } = useLanguage();
  
  // محاسبات مالی بر اساس دیتای واقعی
  const totalBalance = ledgers.filter(l => l.included).reduce((acc, curr) => acc + (curr.balance || 0), 0);
  const incomeYTD = transactions.filter(tx => tx.type === "income").reduce((acc, curr) => acc + Math.abs(Number(curr.amount || 0)), 0);
  const expenseYTD = transactions.filter(tx => tx.type === "expense").reduce((acc, curr) => acc + Math.abs(Number(curr.amount || 0)), 0);
  const receiptCount = transactions.filter(tx => tx.receiptUrl).length;

  const recentTxs = transactions.slice(0, 6);
  const dateLocale = lang === "en" ? "en-US" : "de-CH";

  return (
    <div>
      {/* 🟦 بنر اصلی هوشمند */}
      <div style={{ 
        background: "linear-gradient(135deg, #1B6EF3, #6C47F5)", 
        padding: isMobile ? 24 : 32, 
        borderRadius: 20, 
        color: "white", 
        marginBottom: 24, 
        display: "flex", 
        flexDirection: isMobile ? "column-reverse" : "row", 
        justifyContent: "space-between", 
        alignItems: isMobile ? "flex-start" : "center", 
        gap: isMobile ? 20 : 0, 
        boxShadow: "0 10px 30px rgba(27,110,243,0.2)" 
      }}>
        <div>
          <div style={{ opacity: 0.8, fontSize: 14, marginBottom: 4 }}>{tr('welcomeBack') || "Welcome back"} 👋</div>
          <h2 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, marginBottom: 8, letterSpacing: -0.5 }}>
            {userProfile?.companyName || "Swiss-Ledgr Workspace"}
          </h2>
          <p style={{ opacity: 0.9, fontSize: 14, marginBottom: 20 }}>{tr('financialOverviewDesc') || "Here is your financial overview."}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={onOpenAddTx} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", padding: isMobile ? "8px 12px" : "" }}>
              + {tr('expense') || "Expense"}
            </Btn>
            <Btn onClick={onOpenAddTx} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", padding: isMobile ? "8px 12px" : "" }}>
              + {tr('income') || "Income"}
            </Btn>
          </div>
        </div>
        
        {userProfile?.logoUrl && (
          <div style={{ width: isMobile ? 60 : 90, height: isMobile ? 60 : 90, borderRadius: "50%", background: "white", padding: 4, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
            <img src={userProfile.logoUrl} alt="Logo" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
          </div>
        )}
      </div>

      {/* 📊 کارت‌های آمار اصلی */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label={tr('totalRevenue')} value={`CHF ${totalBalance.toLocaleString(dateLocale, {minimumFractionDigits: 2})}`} />
        <StatCard label={tr('income')} value={`CHF ${incomeYTD.toLocaleString(dateLocale, {minimumFractionDigits: 2})}`} color={t.green} />
        <StatCard label={tr('expense')} value={`CHF ${expenseYTD.toLocaleString(dateLocale, {minimumFractionDigits: 2})}`} color={t.red} />
        <StatCard label={tr('receipts')} value={receiptCount} />
      </div>

      {/* 📁 بخش لجرها و تراکنش‌های اخیر */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1.2fr", gap: 20 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{tr('ledgers')}</h3>
            <span onClick={() => onNavigate("ledgers")} style={{ fontSize: 13, color: t.brand, cursor: "pointer", fontWeight: 600 }}>{tr('viewAll')} →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            {ledgers.map(l => (
              <Card key={l.id} onClick={() => onLedgerClick(l.id)} style={{ cursor: "pointer", padding: 20, border: `1px solid ${t.border}`, background: t.surface }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                     <div style={{ width: 36, height: 36, background: l.colorSoft || `${t.brand}15`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{l.icon || "📂"}</div>
                     <div>
                        <div style={{ fontWeight: 600, color: t.text, fontSize: 14 }}>{l.name || l.title}</div>
                        <div style={{ fontSize: 11, color: t.text3 }}>{l.type}</div>
                     </div>
                   </div>
                </div>
                <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: -0.5 }}>
                  {l.currency || "CHF"} {Number(l.balance || 0).toLocaleString(dateLocale, {minimumFractionDigits: 2})}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
             <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{tr('recentTransactions')}</h3>
           </div>
           <Card style={{ padding: 0, overflow: "hidden", border: `1px solid ${t.border}`, background: t.surface }}>
             {recentTxs.length === 0 ? (
               <div style={{ padding: 20, textAlign: "center", color: t.text3 }}>No transactions</div>
             ) : (
               recentTxs.map(tx => (
                <div key={tx.id} style={{ padding: "14px 16px", borderBottom: `1px solid ${t.border2}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div style={{ overflow: "hidden", marginRight: 10 }}>
                     <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tx.desc}</div>
                     <div style={{ fontSize: 11, color: t.text3, marginTop: 4 }}>{tx.ledger} · {tx.date}</div>
                   </div>
                   <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: tx.type === "expense" ? t.red : t.green, whiteSpace: "nowrap" }}>
                     {tx.type === "expense" ? "-" : "+"} {Math.abs(Number(tx.amount)).toLocaleString(dateLocale, {minimumFractionDigits: 2})}
                   </div>
                </div>
               ))
             )}
           </Card>
        </div>
      </div>
    </div>
  );
};