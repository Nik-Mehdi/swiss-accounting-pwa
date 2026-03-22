// src/components/EditLedgerModal.jsx
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Btn, FormGroup, Input, Select } from "./UI";

export const EditLedgerModal = ({ ledger, onClose, t }) => {
  const [name, setName] = useState(ledger.name);
  const [type, setType] = useState(ledger.type);
  const [openingBalance, setOpeningBalance] = useState(ledger.openingBalance || 0);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name) return alert("Please enter a ledger name.");
    setIsSaving(true);
    try {
      const ledgerRef = doc(db, "ledgers", ledger.id);
      // فقط فیلدهایی که تغییر کردن رو تو فایربیس آپدیت می‌کنیم
      await updateDoc(ledgerRef, {
        name,
        type,
        openingBalance: Number(openingBalance),
        icon: type === "Business" ? "💼" : type === "Project" ? "🔨" : "🏠",
        color: type === "Business" ? "#1B6EF3" : type === "Project" ? "#D97706" : "#059669",
        colorSoft: type === "Business" ? "#EEF4FF" : type === "Project" ? "#FFFBEB" : "#ECFDF5",
      });
      onClose();
    } catch (error) {
      alert("Error updating ledger: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: t.surface, padding: 30, borderRadius: 20, width: 400 }}>
        <h3 style={{color: t.text, marginBottom: 20}}>Edit Ledger</h3>
        <FormGroup label="Ledger Name"><Input value={name} onChange={e=>setName(e.target.value)} /></FormGroup>
        <FormGroup label="Type">
          <Select value={type} onChange={e=>setType(e.target.value)}>
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
            <option value="Project">Project</option>
          </Select>
        </FormGroup>
        <FormGroup label="Opening Balance"><Input type="number" value={openingBalance} onChange={e=>setOpeningBalance(e.target.value)} /></FormGroup>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <Btn variant="ghost" onClick={onClose} fullWidth>Cancel</Btn>
          <Btn onClick={handleSave} fullWidth>{isSaving ? "Saving..." : "Save Changes"}</Btn>
        </div>
      </div>
    </div>
  );
};