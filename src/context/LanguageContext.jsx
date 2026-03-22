import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  de: {
    dashboard: "Dashboard", invoices: "Rechnungen", clients: "Kunden", receipts: "Belege",
    reports: "Berichte", settings: "Einstellungen", logout: "Abmelden", ledgers: "Konten",
    save: "Speichern", cancel: "Abbrechen", edit: "Bearbeiten", delete: "Löschen",
    view: "Ansehen", add: "Hinzufügen", search: "Suche...", searchPlaceholder: "Suchen...", 
    new: "Neu", back: "Zurück", saving: "Wird gespeichert...", generating: "Wird generiert...",
    confirmDelete: "Möchten Sie dies wirklich löschen?", errorSave: "Fehler beim Speichern",
    errorDelete: "Fehler beim Löschen",
    
    totalRevenue: "Gesamtumsatz", monthlyIncome: "Monatliches Einkommen",
    activeClients: "Aktive Kunden", pendingInvoices: "Offene Rechnungen",
    recentTransactions: "Letzte Transaktionen", welcomeBack: "Willkommen zurück",
    financialOverviewDesc: "Hier ist Ihre finanzielle Übersicht.", income: "Einnahmen", 
    expense: "Ausgaben", quickAction: "Schnellaktion", 
    quickActionDesc: "Erstellen Sie sofort eine neue Rechnung.", viewAll: "Alle anzeigen",
    
    newInvoice: "Neue Rechnung", editInvoice: "Rechnung bearbeiten", updateInvoice: "Rechnung aktualisieren", 
    invoiceTitle: "Rechnung", invoiceNumber: "Rechnungsnummer", date: "Datum", dueDate: "Zahlbar bis", 
    vatId: "MwSt. Nr.", grandTotal: "Betrag inkl. MWST", savePdf: "PDF Speichern", sharePdf: "PDF Teilen", 
    addItem: "Position hinzufügen", selectClient: "Kunde auswählen",
    
    pos: "Pos", description: "Beschreibung", qty: "Menge", price: "Preis", total: "Total",
    subtotal: "Zwischensumme", discount: "Rabatt", vat: "MwSt.",
    
    errorClientItems: "Bitte wählen Sie einen Kunden und fügen Sie Artikel hinzu.",
    errorPdf: "Fehler beim Erstellen der PDF", errorShare: "Fehler beim Teilen",
    
    addClient: "Kunde hinzufügen", clientName: "Kundenname", address: "Adresse",
    phone: "Telefon", email: "E-Mail", web: "Web", bank: "Bank", 
    noEmail: "Keine E-Mail", noPhone: "Kein Telefon",
    
    ledgersTitle: "Meine Konten", addNewLedger: "Neues Konto", noLedgersFound: "Keine Konten gefunden.", 
    createFirstLedger: "Erstellen Sie Ihr erstes Konto, um zu beginnen.", balance: "Kontostand", type: "Typ",
    
    invoiceSettings: "Rechnungseinstellungen", prefix: "Präfix", taxId: "UID/MwSt Nr.",
    bankName: "Bankname", iban: "IBAN", street: "Strasse", zip: "PLZ", city: "Ort", country: "Land",
    startNumber: "Startnummer", vatPercent: "Standard-MwSt. (%)", invoiceEmail: "Rechnungs-E-Mail",

    ledgersDesc: "Ihre Finanzkonten und Salden", trash: "Papierkorb", inTotal: "Im Total",
    hidden: "Ausgeblendet", tx: "Trx", addAccountDesc: "Konto oder Kasse hinzufügen",

    selectLedgerFirst: "Bitte wählen Sie zuerst ein Konto aus.", transferOut: "Übertrag (Ausgang)",
    inTotalDashboard: "Im Dashboard-Total", txs: "Trx", currentBalance: "Aktueller Saldo",
    overviewTab: "Übersicht", reportsTab: "Berichte", totalIn: "Total Einnahmen",
    totalOut: "Total Ausgaben", openingBalance: "Startsaldo", transactions: "Transaktionen",
    noTransactions: "Noch keine Transaktionen.", expenseBreakdown: "Ausgabenverteilung für",
    noExpenses: "Noch keine Ausgaben zur Analyse vorhanden.", expensesCaps: "AUSGABEN",

    reportsTitle: "Berichte & Analysen", financialOverviewFor: "Finanzielle Übersicht für", exportPdf: "PDF Exportieren",
    netYtd: "Netto (Laufendes Jahr)", avgMonthlyIncome: "Ø Monatliche Einnahmen", avgMonthlyExpenses: "Ø Monatliche Ausgaben",
    savingsRate: "Sparquote", cashFlowOverview: "Cashflow Übersicht", expensesByCategory: "Ausgaben nach Kategorie",
    noExpensesYet: "Noch keine Ausgaben.", totalCaps: "TOTAL",
    jan: "Jan", feb: "Feb", mar: "Mär", apr: "Apr", may: "Mai", jun: "Jun", jul: "Jul", aug: "Aug", sep: "Sep", oct: "Okt", nov: "Nov", dec: "Dez",

    exportReports: "Export & Berichte", generateOfficialDesc: "Generieren Sie offizielle Finanzberichte und CSV-Dateien für Ihren Treuhänder.",
    reportFilters: "Berichtsfilter", selectLedger: "Konto auswählen", allLedgersConsolidated: "Alle Konten (Konsolidiert)",
    startDate: "Startdatum", endDate: "Enddatum", previewSummary: "VORSCHAU-ZUSAMMENFASSUNG", transactionsFound: "Transaktionen gefunden",
    expenses: "Ausgaben", downloadExcel: "Excel (CSV) Herunterladen", printOfficialPdf: "Drucken / Als offizielles PDF speichern",
    noTxsToExport: "Keine Transaktionen zum Exportieren in diesem Datumsbereich!", noTxsToPrint: "Keine Transaktionen zum Drucken vorhanden!",
    allAccountsConsolidated: "Alle Konten", financialReport: "Finanzbericht", yourWorkspace: "Ihr Workspace",
    officialFinancialStatement: "Offizieller Finanzbericht", ledgerColumn: "Konto", period: "Zeitraum", beginning: "Anfang", to: "bis", present: "Heute",
    totalIncomeExport: "Gesamteinnahmen", totalExpenseExport: "Gesamtausgaben", netChange: "Nettoveränderung",
    category: "Kategorie", amount: "Betrag", transfer: "Übertrag", generatedBy: "Automatisch generiert von Ledgr Workspace am",
    validForAccounting: "Dies ist ein computergeneriertes Dokument und gültig für Buchhaltungszwecke.", currency: "Währung",

    newTransaction: "Neue Transaktion", fromLedger: "Von Konto", toLedger: "Auf Konto",
    descPlaceholder: "z.B. Mittagessen mit Kunden...", attachReceipt: "Beleg anhängen",
    savingAndUploading: "Speichern & Hochladen...", saveTransaction: "Transaktion Speichern",
    fillRequiredFields: "Bitte füllen Sie Betrag, Beschreibung aus und wählen Sie ein Konto.",
    sameSourceDestError: "Quelle und Ziel dürfen nicht identisch sein!", errorSavingTx: "Fehler beim Speichern der Transaktion",
    catSoftware: "Software & Tools", catMeals: "Verpflegung & Unterhaltung", catOffice: "Büromaterial",
    catTravel: "Reisen & Transport", catRent: "Miete & Nebenkosten", catMarketing: "Marketing & Werbung",
    catPayroll: "Löhne & Gehälter", catTaxes: "Steuern & Gebühren", catInsurance: "Versicherungen",
    catLegal: "Recht & Buchhaltung", catEquipment: "Geräte & Hardware", catMisc: "Sonstiges",
    catSales: "Verkäufe / Produktumsatz", catServices: "Dienstleistungen / Beratung",
    catInvestments: "Investitionen / Zinsen", catRefunds: "Rückerstattungen", catGrants: "Fördermittel & Zuschüsse", catOtherIncome: "Sonstige Einnahmen",

    // کلمات گیت ورود (Auth)
    welcomeBackDesc: "Melden Sie sich an, um auf Ihr Konto zuzugreifen.", loginAction: "Anmelden",
    forgotPassword: "Passwort vergessen?", orContinueWith: "oder weiter mit",
    continueWithGoogle: "Weiter mit Google", continueWithApple: "Weiter mit Apple",
    noAccountYet: "Noch kein Konto?", createAccount: "Konto erstellen",
    createWorkspace: "Workspace erstellen", createWorkspaceDesc: "Erstellen Sie Ihr Konto, um loszulegen.",
    signUpAction: "Registrieren", alreadyHaveAccount: "Haben Sie bereits ein Konto?",
    errInvalidCreds: "E-Mail oder Passwort ist falsch.", errEmailInUse: "Diese E-Mail wird bereits verwendet.",
    errWeakPassword: "Das Passwort ist zu schwach (min. 6 Zeichen).", errTooManyReqs: "Zu viele Versuche. Bitte versuchen Sie es später erneut.",
    errDefaultAuth: "Ein Authentifizierungsfehler ist aufgetreten.",
    enterEmailForReset: "Bitte geben Sie Ihre E-Mail-Adresse ein, um das Passwort zurückzusetzen.",
    resetEmailSent: "Link zum Zurücksetzen gesendet! Überprüfen Sie Ihren Posteingang."
  },
  en: {
    dashboard: "Dashboard", invoices: "Invoices", clients: "Clients", receipts: "Receipts",
    reports: "Reports", settings: "Settings", logout: "Logout", ledgers: "Ledgers",
    save: "Save", cancel: "Cancel", edit: "Edit", delete: "Delete",
    view: "View", add: "Add", search: "Search...", searchPlaceholder: "Search...", 
    new: "New", back: "Back", saving: "Saving...", generating: "Generating...",
    confirmDelete: "Are you sure you want to delete this?", errorSave: "Error saving data",
    errorDelete: "Error deleting data",
    
    totalRevenue: "Total Revenue", monthlyIncome: "Monthly Income",
    activeClients: "Active Clients", pendingInvoices: "Pending Invoices",
    recentTransactions: "Recent Transactions", welcomeBack: "Welcome back",
    financialOverviewDesc: "Here is your financial overview.", income: "Income", 
    expense: "Expenses", quickAction: "Quick Action", 
    quickActionDesc: "Create a new transaction or invoice instantly.", viewAll: "View All",
    
    newInvoice: "New Invoice", editInvoice: "Edit Invoice", updateInvoice: "Update Invoice", 
    invoiceTitle: "Invoice", invoiceNumber: "Invoice Number", date: "Date", dueDate: "Due Date", 
    vatId: "VAT ID", grandTotal: "Total Amount", savePdf: "Save PDF", sharePdf: "Share PDF", 
    addItem: "Add Item", selectClient: "Select Client",
    
    pos: "Pos", description: "Description", qty: "Qty", price: "Price", total: "Total",
    subtotal: "Subtotal", discount: "Discount", vat: "VAT",
    
    errorClientItems: "Please select a client and add at least one item.",
    errorPdf: "Error generating PDF", errorShare: "Error sharing file",
    
    addClient: "Add Client", clientName: "Client Name", address: "Address",
    phone: "Phone", email: "Email", web: "Web", bank: "Bank", 
    noEmail: "No Email", noPhone: "No Phone",
    
    ledgersTitle: "My Ledgers", addNewLedger: "Add New Ledger", noLedgersFound: "No ledgers found.", 
    createFirstLedger: "Create your first ledger to get started.", balance: "Balance", type: "Type",
    
    invoiceSettings: "Invoice Settings", prefix: "Prefix", taxId: "Tax ID",
    bankName: "Bank Name", iban: "IBAN", street: "Street", zip: "ZIP", city: "City", country: "Country",
    startNumber: "Start Number", vatPercent: "Default VAT (%)", invoiceEmail: "Invoice Email",

    ledgersDesc: "Your financial accounts and balances", trash: "Trash", inTotal: "In Total",
    hidden: "Hidden", tx: "tx", addAccountDesc: "Add account or cash box",

    selectLedgerFirst: "Please select a ledger first.", transferOut: "Transfer Out",
    inTotalDashboard: "In Dashboard Total", txs: "txs", currentBalance: "Current Balance",
    overviewTab: "Overview", reportsTab: "Reports", totalIn: "Total In",
    totalOut: "Total Out", openingBalance: "Opening Balance", transactions: "Transactions",
    noTransactions: "No transactions yet.", expenseBreakdown: "Expense Breakdown for",
    noExpenses: "No expenses yet to analyze.", expensesCaps: "EXPENSES",

    reportsTitle: "Reports & Analytics", financialOverviewFor: "Financial overview for", exportPdf: "Export PDF",
    netYtd: "Net YTD", avgMonthlyIncome: "Avg Monthly Income", avgMonthlyExpenses: "Avg Monthly Expenses",
    savingsRate: "Savings Rate", cashFlowOverview: "Cash Flow Overview", expensesByCategory: "Expenses by Category",
    noExpensesYet: "No expenses yet.", totalCaps: "TOTAL",
    jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May", jun: "Jun", jul: "Jul", aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec",

    exportReports: "Export & Reports", generateOfficialDesc: "Generate official financial statements and CSV files for your accountant.",
    reportFilters: "Report Filters", selectLedger: "Select Ledger", allLedgersConsolidated: "All Ledgers (Consolidated)",
    startDate: "Start Date", endDate: "End Date", previewSummary: "PREVIEW SUMMARY", transactionsFound: "Transactions Found",
    expenses: "Expenses", downloadExcel: "Download Excel (CSV)", printOfficialPdf: "Print / Save as Official PDF",
    noTxsToExport: "No transactions to export in this date range!", noTxsToPrint: "No transactions to print!",
    allAccountsConsolidated: "All Accounts", financialReport: "Financial Report", yourWorkspace: "Your Workspace",
    officialFinancialStatement: "Official Financial Statement", ledgerColumn: "Ledger", period: "Period", beginning: "Beginning", to: "to", present: "Present",
    totalIncomeExport: "Total Income", totalExpenseExport: "Total Expenses", netChange: "Net Change",
    category: "Category", amount: "Amount", transfer: "Transfer", generatedBy: "Generated automatically by Ledgr Workspace on",
    validForAccounting: "This is a computer generated document and valid for accounting purposes.", currency: "Currency",

    newTransaction: "New Transaction", fromLedger: "From Ledger", toLedger: "To Ledger",
    descPlaceholder: "e.g. Lunch with client...", attachReceipt: "Attach Receipt",
    savingAndUploading: "Saving & Uploading...", saveTransaction: "Save Transaction",
    fillRequiredFields: "Please fill amount, description, and select a ledger.",
    sameSourceDestError: "Source and destination cannot be the same!", errorSavingTx: "Error saving transaction",
    catSoftware: "Software & Tools", catMeals: "Meals & Entertainment", catOffice: "Office Supplies",
    catTravel: "Travel & Transport", catRent: "Rent & Utilities", catMarketing: "Marketing & Ads",
    catPayroll: "Payroll & Salaries", catTaxes: "Taxes & Fees", catInsurance: "Insurance",
    catLegal: "Legal & Accounting", catEquipment: "Equipment & Hardware", catMisc: "Miscellaneous",
    catSales: "Sales / Product Revenue", catServices: "Services / Consulting",
    catInvestments: "Investments / Interest", catRefunds: "Refunds", catGrants: "Grants & Funding", catOtherIncome: "Other Income",

    // کلمات گیت ورود (Auth)
    welcomeBackDesc: "Sign in to access your workspace.", loginAction: "Sign in",
    forgotPassword: "Forgot password?", orContinueWith: "or continue with",
    continueWithGoogle: "Continue with Google", continueWithApple: "Continue with Apple",
    noAccountYet: "Don't have an account?", createAccount: "Create account",
    createWorkspace: "Create Workspace", createWorkspaceDesc: "Create your account to get started.",
    signUpAction: "Sign Up", alreadyHaveAccount: "Already have an account?",
    errInvalidCreds: "Invalid email or password.", errEmailInUse: "This email is already in use.",
    errWeakPassword: "Password is too weak (min 6 chars).", errTooManyReqs: "Too many attempts. Please try again later.",
    errDefaultAuth: "An authentication error occurred.",
    enterEmailForReset: "Please enter your email to reset your password.",
    resetEmailSent: "Password reset link sent! Check your inbox."
  },
  fr: {
    dashboard: "Tableau de bord", invoices: "Factures", clients: "Clients", receipts: "Reçus",
    reports: "Rapports", settings: "Paramètres", logout: "Déconnexion", ledgers: "Comptes",
    save: "Enregistrer", cancel: "Annuler", edit: "Modifier", delete: "Supprimer",
    view: "Voir", add: "Ajouter", search: "Chercher...", searchPlaceholder: "Rechercher...", 
    new: "Nouveau", back: "Retour", saving: "Enregistrement...", generating: "Génération...",
    confirmDelete: "Voulez-vous vraiment supprimer ceci ?", errorSave: "Erreur d'enregistrement",
    errorDelete: "Erreur de suppression",
    
    totalRevenue: "Revenu total", monthlyIncome: "Revenu mensuel",
    activeClients: "Clients actifs", pendingInvoices: "Factures en attente",
    recentTransactions: "Transactions récentes", welcomeBack: "Bon retour",
    financialOverviewDesc: "Voici votre aperçu financier.", income: "Revenus", 
    expense: "Dépenses", quickAction: "Action rapide", 
    quickActionDesc: "Créez une facture instantanément.", viewAll: "Voir tout",
    
    newInvoice: "Nouvelle facture", editInvoice: "Modifier facture", updateInvoice: "Mettre à jour", 
    invoiceTitle: "Facture", invoiceNumber: "Numéro de facture", date: "Date", dueDate: "Échéance", 
    vatId: "N° TVA", grandTotal: "Montant TTC", savePdf: "Enregistrer PDF", sharePdf: "Partager PDF", 
    addItem: "Ajouter ligne", selectClient: "Sélectionner un client",
    
    pos: "Pos", description: "Description", qty: "Qté", price: "Prix", total: "Total",
    subtotal: "Sous-total", discount: "Remise", vat: "TVA",
    
    errorClientItems: "Veuillez sélectionner un client et ajouter des articles.",
    errorPdf: "Erreur lors de la création du PDF", errorShare: "Erreur de partage",
    
    addClient: "Ajouter client", clientName: "Nom du client", address: "Adresse",
    phone: "Téléphone", email: "E-mail", web: "Web", bank: "Banque", 
    noEmail: "Pas d'e-mail", noPhone: "Pas de téléphone",
    
    ledgersTitle: "Mes Comptes", addNewLedger: "Nouveau Compte", noLedgersFound: "Aucun compte trouvé.", 
    createFirstLedger: "Créez votre premier compte pour commencer.", balance: "Solde", type: "Type",
    
    invoiceSettings: "Paramètres de facturation", prefix: "Préfixe", taxId: "N° TVA",
    bankName: "Nom de la banque", iban: "IBAN", street: "Rue", zip: "NPA", city: "Ville", country: "Pays",
    startNumber: "Numéro de départ", vatPercent: "TVA par défaut (%)", invoiceEmail: "E-mail de facturation",

    ledgersDesc: "Vos comptes financiers et soldes", trash: "Corbeille", inTotal: "Dans le total",
    hidden: "Masqué", tx: "tx", addAccountDesc: "Ajouter un compte ou une caisse",

    selectLedgerFirst: "Veuillez d'abord sélectionner un compte.", transferOut: "Transfert sortant",
    inTotalDashboard: "Dans le total du tableau de bord", txs: "txs", currentBalance: "Solde actuel",
    overviewTab: "Aperçu", reportsTab: "Rapports", totalIn: "Total Entrées",
    totalOut: "Total Sorties", openingBalance: "Solde d'ouverture", transactions: "Transactions",
    noTransactions: "Aucune transaction pour le moment.", expenseBreakdown: "Répartition des dépenses pour",
    noExpenses: "Aucune dépense à analyser pour le moment.", expensesCaps: "DÉPENSES",

    reportsTitle: "Rapports & Analyses", financialOverviewFor: "Aperçu financier pour", exportPdf: "Exporter PDF",
    netYtd: "Net cumulé", avgMonthlyIncome: "Revenu mensuel moyen", avgMonthlyExpenses: "Dépenses mensuelles moyennes",
    savingsRate: "Taux d'épargne", cashFlowOverview: "Aperçu des flux de trésorerie", expensesByCategory: "Dépenses par catégorie",
    noExpensesYet: "Aucune dépense.", totalCaps: "TOTAL",
    jan: "Janv", feb: "Févr", mar: "Mars", apr: "Avr", may: "Mai", jun: "Juin", jul: "Juil", aug: "Août", sep: "Sept", oct: "Oct", nov: "Nov", dec: "Déc",

    exportReports: "Exportations & Rapports", generateOfficialDesc: "Générez des relevés financiers officiels et des fichiers CSV pour votre comptable.",
    reportFilters: "Filtres de rapport", selectLedger: "Sélectionner le compte", allLedgersConsolidated: "Tous les comptes (Consolidés)",
    startDate: "Date de début", endDate: "Date de fin", previewSummary: "RÉSUMÉ DE L'APERÇU", transactionsFound: "Transactions trouvées",
    expenses: "Dépenses", downloadExcel: "Télécharger Excel (CSV)", printOfficialPdf: "Imprimer / Enregistrer le PDF officiel",
    noTxsToExport: "Aucune transaction à exporter dans cette plage de dates !", noTxsToPrint: "Aucune transaction à imprimer !",
    allAccountsConsolidated: "Tous les comptes", financialReport: "Rapport financier", yourWorkspace: "Votre espace",
    officialFinancialStatement: "Relevé Financier Officiel", ledgerColumn: "Compte", period: "Période", beginning: "Début", to: "à", present: "Présent",
    totalIncomeExport: "Revenu Total", totalExpenseExport: "Dépenses Totales", netChange: "Variation Nette",
    category: "Catégorie", amount: "Montant", transfer: "Transfert", generatedBy: "Généré automatiquement par Ledgr Workspace le",
    validForAccounting: "Ceci est un document généré par ordinateur et valide à des fins comptables.", currency: "Devise",

    newTransaction: "Nouvelle transaction", fromLedger: "Depuis le compte", toLedger: "Vers le compte",
    descPlaceholder: "ex: Déjeuner avec client...", attachReceipt: "Joindre un reçu",
    savingAndUploading: "Enregistrement & Téléchargement...", saveTransaction: "Enregistrer la transaction",
    fillRequiredFields: "Veuillez remplir le montant, la description et sélectionner un compte.",
    sameSourceDestError: "La source et la destination ne peuvent pas être identiques !", errorSavingTx: "Erreur lors de l'enregistrement",
    catSoftware: "Logiciels & Outils", catMeals: "Repas & Divertissement", catOffice: "Fournitures de bureau",
    catTravel: "Voyages & Transport", catRent: "Loyer & Charges", catMarketing: "Marketing & Publicité",
    catPayroll: "Salaires & Paie", catTaxes: "Taxes & Frais", catInsurance: "Assurances",
    catLegal: "Frais juridiques & comptables", catEquipment: "Matériel & Équipement", catMisc: "Divers",
    catSales: "Ventes / Chiffre d'affaires", catServices: "Services / Conseil",
    catInvestments: "Investissements / Intérêts", catRefunds: "Remboursements", catGrants: "Subventions & Financements", catOtherIncome: "Autres revenus",

    // کلمات گیت ورود (Auth)
    welcomeBackDesc: "Connectez-vous pour accéder à votre espace.", loginAction: "Se connecter",
    forgotPassword: "Mot de passe oublié ?", orContinueWith: "ou continuer avec",
    continueWithGoogle: "Continuer avec Google", continueWithApple: "Continuer avec Apple",
    noAccountYet: "Pas encore de compte ?", createAccount: "Créer un compte",
    createWorkspace: "Créer un espace de travail", createWorkspaceDesc: "Créez votre compte pour commencer.",
    signUpAction: "S'inscrire", alreadyHaveAccount: "Vous avez déjà un compte ?",
    errInvalidCreds: "E-mail ou mot de passe invalide.", errEmailInUse: "Cet e-mail est déjà utilisé.",
    errWeakPassword: "Le mot de passe est trop faible (min 6 caractères).", errTooManyReqs: "Trop de tentatives. Veuillez réessayer plus tard.",
    errDefaultAuth: "Une erreur d'authentification s'est produite.",
    enterEmailForReset: "Veuillez entrer votre e-mail pour réinitialiser le mot de passe.",
    resetEmailSent: "Lien de réinitialisation envoyé ! Vérifiez votre boîte de réception."
  },
  it: {
    dashboard: "Dashboard", invoices: "Fatture", clients: "Clienti", receipts: "Ricevute",
    reports: "Rapporti", settings: "Impostazioni", logout: "Esci", ledgers: "Conti",
    save: "Salva", cancel: "Annulla", edit: "Modifica", delete: "Elimina",
    view: "Vedi", add: "Aggiungi", search: "Cerca...", searchPlaceholder: "Cerca...", 
    new: "Nuovo", back: "Indietro", saving: "Salvataggio...", generating: "Generazione...",
    confirmDelete: "Sei sicuro di voler eliminare?", errorSave: "Errore durante il salvataggio",
    errorDelete: "Errore durante l'eliminazione",
    
    totalRevenue: "Fatturato totale", monthlyIncome: "Reddito mensile",
    activeClients: "Clienti attivi", pendingInvoices: "Fatture in sospeso",
    recentTransactions: "Transazioni recenti", welcomeBack: "Bentornato",
    financialOverviewDesc: "Ecco la tua panoramica finanziaria.", income: "Entrate", 
    expense: "Spese", quickAction: "Azione rapida", 
    quickActionDesc: "Crea istantaneamente una fattura.", viewAll: "Vedi tutto",
    
    newInvoice: "Nuova fattura", editInvoice: "Modifica fattura", updateInvoice: "Aggiorna fattura", 
    invoiceTitle: "Fattura", invoiceNumber: "Numero fattura", date: "Data", dueDate: "Scadenza", 
    vatId: "N. IVA", grandTotal: "Totale IVA incl.", savePdf: "Salva PDF", sharePdf: "Condividi PDF", 
    addItem: "Aggiungi voce", selectClient: "Seleziona cliente",
    
    pos: "Pos", description: "Descrizione", qty: "Qtà", price: "Prezzo", total: "Totale",
    subtotal: "Totale parziale", discount: "Sconto", vat: "IVA",
    
    errorClientItems: "Seleziona un cliente e aggiungi almeno un articolo.",
    errorPdf: "Errore durante la creazione del PDF", errorShare: "Errore di condivisione",
    
    addClient: "Aggiungi cliente", clientName: "Nome cliente", address: "Indirizzo",
    phone: "Telefono", email: "Email", web: "Web", bank: "Banca", 
    noEmail: "Nessuna Email", noPhone: "Nessun Telefono",
    
    ledgersTitle: "I Miei Conti", addNewLedger: "Nuovo Conto", noLedgersFound: "Nessun conto trovato.", 
    createFirstLedger: "Crea il tuo primo conto per iniziare.", balance: "Saldo", type: "Tipo",
    
    invoiceSettings: "Impostazioni fattura", prefix: "Prefisso", taxId: "N. IVA",
    bankName: "Nome banca", iban: "IBAN", street: "Via", zip: "NAP", city: "Città", country: "Paese",
    startNumber: "Numero di partenza", vatPercent: "IVA predefinita (%)", invoiceEmail: "Email fattura",

    ledgersDesc: "I tuoi conti finanziari e saldi", trash: "Cestino", inTotal: "Nel totale",
    hidden: "Nascosto", tx: "tx", addAccountDesc: "Aggiungi conto o cassa",

    selectLedgerFirst: "Seleziona prima un conto.", transferOut: "Trasferimento in uscita",
    inTotalDashboard: "Nel totale della dashboard", txs: "txs", currentBalance: "Saldo attuale",
    overviewTab: "Panoramica", reportsTab: "Rapporti", totalIn: "Totale Entrate",
    totalOut: "Totale Uscite", openingBalance: "Saldo iniziale", transactions: "Transazioni",
    noTransactions: "Nessuna transazione ancora.", expenseBreakdown: "Ripartizione delle spese per",
    noExpenses: "Nessuna spesa da analizzare ancora.", expensesCaps: "SPESE",

    reportsTitle: "Rapporti e Analisi", financialOverviewFor: "Panoramica finanziaria per", exportPdf: "Esporta PDF",
    netYtd: "Netto (Da inizio anno)", avgMonthlyIncome: "Entrate medie mensili", avgMonthlyExpenses: "Spese medie mensili",
    savingsRate: "Tasso di risparmio", cashFlowOverview: "Panoramica flusso di cassa", expensesByCategory: "Spese per categoria",
    noExpensesYet: "Nessuna spesa ancora.", totalCaps: "TOTALE",
    jan: "Gen", feb: "Feb", mar: "Mar", apr: "Apr", may: "Mag", jun: "Giu", jul: "Lug", aug: "Ago", sep: "Set", oct: "Ott", nov: "Nov", dec: "Dic",

    exportReports: "Esportazione e Rapporti", generateOfficialDesc: "Genera rendiconti finanziari ufficiali e file CSV per il tuo commercialista.",
    reportFilters: "Filtri rapporto", selectLedger: "Seleziona Conto", allLedgersConsolidated: "Tutti i Conti (Consolidati)",
    startDate: "Data di inizio", endDate: "Data di fine", previewSummary: "RIEPILOGO ANTEPRIMA", transactionsFound: "Transazioni trovate",
    expenses: "Spese", downloadExcel: "Scarica Excel (CSV)", printOfficialPdf: "Stampa / Salva come PDF Ufficiale",
    noTxsToExport: "Nessuna transazione da esportare in questo intervallo di date!", noTxsToPrint: "Nessuna transazione da stampare!",
    allAccountsConsolidated: "Tutti i Conti", financialReport: "Rapporto Finanziario", yourWorkspace: "Il tuo Workspace",
    officialFinancialStatement: "Rendiconto Finanziario Ufficiale", ledgerColumn: "Conto", period: "Periodo", beginning: "Inizio", to: "a", present: "Oggi",
    totalIncomeExport: "Entrate Totali", totalExpenseExport: "Spese Totali", netChange: "Variazione Netta",
    category: "Categoria", amount: "Importo", transfer: "Trasferimento", generatedBy: "Generato automaticamente da Ledgr Workspace il",
    validForAccounting: "Questo è un documento generato al computer e valido a fini contabili.", currency: "Valuta",

    newTransaction: "Nuova transazione", fromLedger: "Dal Conto", toLedger: "Al Conto",
    descPlaceholder: "es. Pranzo con cliente...", attachReceipt: "Allega ricevuta",
    savingAndUploading: "Salvataggio e Caricamento...", saveTransaction: "Salva transazione",
    fillRequiredFields: "Si prega di inserire importo, descrizione e selezionare un conto.",
    sameSourceDestError: "Sorgente e destinazione non possono essere uguali!", errorSavingTx: "Errore durante il salvataggio",
    catSoftware: "Software & Strumenti", catMeals: "Pasti & Intrattenimento", catOffice: "Forniture per ufficio",
    catTravel: "Viaggi & Trasporti", catRent: "Affitto & Utenze", catMarketing: "Marketing & Pubblicità",
    catPayroll: "Paghe & Stipendi", catTaxes: "Tasse & Commissioni", catInsurance: "Assicurazioni",
    catLegal: "Legale & Contabile", catEquipment: "Attrezzature & Hardware", catMisc: "Varie",
    catSales: "Vendite / Ricavi", catServices: "Servizi / Consulenza",
    catInvestments: "Investimenti / Interessi", catRefunds: "Rimborsi", catGrants: "Sovvenzioni & Finanziamenti", catOtherIncome: "Altre entrate",

    // کلمات گیت ورود (Auth)
    welcomeBackDesc: "Accedi per entrare nel tuo spazio di lavoro.", loginAction: "Accedi",
    forgotPassword: "Password dimenticata?", orContinueWith: "o continua con",
    continueWithGoogle: "Continua con Google", continueWithApple: "Continua con Apple",
    noAccountYet: "Non hai ancora un account?", createAccount: "Crea account",
    createWorkspace: "Crea Workspace", createWorkspaceDesc: "Crea il tuo account per iniziare.",
    signUpAction: "Iscriviti", alreadyHaveAccount: "Hai già un account?",
    errInvalidCreds: "Email o password non validi.", errEmailInUse: "Questa email è già in uso.",
    errWeakPassword: "La password è troppo debole (min 6 caratteri).", errTooManyReqs: "Troppi tentativi. Riprova più tardi.",
    errDefaultAuth: "Si è verificato un errore di autenticazione.",
    enterEmailForReset: "Inserisci la tua email per reimpostare la password.",
    resetEmailSent: "Link di ripristino inviato! Controlla la tua casella di posta."
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