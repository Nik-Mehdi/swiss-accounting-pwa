<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ledgr — Smart Financial Workspace</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #F4F5F7;
  --surface: #FFFFFF;
  --surface2: #F9FAFB;
  --border: #E8EAED;
  --border2: #D1D5DB;
  --text: #111827;
  --text2: #4B5563;
  --text3: #9CA3AF;
  --brand: #1B6EF3;
  --brand-soft: #EEF4FF;
  --brand-dark: #1254C4;
  --green: #059669;
  --green-soft: #ECFDF5;
  --red: #DC2626;
  --red-soft: #FEF2F2;
  --orange: #D97706;
  --orange-soft: #FFFBEB;
  --blue-transfer: #0EA5E9;
  --blue-transfer-soft: #F0F9FF;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow: 0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05);
  --radius: 16px;
  --radius-sm: 10px;
  --radius-xs: 6px;
  --sidebar-w: 240px;
  --header-h: 64px;
  --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
}
[data-theme="dark"] {
  --bg: #0D1117;
  --surface: #161B22;
  --surface2: #1C2128;
  --border: #30363D;
  --border2: #484F58;
  --text: #E6EDF3;
  --text2: #8B949E;
  --text3: #484F58;
  --brand-soft: #1B3A6E;
  --green-soft: #0A2E1F;
  --red-soft: #2C1010;
  --orange-soft: #2C1E08;
  --blue-transfer-soft: #0A2035;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow: 0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.5);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Sora', sans-serif; background: var(--bg); color: var(--text); font-size: 14px; line-height: 1.5; overflow-x: hidden; }

/* ── LAYOUT ── */
.app { display: flex; height: 100vh; overflow: hidden; }
.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; transition: var(--transition); overflow-y: auto; }
.main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.header { height: var(--header-h); background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 24px; gap: 16px; flex-shrink: 0; }
.content { flex: 1; overflow-y: auto; padding: 24px; }

/* ── SIDEBAR ── */
.sidebar-brand { padding: 20px 20px 16px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border); }
.sidebar-logo { width: 36px; height: 36px; background: linear-gradient(135deg, var(--brand), #6C47F5); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px; }
.sidebar-name { font-weight: 700; font-size: 18px; letter-spacing: -0.5px; color: var(--text); }
.sidebar-nav { flex: 1; padding: 12px 12px; display: flex; flex-direction: column; gap: 2px; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text2); font-weight: 500; font-size: 13.5px; transition: var(--transition); }
.nav-item:hover { background: var(--bg); color: var(--text); }
.nav-item.active { background: var(--brand-soft); color: var(--brand); }
.nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
.nav-label { }
.nav-badge { margin-left: auto; background: var(--red); color: white; font-size: 10px; padding: 1px 6px; border-radius: 20px; font-weight: 600; }
.sidebar-section { padding: 6px 20px 4px; font-size: 10px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; color: var(--text3); margin-top: 8px; }
.sidebar-footer { padding: 16px; border-top: 1px solid var(--border); }
.user-mini { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: var(--radius-sm); cursor: pointer; }
.user-mini:hover { background: var(--bg); }
.avatar { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #6C47F5, #1B6EF3); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 13px; flex-shrink: 0; }
.avatar.business { background: linear-gradient(135deg, #059669, #0EA5E9); }
.user-info { overflow: hidden; }
.user-name { font-weight: 600; font-size: 13px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-plan { font-size: 11px; color: var(--text3); }

/* ── HEADER ── */
.header-back { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text2); background: var(--surface); transition: var(--transition); }
.header-back:hover { background: var(--bg); }
.header-title { font-weight: 700; font-size: 16px; letter-spacing: -0.3px; }
.header-sub { font-size: 12px; color: var(--text3); font-weight: 400; }
.header-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; }
.header-user { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-radius: var(--radius-sm); cursor: pointer; border: 1px solid var(--border); background: var(--surface); transition: var(--transition); }
.header-user:hover { background: var(--bg); }
.workspace-badge { font-size: 10px; font-weight: 600; background: var(--brand-soft); color: var(--brand); padding: 2px 8px; border-radius: 20px; }

/* ── BUTTONS ── */
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 18px; border-radius: var(--radius-sm); font-size: 13.5px; font-weight: 600; cursor: pointer; border: none; transition: var(--transition); font-family: inherit; }
.btn-primary { background: var(--brand); color: white; }
.btn-primary:hover { background: var(--brand-dark); }
.btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border); }
.btn-ghost:hover { background: var(--bg); color: var(--text); }
.btn-sm { padding: 6px 14px; font-size: 12.5px; }
.btn-icon { padding: 8px; width: 36px; height: 36px; justify-content: center; border-radius: var(--radius-sm); }
.icon-btn { width: 36px; height: 36px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: var(--surface); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text2); transition: var(--transition); }
.icon-btn:hover { background: var(--bg); color: var(--text); }

/* ── CARDS ── */
.card { background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border); padding: 20px; box-shadow: var(--shadow-sm); }
.card-lg { padding: 24px; }
.section-title { font-size: 13px; font-weight: 600; color: var(--text2); margin-bottom: 12px; letter-spacing: 0.2px; }

/* ── GRID ── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }

/* ── STAT CARDS ── */
.stat-card { background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border); padding: 20px; box-shadow: var(--shadow-sm); }
.stat-label { font-size: 12px; font-weight: 500; color: var(--text3); margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.stat-value { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; font-family: 'JetBrains Mono', monospace; }
.stat-value.green { color: var(--green); }
.stat-value.red { color: var(--red); }
.stat-value.brand { color: var(--brand); }
.stat-change { font-size: 11px; margin-top: 6px; color: var(--text3); }

/* ── PAGES ── */
.page { display: none; }
.page.active { display: block; animation: fadeIn 0.15s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

/* ── LEDGER CARDS ── */
.ledger-card { background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border); padding: 20px; cursor: pointer; transition: var(--transition); position: relative; overflow: hidden; }
.ledger-card:hover { box-shadow: var(--shadow); border-color: var(--brand); }
.ledger-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--ledger-color, var(--brand)); }
.ledger-card.green { --ledger-color: var(--green); }
.ledger-card.purple { --ledger-color: #7C3AED; }
.ledger-card.orange { --ledger-color: var(--orange); }
.ledger-card.teal { --ledger-color: #0D9488; }
.ledger-card.blue { --ledger-color: var(--blue-transfer); }
.ledger-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; font-size: 18px; }
.ledger-name { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
.ledger-type { font-size: 11.5px; color: var(--text3); margin-bottom: 16px; }
.ledger-balance { font-family: 'JetBrains Mono', monospace; font-size: 20px; font-weight: 600; letter-spacing: -0.5px; }
.ledger-meta { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
.pill { font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 20px; }
.pill-green { background: var(--green-soft); color: var(--green); }
.pill-gray { background: var(--bg); color: var(--text3); }
.pill-brand { background: var(--brand-soft); color: var(--brand); }
.pill-orange { background: var(--orange-soft); color: var(--orange); }

/* ── TRANSACTIONS ── */
.tx-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.tx-item:last-child { border-bottom: none; }
.tx-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
.tx-icon.income { background: var(--green-soft); }
.tx-icon.expense { background: var(--red-soft); }
.tx-icon.transfer { background: var(--blue-transfer-soft); }
.tx-info { flex: 1; min-width: 0; }
.tx-desc { font-weight: 600; font-size: 13.5px; }
.tx-meta { font-size: 11.5px; color: var(--text3); margin-top: 2px; }
.tx-amount { font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 14px; text-align: right; }
.tx-amount.income { color: var(--green); }
.tx-amount.expense { color: var(--red); }
.tx-amount.transfer { color: var(--blue-transfer); }
.tx-receipt { width: 20px; height: 20px; border-radius: 4px; background: var(--brand-soft); display: flex; align-items: center; justify-content: center; }

/* ── FORM ── */
.form-group { margin-bottom: 18px; }
.form-label { font-size: 12.5px; font-weight: 600; color: var(--text2); margin-bottom: 6px; display: block; }
.form-input { width: 100%; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 14px; font-family: inherit; background: var(--surface); color: var(--text); transition: var(--transition); outline: none; }
.form-input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(27,110,243,0.1); }
.form-input::placeholder { color: var(--text3); }
.form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239CA3AF' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
.amount-input-large { font-size: 36px; font-family: 'JetBrains Mono', monospace; font-weight: 700; border: none; border-bottom: 2px solid var(--border); border-radius: 0; padding: 8px 0; letter-spacing: -1px; width: 100%; }
.amount-input-large:focus { border-color: var(--brand); box-shadow: none; }
.type-toggle { display: flex; gap: 6px; margin-bottom: 20px; }
.type-btn { flex: 1; padding: 10px; border-radius: var(--radius-sm); border: 1.5px solid var(--border); background: var(--surface); font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: var(--transition); text-align: center; }
.type-btn.income.active { border-color: var(--green); background: var(--green-soft); color: var(--green); }
.type-btn.expense.active { border-color: var(--red); background: var(--red-soft); color: var(--red); }
.type-btn.transfer.active { border-color: var(--blue-transfer); background: var(--blue-transfer-soft); color: var(--blue-transfer); }

/* ── TABS ── */
.tabs { display: flex; gap: 4px; background: var(--bg); padding: 4px; border-radius: var(--radius-sm); margin-bottom: 20px; }
.tab { flex: 1; padding: 8px 12px; border-radius: 8px; text-align: center; font-size: 12.5px; font-weight: 600; cursor: pointer; color: var(--text3); transition: var(--transition); }
.tab.active { background: var(--surface); color: var(--text); box-shadow: var(--shadow-sm); }

/* ── SETTINGS ── */
.settings-nav { display: flex; flex-direction: column; gap: 2px; }
.settings-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text2); font-size: 13.5px; font-weight: 500; transition: var(--transition); }
.settings-nav-item:hover { background: var(--bg); color: var(--text); }
.settings-nav-item.active { background: var(--brand-soft); color: var(--brand); }
.settings-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border); }
.settings-row:last-child { border-bottom: none; }
.settings-row-info { flex: 1; }
.settings-row-label { font-weight: 600; font-size: 13.5px; }
.settings-row-desc { font-size: 12px; color: var(--text3); margin-top: 2px; }
.toggle { width: 40px; height: 22px; background: var(--border2); border-radius: 20px; position: relative; cursor: pointer; transition: var(--transition); flex-shrink: 0; }
.toggle.on { background: var(--brand); }
.toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: var(--transition); box-shadow: var(--shadow-sm); }
.toggle.on::after { left: 21px; }

