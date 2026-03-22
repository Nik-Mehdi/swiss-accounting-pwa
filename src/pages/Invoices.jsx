// src/pages/Invoices.jsx
import { useEffect, useMemo, useState, useRef } from "react";
import {
  collection, onSnapshot, query, where, addDoc, doc,
  setDoc, deleteDoc, updateDoc, orderBy,
} from "firebase/firestore";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { Card, Btn, FormGroup, Input } from "../components/UI";

const fetchAsBase64 = async (url) => {
  const response = await fetch(url, { mode: "cors", cache: "no-cache" });
  if (!response.ok) throw new Error(`Logo fetch failed: ${response.status}`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result?.toString() || "");
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const InvoiceDocument = ({ invoice, userProfile, invoiceSettings, logoBase64, theme, tr, lang }) => {
  const dateLocale = lang === "en" ? "en-US" : "de-CH";
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "calc(297mm - 20mm)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, marginBottom: 30 }}>
        <div style={{ marginTop: 20, flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{invoice.clientName}</div>
          <div style={{ fontSize: 13, color: "#333", marginTop: 4, whiteSpace: "pre-line" }}>{invoice.clientAddress}</div>
        </div>
        <div style={{ textAlign: "left", width: 220, maxWidth: "100%" }}>
          {(logoBase64 || userProfile?.logoUrl) && (
            <img
              src={logoBase64 || userProfile.logoUrl}
              data-invoice-logo="true"
              alt="Logo"
              style={{ maxHeight: 75, maxWidth: 180, marginBottom: 12, objectFit: "contain", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          )}
          <div style={{ fontWeight: 800, fontSize: 17, color: theme.brand }}>{userProfile?.companyName}</div>
          <div style={{ fontSize: 12, color: theme.secondary, lineHeight: 1.4 }}>
            {invoiceSettings.street}<br />
            {invoiceSettings.zip && `${invoiceSettings.zip}, `}{invoiceSettings.city}<br />
            {invoiceSettings.country}
          </div>
        </div>
      </div>

      <h1 style={{ color: theme.brand, fontSize: 24, fontWeight: 800, marginTop: 12, marginBottom: 15 }}>
        {tr("invoiceTitle")}
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, paddingBottom: 10, marginBottom: 25, borderBottom: `0.5px solid ${theme.border}`, fontSize: 11.5 }}>
        <div><span style={{ color: theme.secondary }}>{tr("date")}:</span> <strong>{invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString(dateLocale) : "-"}</strong></div>
        <div><span style={{ color: theme.secondary }}>{tr("dueDate")}:</span> <strong>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString(dateLocale) : "-"}</strong></div>
        <div><span style={{ color: theme.secondary }}>{tr("vatId")}:</span> <strong>{invoiceSettings.taxId || "-"}</strong></div>
        <div><span style={{ color: theme.secondary }}>{tr("invoiceNumber")}:</span> <strong>{invoice.invoiceNumber}</strong></div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 25 }}>
        <thead>
          <tr style={{ borderTop: `1.5px solid ${theme.brand}`, borderBottom: `1px solid ${theme.border}` }}>
            {[
              { label: tr("pos"), align: "left" },
              { label: tr("description"), align: "left" },
              { label: tr("qty"), align: "center" },
              { label: tr("price"), align: "right" },
              { label: tr("total"), align: "right" },
            ].map((h) => (
              <th key={h.label} style={{ textAlign: h.align, padding: "8px 5px", fontSize: 11, color: theme.brand }}>{h.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(invoice.items || []).map((item, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 5px", fontSize: 12 }}>{i + 1}</td>
              <td style={{ padding: "8px 5px", fontSize: 12, fontWeight: 700 }}>{item.description}</td>
              <td style={{ padding: "8px 5px", fontSize: 12, textAlign: "center" }}>{item.qty}</td>
              <td style={{ padding: "8px 5px", textAlign: "right", fontSize: 12 }}>{Number(item.price || 0).toLocaleString(dateLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td style={{ padding: "8px 5px", textAlign: "right", fontSize: 12 }}>{Number((item.qty || 0) * (item.price || 0)).toLocaleString(dateLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 40 }}>
        <table style={{ width: 280, fontSize: 13, borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "3px 0" }}>{tr("subtotal")}</td>
              <td style={{ textAlign: "right" }}>{Number(invoice.subtotal || 0).toLocaleString(dateLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
            {Number(invoice.discount || 0) > 0 && (
              <tr>
                <td style={{ padding: "3px 0", color: theme.secondary }}>{tr("discount")}</td>
                <td style={{ textAlign: "right" }}>- {Number(invoice.discount || 0).toLocaleString(dateLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "3px 0", color: theme.secondary }}>{tr("vat")} {invoice.vatRate || 0}%</td>
              <td style={{ textAlign: "right" }}>{Number(invoice.vatAmount || 0).toLocaleString(dateLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
            <tr style={{ borderTop: `1.5px solid ${theme.text}`, borderBottom: `1.5px solid ${theme.text}` }}>
              <td style={{ padding: "10px 0", fontSize: 14, fontWeight: 900 }}>{tr("grandTotal")}</td>
              <td style={{ textAlign: "right", padding: "10px 0", fontSize: 14, fontWeight: 900 }}>{Number(invoice.totalAmount || 0).toLocaleString(dateLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "auto", borderTop: `1px solid ${theme.border}`, paddingTop: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 10, fontSize: 9.5, color: theme.secondary }}>
          <div><strong>{userProfile?.companyName}</strong><br />{invoiceSettings.street}, {invoiceSettings.zip} {invoiceSettings.city}</div>
          <div><strong>{tr("email")}:</strong> {invoiceSettings.companyEmail || "-"}<br /><strong>{tr("web")}:</strong> {invoiceSettings.website || "-"}</div>
          <div><strong>{tr("bank")}:</strong> {invoiceSettings.bankName || "-"}<br /><strong>IBAN:</strong> {invoiceSettings.iban || "-"}</div>
        </div>
      </div>
    </div>
  );
};

export const InvoicesPage = ({ t, isMobile }) => {
  const { currentUser } = useAuth();
  const { tr, lang } = useLanguage();

  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [invoiceSettings, setInvoiceSettings] = useState({
    prefix: "RE-", lastNumber: 1000, defaultVat: 8.1, bankName: "",
    accountHolder: "", iban: "", bic: "", taxId: "", contactPerson: "",
    website: "", companyEmail: "", dueDays: 30, street: "", zip: "",
    city: "", country: "Schweiz", footerIntro: "Danke für Ihr Vertrauen.",
  });

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedInvoiceForPdf, setSelectedInvoiceForPdf] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [items, setItems] = useState([{ description: "", qty: 1, price: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [logoBase64, setLogoBase64] = useState("");
  const logoBase64Ref = useRef("");

  const dateLocale = lang === "en" ? "en-US" : "de-CH";

  useEffect(() => { logoBase64Ref.current = logoBase64; }, [logoBase64]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubUser = onSnapshot(doc(db, "users", currentUser.uid), (snap) => { if (snap.exists()) setUserProfile(snap.data()); });
    const unsubSettings = onSnapshot(doc(db, "invoiceSettings", currentUser.uid), (snap) => { if (snap.exists()) setInvoiceSettings((prev) => ({ ...prev, ...snap.data() })); });
    const unsubClients = onSnapshot(query(collection(db, "clients"), where("userId", "==", currentUser.uid)), (snap) => setClients(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    const unsubInvoices = onSnapshot(query(collection(db, "invoices"), where("userId", "==", currentUser.uid), orderBy("createdAt", "desc")), (snap) => setInvoices(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return () => { unsubUser(); unsubSettings(); unsubClients(); unsubInvoices(); };
  }, [currentUser]);

  useEffect(() => {
    let cancelled = false;
    const loadLogo = async () => {
      const logoUrl = userProfile?.logoUrl;
      if (!logoUrl) { setLogoBase64(""); return; }
      try {
        const dataUrl = await fetchAsBase64(logoUrl);
        if (!cancelled) setLogoBase64(dataUrl);
      } catch (err) { if (!cancelled) { setLogoBase64(""); console.warn("Logo failed:", err); } }
    };
    loadLogo();
    return () => { cancelled = true; };
  }, [userProfile?.logoUrl]);

  const validItems = useMemo(() => items.filter((i) => i.description.trim() !== ""), [items]);
  const subtotal = useMemo(() => validItems.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0), [validItems]);
  const netAmount = Math.max(0, subtotal - Number(discount || 0));
  const vatRate = Number(invoiceSettings.defaultVat) || 0;
  const vatAmount = netAmount * (vatRate / 100);
  const grandTotal = netAmount + vatAmount;

  const theme = { brand: "#966f42", text: "#1a1a1a", secondary: "#555", border: "#e5e7eb", bgSoft: "#f8f6f3" };

  const resetInvoiceForm = () => { setEditingId(null); setSelectedClient(null); setClientSearch(""); setShowDropdown(false); setItems([{ description: "", qty: 1, price: 0 }]); setDiscount(0); setIsSaving(false); };
  const closeInvoiceModal = () => { setIsInvoiceModalOpen(false); resetInvoiceForm(); };
  const openNewInvoiceModal = () => { resetInvoiceForm(); setIsInvoiceModalOpen(true); };

  const handleAddItem = (e) => { if (e) e.preventDefault(); setItems((prev) => [...prev, { description: "", qty: 1, price: 0 }]); };

  const handleItemChange = (index, field, value) => {
    setItems((prev) => prev.map((item, i) => i === index ? { ...item, [field]: field === "description" ? value : value === "" ? "" : Number(value) } : item));
  };

  const handleRemoveItem = (e, index) => {
    if (e) e.preventDefault();
    setItems((prev) => prev.length === 1 ? [{ description: "", qty: 1, price: 0 }] : prev.filter((_, i) => i !== index));
  };

  const handleEditInvoice = (invoice) => {
    setEditingId(invoice.id);
    setSelectedClient({ id: invoice.clientId, name: invoice.clientName || "", address: invoice.clientAddress || "" });
    setClientSearch(invoice.clientName || "");
    setShowDropdown(false);
    setItems(Array.isArray(invoice.items) && invoice.items.length > 0 ? invoice.items.map((item) => ({ description: item.description || "", qty: Number(item.qty ?? 1), price: Number(item.price ?? 0) })) : [{ description: "", qty: 1, price: 0 }]);
    setDiscount(Number(invoice.discount || 0));
    setSelectedInvoiceForPdf(null);
    setIsInvoiceModalOpen(true);
  };

  const handleDeleteInvoice = async (invoiceId) => {
    if (!window.confirm(tr("confirmDelete"))) return;
    try {
      await deleteDoc(doc(db, "invoices", invoiceId));
      if (selectedInvoiceForPdf?.id === invoiceId) setSelectedInvoiceForPdf(null);
    } catch (error) { alert(tr("errorDelete") + ": " + error.message); }
  };

  const handleSaveInvoice = async (e) => {
    e.preventDefault();
    if (!selectedClient || validItems.length === 0) { alert(tr("errorClientItems")); return; }
    setIsSaving(true);
    try {
      const nowIso = new Date().toISOString();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + Number(invoiceSettings.dueDays || 30));
      const invoiceData = {
        userId: currentUser.uid, clientId: selectedClient.id,
        clientName: selectedClient.name || "", clientAddress: selectedClient.address || "",
        items: validItems.map((item) => ({ description: item.description, qty: Number(item.qty || 0), price: Number(item.price || 0) })),
        subtotal, discount: Number(discount || 0), vatRate, vatAmount,
        totalAmount: grandTotal, dueDate: dueDate.toISOString(), status: "Issued", updatedAt: nowIso,
      };
      if (editingId) {
        const existing = invoices.find((inv) => inv.id === editingId);
        await updateDoc(doc(db, "invoices", editingId), { ...invoiceData, invoiceNumber: existing?.invoiceNumber || "", numericNumber: existing?.numericNumber ?? null, createdAt: existing?.createdAt || nowIso });
      } else {
        const nextNumber = Number(invoiceSettings.lastNumber || 1000) + 1;
        await addDoc(collection(db, "invoices"), { ...invoiceData, invoiceNumber: `${invoiceSettings.prefix}${nextNumber}`, numericNumber: nextNumber, createdAt: nowIso });
        await setDoc(doc(db, "invoiceSettings", currentUser.uid), { lastNumber: nextNumber }, { merge: true });
      }
      closeInvoiceModal();
    } catch (error) { alert(tr("errorSave") + ": " + error.message); }
    finally { setIsSaving(false); }
  };

  const filteredClients = clients.filter((c) => (c.name || "").toLowerCase().includes(clientSearch.toLowerCase()));
  const getInvoiceFileName = (invoice) => `${invoice?.invoiceNumber || "invoice"}.pdf`;

  const generatePdfBlob = async () => {
    const element = document.getElementById("printable-invoice");
    if (!element) throw new Error("Invoice element not found.");
    let logoForExport = logoBase64Ref.current;
    if (!logoForExport && userProfile?.logoUrl) {
      try { logoForExport = await fetchAsBase64(userProfile.logoUrl); setLogoBase64(logoForExport); }
      catch (err) { console.warn("On-demand logo fetch failed:", err); logoForExport = ""; }
    }
    const originalBoxShadow = element.style.boxShadow;
    element.style.boxShadow = "none";
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => setTimeout(resolve, 150));
    const canvas = await html2canvas(element, {
      scale: 2, useCORS: true, allowTaint: false, backgroundColor: "#ffffff",
      logging: false, imageTimeout: 20000, windowWidth: element.scrollWidth, windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedRoot = clonedDoc.getElementById("printable-invoice");
        if (!clonedRoot) return;
        clonedRoot.style.boxShadow = "none";
        const clonedLogo = clonedRoot.querySelector("[data-invoice-logo='true']");
        if (clonedLogo) {
          if (logoForExport) { clonedLogo.setAttribute("src", logoForExport); clonedLogo.removeAttribute("crossorigin"); }
          else { clonedLogo.style.display = "none"; }
        }
      },
    });
    element.style.boxShadow = originalBoxShadow;
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    const pageWidth = 210, pageHeight = 297;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let heightLeft = imgHeight, position = 0;
    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;
    while (heightLeft > 0) { position -= pageHeight; pdf.addPage(); pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight, undefined, "FAST"); heightLeft -= pageHeight; }
    return pdf.output("blob");
  };

  const handleDownloadPdf = async () => {
    if (!selectedInvoiceForPdf) return;
    try {
      setIsExportingPdf(true);
      const blob = await generatePdfBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = getInvoiceFileName(selectedInvoiceForPdf);
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) { alert(tr("errorPdf") + ": " + error.message); }
    finally { setIsExportingPdf(false); }
  };

  const handleSharePdf = async () => {
    if (!selectedInvoiceForPdf) return;
    try {
      setIsExportingPdf(true);
      const blob = await generatePdfBlob();
      const file = new File([blob], getInvoiceFileName(selectedInvoiceForPdf), { type: "application/pdf" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: selectedInvoiceForPdf.invoiceNumber || "Invoice", files: [file] });
      } else {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 3000);
      }
    } catch (error) { if (error?.name !== "AbortError") alert(tr("errorShare") + ": " + error.message); }
    finally { setIsExportingPdf(false); }
  };

  const invoicePaperStyle = {
    width: "210mm", minHeight: "297mm", background: "#fff", padding: "10mm 15mm",
    boxSizing: "border-box", position: "relative", fontFamily: "Arial, sans-serif",
    color: theme.text, display: "flex", flexDirection: "column",
  };

  return (
    <div className="invoices-container">
      <style>{`
        .invoice-items-grid { display: grid; grid-template-columns: 3fr 1fr 1fr auto; gap: 10px; margin-bottom: 10px; align-items: center; }
        @media (max-width: 768px) {
          .invoice-items-grid { grid-template-columns: 1fr 1fr; }
          .invoice-items-grid .item-desc { grid-column: 1 / -1; }
          .invoice-items-grid .item-remove { grid-column: 1 / -1; }
        }
      `}</style>

      {/* ── Invoice list ── */}
      <div className="no-print">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ color: t.text, margin: 0 }}>🧾 {tr("invoices")}</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost" onClick={() => setIsSettingsModalOpen(true)}>⚙️ {tr("settings")}</Btn>
            <Btn onClick={openNewInvoiceModal}>+ {tr("newInvoice")}</Btn>
          </div>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {invoices.map((inv) => (
            <Card key={inv.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 700, color: t.text }}>{inv.invoiceNumber}</div>
                <div style={{ fontSize: 13, color: t.text2 }}>{inv.clientName}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 800, color: t.brand, marginRight: 10, minWidth: 110, textAlign: "right" }}>
                  {Number(inv.totalAmount || 0).toLocaleString(dateLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CHF
                </div>
                <Btn variant="ghost" onClick={() => setSelectedInvoiceForPdf(inv)} style={{ padding: "6px 12px" }}>📄 {tr("view")}</Btn>
                <Btn variant="ghost" onClick={() => handleEditInvoice(inv)} style={{ padding: "6px 12px" }}>✏️ {tr("edit")}</Btn>
                <button type="button" onClick={() => handleDeleteInvoice(inv.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>🗑️</button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Settings modal ── */}
      {isSettingsModalOpen && (
        <div className="no-print" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <Card style={{ width: "100%", maxWidth: 760, maxHeight: "90vh", overflowY: "auto", padding: 30 }}>
            <h3 style={{ marginBottom: 20 }}>⚙️ {tr("invoiceSettings")}</h3>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 15 }}>
              {[
                [tr("prefix"), "prefix"],
                [tr("startNumber"), "lastNumber", "number"],
                [tr("street"), "street"],
                [tr("zip"), "zip"],
                [tr("city"), "city"],
                [tr("country"), "country"],
                [tr("taxId"), "taxId"],
                [tr("vatPercent"), "defaultVat", "number"],
                ["IBAN", "iban"],
                [tr("bankName"), "bankName"],
                [tr("website"), "website"],
                [tr("invoiceEmail"), "companyEmail"],
              ].map(([label, key, type]) => (
                <FormGroup key={key} label={label}>
                  <Input type={type || "text"} step={key === "defaultVat" ? "0.1" : undefined}
                    value={invoiceSettings[key]}
                    onChange={(e) => setInvoiceSettings({ ...invoiceSettings, [key]: e.target.value })} />
                </FormGroup>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <Btn fullWidth onClick={async () => { await setDoc(doc(db, "invoiceSettings", currentUser.uid), invoiceSettings, { merge: true }); setIsSettingsModalOpen(false); }}>{tr("save")}</Btn>
              <Btn variant="ghost" fullWidth onClick={() => setIsSettingsModalOpen(false)}>{tr("cancel")}</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* ── Invoice preview / PDF overlay ── */}
      {selectedInvoiceForPdf && (
        <div style={{ position: "fixed", inset: 0, background: "#1f1f1f", zIndex: 2000, overflowY: "auto", padding: isMobile ? "16px" : "20px 0" }}>
          <div style={{ maxWidth: "210mm", margin: "0 auto 16px", display: "flex", justifyContent: "space-between", gap: 10, padding: "0 10px", flexWrap: "wrap" }}>
            <Btn variant="ghost" onClick={() => setSelectedInvoiceForPdf(null)} style={{ color: "#fff" }}>← {tr("back")}</Btn>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Btn variant="ghost" onClick={() => handleEditInvoice(selectedInvoiceForPdf)} style={{ color: "#fff" }}>✏️ {tr("edit")}</Btn>
              <Btn onClick={handleDownloadPdf} disabled={isExportingPdf}>{isExportingPdf ? tr("generating") : `⬇️ ${tr("savePdf")}`}</Btn>
              <Btn onClick={handleSharePdf} disabled={isExportingPdf}>{isExportingPdf ? tr("generating") : `📤 ${tr("sharePdf")}`}</Btn>
            </div>
          </div>

          {isMobile ? (
            <>
              <div style={{ maxWidth: "210mm", margin: "0 auto", padding: "0 10px" }}>
                <Card style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedInvoiceForPdf.invoiceNumber}</div>
                      <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{selectedInvoiceForPdf.clientName}</div>
                    </div>
                    {(logoBase64 || userProfile?.logoUrl) && (
                      <img src={logoBase64 || userProfile.logoUrl} alt="Logo"
                        style={{ maxHeight: 48, maxWidth: 100, objectFit: "contain" }}
                        onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13, marginBottom: 16 }}>
                    <div><span style={{ color: "#999" }}>{tr("date")}:</span><br /><strong>{selectedInvoiceForPdf.createdAt ? new Date(selectedInvoiceForPdf.createdAt).toLocaleDateString(dateLocale) : "-"}</strong></div>
                    <div><span style={{ color: "#999" }}>{tr("dueDate")}:</span><br /><strong>{selectedInvoiceForPdf.dueDate ? new Date(selectedInvoiceForPdf.dueDate).toLocaleDateString(dateLocale) : "-"}</strong></div>
                  </div>
                  <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
                    {(selectedInvoiceForPdf.items || []).map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                        <span>{item.description} × {item.qty}</span>
                        <span>{Number((item.qty || 0) * (item.price || 0)).toLocaleString(dateLocale, { minimumFractionDigits: 2 })} CHF</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: "2px solid #1a1a1a", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 16 }}>
                    <span>{tr("grandTotal")}</span>
                    <span>{Number(selectedInvoiceForPdf.totalAmount || 0).toLocaleString(dateLocale, { minimumFractionDigits: 2 })} CHF</span>
                  </div>
                </Card>
              </div>
              <div style={{ position: "absolute", left: "-9999px", top: 0, width: "210mm", overflow: "hidden" }}>
                <div id="printable-invoice" style={invoicePaperStyle}>
                  <InvoiceDocument invoice={selectedInvoiceForPdf} userProfile={userProfile} invoiceSettings={invoiceSettings} logoBase64={logoBase64} theme={theme} tr={tr} lang={lang} />
                </div>
              </div>
            </>
          ) : (
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <div id="printable-invoice" style={{ ...invoicePaperStyle, boxShadow: "0 10px 40px rgba(0,0,0,0.35)", margin: "0 auto" }}>
                <InvoiceDocument invoice={selectedInvoiceForPdf} userProfile={userProfile} invoiceSettings={invoiceSettings} logoBase64={logoBase64} theme={theme} tr={tr} lang={lang} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Create / Edit modal ── */}
      {isInvoiceModalOpen && (
        <div className="no-print" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <Card style={{ width: "100%", maxWidth: 700, padding: 30, maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ marginTop: 0 }}>{editingId ? tr("editInvoice") : tr("newInvoice")}</h3>
            <form onSubmit={handleSaveInvoice}>
              <div style={{ position: "relative", marginBottom: 20 }}>
                <FormGroup label={tr("selectClient")}>
                  <Input placeholder={tr("search")} value={clientSearch}
                    onChange={(e) => { setClientSearch(e.target.value); setShowDropdown(true); if (!e.target.value.trim()) setSelectedClient(null); }}
                    onFocus={() => setShowDropdown(true)} />
                </FormGroup>
                {showDropdown && filteredClients.length > 0 && (
                  <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, zIndex: 10, maxHeight: 220, overflowY: "auto" }}>
                    {filteredClients.map((c) => (
                      <div key={c.id} style={{ padding: 10, cursor: "pointer" }} onClick={() => { setSelectedClient(c); setClientSearch(c.name); setShowDropdown(false); }}>{c.name}</div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ background: theme.bgSoft, padding: 15, borderRadius: 12, marginBottom: 15 }}>
                {items.map((item, index) => (
                  <div key={index} className="invoice-items-grid">
                    <div className="item-desc"><Input placeholder={tr("description")} value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} /></div>
                    <Input type="number" placeholder={tr("qty")} value={item.qty} onChange={(e) => handleItemChange(index, "qty", e.target.value)} />
                    <Input type="number" placeholder={tr("price")} value={item.price} onChange={(e) => handleItemChange(index, "price", e.target.value)} />
                    <div className="item-remove">
                      <button type="button" onClick={(e) => handleRemoveItem(e, index)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>✕</button>
                    </div>
                  </div>
                ))}
                <Btn type="button" variant="ghost" onClick={handleAddItem}>+ {tr("addItem")}</Btn>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                <div>{tr("discount")}: <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} style={{ width: 80 }} /></div>
                <div style={{ fontSize: 18, fontWeight: 900 }}>{grandTotal.toLocaleString(dateLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CHF</div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <Btn type="submit" disabled={isSaving} style={{ flex: 1 }}>{isSaving ? tr("saving") : editingId ? tr("updateInvoice") : tr("save")}</Btn>
                <Btn type="button" variant="ghost" onClick={(e) => { e.preventDefault(); closeInvoiceModal(); }} style={{ flex: 1 }}>{tr("cancel")}</Btn>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};