// src/pages/LedgerDetail.jsx
import { useState } from "react";
import { Icons } from "../components/Icons";
import { Btn, Pill, StatCard, Card } from "../components/UI";
import { TxItem } from "../components/TxItem";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from "../context/LanguageContext"; // 👈 اضافه شدن هوک زبان

export const LedgerDetailPage = ({ onOpenAddTx, t, transactions, activeLedger, onDeleteTx, onEditLedger, onDeleteLedger, isMobile }) => {
  const { tr, lang } = useLanguage();
  const dateLocale = lang === "en" ? "en-US" : "de-CH";
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!activeLedger) return <div style={{ padding: 40, textAlign: "center", color: t.text }}>{tr("selectLedgerFirst")}</div>;

  const ledgerTxs = transactions.filter((tx) => tx.ledger === activeLedger.name || (tx.type === "transfer" && tx.toLedger === activeLedger.name));

  const income = ledgerTxs.filter(tx => tx.type === "income" || (tx.type === "transfer" && tx.toLedger === activeLedger.name)).reduce((acc, curr) => acc + Math.abs(Number(curr.amount)), 0);
  const expense = ledgerTxs.filter(tx => tx.type === "expense" || (tx.type === "transfer" && tx.ledger === activeLedger.name)).reduce((acc, curr) => acc + Math.abs(Number(curr.amount)), 0);

  const categoryTotals = {};
  ledgerTxs.forEach(tx => {
    if (tx.type === "expense" || (tx.type === "transfer" && tx.ledger === activeLedger.name)) {
      const amt = Math.abs(Number(tx.amount));
      const cat = tx.type === "transfer" ? tr("transferOut") : tx.category;
      if (!categoryTotals[cat]) categoryTotals[cat] = 0;
      categoryTotals[cat] += amt;
    }
  });

  const colors = [t.brand, t.orange, t.purple, t.blue, t.red, t.green];
  const categories = Object.keys(categoryTotals)
    .map((name, i) => ({
      name,
      amount: categoryTotals[name],
      pct: expense > 0 ? (categoryTotals[name] / expense) * 100 : 0,
      color: colors[i % colors.length]
    }))
    .sort((a, b) => b.amount - a.amount);

  const pieData = categories.map(c => ({ name: c.name, value: c.amount, color: c.color }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, padding: "10px 14px", borderRadius: 10, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
          <div style={{ color: payload[0].payload.color, fontSize: 13, fontWeight: 600, display: "flex", gap: 10, justifyContent: "space-between" }}>
            <span>{payload[0].name}:</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>CHF {payload[0].value.toLocaleString(dateLocale, {minimumFractionDigits: 2})}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: isMobile ? 16 : 24, marginBottom: 20, display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: 20 }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%" }}>
          <div style={{ width: 56, height: 56, flexShrink: 0, background: activeLedger.colorSoft, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{activeLedger.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, letterSpacing: -0.5, color: t.text, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{activeLedger.name}</h2>
              <Pill color={activeLedger.included ? "green" : "gray"}>{activeLedger.included ? (isMobile ? tr("inTotal") : tr("inTotalDashboard")) : tr("hidden")}</Pill>
            </div>
            <div style={{ color: t.text3, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{activeLedger.type} · {activeLedger.currency} · {ledgerTxs.length} {tr("txs")}</div>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: 8, width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "flex-start" : "flex-end" }}>
          <Btn variant="ghost" size="sm" onClick={() => onEditLedger(activeLedger)}>✏️ {tr("edit")}</Btn>
          <Btn variant="ghost" size="sm" onClick={() => onDeleteLedger(activeLedger.id)} style={{ color: t.red }}>🗑️ {tr("delete")}</Btn>
        </div>

        <div style={{ width: isMobile ? "100%" : "auto", textAlign: isMobile ? "left" : "right", paddingLeft: isMobile ? 0 : 20, borderLeft: isMobile ? "none" : `1px solid ${t.border}`, paddingTop: isMobile ? 16 : 0, borderTop: isMobile ? `1px solid ${t.border}` : "none" }}>
          <div style={{ fontSize: 12, color: t.text3, marginBottom: 4 }}>{tr("currentBalance")}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 24 : 28, fontWeight: 700, color: t.brand, letterSpacing: -1 }}>{activeLedger.currency} {activeLedger.balance.toLocaleString(dateLocale, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>
      
      <div style={{ display: "flex", gap: 24, borderBottom: `1px solid ${t.border}`, marginBottom: 20, paddingBottom: 0 }}>
        {["overview", "reports"].map(tab => (
          <div 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: "0 4px 12px", 
              cursor: "pointer", 
              fontSize: 14, 
              fontWeight: activeTab === tab ? 600 : 500, 
              color: activeTab === tab ? t.brand : t.text3,
              borderBottom: activeTab === tab ? `2px solid ${t.brand}` : "2px solid transparent",
              textTransform: "capitalize",
              transition: "all 0.2s"
            }}
          >
            {tab === "overview" ? `📋 ${tr("overviewTab")}` : `📊 ${tr("reportsTab")}`}
          </div>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
            <StatCard label={tr("totalIn")} value={`CHF ${income.toLocaleString(dateLocale, { minimumFractionDigits: 2 })}`} color={t.green} />
            <StatCard label={tr("totalOut")} value={`CHF ${expense.toLocaleString(dateLocale, { minimumFractionDigits: 2 })}`} color={t.red} />
            <StatCard label={tr("openingBalance")} value={`CHF ${(activeLedger.openingBalance || 0).toLocaleString(dateLocale, { minimumFractionDigits: 2 })}`} />
          </div>

          <Card style={{ padding: "4px 20px", background: t.surface, border: `1px solid ${t.border}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 8px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text2 }}>{tr("transactions")}</div>
              <Btn onClick={onOpenAddTx} size="sm"><Icons.Plus size={14} /> {tr("new")}</Btn>
            </div>
            {ledgerTxs.length === 0 ? (
              <div style={{ padding: 20, textAlign: "center", color: t.text3 }}>{tr("noTransactions")}</div>
            ) : (
              ledgerTxs.map((tx) => <TxItem key={tx.id} tx={tx} onDelete={onDeleteTx} />)
            )}
          </Card>
        </>
      )}

      {activeTab === "reports" && (
        <Card style={{ background: t.surface, border: `1px solid ${t.border}`, padding: isMobile ? 16 : 30 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 30 }}>{tr("expenseBreakdown")} {activeLedger.name}</div>
          
          {categories.length === 0 ? (
             <div style={{ padding: 40, textAlign: "center", color: t.text3, fontSize: 13 }}>{tr("noExpenses")}</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : 40, alignItems: "center" }}>
              
              <div style={{ width: "100%", height: 260, position: "relative" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={isMobile ? 65 : 75} outerRadius={isMobile ? 85 : 100} paddingAngle={4} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: t.text3, fontWeight: 600 }}>{tr("expensesCaps")}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>{expense >= 1000 ? `${(expense/1000).toFixed(1)}k` : expense.toLocaleString(dateLocale, {minimumFractionDigits: 2})}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {categories.map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 12, borderBottom: `1px solid ${t.border2}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 4, background: c.color }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{c.name}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: t.text, marginRight: 12 }}>
                        CHF {c.amount.toLocaleString(dateLocale, {minimumFractionDigits: 2})}
                      </span>
                      <span style={{ fontSize: 13, color: t.text3, fontWeight: 600 }}>{c.pct.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </Card>
      )}
    </div>
  );
};