// src/pages/Reports.jsx
import { Card, StatCard, Btn } from "../components/UI";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useLanguage } from "../context/LanguageContext"; // 👈 هوک زبان اضافه شد

export const ReportsPage = ({ t, transactions, isMobile }) => {
  const { tr, lang } = useLanguage();
  const dateLocale = lang === "en" ? "en-US" : "de-CH";

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // ماه‌ها داینامیک شدن
  const months = [tr("jan"), tr("feb"), tr("mar"), tr("apr"), tr("may"), tr("jun"), tr("jul"), tr("aug"), tr("sep"), tr("oct"), tr("nov"), tr("dec")];
  
  const monthlyData = months.map(m => ({ name: m, Income: 0, Expense: 0 }));

  let totalIncomeYTD = 0;
  let totalExpenseYTD = 0;
  const categoryTotals = {};

  transactions.forEach(tx => {
    const date = new Date(tx.date);
    if (date.getFullYear() === currentYear) {
      const m = date.getMonth();
      if (tx.type === "income") {
        monthlyData[m].Income += Number(tx.amount);
        totalIncomeYTD += Number(tx.amount);
      } else if (tx.type === "expense") {
        const amt = Math.abs(Number(tx.amount));
        monthlyData[m].Expense += amt;
        totalExpenseYTD += amt;

        if (!categoryTotals[tx.category]) categoryTotals[tx.category] = 0;
        categoryTotals[tx.category] += amt;
      }
    }
  });

  const colors = [t.brand, t.orange, t.purple, t.blue, t.red, t.green];
  const pieData = Object.keys(categoryTotals)
    .map((name) => ({ name, value: categoryTotals[name] }))
    .sort((a, b) => b.value - a.value);

  const netYTD = totalIncomeYTD - totalExpenseYTD;
  const avgIncome = totalIncomeYTD / (currentMonth + 1);
  const avgExpense = totalExpenseYTD / (currentMonth + 1);
  const savingsRate = totalIncomeYTD > 0 ? (netYTD / totalIncomeYTD) * 100 : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, padding: "12px 16px", borderRadius: 12, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
          <p style={{ fontWeight: 700, marginBottom: 8, color: t.text }}>{label}</p>
          {payload.map((entry, index) => (
            <div key={index} style={{ color: entry.color, fontSize: 13, fontWeight: 600, display: "flex", gap: 10, justifyContent: "space-between" }}>
              <span>{entry.name}:</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>CHF {entry.value.toLocaleString(dateLocale, {minimumFractionDigits: 2})}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 0, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: t.text }}>{tr("reportsTitle")}</h2>
          <p style={{ color: t.text3, fontSize: 13, marginTop: 2 }}>{tr("financialOverviewFor")} {currentYear}</p>
        </div>
        <Btn variant="ghost" size="sm" style={{ width: isMobile ? "100%" : "auto" }}>📥 {tr("exportPdf")}</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        <StatCard label={tr("netYtd")} value={`CHF ${netYTD.toLocaleString(dateLocale, {minimumFractionDigits: 2})}`} color={netYTD >= 0 ? t.green : t.red} />
        <StatCard label={tr("avgMonthlyIncome")} value={`CHF ${avgIncome.toLocaleString(dateLocale, {minimumFractionDigits: 2})}`} color={t.brand} />
        <StatCard label={tr("avgMonthlyExpenses")} value={`CHF ${avgExpense.toLocaleString(dateLocale, {minimumFractionDigits: 2})}`} color={t.red} />
        <StatCard label={tr("savingsRate")} value={`${savingsRate.toFixed(1)}%`} color={t.purple} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1.2fr", gap: 20 }}>
        
        <Card style={{ background: t.surface, border: `1px solid ${t.border}`, padding: isMobile ? 16 : 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 20 }}>{tr("cashFlowOverview")}</div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={t.border} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: t.text3 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: t.text3 }} tickFormatter={(value) => value > 0 ? `${value / 1000}k` : 0} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: t.border, opacity: 0.4 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 10, color: t.text2 }} />
                {/* اسم میله‌ها داینامیک شد تا در راهنما درست نشان داده شود */}
                <Bar dataKey="Income" name={tr("income")} fill={t.green} radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="Expense" name={tr("expense")} fill={t.red} radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card style={{ background: t.surface, border: `1px solid ${t.border}`, padding: isMobile ? 16 : 24, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 10 }}>{tr("expensesByCategory")}</div>
          {pieData.length === 0 ? (
             <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: t.text3, fontSize: 13 }}>{tr("noExpensesYet")}</div>
          ) : (
            <div style={{ flex: 1, width: "100%", height: 250, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={isMobile ? 75 : 85} paddingAngle={5} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: t.text3, fontWeight: 600 }}>{tr("totalCaps")}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{totalExpenseYTD >= 1000 ? `${(totalExpenseYTD/1000).toFixed(1)}k` : totalExpenseYTD.toLocaleString(dateLocale, {minimumFractionDigits: 0})}</div>
              </div>
            </div>
          )}
          
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {pieData.slice(0, 4).map((entry, index) => (
              <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: t.text2 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors[index % colors.length] }} />
                {entry.name}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};