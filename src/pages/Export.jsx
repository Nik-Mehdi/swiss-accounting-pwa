// src/pages/Export.jsx
import { useState } from "react";
import { Card, Btn, FormGroup, Select, Input } from "../components/UI";
import { useLanguage } from "../context/LanguageContext"; // 👈 هوک زبان اضافه شد

export const ExportPage = ({ t, transactions, ledgers, userProfile }) => {
  const { tr, lang } = useLanguage();
  const dateLocale = lang === "en" ? "en-US" : "de-CH";

  const [ledgerId, setLedgerId] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTxs = transactions.filter(tx => {
    let matchLedger = true;
    let matchDate = true;

    if (ledgerId !== "all") {
      const selectedLedgerName = ledgers.find(l => l.id === ledgerId)?.name;
      matchLedger = tx.ledger === selectedLedgerName || tx.toLedger === selectedLedgerName;
    }

    if (startDate) matchDate = matchDate && new Date(tx.date) >= new Date(startDate);
    if (endDate) matchDate = matchDate && new Date(tx.date) <= new Date(endDate);

    return matchLedger && matchDate;
  });

  const totalIncome = filteredTxs.filter(tx => tx.type === "income").reduce((acc, curr) => acc + Math.abs(Number(curr.amount)), 0);
  const totalExpense = filteredTxs.filter(tx => tx.type === "expense").reduce((acc, curr) => acc + Math.abs(Number(curr.amount)), 0);

  // 📥 موتور خروجی اکسل (CSV)
  const downloadCSV = () => {
    if (filteredTxs.length === 0) return alert(tr("noTxsToExport"));
    
    const headers = [tr("date"), tr("type"), tr("ledgerColumn"), tr("category"), tr("description"), tr("amount"), tr("currency")];
    const rows = filteredTxs.map(tx => [
      new Date(tx.date).toLocaleDateString(dateLocale), 
      tx.type.toUpperCase(), 
      tx.ledger, 
      tx.category || "-", 
      `"${tx.desc.replace(/"/g, '""')}"`, 
      Math.abs(Number(tx.amount)).toFixed(2),
      ledgers.find(l => l.name === tx.ledger)?.currency || "CHF"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Ledger_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🖨️ موتور چاپ گزارش رسمی (Official PDF/Print)
  const handlePrint = () => {
    if (filteredTxs.length === 0) return alert(tr("noTxsToPrint"));

    const selectedLedgerName = ledgerId === "all" ? tr("allAccountsConsolidated") : ledgers.find(l => l.id === ledgerId)?.name;
    const currency = ledgerId !== "all" ? (ledgers.find(l => l.id === ledgerId)?.currency || "CHF") : "CHF";

    const printWindow = window.open('', '', 'width=900,height=800');
    
    const htmlContent = `
      <html>
        <head>
          <title>${tr("financialReport")} - ${userProfile?.companyName || tr("yourWorkspace")}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; padding: 40px; margin: 0; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1B6EF3; padding-bottom: 20px; margin-bottom: 30px; }
            .company-info h1 { margin: 0 0 5px 0; font-size: 28px; color: #1B6EF3; }
            .company-info p { margin: 2px 0; font-size: 13px; color: #555; }
            .logo { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; }
            .report-title { text-align: center; margin-bottom: 30px; }
            .report-title h2 { margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; }
            .report-title p { margin: 5px 0 0 0; color: #666; font-size: 14px; }
            .summary { display: flex; justify-content: space-between; background: #f8fafc; padding: 15px 20px; border-radius: 8px; margin-bottom: 30px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px; }
            th { background: #f1f5f9; padding: 12px 10px; text-align: left; border-bottom: 2px solid #cbd5e1; color: #334155; }
            td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
            .amount { text-align: right; font-family: monospace; font-size: 14px; }
            .income { color: #059669; }
            .expense { color: #dc2626; }
            .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-info">
              <h1>${userProfile?.companyName || tr("yourWorkspace")}</h1>
              ${userProfile?.address ? `<p><b>${tr("address")}:</b> ${userProfile.address}</p>` : ''}
              ${userProfile?.phone ? `<p><b>${tr("phone")}:</b> ${userProfile.phone}</p>` : ''}
              ${userProfile?.email ? `<p><b>${tr("email")}:</b> ${userProfile.email}</p>` : ''}
            </div>
            ${userProfile?.logoUrl ? `<img src="${userProfile.logoUrl}" class="logo" />` : ''}
          </div>

          <div class="report-title">
            <h2>${tr("officialFinancialStatement")}</h2>
            <p>${tr("ledgerColumn")}: <b>${selectedLedgerName}</b></p>
            <p>${tr("period")}: ${startDate ? new Date(startDate).toLocaleDateString(dateLocale) : tr("beginning")} ${tr("to")} ${endDate ? new Date(endDate).toLocaleDateString(dateLocale) : tr("present")}</p>
          </div>

          <div class="summary">
            <span style="color: #059669">${tr("totalIncomeExport")}: ${currency} ${totalIncome.toLocaleString(dateLocale, {minimumFractionDigits: 2})}</span>
            <span style="color: #dc2626">${tr("totalExpenseExport")}: ${currency} ${totalExpense.toLocaleString(dateLocale, {minimumFractionDigits: 2})}</span>
            <span style="color: #1B6EF3">${tr("netChange")}: ${currency} ${(totalIncome - totalExpense).toLocaleString(dateLocale, {minimumFractionDigits: 2})}</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>${tr("date")}</th>
                <th>${tr("description")}</th>
                <th>${tr("category")}</th>
                <th>${tr("ledgerColumn")}</th>
                <th class="amount">${tr("amount")} (${currency})</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTxs.map(tx => `
                <tr>
                  <td>${new Date(tx.date).toLocaleDateString(dateLocale)}</td>
                  <td><b>${tx.desc}</b></td>
                  <td>${tx.category || tr("transfer")}</td>
                  <td>${tx.ledger}</td>
                  <td class="amount ${tx.type === 'expense' ? 'expense' : 'income'}">
                    ${tx.type === 'expense' ? '-' : '+'}${Math.abs(Number(tx.amount)).toLocaleString(dateLocale, {minimumFractionDigits: 2})}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>${tr("generatedBy")} ${new Date().toLocaleString(dateLocale)}</p>
            <p>${tr("validForAccounting")}</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, color: t.text, marginBottom: 8 }}>{tr("exportReports")}</h2>
      <p style={{ color: t.text3, fontSize: 14, marginBottom: 24 }}>{tr("generateOfficialDesc")}</p>
      
      <Card style={{ background: t.surface, border: `1px solid ${t.border}`, padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 16 }}>{tr("reportFilters")}</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          <FormGroup label={tr("selectLedger")}>
            <Select value={ledgerId} onChange={e=>setLedgerId(e.target.value)} style={{ background: t.bg, color: t.text, border: `1px solid ${t.border}` }}>
              <option value="all">{tr("allLedgersConsolidated")}</option>
              {ledgers.map(l => <option key={l.id} value={l.id}>{l.name} ({l.currency})</option>)}
            </Select>
          </FormGroup>

          <FormGroup label={tr("startDate")}>
            <Input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} style={{ background: t.bg, color: t.text, border: `1px solid ${t.border}` }} />
          </FormGroup>

          <FormGroup label={tr("endDate")}>
            <Input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} style={{ background: t.bg, color: t.text, border: `1px solid ${t.border}` }} />
          </FormGroup>
        </div>

        <div style={{ padding: 20, background: t.bg, borderRadius: 12, border: `1px solid ${t.border}`, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: t.text3, marginBottom: 8 }}>{tr("previewSummary")}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: t.text }}>{filteredTxs.length}</div>
              <div style={{ fontSize: 12, color: t.text2 }}>{tr("transactionsFound")}</div>
            </div>
            <div style={{ textAlign: "right" }}>
               <div style={{ fontSize: 14, color: t.green }}>+ {tr("income")}: {totalIncome.toLocaleString(dateLocale, {minimumFractionDigits: 2})}</div>
               <div style={{ fontSize: 14, color: t.red }}>- {tr("expenses")}: {totalExpense.toLocaleString(dateLocale, {minimumFractionDigits: 2})}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <Btn onClick={downloadCSV} style={{ flex: 1, background: t.surface, color: t.text, border: `1px solid ${t.border}` }}>
            📊 {tr("downloadExcel")}
          </Btn>
          <Btn onClick={handlePrint} style={{ flex: 1 }}>
            🖨️ {tr("printOfficialPdf")}
          </Btn>
        </div>
      </Card>
    </div>
  );
};