/* ── ONBOARDING ── */
.onboarding-wrap { min-height: 100vh; background: var(--bg); display: flex; align-items: center; justify-content: center; padding: 24px; }
.onboarding-card { background: var(--surface); border-radius: 24px; border: 1px solid var(--border); padding: 40px; width: 100%; max-width: 480px; box-shadow: var(--shadow-lg); }
.step-dots { display: flex; gap: 6px; margin-bottom: 32px; }
.step-dot { width: 6px; height: 6px; border-radius: 3px; background: var(--border2); transition: var(--transition); }
.step-dot.active { width: 20px; background: var(--brand); }
.step-dot.done { background: var(--green); }
.onboarding-icon { width: 56px; height: 56px; border-radius: 16px; background: var(--brand-soft); display: flex; align-items: center; justify-content: center; font-size: 26px; margin-bottom: 20px; }
.onboarding-title { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 8px; }
.onboarding-sub { color: var(--text2); margin-bottom: 28px; line-height: 1.6; font-size: 14px; }
.user-type-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 24px; }
.user-type-card { border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 16px 10px; text-align: center; cursor: pointer; transition: var(--transition); }
.user-type-card:hover { border-color: var(--brand); }
.user-type-card.selected { border-color: var(--brand); background: var(--brand-soft); }
.user-type-card .icon { font-size: 22px; margin-bottom: 8px; }
.user-type-card .label { font-size: 12px; font-weight: 600; }

/* ── DASHBOARD ── */
.welcome-bar { background: linear-gradient(135deg, var(--brand), #6C47F5); border-radius: var(--radius); padding: 24px; color: white; margin-bottom: 20px; position: relative; overflow: hidden; }
.welcome-bar::after { content: ''; position: absolute; right: -20px; top: -20px; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.08); }
.welcome-bar::before { content: ''; position: absolute; right: 40px; bottom: -30px; width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.06); }
.welcome-greeting { font-size: 13px; opacity: 0.85; margin-bottom: 4px; }
.welcome-name { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
.welcome-summary { font-size: 13px; opacity: 0.8; margin-top: 6px; }
.quick-actions { display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
.quick-btn { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 8px; padding: 7px 14px; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: var(--transition); font-family: inherit; backdrop-filter: blur(4px); }
.quick-btn:hover { background: rgba(255,255,255,0.25); }

/* ── RECEIPTS ── */
.receipt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }
.receipt-thumb { border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border); background: var(--bg); aspect-ratio: 3/4; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition); position: relative; }
.receipt-thumb:hover { box-shadow: var(--shadow); }
.receipt-thumb .receipt-icon { font-size: 28px; margin-bottom: 8px; }
.receipt-thumb .receipt-name { font-size: 10px; color: var(--text3); text-align: center; padding: 0 8px; }
.receipt-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.5)); padding: 8px; }
.receipt-overlay-text { color: white; font-size: 10px; font-weight: 600; }

/* ── BILLING ── */
.plan-card { border-radius: var(--radius); padding: 24px; border: 2px solid var(--border); position: relative; overflow: hidden; }
.plan-card.current { border-color: var(--brand); }
.plan-card .plan-name { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.plan-card .plan-price { font-family: 'JetBrains Mono', monospace; font-size: 28px; font-weight: 700; letter-spacing: -1px; }
.plan-card .plan-period { font-size: 12px; color: var(--text3); }
.plan-features { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
.plan-feature { font-size: 13px; color: var(--text2); display: flex; align-items: center; gap: 8px; }

/* ── STATUS BADGE ── */
.status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 4px; }
.status-dot.green { background: var(--green); }
.status-dot.red { background: var(--red); }
.status-dot.gray { background: var(--text3); }

/* ── MOBILE BOTTOM NAV ── */
.mobile-nav { display: none; }
@media (max-width: 768px) {
  .sidebar { display: none; }
  .mobile-nav { display: flex; position: fixed; bottom: 0; left: 0; right: 0; background: var(--surface); border-top: 1px solid var(--border); padding: 8px 0; z-index: 100; }
  .mobile-nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 6px; cursor: pointer; color: var(--text3); font-size: 10px; font-weight: 600; transition: var(--transition); }
  .mobile-nav-item.active { color: var(--brand); }
  .mobile-nav-item svg { width: 20px; height: 20px; }
  .mobile-fab { position: fixed; bottom: 72px; right: 20px; width: 52px; height: 52px; border-radius: 16px; background: var(--brand); color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(27,110,243,0.4); cursor: pointer; z-index: 101; font-size: 22px; }
  .content { padding: 16px; padding-bottom: 80px; }
  .grid-4 { grid-template-columns: 1fr 1fr; }
  .grid-3 { grid-template-columns: 1fr 1fr; }
}

/* ── MODAL OVERLAY ── */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: flex-end; justify-content: center; animation: fadeIn 0.15s ease; }
.modal-sheet { background: var(--surface); border-radius: 24px 24px 0 0; padding: 28px 24px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; animation: slideUp 0.2s cubic-bezier(0.4,0,0.2,1); }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.modal-handle { width: 36px; height: 4px; background: var(--border2); border-radius: 2px; margin: 0 auto 20px; }
.modal-title { font-size: 18px; font-weight: 700; margin-bottom: 20px; }

/* ── REPORTS ── */
.chart-bar-wrap { display: flex; align-items: flex-end; gap: 8px; height: 80px; padding: 0 4px; }
.chart-bar { flex: 1; border-radius: 4px 4px 0 0; min-width: 0; transition: var(--transition); cursor: pointer; position: relative; }
.chart-bar:hover { opacity: 0.8; }
.chart-bar.income { background: linear-gradient(180deg, var(--green), rgba(5,150,105,0.6)); }
.chart-bar.expense { background: linear-gradient(180deg, var(--red), rgba(220,38,38,0.6)); }
.chart-labels { display: flex; gap: 8px; padding: 6px 4px 0; }
.chart-label { flex: 1; text-align: center; font-size: 10px; color: var(--text3); }

/* ── SPLIT LAYOUT ── */
.split-layout { display: grid; grid-template-columns: 260px 1fr; gap: 20px; }
@media (max-width: 1100px) { .split-layout { grid-template-columns: 1fr; } }

