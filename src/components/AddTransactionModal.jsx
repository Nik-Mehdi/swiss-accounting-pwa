// src/components/AddTransactionModal.jsx
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Btn, FormGroup, Input, Select } from "./UI";
import { useLanguage } from "../context/LanguageContext";

// 👇 پراپ defaultLedgerName اضافه شد 👇
export const AddTransactionModal = ({ onClose, t, ledgers = [], defaultLedgerName }) => {
  const { tr } = useLanguage();
  const [txType, setTxType] = useState("expense");
  const [amount, setAmount] = useState("");
  
  // 👇 اگر defaultLedgerName پاس داده شده بود، همون رو انتخاب کن، وگرنه اولی رو بذار 👇
  const [ledger, setLedger] = useState(defaultLedgerName || (ledgers.length > 0 ? ledgers[0].name : ""));
  
  const [toLedger, setToLedger] = useState(ledgers.length > 1 ? ledgers[1].name : (ledgers.length > 0 ? ledgers[0].name : ""));
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank transfer");
  
  const [receiptFile, setReceiptFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useAuth();

  const types = [
    { key: "expense",  label: `− ${tr("expense")}`,  activeColor: t.red,   activeBg: t.redSoft },
    { key: "income",   label: `+ ${tr("income")}`,   activeColor: t.green, activeBg: t.greenSoft },
    { key: "transfer", label: `⇄ ${tr("transfer")}`, activeColor: t.blue,  activeBg: t.blueSoft },
  ];

  const expenseCategories = [
    tr("catSoftware"), tr("catMeals"), tr("catOffice"), 
    tr("catTravel"), tr("catRent"), tr("catMarketing"),
    tr("catPayroll"), tr("catTaxes"), tr("catInsurance"),
    tr("catLegal"), tr("catEquipment"), tr("catMisc")
  ];

  const incomeCategories = [
    tr("catSales"), tr("catServices"), 
    tr("catInvestments"), tr("catRefunds"), tr("catGrants"), tr("catOtherIncome")
  ];

  useEffect(() => {
    if (txType === "expense") setCategory(expenseCategories[0]);
    if (txType === "income") setCategory(incomeCategories[0]);
  }, [txType, tr]);

  const handleSaveReal = async () => {
    if (!amount || !desc || !ledger) return alert(tr("fillRequiredFields"));
    if (txType === "transfer" && ledger === toLedger) return alert(tr("sameSourceDestError"));
    
    setIsSaving(true);
    try {
      let receiptUrl = null;
      
      if (receiptFile) {
        const fileRef = ref(storage, `receipts/${currentUser.uid}/${Date.now()}_${receiptFile.name}`);
        await uploadBytes(fileRef, receiptFile); 
        receiptUrl = await getDownloadURL(fileRef); 
      }

      const finalAmount = txType === "expense" ? -Math.abs(Number(amount)) : Math.abs(Number(amount));
      
      const txData = {
        type: txType, 
        amount: finalAmount, 
        ledger, 
        date, 
        desc, 
        category: txType === "transfer" ? tr("transfer") : category, 
        paymentMethod, 
        receiptUrl, 
        timestamp: new Date().toISOString(),
        userId: currentUser.uid 
      };

      if (txType === "transfer") {
        txData.toLedger = toLedger;
        txData.amount = -Math.abs(Number(amount));
      }

      await addDoc(collection(db, "transactions"), txData);
      onClose();
    } catch (error) { alert(`${tr("errorSavingTx")}: ${error.message}`); } 
    finally { setIsSaving(false); }
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: t.surface, borderRadius: "24px 24px 0 0", padding: "28px 24px 36px", width: "100%", maxWidth: 560, maxHeight: "92vh", overflowY: "auto" }}>
        <div style={{ width: 36, height: 4, background: t.border2, borderRadius: 2, margin: "0 auto 20px" }} />
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20, color: t.text }}>{tr("newTransaction")}</div>
        
        <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
          {types.map((tp) => (
            <button key={tp.key} onClick={() => setTxType(tp.key)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 10, cursor: "pointer",
              border: `1.5px solid ${txType === tp.key ? tp.activeColor : t.border}`,
              background: txType === tp.key ? tp.activeBg : t.surface,
              color: txType === tp.key ? tp.activeColor : t.text2,
              fontFamily: "inherit", fontSize: 13, fontWeight: 700, transition: "all 0.15s",
            }}>{tp.label}</button>
          ))}
        </div>
        
        <FormGroup label={`${tr("amount")} (CHF)`}>
          <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ fontSize: 34, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", border: "none", borderBottom: `2px solid ${t.border}`, borderRadius: 0, paddingLeft: 0, letterSpacing: -1, color: t.text }} />
        </FormGroup>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormGroup label={txType === "transfer" ? tr("fromLedger") : tr("ledgerColumn")}>
            <Select value={ledger} onChange={(e) => setLedger(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }}>
              {ledgers.map((l) => <option key={l.id} value={l.name}>{l.icon} {l.name}</option>)}
            </Select>
          </FormGroup>
          {txType === "transfer" ? (
            <FormGroup label={tr("toLedger")}>
              <Select value={toLedger} onChange={(e) => setToLedger(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }}>
                {ledgers.map((l) => <option key={l.id} value={l.name}>{l.icon} {l.name}</option>)}
              </Select>
            </FormGroup>
          ) : (
            <FormGroup label={tr("date")}><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }} /></FormGroup>
          )}
        </div>
        
        <FormGroup label={tr("description")}><Input placeholder={tr("descPlaceholder")} value={desc} onChange={(e) => setDesc(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }} /></FormGroup>
        
        {txType !== "transfer" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormGroup label={tr("category")}>
              <Select value={category} onChange={(e) => setCategory(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }}>
                {txType === "expense" 
                  ? expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)
                  : incomeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)
                }
              </Select>
            </FormGroup>
            
            <FormGroup label={tr("attachReceipt")}>
              <input 
                type="file" 
                accept="image/*,application/pdf"
                onChange={(e) => setReceiptFile(e.target.files[0])}
                style={{
                  width: "100%", padding: "8px 10px", fontSize: 13, color: t.text,
                  border: `1.5px solid ${t.border}`, borderRadius: 10, background: t.surface,
                  cursor: "pointer"
                }} 
              />
            </FormGroup>
          </div>
        )}
        
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <Btn variant="ghost" onClick={onClose} fullWidth>{tr("cancel")}</Btn>
          <Btn variant="primary" onClick={handleSaveReal} fullWidth style={{ flex: 2, padding: "12px 18px", opacity: isSaving ? 0.7 : 1 }}>{isSaving ? tr("savingAndUploading") : tr("saveTransaction")}</Btn>
        </div>
      </div>
    </div>
  );
};