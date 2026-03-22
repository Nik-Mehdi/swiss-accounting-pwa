// src/components/Header.jsx
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export const Header = ({ title, sub, dark, onToggleDark, onOpenAddTx, t, onToggleSidebar, isMobile, transactions = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  const { lang, changeLang, tr } = useLanguage();

  const filteredTxs = transactions.filter(tx => {
    const query = searchQuery.toLowerCase();
    return (
      tx.desc?.toLowerCase().includes(query) ||
      tx.category?.toLowerCase().includes(query) ||
      tx.ledger?.toLowerCase().includes(query) ||
      tx.amount?.toString().includes(query) ||
      tx.date?.includes(query)
    );
  }).slice(0, 6);

  const langBtnStyle = (l) => ({
    background: lang === l ? t.brand : "transparent",
    color: lang === l ? "#fff" : t.text2,
    border: `1px solid ${lang === l ? t.brand : t.border}`,
    borderRadius: 6,
    padding: "4px 6px",
    fontSize: 11,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: 32
  });

  return (
    <div style={{ position: "relative", zIndex: 100 }}>
      <div style={{ padding: isMobile ? "12px 16px" : "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${t.border}`, background: t.surface, gap: 12 }}>
        
        {/* سمت چپ: عنوان و دکمه منوی موبایل */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: isMobile ? "auto" : "200px" }}>
          {isMobile && (
            <button onClick={onToggleSidebar} style={{ background: "transparent", border: "none", fontSize: 24, color: t.text, cursor: "pointer", padding: 0, display: "flex" }}>
              ☰
            </button>
          )}
          {!isMobile && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.5 }}>{title}</h1>
              <div style={{ fontSize: 12, color: t.text3, marginTop: 2 }}>{sub}</div>
            </div>
          )}
        </div>

        {/* 🔍 نوار جستجو (وسط) 🔍 */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative", maxWidth: 400 }}>
           <input 
             type="text" 
             placeholder={tr('searchPlaceholder')}
             value={searchQuery}
             onChange={(e) => {
               setSearchQuery(e.target.value);
               setShowResults(e.target.value.length > 0);
             }}
             onFocus={() => setShowResults(searchQuery.length > 0)}
             onBlur={() => setTimeout(() => setShowResults(false), 200)}
             style={{
               width: "100%", padding: "10px 16px 10px 36px", borderRadius: 20,
               border: `1px solid ${t.border}`, background: t.bg, color: t.text,
               fontSize: 14, outline: "none", transition: "all 0.2s"
             }}
           />
           <span style={{ position: "absolute", left: 12, top: 10, color: t.text3, fontSize: 14 }}>🔍</span>
        </div>

        {/* سمت راست: تغییر زبان، حالت شب و دکمه جدید */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: isMobile ? "auto" : "auto", justifyContent: "flex-end" }}>
           
           {/* 🌍 سوئیچر زبان فقط برای دسکتاپ (تو موبایل میره تو سایدبار) */}
           {!isMobile && (
             <div style={{ display: "flex", gap: 4, marginRight: 8, background: t.bg, padding: 3, borderRadius: 8, border: `1px solid ${t.border}` }}>
               {['de', 'fr', 'it', 'en'].map(l => (
                 <button key={l} onClick={() => changeLang(l)} style={langBtnStyle(l)}>
                   {l.toUpperCase()}
                 </button>
               ))}
             </div>
           )}

           <button onClick={onToggleDark} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
             {dark ? "☀️" : "🌙"}
           </button>
           
           <button onClick={onOpenAddTx} style={{ background: t.brand, color: "#fff", border: "none", borderRadius: 8, padding: isMobile ? "0 12px" : "0 16px", height: 36, fontWeight: 600, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
             <span>+</span> {!isMobile && tr('new')}
           </button>
        </div>
      </div>

      {/* 📂 نتایج جستجو */}
      {showResults && searchQuery && (
        <div style={{ 
          position: "absolute", top: "100%", left: isMobile ? 10 : "50%", 
          transform: isMobile ? "none" : "translateX(-50%)", 
          width: isMobile ? "calc(100% - 20px)" : 450, 
          background: t.surface, border: `1px solid ${t.border}`, 
          borderRadius: 16, boxShadow: "0 12px 40px rgba(0,0,0,0.15)", 
          padding: 12, marginTop: 8, zIndex: 200 
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.text3, marginBottom: 12, paddingLeft: 8, letterSpacing: 0.5 }}>SEARCH RESULTS</div>
          {filteredTxs.length === 0 ? (
            <div style={{ padding: 20, color: t.text3, fontSize: 13, textAlign: "center" }}>No results for "{searchQuery}"</div>
          ) : (
            filteredTxs.map(tx => (
              <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px 10px", borderBottom: `1px solid ${t.border2}`, alignItems: "center", cursor: "pointer", borderRadius: 8 }}>
                <div style={{ overflow: "hidden", paddingRight: 10 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{tx.desc}</div>
                  <div style={{ fontSize: 11, color: t.text3, marginTop: 4 }}>{tx.category} · {tx.ledger}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: tx.type === "expense" ? t.red : t.green, whiteSpace: "nowrap" }}>
                   {tx.type === "expense" ? "-" : "+"} {Math.abs(Number(tx.amount)).toLocaleString("de-CH", {minimumFractionDigits: 2})}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};