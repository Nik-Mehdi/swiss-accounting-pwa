// src/pages/Export.jsx
import { useState } from "react";
import { Card, Btn, FormGroup, Select, Input } from "../components/UI";

export const ExportPage = ({ t, transactions, ledgers, userProfile }) => {
  const [ledgerId, setLedgerId] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // فیلتر کردن تراکنش‌ها بر اساس انتخاب کاربر
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

  // محاسبه مجموع
  const totalIncome = filteredTxs.filter(tx => tx.type === "income").reduce((acc, curr) => acc + Math.abs(Number(curr.amount)), 0);
  const totalExpense = filteredTxs.filter(tx => tx.type === "expense").reduce((acc, curr) => acc + Math.abs(Number(curr.amount)), 0);

  // 📥 موتور خروجی اکسل (CSV)
  const downloadCSV = () => {
    if (filteredTxs.length === 0) return alert("No transactions to export in this date range!");
    
    const headers = ["Date", "Type", "Ledger", "Category", "Description", "Amount", "Currency"];
    const rows = filteredTxs.map(tx => [
      tx.date, 
      tx.type.toUpperCase(), 
      tx.ledger, 
      tx.category || "-", 
      `"${tx.desc.replace(/"/g, '""')}"`, // جلوگیری از بهم ریختن اکسل اگر کاما داشت
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
    if (filteredTxs.length === 0) return alert("No transactions to print!");

    const selectedLedgerName = ledgerId === "all" ? "All Accounts" : ledgers.find(l => l.id === ledgerId)?.name;
    const currency = ledgerId !== "all" ? (ledgers.find(l => l.id === ledgerId)?.currency || "CHF") : "CHF";

    const printWindow = window.open('', '', 'width=900,height=800');
    
    // طراحی سربرگ رسمی و استایل‌های پرینت
    const htmlContent = `
      <html>
        <head>
          <title>Financial Report - ${userProfile?.companyName || 'Company'}</title>
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
              <h1>${userProfile?.companyName || "Your Workspace"}</h1>
              ${userProfile?.address ? `<p><b>Address:</b> ${userProfile.address}</p>` : ''}
              ${userProfile?.phone ? `<p><b>Phone:</b> ${userProfile.phone}</p>` : ''}
              ${userProfile?.email ? `<p><b>Email:</b> ${userProfile.email}</p>` : ''}
            </div>
            ${userProfile?.logoUrl ? `<img src="${userProfile.logoUrl}" class="logo" />` : ''}
          </div>

          <div class="report-title">
            <h2>Official Financial Statement</h2>
            <p>Ledger: <b>${selectedLedgerName}</b></p>
            <p>Period: ${startDate || 'Beginning'} to ${endDate || 'Present'}</p>
          </div>

          <div class="summary">
            <span style="color: #059669">Total Income: ${currency} ${totalIncome.toLocaleString("de-CH", {minimumFractionDigits: 2})}</span>
            <span style="color: #dc2626">Total Expenses: ${currency} ${totalExpense.toLocaleString("de-CH", {minimumFractionDigits: 2})}</span>
            <span style="color: #1B6EF3">Net Change: ${currency} ${(totalIncome - totalExpense).toLocaleString("de-CH", {minimumFractionDigits: 2})}</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Ledger</th>
                <th class="amount">Amount (${currency})</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTxs.map(tx => `
                <tr>
                  <td>${new Date(tx.date).toLocaleDateString()}</td>
                  <td><b>${tx.desc}</b></td>
                  <td>${tx.category || 'Transfer'}</td>
                  <td>${tx.ledger}</td>
                  <td class="amount ${tx.type === 'expense' ? 'expense' : 'income'}">
                    ${tx.type === 'expense' ? '-' : '+'}${Math.abs(Number(tx.amount)).toLocaleString("de-CH", {minimumFractionDigits: 2})}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>Generated automatically by Ledgr Workspace on ${new Date().toLocaleString()}</p>
            <p>This is a computer generated document and valid for accounting purposes.</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // کمی تاخیر برای لود شدن کامل عکس‌ها قبل از پرینت
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, color: t.text, marginBottom: 8 }}>Export & Reports</h2>
      <p style={{ color: t.text3, fontSize: 14, marginBottom: 24 }}>Generate official financial statements and CSV files for your accountant.</p>
      
      <Card style={{ background: t.surface, border: `1px solid ${t.border}`, padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 16 }}>Report Filters</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          <FormGroup label="Select Ledger">
            <Select value={ledgerId} onChange={e=>setLedgerId(e.target.value)} style={{ background: t.bg, color: t.text, border: `1px solid ${t.border}` }}>
              <option value="all">All Ledgers (Consolidated)</option>
              {ledgers.map(l => <option key={l.id} value={l.id}>{l.name} ({l.currency})</option>)}
            </Select>
          </FormGroup>

          <FormGroup label="Start Date">
            <Input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} style={{ background: t.bg, color: t.text, border: `1px solid ${t.border}` }} />
          </FormGroup>

          <FormGroup label="End Date">
            <Input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} style={{ background: t.bg, color: t.text, border: `1px solid ${t.border}` }} />
          </FormGroup>
        </div>

        <div style={{ padding: 20, background: t.bg, borderRadius: 12, border: `1px solid ${t.border}`, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: t.text3, marginBottom: 8 }}>PREVIEW SUMMARY</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: t.text }}>{filteredTxs.length}</div>
              <div style={{ fontSize: 12, color: t.text2 }}>Transactions Found</div>
            </div>
            <div style={{ textAlign: "right" }}>
               <div style={{ fontSize: 14, color: t.green }}>+ Income: {totalIncome.toLocaleString("de-CH", {minimumFractionDigits: 2})}</div>
               <div style={{ fontSize: 14, color: t.red }}>- Expenses: {totalExpense.toLocaleString("de-CH", {minimumFractionDigits: 2})}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <Btn onClick={downloadCSV} style={{ flex: 1, background: t.surface, color: t.text, border: `1px solid ${t.border}` }}>
            📊 Download Excel (CSV)
          </Btn>
          <Btn onClick={handlePrint} style={{ flex: 1 }}>
            🖨️ Print / Save as Official PDF
          </Btn>
        </div>
      </Card>
    </div>
  );
};