/* ── PROFILE PHOTO ── */
.profile-photo-wrap { display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--bg); border-radius: var(--radius-sm); margin-bottom: 20px; }
.profile-photo { width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, #6C47F5, #1B6EF3); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 22px; }

/* ── DIVIDER ── */
.divider { height: 1px; background: var(--border); margin: 20px 0; }
.divider-text { display: flex; align-items: center; gap: 12px; margin: 16px 0; color: var(--text3); font-size: 12px; }
.divider-text::before, .divider-text::after { content: ''; flex: 1; height: 1px; background: var(--border); }

/* ── SEARCH ── */
.search-bar { display: flex; align-items: center; gap: 10px; background: var(--bg); border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 8px 14px; flex: 1; max-width: 360px; }
.search-bar input { border: none; background: transparent; outline: none; font-family: inherit; font-size: 13.5px; color: var(--text); width: 100%; }
.search-bar input::placeholder { color: var(--text3); }

/* ── DARK MODE TOGGLE ── */
.dark-toggle { cursor: pointer; }

/* ── DROPDOWN ── */
.dropdown { position: absolute; top: 48px; right: 0; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow-lg); padding: 8px; min-width: 200px; z-index: 300; animation: fadeIn 0.1s ease; }
.dropdown-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text2); font-size: 13.5px; font-weight: 500; transition: var(--transition); }
.dropdown-item:hover { background: var(--bg); color: var(--text); }
.dropdown-item.danger { color: var(--red); }
.dropdown-item.danger:hover { background: var(--red-soft); }
.dropdown-divider { height: 1px; background: var(--border); margin: 4px 0; }

.relative { position: relative; }

/* ── Notification dot ── */
.notif-dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; background: var(--red); border-radius: 50%; border: 2px solid var(--surface); }

