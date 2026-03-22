// src/components/Sidebar.jsx
import { useLanguage } from "../context/LanguageContext";

export const Sidebar = ({ activePage, onNavigate, t, isMobile, isOpen, onClose }) => {
  const { tr } = useLanguage();

  const menu = [
    { id: "dashboard", icon: "🏠", label: tr("dashboard") },
    { id: "ledgers", icon: "💼", label: tr("ledgers") },
    { id: "transactions", icon: "📝", label: tr("transactions") },
    { id: "clients", icon: "👥", label: tr("clients") },
    { id: "invoices", icon: "🧾", label: tr("invoices") },
    { id: "receipts", icon: "📎", label: tr("receipts") },
    { id: "reports", icon: "📊", label: tr("reports") },
    { id: "export", icon: "📥", label: tr("export") },
    { id: "billing", icon: "💳", label: tr("billing") },
    { id: "settings", icon: "⚙️", label: tr("settings") }
  ];

  const sidebarStyle = isMobile ? {
    position: "fixed", top: 0, left: isOpen ? 0 : -280, width: 260, height: "100vh",
    background: t.surface, borderRight: `1px solid ${t.border}`, zIndex: 300,
    transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)", display: "flex", flexDirection: "column",
    boxShadow: isOpen ? "4px 0 24px rgba(0,0,0,0.15)" : "none"
  } : {
    width: 240, height: "100vh", background: t.surface, borderRight: `1px solid ${t.border}`,
    display: "flex", flexDirection: "column", flexShrink: 0
  };

  return (
    <>
      {isMobile && isOpen && (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", zIndex: 250 }} />
      )}
      
      <div style={sidebarStyle}>
        <div style={{ padding: "24px 20px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: t.brand, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 18 }}>L</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>Ledgr</div>
          {isMobile && <button onClick={onClose} style={{ marginLeft: "auto", background:"none", border:"none", fontSize: 20, color: t.text3, cursor: "pointer"}}>✕</button>}
        </div>
        
        <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: t.text3, marginBottom: 8, paddingLeft: 8, marginTop: 10 }}>MENU</div>
          {menu.map(item => {
            const active = activePage === item.id;
            return (
              <button key={item.id} onClick={() => { onNavigate(item.id); if(isMobile) onClose(); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px", width: "100%",
                  background: active ? t.bg : "transparent", color: active ? t.brand : t.text2,
                  border: "none", borderRadius: 10, cursor: "pointer", textAlign: "left",
                  fontWeight: active ? 600 : 500, transition: "all 0.2s"
                }}>
                <span style={{ fontSize: 18, filter: active ? "none" : "grayscale(100%)", opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </>
  );
};