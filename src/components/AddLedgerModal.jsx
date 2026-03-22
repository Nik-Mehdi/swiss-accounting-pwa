// src/components/AddLedgerModal.jsx
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Btn, FormGroup, Input, Select } from "./UI";

// لیست ارزهای جهان
const CURRENCIES = [
  { code: "CHF", name: "Swiss Franc" },
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
  { code: "GBP", name: "British Pound" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "AED", name: "UAE Dirham" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "IRR", name: "Iranian Rial" },
  { code: "INR", name: "Indian Rupee" },
  { code: "SEK", name: "Swedish Krona" }
];

export const AddLedgerModal = ({ onClose, t }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Personal");
  const [currency, setCurrency] = useState("CHF"); // پیش‌فرض روی فرانک
  const [openingBalance, setOpeningBalance] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useAuth();

  const handleSave = async () => {
    if (!name) return alert("Please enter a ledger name.");
    setIsSaving(true);
    try {
      await addDoc(collection(db, "ledgers"), {
        name,
        type,
        currency, // ارز انتخاب شده تو دیتابیس ذخیره می‌شه
        openingBalance: Number(openingBalance) || 0,
        icon: type === "Business" ? "💼" : type === "Project" ? "🔨" : "🏠",
        color: type === "Business" ? "#1B6EF3" : type === "Project" ? "#D97706" : "#059669",
        colorSoft: type === "Business" ? "#EEF4FF" : type === "Project" ? "#FFFBEB" : "#ECFDF5",
        included: true,
        userId: currentUser.uid,
        timestamp: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      alert("Error saving ledger: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: t.surface, padding: 30, borderRadius: 24, width: "100%", maxWidth: 420, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 24 }}>Create New Ledger</h3>
        
        <FormGroup label="Ledger Name">
          <Input placeholder="e.g. Main Bank Account" value={name} onChange={e=>setName(e.target.value)} style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.text }} />
        </FormGroup>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormGroup label="Type">
            <Select value={type} onChange={e=>setType(e.target.value)} style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.text }}>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Project">Project</option>
            </Select>
          </FormGroup>
          
          {/* 👇 کشوی انتخاب ارزهای جهان 👇 */}
          <FormGroup label="Currency">
            <Select value={currency} onChange={e=>setCurrency(e.target.value)} style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontWeight: 600 }}>
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </Select>
          </FormGroup>
        </div>

        <FormGroup label="Opening Balance (Optional)">
          <Input type="number" placeholder="0.00" value={openingBalance} onChange={e=>setOpeningBalance(e.target.value)} style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontFamily: "'JetBrains Mono', monospace" }} />
        </FormGroup>
        
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <Btn variant="ghost" onClick={onClose} fullWidth style={{ padding: "12px 0" }}>Cancel</Btn>
          <Btn onClick={handleSave} fullWidth style={{ padding: "12px 0", opacity: isSaving ? 0.7 : 1 }}>{isSaving ? "Creating..." : "Create Ledger"}</Btn>
        </div>
      </div>
    </div>
  );
};