/* LOGIN */
.login-wrap { min-height: 100vh; display: flex; }
.login-left { flex: 1; background: linear-gradient(135deg, #0F1729 0%, #1B2845 50%, #162040 100%); display: flex; align-items: center; justify-content: center; padding: 60px; position: relative; overflow: hidden; }
.login-left::after { content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(27,110,243,0.2), transparent); top: -100px; right: -100px; }
.login-hero-text { color: white; max-width: 380px; position: relative; z-index: 1; }
.login-hero-text h1 { font-size: 38px; font-weight: 700; letter-spacing: -1px; line-height: 1.2; margin-bottom: 16px; }
.login-hero-text p { opacity: 0.7; font-size: 15px; line-height: 1.7; }
.login-right { width: 480px; display: flex; align-items: center; justify-content: center; padding: 40px; background: var(--surface); }
.login-form-wrap { width: 100%; max-width: 380px; }
@media (max-width: 768px) {
  .login-left { display: none; }
  .login-right { width: 100%; }
}
</style>
</head>
<body>

<!-- ═══════════════════════════════════════════════
     SCREEN SELECTOR (demo only)
═══════════════════════════════════════════════ -->
<div style="position:fixed; top:0; left:0; right:0; background:#111827; z-index:9999; display:flex; align-items:center; gap:6px; padding:8px 16px; overflow-x:auto; border-bottom:1px solid #374151;">
  <span style="color:#9CA3AF; font-size:11px; font-weight:700; letter-spacing:1px; white-space:nowrap; font-family:'Sora',sans-serif; margin-right:4px;">SCREENS</span>
  <button onclick="showScreen('login')" class="sdemo">Login</button>
  <button onclick="showScreen('onboarding')" class="sdemo">Onboarding</button>
  <button onclick="showScreen('dashboard')" class="sdemo active">Dashboard</button>
  <button onclick="showScreen('ledgers')" class="sdemo">Ledgers</button>
  <button onclick="showScreen('ledger-detail')" class="sdemo">Ledger Detail</button>
  <button onclick="showScreen('add-tx')" class="sdemo">Add Transaction</button>
  <button onclick="showScreen('receipts')" class="sdemo">Receipts</button>
  <button onclick="showScreen('reports')" class="sdemo">Reports</button>
  <button onclick="showScreen('settings')" class="sdemo">Settings</button>
  <button onclick="showScreen('profile')" class="sdemo">Profile</button>
  <button onclick="showScreen('billing')" class="sdemo">Billing</button>
  <button onclick="toggleTheme()" class="sdemo" style="margin-left:auto;">🌙 Dark</button>
</div>
<style>
.sdemo { background: #1F2937; border: 1px solid #374151; color: #9CA3AF; padding: 4px 12px; border-radius: 6px; font-size: 11.5px; font-weight: 600; cursor: pointer; white-space: nowrap; font-family: 'Sora', sans-serif; transition: 0.15s; }
.sdemo:hover, .sdemo.active { background: #1B6EF3; color: white; border-color: #1B6EF3; }
body { padding-top: 44px; }
</style>

<!-- ═══════════════════════════════════════════════
     SCREEN: LOGIN
═══════════════════════════════════════════════ -->
<div id="screen-login" class="screen" style="display:none;">
  <div class="login-wrap">
    <div class="login-left">
      <div class="login-hero-text">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:32px;">
          <div style="width:42px;height:42px;background:linear-gradient(135deg,#1B6EF3,#6C47F5);border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:18px;">L</div>
          <span style="font-size:22px;font-weight:700;letter-spacing:-0.5px;">Ledgr</span>
        </div>
        <h1>Your finances,<br>finally in order.</h1>
        <p>Multi-ledger, receipt-based financial management for freelancers, small businesses, and organized individuals.</p>
        <div style="margin-top:32px; display:flex; flex-direction:column; gap:14px;">
          <div style="display:flex;align-items:center;gap:12px;opacity:0.8;">
            <div style="width:8px;height:8px;border-radius:50%;background:#1B6EF3;flex-shrink:0;"></div>
            <span style="font-size:13px;">Multiple ledgers with isolated balances</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;opacity:0.8;">
            <div style="width:8px;height:8px;border-radius:50%;background:#6C47F5;flex-shrink:0;"></div>
            <span style="font-size:13px;">Receipt attachments for every transaction</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;opacity:0.8;">
            <div style="width:8px;height:8px;border-radius:50%;background:#059669;flex-shrink:0;"></div>
            <span style="font-size:13px;">Export-ready for your accountant</span>
          </div>
        </div>
      </div>
    </div>
    <div class="login-right">
      <div class="login-form-wrap">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:32px;">
          <div style="width:36px;height:36px;background:linear-gradient(135deg,#1B6EF3,#6C47F5);border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:16px;">L</div>
          <span style="font-size:18px;font-weight:700;">Ledgr</span>
        </div>
        <h2 style="font-size:22px;font-weight:700;letter-spacing:-0.5px;margin-bottom:6px;">Welcome back</h2>
        <p style="color:var(--text3);font-size:13.5px;margin-bottom:28px;">Sign in to your workspace</p>
        <div class="form-group">
          <label class="form-label">Email address</label>
          <input type="email" class="form-input" placeholder="you@example.com" value="nik@studio.ch">
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" placeholder="••••••••" value="password">
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:-8px;margin-bottom:20px;">
          <span style="font-size:12.5px;color:var(--brand);cursor:pointer;font-weight:600;">Forgot password?</span>
        </div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;padding:12px;" onclick="showScreen('dashboard')">Sign in</button>
        <div class="divider-text" style="margin:20px 0;">or</div>
        <button class="btn btn-ghost" style="width:100%;justify-content:center;padding:11px;margin-bottom:12px;">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <p style="text-align:center;font-size:12.5px;color:var(--text3);">Don't have an account? <span style="color:var(--brand);cursor:pointer;font-weight:600;" onclick="showScreen('onboarding')">Create free account</span></p>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     SCREEN: ONBOARDING
═══════════════════════════════════════════════ -->
<div id="screen-onboarding" class="screen" style="display:none;">
  <div class="onboarding-wrap">
    <div class="onboarding-card">
      <div class="step-dots">
        <div class="step-dot done"></div>
        <div class="step-dot done"></div>
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
      </div>
      <div class="onboarding-icon">🏢</div>
      <div class="onboarding-title">Set up your workspace</div>
      <div class="onboarding-sub">Tell us a bit about yourself so we can personalize your experience.</div>

      <div class="form-group">
        <label class="form-label">Your name</label>
        <input class="form-input" placeholder="Full name" value="Nik Rahimian">
      </div>
      <div class="form-group">
        <label class="form-label">Workspace name</label>
        <input class="form-input" placeholder="e.g. Nik Studio, My Finances" value="Nik Studio">
      </div>
      <div class="form-group">
        <label class="form-label">I am a...</label>
        <div class="user-type-grid">
          <div class="user-type-card">
            <div class="icon">👤</div>
            <div class="label">Personal</div>
          </div>
          <div class="user-type-card selected">
            <div class="icon">💼</div>
            <div class="label">Freelancer</div>
          </div>
          <div class="user-type-card">
            <div class="icon">🏢</div>
            <div class="label">Business</div>
          </div>
        </div>
      </div>
      <div class="grid-2" style="gap:12px; margin-bottom:18px;">
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Default currency</label>
          <select class="form-input form-select">
            <option>CHF — Swiss Franc</option>
            <option>EUR — Euro</option>
            <option>USD — US Dollar</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Country</label>
          <select class="form-input form-select">
            <option>🇨🇭 Switzerland</option>
            <option>🇩🇪 Germany</option>
            <option>🇦🇹 Austria</option>
          </select>
        </div>
      </div>

      <div style="display:flex; gap:10px;">
        <button class="btn btn-ghost" style="flex:1; justify-content:center;">Back</button>
        <button class="btn btn-primary" style="flex:2; justify-content:center;" onclick="showScreen('dashboard')">
          Continue →
        </button>
      </div>
      <p style="text-align:center; font-size:11.5px; color:var(--text3); margin-top:14px;">Step 3 of 5 · Workspace Setup</p>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     MAIN APP WRAPPER (Dashboard, Ledgers, etc.)
═══════════════════════════════════════════════ -->
<div id="screen-app" class="screen" style="display:none;">
  <div class="app">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-logo">L</div>
        <div class="sidebar-name">Ledgr</div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-item active" onclick="switchPage('dashboard')">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          Dashboard
        </div>
        <div class="nav-item" onclick="switchPage('ledgers')">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Ledgers
        </div>
        <div class="nav-item" onclick="switchPage('transactions')">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
          Transactions
        </div>
        <div class="nav-item" onclick="switchPage('receipts')">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Receipts
          <span class="nav-badge">3</span>
        </div>
        <div class="sidebar-section">Analytics</div>
        <div class="nav-item" onclick="switchPage('reports')">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Reports
        </div>
        <div class="nav-item" onclick="switchPage('export')">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </div>
        <div class="sidebar-section">Account</div>
        <div class="nav-item" onclick="showScreen('settings')">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Settings
        </div>
        <div class="nav-item">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Help Center
        </div>
      </nav>
      <div class="sidebar-footer">
        <div class="user-mini" onclick="toggleDropdown()">
          <div class="avatar business">N</div>
          <div class="user-info">
            <div class="user-name">Nik Studio</div>
            <div class="user-plan">Pro · CHF Workspace</div>
          </div>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color:var(--text3); flex-shrink:0;"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
    </aside>

    <!-- MAIN -->
    <div class="main-area">
      <!-- HEADER -->
      <header class="header">
        <div id="header-title-area">
          <div class="header-title" id="header-title">Dashboard</div>
          <div class="header-sub" id="header-sub">Thursday, 12 March 2026</div>
        </div>
        <div class="header-actions">
          <div class="search-bar">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color:var(--text3); flex-shrink:0;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search transactions…">
          </div>
          <div class="icon-btn relative" style="position:relative;">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div class="notif-dot"></div>
          </div>
          <div class="header-user relative" id="user-menu-btn" onclick="toggleDropdown()">
            <div class="avatar business" style="width:30px;height:30px;font-size:12px;">N</div>
            <div>
              <div style="font-weight:600;font-size:13px;">Nik Studio</div>
              <div style="font-size:10.5px;color:var(--text3);">Pro Plan</div>
            </div>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            <!-- Dropdown -->
            <div class="dropdown" id="user-dropdown" style="display:none;" onclick="event.stopPropagation()">
              <div class="dropdown-item">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                View Profile
              </div>
              <div class="dropdown-item" onclick="showScreen('settings')">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9"/></svg>
                Workspace Settings
              </div>
              <div class="dropdown-item" onclick="showScreen('billing')">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                Subscription
              </div>
              <div class="dropdown-item">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>
                Notifications
              </div>
              <div class="dropdown-divider"></div>
              <div class="dropdown-item">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/></svg>
                Help Center
              </div>
              <div class="dropdown-divider"></div>
              <div class="dropdown-item danger">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign out
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="openAddTx()">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New
          </button>
        </div>
      </header>

      <!-- PAGES -->
      <div class="content">

        <!-- DASHBOARD PAGE -->
        <div class="page active" id="page-dashboard">
          <div class="welcome-bar">
            <div class="welcome-greeting">Good morning 👋</div>
            <div class="welcome-name">Nik Studio</div>
            <div class="welcome-summary">You have 3 unattached receipts · Last transaction 2 hours ago</div>
            <div class="quick-actions">
              <button class="quick-btn" onclick="openAddTx()">+ Expense</button>
              <button class="quick-btn" onclick="openAddTx()">+ Income</button>
              <button class="quick-btn">⇄ Transfer</button>
              <button class="quick-btn" onclick="switchPage('ledgers')">+ Ledger</button>
              <button class="quick-btn">📎 Receipt</button>
            </div>
          </div>

          <div class="grid-4" style="margin-bottom:20px;">
            <div class="stat-card">
              <div class="stat-label">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Grand Total
              </div>
              <div class="stat-value brand">CHF 18,430</div>
              <div class="stat-change">↑ Across 4 ledgers</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                Income · Mar
              </div>
              <div class="stat-value green">CHF 6,200</div>
              <div class="stat-change">↑ 12% vs Feb</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
                Expenses · Mar
              </div>
              <div class="stat-value red">CHF 2,840</div>
              <div class="stat-change">↓ 4% vs Feb</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                Unlinked Receipts
              </div>
              <div class="stat-value" style="color:var(--orange);">3</div>
              <div class="stat-change">Needs attention</div>
            </div>
          </div>

          <div class="grid-2" style="gap:20px;">
            <!-- Ledgers Summary -->
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <div class="section-title" style="margin-bottom:0;">My Ledgers</div>
                <span style="font-size:12px;color:var(--brand);cursor:pointer;font-weight:600;" onclick="switchPage('ledgers')">View all →</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:10px;">
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="switchPage('ledger-detail')">
                  <div style="width:36px;height:36px;background:var(--brand-soft);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">💼</div>
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:13.5px;">Business</div>
                    <div style="font-size:11px;color:var(--text3);">Last updated 2h ago</div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-family:'JetBrains Mono',monospace;font-weight:700;font-size:14px;">CHF 9,840</div>
                    <span class="pill pill-green" style="font-size:9px;">Included</span>
                  </div>
                </div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;">
                  <div style="width:36px;height:36px;background:var(--green-soft);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">🏠</div>
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:13.5px;">Personal</div>
                    <div style="font-size:11px;color:var(--text3);">Last updated yesterday</div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-family:'JetBrains Mono',monospace;font-weight:700;font-size:14px;">CHF 4,290</div>
                    <span class="pill pill-green" style="font-size:9px;">Included</span>
                  </div>
                </div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;">
                  <div style="width:36px;height:36px;background:var(--orange-soft);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">🔨</div>
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:13.5px;">Renovation Project</div>
                    <div style="font-size:11px;color:var(--text3);">Last updated 3 days ago</div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-family:'JetBrains Mono',monospace;font-weight:700;font-size:14px;">CHF 4,300</div>
                    <span class="pill pill-green" style="font-size:9px;">Included</span>
                  </div>
                </div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;opacity:0.7;">
                  <div style="width:36px;height:36px;background:var(--bg);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">🔒</div>
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:13.5px;">Escrow Reserve</div>
                    <div style="font-size:11px;color:var(--text3);">Private · not counted in total</div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-family:'JetBrains Mono',monospace;font-weight:700;font-size:14px;">CHF 12,500</div>
                    <span class="pill pill-gray" style="font-size:9px;">Hidden</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Transactions -->
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <div class="section-title" style="margin-bottom:0;">Recent Transactions</div>
                <span style="font-size:12px;color:var(--brand);cursor:pointer;font-weight:600;" onclick="switchPage('transactions')">View all →</span>
              </div>
              <div class="card" style="padding:4px 16px;">
                <div class="tx-item">
                  <div class="tx-icon income">💰</div>
                  <div class="tx-info">
                    <div class="tx-desc">Client Invoice #2024-031</div>
                    <div class="tx-meta">Business · Mar 12 · <span class="pill pill-brand" style="font-size:9.5px;">📎 Receipt</span></div>
                  </div>
                  <div class="tx-amount income">+3,200</div>
                </div>
                <div class="tx-item">
                  <div class="tx-icon expense">🛒</div>
                  <div class="tx-info">
                    <div class="tx-desc">Migros — Groceries</div>
                    <div class="tx-meta">Personal · Mar 11</div>
                  </div>
                  <div class="tx-amount expense">−142.80</div>
                </div>
                <div class="tx-item">
                  <div class="tx-icon transfer">⇄</div>
                  <div class="tx-info">
                    <div class="tx-desc">Transfer → Personal</div>
                    <div class="tx-meta">Business → Personal · Mar 10</div>
                  </div>
                  <div class="tx-amount transfer">−500</div>
                </div>
                <div class="tx-item">
                  <div class="tx-icon expense">⚡</div>
                  <div class="tx-info">
                    <div class="tx-desc">Adobe CC Subscription</div>
                    <div class="tx-meta">Business · Mar 10 · <span class="pill pill-brand" style="font-size:9.5px;">📎 Receipt</span></div>
                  </div>
                  <div class="tx-amount expense">−84.00</div>
                </div>
                <div class="tx-item">
                  <div class="tx-icon income">💰</div>
                  <div class="tx-info">
                    <div class="tx-desc">Freelance Project — Haus AG</div>
                    <div class="tx-meta">Business · Mar 8</div>
                  </div>
                  <div class="tx-amount income">+1,800</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- LEDGERS PAGE -->
        <div class="page" id="page-ledgers">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
            <div>
              <h2 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;">Ledgers</h2>
              <p style="color:var(--text3);font-size:13px;margin-top:2px;">4 ledgers · CHF 18,430 total</p>
            </div>
            <button class="btn btn-primary">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Ledger
            </button>
          </div>
          <div class="grid-3" style="margin-bottom:16px;">
            <div class="ledger-card" onclick="switchPage('ledger-detail')">
              <div class="ledger-icon" style="background:var(--brand-soft);">💼</div>
              <div class="ledger-name">Business</div>
              <div class="ledger-type">Primary · CHF</div>
              <div class="ledger-balance">CHF 9,840.00</div>
              <div class="ledger-meta">
                <span class="pill pill-green">✓ In Total</span>
                <span class="pill pill-gray">23 tx</span>
              </div>
            </div>
            <div class="ledger-card green">
              <div class="ledger-icon" style="background:var(--green-soft);">🏠</div>
              <div class="ledger-name">Personal</div>
              <div class="ledger-type">Personal · CHF</div>
              <div class="ledger-balance">CHF 4,290.50</div>
              <div class="ledger-meta">
                <span class="pill pill-green">✓ In Total</span>
                <span class="pill pill-gray">41 tx</span>
              </div>
            </div>
            <div class="ledger-card orange">
              <div class="ledger-icon" style="background:var(--orange-soft);">🔨</div>
              <div class="ledger-name">Renovation</div>
              <div class="ledger-type">Project · CHF</div>
              <div class="ledger-balance">CHF 4,300.00</div>
              <div class="ledger-meta">
                <span class="pill pill-green">✓ In Total</span>
                <span class="pill pill-gray">12 tx</span>
              </div>
            </div>
            <div class="ledger-card" style="--ledger-color:#374151; opacity:0.8;">
              <div class="ledger-icon" style="background:var(--bg);">🔒</div>
              <div class="ledger-name">Escrow Reserve</div>
              <div class="ledger-type">Private · CHF</div>
              <div class="ledger-balance" style="color:var(--text3);">CHF 12,500.00</div>
              <div class="ledger-meta">
                <span class="pill pill-gray">Hidden</span>
                <span class="pill pill-gray">5 tx</span>
              </div>
            </div>
            <!-- Add New Card -->
            <div style="border:2px dashed var(--border);border-radius:var(--radius);padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;min-height:180px;transition:var(--transition);" onmouseover="this.style.borderColor='var(--brand)'" onmouseout="this.style.borderColor='var(--border)'">
              <div style="width:44px;height:44px;background:var(--bg);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px;">＋</div>
              <div style="font-weight:600;font-size:13.5px;color:var(--text2);">New Ledger</div>
              <div style="font-size:12px;color:var(--text3);margin-top:4px;text-align:center;">Add another account, project, or cash box</div>
            </div>
          </div>
        </div>

        <!-- LEDGER DETAIL PAGE -->
        <div class="page" id="page-ledger-detail">
          <!-- Ledger Header -->
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;margin-bottom:20px;display:flex;align-items:center;gap:20px;">
            <div style="width:56px;height:56px;background:var(--brand-soft);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;">💼</div>
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
                <h2 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;">Business</h2>
                <span class="pill pill-green">✓ In Total</span>
              </div>
              <div style="color:var(--text3);font-size:13px;">Primary Ledger · CHF · 23 transactions</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12px;color:var(--text3);margin-bottom:4px;">Current Balance</div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;color:var(--brand);letter-spacing:-1px;">CHF 9,840</div>
            </div>
            <button class="btn btn-primary" onclick="openAddTx()">+ Add</button>
          </div>

          <!-- Sub Navigation -->
          <div class="tabs">
            <div class="tab active">Overview</div>
            <div class="tab">Transactions</div>
            <div class="tab">Receipts</div>
            <div class="tab">Summary</div>
            <div class="tab">Export</div>
          </div>

          <!-- Stats row -->
          <div class="grid-3" style="margin-bottom:20px;">
            <div class="stat-card">
              <div class="stat-label">Income this month</div>
              <div class="stat-value green">CHF 5,000</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Expenses this month</div>
              <div class="stat-value red">CHF 1,560</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Opening balance</div>
              <div class="stat-value">CHF 6,400</div>
            </div>
          </div>

          <!-- Transaction list -->
          <div class="card" style="padding:4px 20px;">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 0 8px;">
              <div class="section-title" style="margin-bottom:0;">All Transactions</div>
              <div style="display:flex;gap:8px;">
                <button class="btn btn-ghost btn-sm">Filter</button>
                <button class="btn btn-ghost btn-sm">Sort</button>
              </div>
            </div>
            <div class="tx-item">
              <div class="tx-icon income">💰</div>
              <div class="tx-info"><div class="tx-desc">Invoice #2024-031 — Haus AG</div><div class="tx-meta">Mar 12 · Income · 📎 Receipt attached</div></div>
              <div class="tx-amount income">+3,200.00</div>
            </div>
            <div class="tx-item">
              <div class="tx-icon expense">⚡</div>
              <div class="tx-info"><div class="tx-desc">Adobe CC Annual Plan</div><div class="tx-meta">Mar 10 · Software · Card · 📎 Receipt</div></div>
              <div class="tx-amount expense">−84.00</div>
            </div>
            <div class="tx-item">
              <div class="tx-icon transfer">⇄</div>
              <div class="tx-info"><div class="tx-desc">Transfer to Personal</div><div class="tx-meta">Mar 10 · Internal transfer</div></div>
              <div class="tx-amount transfer">−500.00</div>
            </div>
            <div class="tx-item">
              <div class="tx-icon income">💰</div>
              <div class="tx-info"><div class="tx-desc">Freelance — Müller Design</div><div class="tx-meta">Mar 8 · Income · Bank transfer</div></div>
              <div class="tx-amount income">+1,800.00</div>
            </div>
            <div class="tx-item">
              <div class="tx-icon expense">🍕</div>
              <div class="tx-info"><div class="tx-desc">Client lunch — Restaurant Zum Ochsen</div><div class="tx-meta">Mar 7 · Meals · Cash</div></div>
              <div class="tx-amount expense">−76.00</div>
            </div>
          </div>
        </div>

        <!-- TRANSACTIONS PAGE -->
        <div class="page" id="page-transactions">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
            <h2 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;">All Transactions</h2>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-ghost btn-sm">Filter</button>
              <button class="btn btn-ghost btn-sm">Export</button>
              <button class="btn btn-primary btn-sm" onclick="openAddTx()">+ New</button>
            </div>
          </div>
          <div class="card" style="padding:4px 20px;">
            <div class="tx-item"><div class="tx-icon income">💰</div><div class="tx-info"><div class="tx-desc">Client Invoice #2024-031</div><div class="tx-meta">Business · Mar 12 · 📎</div></div><div class="tx-amount income">+3,200.00</div></div>
            <div class="tx-item"><div class="tx-icon expense">🛒</div><div class="tx-info"><div class="tx-desc">Migros Groceries</div><div class="tx-meta">Personal · Mar 11</div></div><div class="tx-amount expense">−142.80</div></div>
            <div class="tx-item"><div class="tx-icon transfer">⇄</div><div class="tx-info"><div class="tx-desc">Transfer → Personal</div><div class="tx-meta">Business · Mar 10</div></div><div class="tx-amount transfer">−500.00</div></div>
            <div class="tx-item"><div class="tx-icon expense">⚡</div><div class="tx-info"><div class="tx-desc">Adobe CC Subscription</div><div class="tx-meta">Business · Mar 10 · 📎</div></div><div class="tx-amount expense">−84.00</div></div>
            <div class="tx-item"><div class="tx-icon income">💰</div><div class="tx-info"><div class="tx-desc">Freelance — Müller Design</div><div class="tx-meta">Business · Mar 8</div></div><div class="tx-amount income">+1,800.00</div></div>
            <div class="tx-item"><div class="tx-icon expense">🍕</div><div class="tx-info"><div class="tx-desc">Client Lunch · Restaurant Zum Ochsen</div><div class="tx-meta">Business · Mar 7 · Cash</div></div><div class="tx-amount expense">−76.00</div></div>
          </div>
        </div>

        <!-- RECEIPTS PAGE -->
        <div class="page" id="page-receipts">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
            <div>
              <h2 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;">Receipts & Documents</h2>
              <p style="color:var(--text3);font-size:13px;margin-top:2px;">18 total · 3 unlinked</p>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-ghost btn-sm">Filter</button>
              <button class="btn btn-primary btn-sm">📎 Upload</button>
            </div>
          </div>
          <!-- Unlinked alert -->
          <div style="background:var(--orange-soft);border:1px solid var(--orange);border-radius:var(--radius-sm);padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:20px;">
            <span style="font-size:18px;">⚠️</span>
            <div style="flex:1;">
              <div style="font-weight:600;font-size:13.5px;color:var(--orange);">3 receipts are not linked to transactions</div>
              <div style="font-size:12px;color:var(--text2);margin-top:2px;">Link them to keep your records complete</div>
            </div>
            <button class="btn btn-sm" style="background:var(--orange);color:white;">Review</button>
          </div>

          <div class="section-title">All Receipts</div>
          <div class="receipt-grid">
            <div class="receipt-thumb">
              <div class="receipt-icon">🧾</div>
              <div class="receipt-name">Adobe CC Invoice Mar 2026</div>
            </div>
            <div class="receipt-thumb">
              <div class="receipt-icon">📄</div>
              <div class="receipt-name">Migros Receipt Mar 11</div>
            </div>
            <div class="receipt-thumb" style="border:1.5px dashed var(--orange);background:var(--orange-soft);">
              <div class="receipt-icon">📎</div>
              <div class="receipt-name" style="color:var(--orange);">Unlinked · Upload 1</div>
            </div>
            <div class="receipt-thumb" style="border:1.5px dashed var(--orange);background:var(--orange-soft);">
              <div class="receipt-icon">📎</div>
              <div class="receipt-name" style="color:var(--orange);">Unlinked · Upload 2</div>
            </div>
            <div class="receipt-thumb" style="border:1.5px dashed var(--orange);background:var(--orange-soft);">
              <div class="receipt-icon">📎</div>
              <div class="receipt-name" style="color:var(--orange);">Unlinked · Upload 3</div>
            </div>
            <div class="receipt-thumb">
              <div class="receipt-icon">🧾</div>
              <div class="receipt-name">Client Invoice Haus AG</div>
            </div>
            <div class="receipt-thumb">
              <div class="receipt-icon">📄</div>
              <div class="receipt-name">Restaurant Zum Ochsen</div>
            </div>
            <div class="receipt-thumb" style="border:2px dashed var(--border);background:transparent;">
              <div style="font-size:22px;margin-bottom:6px;color:var(--text3);">＋</div>
              <div style="font-size:11px;color:var(--text3);">Add receipt</div>
            </div>
          </div>
        </div>

        <!-- REPORTS PAGE -->
        <div class="page" id="page-reports">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
            <h2 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;">Reports</h2>
            <button class="btn btn-ghost btn-sm">Export PDF</button>
          </div>

          <div class="grid-2" style="gap:20px;margin-bottom:20px;">
            <div class="card">
              <div class="section-title">Income vs Expenses — 2026</div>
              <div class="chart-bar-wrap">
                <div class="chart-bar income" style="height:45%;"></div>
                <div class="chart-bar expense" style="height:30%;"></div>
                <div class="chart-bar income" style="height:55%;"></div>
                <div class="chart-bar expense" style="height:25%;"></div>
                <div class="chart-bar income" style="height:80%;"></div>
                <div class="chart-bar expense" style="height:45%;"></div>
                <div class="chart-bar income" style="height:100%;"></div>
                <div class="chart-bar expense" style="height:55%;"></div>
                <div class="chart-bar income" style="height:70%;"></div>
                <div class="chart-bar expense" style="height:35%;"></div>
                <div class="chart-bar income" style="height:60%;"></div>
                <div class="chart-bar expense" style="height:40%;"></div>
              </div>
              <div class="chart-labels">
                <div class="chart-label">J</div><div class="chart-label">F</div><div class="chart-label">M</div><div class="chart-label">A</div><div class="chart-label">M</div><div class="chart-label">J</div><div class="chart-label">J</div><div class="chart-label">A</div><div class="chart-label">S</div><div class="chart-label">O</div><div class="chart-label">N</div><div class="chart-label">D</div>
              </div>
              <div style="display:flex;gap:16px;margin-top:12px;">
                <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text2);"><div style="width:10px;height:10px;border-radius:2px;background:var(--green);"></div>Income</div>
                <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text2);"><div style="width:10px;height:10px;border-radius:2px;background:var(--red);"></div>Expenses</div>
              </div>
            </div>
            <div class="card">
              <div class="section-title">Expense Breakdown · March</div>
              <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px;">
                <div><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12.5px;font-weight:600;">Software & Tools</span><span style="font-size:12.5px;font-family:'JetBrains Mono',monospace;color:var(--red);">CHF 884</span></div><div style="height:6px;background:var(--bg);border-radius:3px;"><div style="height:100%;width:62%;background:var(--brand);border-radius:3px;"></div></div></div>
                <div><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12.5px;font-weight:600;">Meals & Entertainment</span><span style="font-size:12.5px;font-family:'JetBrains Mono',monospace;color:var(--red);">CHF 320</span></div><div style="height:6px;background:var(--bg);border-radius:3px;"><div style="height:100%;width:22%;background:var(--orange);border-radius:3px;"></div></div></div>
                <div><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12.5px;font-weight:600;">Office & Supplies</span><span style="font-size:12.5px;font-family:'JetBrains Mono',monospace;color:var(--red);">CHF 210</span></div><div style="height:6px;background:var(--bg);border-radius:3px;"><div style="height:100%;width:15%;background:#7C3AED;border-radius:3px;"></div></div></div>
                <div><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12.5px;font-weight:600;">Travel</span><span style="font-size:12.5px;font-family:'JetBrains Mono',monospace;color:var(--red);">CHF 180</span></div><div style="height:6px;background:var(--bg);border-radius:3px;"><div style="height:100%;width:13%;background:var(--blue-transfer);border-radius:3px;"></div></div></div>
                <div><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12.5px;font-weight:600;">Other</span><span style="font-size:12.5px;font-family:'JetBrains Mono',monospace;color:var(--red);">CHF 246</span></div><div style="height:6px;background:var(--bg);border-radius:3px;"><div style="height:100%;width:17%;background:var(--text3);border-radius:3px;"></div></div></div>
              </div>
            </div>
          </div>

          <div class="grid-4">
            <div class="stat-card"><div class="stat-label">Net YTD</div><div class="stat-value green">CHF 24,600</div></div>
            <div class="stat-card"><div class="stat-label">Avg Monthly Income</div><div class="stat-value brand">CHF 5,800</div></div>
            <div class="stat-card"><div class="stat-label">Avg Monthly Expenses</div><div class="stat-value red">CHF 2,400</div></div>
            <div class="stat-card"><div class="stat-label">Savings Rate</div><div class="stat-value" style="color:#7C3AED;">58.6%</div></div>
          </div>
        </div>

        <!-- EXPORT PAGE -->
        <div class="page" id="page-export">
          <h2 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin-bottom:6px;">Export Center</h2>
          <p style="color:var(--text3);font-size:13px;margin-bottom:24px;">Download your financial data for accounting, tax, or personal records.</p>
          <div class="grid-2" style="gap:16px;">
            <div class="card" style="cursor:pointer;" onmouseover="this.style.borderColor='var(--brand)'" onmouseout="this.style.borderColor='var(--border)'">
              <div style="font-size:28px;margin-bottom:12px;">📊</div>
              <div style="font-weight:700;font-size:15px;margin-bottom:6px;">Excel / XLSX Export</div>
              <div style="font-size:13px;color:var(--text2);margin-bottom:16px;">Full transaction history with categories, references, and metadata. Ready for Treuhänder.</div>
              <button class="btn btn-primary btn-sm">Export XLSX</button>
            </div>
            <div class="card" style="cursor:pointer;" onmouseover="this.style.borderColor='var(--brand)'" onmouseout="this.style.borderColor='var(--border)'">
              <div style="font-size:28px;margin-bottom:12px;">📄</div>
              <div style="font-weight:700;font-size:15px;margin-bottom:6px;">PDF Report</div>
              <div style="font-size:13px;color:var(--text2);margin-bottom:16px;">Formatted financial report with totals, charts, and receipt index.</div>
              <button class="btn btn-primary btn-sm">Export PDF</button>
            </div>
          </div>
        </div>

      </div><!-- /content -->
    </div><!-- /main-area -->
  </div><!-- /app -->

  <!-- Mobile FAB -->
  <div class="mobile-fab" onclick="openAddTx()">＋</div>

  <!-- Mobile Bottom Nav -->
  <div class="mobile-nav">
    <div class="mobile-nav-item active" onclick="switchPage('dashboard')">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      Home
    </div>
    <div class="mobile-nav-item" onclick="switchPage('ledgers')">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      Ledgers
    </div>
    <div class="mobile-nav-item" style="color:transparent;">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Add
    </div>
    <div class="mobile-nav-item" onclick="switchPage('reports')">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      Reports
    </div>
    <div class="mobile-nav-item">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
      More
    </div>
  </div>
</div><!-- /screen-app -->

<!-- ═══════════════════════════════════════════════
     SCREEN: SETTINGS
═══════════════════════════════════════════════ -->
<div id="screen-settings" class="screen" style="display:none;">
  <div style="min-height:calc(100vh - 44px);background:var(--bg);">
    <div style="background:var(--surface);border-bottom:1px solid var(--border);padding:16px 24px;display:flex;align-items:center;gap:14px;">
      <button class="icon-btn" onclick="showScreen('dashboard')">←</button>
      <div>
        <div style="font-weight:700;font-size:16px;">Settings</div>
        <div style="font-size:12px;color:var(--text3);">Manage your account and preferences</div>
      </div>
    </div>
    <div style="max-width:960px;margin:0 auto;padding:24px;display:grid;grid-template-columns:220px 1fr;gap:20px;">
      <div class="card" style="padding:12px;height:fit-content;">
        <div class="settings-nav">
          <div class="settings-nav-item active">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
          </div>
          <div class="settings-nav-item">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>Workspace
          </div>
          <div class="settings-nav-item">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>Ledger Preferences
          </div>
          <div class="settings-nav-item">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M18.66 5.34l1.41-1.41"/></svg>Appearance
          </div>
          <div class="settings-nav-item">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Security
          </div>
          <div class="settings-nav-item">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Billing
          </div>
          <div class="settings-nav-item">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Data & Privacy
          </div>
          <div class="settings-nav-item">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>Notifications
          </div>
          <div class="settings-nav-item">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/></svg>Help & Support
          </div>
        </div>
      </div>
      <div class="card">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:20px;">Profile Settings</h3>
        <div class="profile-photo-wrap">
          <div class="profile-photo">N</div>
          <div>
            <div style="font-weight:600;font-size:14px;">Nik Rahimian</div>
            <div style="color:var(--text3);font-size:12px;">nik@studio.ch</div>
            <button class="btn btn-ghost btn-sm" style="margin-top:8px;">Change photo</button>
          </div>
        </div>
        <div class="grid-2" style="gap:16px;">
          <div class="form-group"><label class="form-label">Full name</label><input class="form-input" value="Nik Rahimian"></div>
          <div class="form-group"><label class="form-label">Display name</label><input class="form-input" value="Nik"></div>
          <div class="form-group"><label class="form-label">Business name</label><input class="form-input" value="Nik Studio GmbH"></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" value="nik@studio.ch"></div>
          <div class="form-group"><label class="form-label">Phone</label><input class="form-input" value="+41 79 123 45 67"></div>
          <div class="form-group"><label class="form-label">Country</label><select class="form-input form-select"><option>🇨🇭 Switzerland</option></select></div>
          <div class="form-group"><label class="form-label">Default currency</label><select class="form-input form-select"><option>CHF</option><option>EUR</option></select></div>
          <div class="form-group"><label class="form-label">Timezone</label><select class="form-input form-select"><option>Europe/Zurich (UTC+1)</option></select></div>
        </div>
        <div class="form-group"><label class="form-label">Website</label><input class="form-input" value="https://nikstudio.ch"></div>
        <div class="form-group"><label class="form-label">Bio</label><textarea class="form-input" rows="3" style="resize:vertical;">Freelance designer & developer based in Zurich.</textarea></div>
        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:8px;">
          <button class="btn btn-ghost">Cancel</button>
          <button class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     SCREEN: PROFILE
═══════════════════════════════════════════════ -->
<div id="screen-profile" class="screen" style="display:none;">
  <div style="min-height:calc(100vh - 44px);background:var(--bg);">
    <div style="background:var(--surface);border-bottom:1px solid var(--border);padding:16px 24px;display:flex;align-items:center;gap:14px;">
      <button class="icon-btn" onclick="showScreen('dashboard')">←</button>
      <div style="font-weight:700;font-size:16px;">My Profile</div>
    </div>
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div class="card" style="text-align:center;padding:32px;margin-bottom:20px;">
        <div style="width:80px;height:80px;background:linear-gradient(135deg,#6C47F5,#1B6EF3);border-radius:20px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:28px;margin:0 auto 16px;">N</div>
        <div style="font-size:22px;font-weight:700;letter-spacing:-0.5px;">Nik Rahimian</div>
        <div style="color:var(--text3);font-size:13.5px;margin-top:4px;">nik@studio.ch</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:12px;">
          <span class="pill pill-brand">Pro Plan</span>
          <span class="pill pill-green">CHF Workspace</span>
          <span class="pill pill-gray">🇨🇭 Switzerland</span>
        </div>
        <p style="margin-top:16px;color:var(--text2);font-size:13.5px;">Freelance designer & developer based in Zurich.</p>
        <button class="btn btn-ghost btn-sm" style="margin-top:16px;" onclick="showScreen('settings')">Edit Profile</button>
      </div>
      <div class="card">
        <div class="settings-row"><div class="settings-row-info"><div class="settings-row-label">Business Name</div></div><div style="font-size:13.5px;color:var(--text2);">Nik Studio GmbH</div></div>
        <div class="settings-row"><div class="settings-row-info"><div class="settings-row-label">Phone</div></div><div style="font-size:13.5px;color:var(--text2);">+41 79 123 45 67</div></div>
        <div class="settings-row"><div class="settings-row-info"><div class="settings-row-label">Website</div></div><div style="font-size:13.5px;color:var(--brand);">nikstudio.ch</div></div>
        <div class="settings-row"><div class="settings-row-info"><div class="settings-row-label">Member since</div></div><div style="font-size:13.5px;color:var(--text2);">January 2025</div></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     SCREEN: BILLING
═══════════════════════════════════════════════ -->
<div id="screen-billing" class="screen" style="display:none;">
  <div style="min-height:calc(100vh - 44px);background:var(--bg);">
    <div style="background:var(--surface);border-bottom:1px solid var(--border);padding:16px 24px;display:flex;align-items:center;gap:14px;">
      <button class="icon-btn" onclick="showScreen('dashboard')">←</button>
      <div style="font-weight:700;font-size:16px;">Billing & Subscription</div>
    </div>
    <div style="max-width:800px;margin:0 auto;padding:24px;">
      <!-- Current plan -->
      <div style="background:linear-gradient(135deg,var(--brand),#6C47F5);border-radius:var(--radius);padding:24px;color:white;margin-bottom:24px;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div style="font-size:12px;opacity:0.8;margin-bottom:4px;">Current plan</div>
            <div style="font-size:24px;font-weight:700;letter-spacing:-0.5px;">Pro</div>
            <div style="font-size:13px;opacity:0.85;margin-top:4px;"><span style="background:rgba(255,255,255,0.2);padding:2px 10px;border-radius:20px;">Active</span> · Renews April 1, 2026</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px;opacity:0.7;">Monthly</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:700;letter-spacing:-1px;">CHF 14</div>
            <div style="font-size:11px;opacity:0.7;">per month</div>
          </div>
        </div>
      </div>

      <div class="grid-3" style="gap:16px;margin-bottom:24px;">
        <div class="plan-card">
          <div class="plan-name">Free</div>
          <div class="plan-price">CHF 0<span class="plan-period">/mo</span></div>
          <div class="plan-features">
            <div class="plan-feature">✓ 2 Ledgers</div>
            <div class="plan-feature">✓ 100 transactions/mo</div>
            <div class="plan-feature">✓ 50MB storage</div>
            <div class="plan-feature" style="color:var(--text3);">✗ PDF Export</div>
            <div class="plan-feature" style="color:var(--text3);">✗ Priority support</div>
          </div>
        </div>
        <div class="plan-card current">
          <div style="position:absolute;top:-1px;right:20px;background:var(--brand);color:white;font-size:11px;font-weight:700;padding:4px 10px;border-radius:0 0 8px 8px;">CURRENT</div>
          <div class="plan-name" style="color:var(--brand);">Pro</div>
          <div class="plan-price" style="color:var(--brand);">CHF 14<span class="plan-period">/mo</span></div>
          <div class="plan-features">
            <div class="plan-feature">✓ Unlimited Ledgers</div>
            <div class="plan-feature">✓ Unlimited transactions</div>
            <div class="plan-feature">✓ 5GB storage</div>
            <div class="plan-feature">✓ XLSX & PDF Export</div>
            <div class="plan-feature">✓ Priority support</div>
          </div>
        </div>
        <div class="plan-card">
          <div class="plan-name">Business</div>
          <div class="plan-price">CHF 39<span class="plan-period">/mo</span></div>
          <div class="plan-features">
            <div class="plan-feature">✓ Everything in Pro</div>
            <div class="plan-feature">✓ Team members</div>
            <div class="plan-feature">✓ 50GB storage</div>
            <div class="plan-feature">✓ API access</div>
            <div class="plan-feature">✓ Dedicated support</div>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top:16px;">Upgrade</button>
        </div>
      </div>

      <!-- Invoice history -->
      <div class="card">
        <div style="font-weight:700;font-size:14px;margin-bottom:16px;">Payment History</div>
        <div class="tx-item">
          <div class="tx-icon income" style="font-size:14px;">🧾</div>
          <div class="tx-info"><div class="tx-desc">Pro Plan · March 2026</div><div class="tx-meta">Mar 1, 2026 · Card ••• 4321</div></div>
          <div style="display:flex;align-items:center;gap:10px;"><span class="pill pill-green">Paid</span><span style="font-family:'JetBrains Mono',monospace;font-weight:700;">CHF 14.00</span><button class="btn btn-ghost btn-sm">PDF</button></div>
        </div>
        <div class="tx-item">
          <div class="tx-icon income" style="font-size:14px;">🧾</div>
          <div class="tx-info"><div class="tx-desc">Pro Plan · February 2026</div><div class="tx-meta">Feb 1, 2026 · Card ••• 4321</div></div>
          <div style="display:flex;align-items:center;gap:10px;"><span class="pill pill-green">Paid</span><span style="font-family:'JetBrains Mono',monospace;font-weight:700;">CHF 14.00</span><button class="btn btn-ghost btn-sm">PDF</button></div>
        </div>
        <div class="tx-item">
          <div class="tx-icon income" style="font-size:14px;">🧾</div>
          <div class="tx-info"><div class="tx-desc">Pro Plan · January 2026</div><div class="tx-meta">Jan 1, 2026 · Card ••• 4321</div></div>
          <div style="display:flex;align-items:center;gap:10px;"><span class="pill pill-green">Paid</span><span style="font-family:'JetBrains Mono',monospace;font-weight:700;">CHF 14.00</span><button class="btn btn-ghost btn-sm">PDF</button></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════
     ADD TRANSACTION MODAL
═══════════════════════════════════════════════ -->
<div class="modal-overlay" id="add-tx-modal" style="display:none;" onclick="closeAddTx()">
  <div class="modal-sheet" onclick="event.stopPropagation()">
    <div class="modal-handle"></div>
    <div class="modal-title">New Transaction</div>
    <div class="type-toggle">
      <button class="type-btn expense active" onclick="setType(this,'expense')">− Expense</button>
      <button class="type-btn income" onclick="setType(this,'income')">+ Income</button>
      <button class="type-btn transfer" onclick="setType(this,'transfer')">⇄ Transfer</button>
    </div>
    <div class="form-group">
      <label class="form-label" style="color:var(--text3);font-size:11px;letter-spacing:0.5px;">AMOUNT (CHF)</label>
      <input class="form-input amount-input-large" placeholder="0.00" type="number">
    </div>
    <div class="grid-2" style="gap:12px;">
      <div class="form-group" style="margin-bottom:0;">
        <label class="form-label">Ledger</label>
        <select class="form-input form-select">
          <option>💼 Business</option>
          <option>🏠 Personal</option>
          <option>🔨 Renovation</option>
        </select>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label class="form-label">Date</label>
        <input class="form-input" type="date" value="2026-03-12">
      </div>
    </div>
    <div class="form-group" style="margin-top:12px;">
      <label class="form-label">Description / Buchungstext</label>
      <input class="form-input" placeholder="e.g. Client invoice #031, Migros groceries…">
    </div>
    <div class="grid-2" style="gap:12px;">
      <div class="form-group" style="margin-bottom:0;">
        <label class="form-label">Category</label>
        <select class="form-input form-select">
          <option>Select category…</option>
          <option>Software & Tools</option>
          <option>Meals</option>
          <option>Office</option>
          <option>Travel</option>
          <option>Income</option>
        </select>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label class="form-label">Payment method</label>
        <select class="form-input form-select">
          <option>Bank transfer</option>
          <option>Card</option>
          <option>Cash</option>
          <option>TWINT</option>
        </select>
      </div>
    </div>
    <div class="form-group" style="margin-top:12px;">
      <label class="form-label">Reference / Counterparty</label>
      <input class="form-input" placeholder="e.g. Haus AG, Migros Bahnhofstrasse…">
    </div>
    <div class="form-group">
      <label class="form-label">Note (optional)</label>
      <input class="form-input" placeholder="Internal note for this transaction">
    </div>
    <!-- Attachment -->
    <div style="border:2px dashed var(--border);border-radius:var(--radius-sm);padding:16px;text-align:center;cursor:pointer;margin-bottom:20px;transition:var(--transition);" onmouseover="this.style.borderColor='var(--brand)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="font-size:20px;margin-bottom:6px;">📎</div>
      <div style="font-size:13px;font-weight:600;color:var(--text2);">Attach receipt or document</div>
      <div style="font-size:11.5px;color:var(--text3);margin-top:2px;">JPG, PNG, PDF up to 25MB</div>
    </div>
    <div style="display:flex;gap:10px;">
      <button class="btn btn-ghost" style="flex:1;justify-content:center;" onclick="closeAddTx()">Cancel</button>
      <button class="btn btn-primary" style="flex:2;justify-content:center;padding:12px;" onclick="closeAddTx()">Save Transaction</button>
    </div>
  </div>
</div>

<script>
let currentScreen = 'dashboard';

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  const el = document.getElementById('screen-' + name);
  if (el) el.style.display = 'block';
  // If it's a main app page
  if (['dashboard','ledgers','ledger-detail','transactions','receipts','reports','settings-in-app','export'].includes(name)) {
    showScreen('app');
    switchPage(name);
    return;
  }
  // Update selector button
  document.querySelectorAll('.sdemo').forEach(b => b.classList.remove('active'));
  event && event.target && event.target.classList.add('active');
}

function switchPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const p = document.getElementById('page-' + name);
  if (p) {
    p.classList.add('active');
    document.getElementById('header-title').textContent = name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');
  }
  // Update sidebar active
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
}

// Show dashboard by default
document.addEventListener('DOMContentLoaded', () => {
  showScreen('dashboard');
  document.getElementById('screen-app').style.display = 'block';
  document.querySelector('.sdemo:nth-child(3)').classList.add('active');
});

function toggleDropdown() {
  const d = document.getElementById('user-dropdown');
  d.style.display = d.style.display === 'none' ? 'block' : 'none';
}
document.addEventListener('click', () => {
  const d = document.getElementById('user-dropdown');
  if (d) d.style.display = 'none';
});

function openAddTx() {
  document.getElementById('add-tx-modal').style.display = 'flex';
}
function closeAddTx() {
  document.getElementById('add-tx-modal').style.display = 'none';
}

function setType(btn, type) {
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

let dark = false;
function toggleTheme() {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  document.querySelector('.sdemo:last-child').textContent = dark ? '☀️ Light' : '🌙 Dark';
}

// Screen switcher buttons
document.querySelectorAll('.sdemo').forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.textContent.includes('Dark') || this.textContent.includes('Light')) return;
    document.querySelectorAll('.sdemo').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});
</script>
</body>
</html>
