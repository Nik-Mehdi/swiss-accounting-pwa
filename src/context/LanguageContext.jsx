import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  de: {
    // Navigation
    dashboard: "Dashboard", invoices: "Rechnungen", clients: "Kunden", receipts: "Belege",
    reports: "Berichte", settings: "Einstellungen", logout: "Abmelden",
    // Common Actions
    save: "Speichern", cancel: "Abbrechen", edit: "Bearbeiten", delete: "Löschen",
    view: "Ansehen", add: "Hinzufügen", search: "Suche...", new: "Neu", back: "Zurück",
    // Dashboard
    totalRevenue: "Gesamtumsatz", monthlyIncome: "Monatliches Einkommen",
    activeClients: "Aktive Kunden", pendingInvoices: "Offene Rechnungen",
    recentTransactions: "Letzte Transaktionen",
    // Invoices Page
    newInvoice: "Neue Rechnung", editInvoice: "Rechnung bearbeiten", invoiceTitle: "Rechnung",
    date: "Datum", dueDate: "Zahlbar bis", vatId: "MwSt. Nr.", grandTotal: "Betrag inkl. MWST",
    savePdf: "PDF Speichern", sharePdf: "PDF Teilen", addItem: "Position hinzufügen",
    // Clients Page
    addClient: "Kunde hinzufügen", clientName: "Kundenname", address: "Adresse",
    phone: "Telefon", email: "E-Mail", web: "Web", bank: "Bank",
    // Settings
    invoiceSettings: "Rechnungseinstellungen", prefix: "Präfix", taxId: "UID/MwSt Nr.",
    bankName: "Bankname", iban: "IBAN", street: "Strasse", zip: "PLZ", city: "Ort",
  },
  en: {
    dashboard: "Dashboard", invoices: "Invoices", clients: "Clients", receipts: "Receipts",
    reports: "Reports", settings: "Settings", logout: "Logout",
    save: "Save", cancel: "Cancel", edit: "Edit", delete: "Delete",
    view: "View", add: "Add", search: "Search...", new: "New", back: "Back",
    totalRevenue: "Total Revenue", monthlyIncome: "Monthly Income",
    activeClients: "Active Clients", pendingInvoices: "Pending Invoices",
    recentTransactions: "Recent Transactions",
    newInvoice: "New Invoice", editInvoice: "Edit Invoice", invoiceTitle: "Invoice",
    date: "Date", dueDate: "Due Date", vatId: "VAT ID", grandTotal: "Total Amount",
    savePdf: "Save PDF", sharePdf: "Share PDF", addItem: "Add Item",
    addClient: "Add Client", clientName: "Client Name", address: "Address",
    phone: "Phone", email: "Email", web: "Web", bank: "Bank",
    invoiceSettings: "Invoice Settings", prefix: "Prefix", taxId: "Tax ID",
    bankName: "Bank Name", iban: "IBAN", street: "Street", zip: "ZIP", city: "City",
  },
  fr: {
    dashboard: "Tableau de bord", invoices: "Factures", clients: "Clients", receipts: "Reçus",
    reports: "Rapports", settings: "Paramètres", logout: "Déconnexion",
    save: "Enregistrer", cancel: "Annuler", edit: "Modifier", delete: "Supprimer",
    view: "Voir", add: "Ajouter", search: "Chercher...", new: "Nouveau", back: "Retour",
    totalRevenue: "Revenu total", monthlyIncome: "Revenu mensuel",
    activeClients: "Clients actifs", pendingInvoices: "Factures en attente",
    recentTransactions: "Transactions récentes",
    newInvoice: "Nouvelle facture", editInvoice: "Modifier facture", invoiceTitle: "Facture",
    date: "Date", dueDate: "Échéance", vatId: "N° TVA", grandTotal: "Montant TTC",
    savePdf: "Enregistrer PDF", sharePdf: "Partager PDF", addItem: "Ajouter ligne",
    addClient: "Ajouter client", clientName: "Nom du client", address: "Adresse",
    phone: "Téléphone", email: "E-mail", web: "Web", bank: "Banque",
    invoiceSettings: "Paramètres de facturation", prefix: "Préfixe", taxId: "N° TVA",
    bankName: "Nom de la banque", iban: "IBAN", street: "Rue", zip: "NPA", city: "Ville",
  },
  it: {
    dashboard: "Dashboard", invoices: "Fatture", clients: "Clienti", receipts: "Ricevute",
    reports: "Rapporti", settings: "Impostazioni", logout: "Esci",
    save: "Salva", cancel: "Annulla", edit: "Modifica", delete: "Elimina",
    view: "Vedi", add: "Aggiungi", search: "Cerca...", new: "Nuovo", back: "Indietro",
    totalRevenue: "Fatturato totale", monthlyIncome: "Reddito mensile",
    activeClients: "Clienti attivi", pendingInvoices: "Fatture in sospeso",
    recentTransactions: "Transazioni recenti",
    newInvoice: "Nuova fattura", editInvoice: "Modifica fattura", invoiceTitle: "Fattura",
    date: "Data", dueDate: "Scadenza", vatId: "N. IVA", grandTotal: "Totale IVA incl.",
    savePdf: "Salva PDF", sharePdf: "Condividi PDF", addItem: "Aggiungi voce",
    addClient: "Aggiungi cliente", clientName: "Nome cliente", address: "Indirizzo",
    phone: "Telefono", email: "Email", web: "Web", bank: "Banca",
    invoiceSettings: "Impostazioni fattura", prefix: "Prefisso", taxId: "N. IVA",
    bankName: "Nome banca", iban: "IBAN", street: "Via", zip: "NAP", city: "Città",
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("appLang") || "de");
  const tr = (key) => translations[lang]?.[key] || key;
  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("appLang", newLang);
  };
  return (
    <LanguageContext.Provider value={{ lang, tr, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);