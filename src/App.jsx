// src/App.jsx
// ============================================================
//  LEDGR — Full PWA Accounting App UI (Phase 11 - Invoices)
// ============================================================

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

import { tokens } from "./styles/tokens";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { AddTransactionModal } from "./components/AddTransactionModal";
import { AddLedgerModal } from "./components/AddLedgerModal";
import { EditLedgerModal } from "./components/EditLedgerModal";
import { Card, FormGroup, Input, Btn } from "./components/UI";
import { TxItem } from "./components/TxItem";

import { calculateDynamicLedgers } from "./utils/ledgerMath";

import { DashboardPage } from "./pages/Dashboard";
import { LedgersPage } from "./pages/Ledgers";
import { LedgerDetailPage } from "./pages/LedgerDetail";
import { TrashPage } from "./pages/Trash";
import { ReceiptsPage } from "./pages/Receipts";
import { ReportsPage } from "./pages/Reports";
import { ExportPage } from "./pages/Export";
import { SettingsPage } from "./pages/Settings";
import { ProfilePage } from "./pages/Profile";
import { BillingPage } from "./pages/Billing";
import { ClientsPage } from "./pages/Clients";
import { InvoicesPage } from "./pages/Invoices";

const TransactionsPage = ({ t, transactions, onDeleteTx }) => (
  <div>
    <h2 style={{color: t.text, marginBottom: 20, fontSize: 20, fontWeight: 700}}>Transactions</h2>
    <Card>
      {transactions.length === 0 ? (
        <div style={{ padding: 20, textAlign: "center", color: t.text3 }}>No transactions yet.</div>
      ) : (
        transactions.map(tx => <TxItem key={tx.id} tx={tx} onDelete={onDeleteTx} />)
      )}
    </Card>
  </div>
);

// --- AUTH PAGES ---
const LoginPage = ({ onGoOnboarding, t }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try { await login(email, password); } catch (err) { setError("Sign in failed."); }
    setLoading(false);
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: t.bg, alignItems: "center", justifyContent: "center", padding: 20 }}>
      <Card style={{ width: "100%", maxWidth: 400, padding: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: t.text }}>Welcome back</h2>
        {error && <div style={{ background: t.redSoft, color: t.red, padding: 10, borderRadius: 8, marginBottom: 15, fontSize: 13 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <FormGroup label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></FormGroup>
          <FormGroup label="Password"><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></FormGroup>
          <Btn fullWidth style={{ marginTop: 10 }}>{loading ? "Signing in..." : "Sign in"}</Btn>
        </form>
        <div style={{ textAlign: "center", fontSize: 12.5, color: t.text3, marginTop: 20 }}>
          Don't have an account? <span style={{ color: t.brand, cursor: "pointer", fontWeight: 600 }} onClick={onGoOnboarding}>Create account</span>
        </div>
      </Card>
    </div>
  );
};

const RegisterPage = ({ onGoLogin, t }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try { await signup(email, password); } catch (err) { setError("Registration failed: " + err.message); }
    setLoading(false);
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: t.bg, alignItems: "center", justifyContent: "center", padding: 20 }}>
      <Card style={{ width: "100%", maxWidth: 400, padding: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: t.text }}>Create Workspace</h2>
        {error && <div style={{ background: t.redSoft, color: t.red, padding: 10, borderRadius: 8, marginBottom: 15, fontSize: 13 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <FormGroup label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></FormGroup>
          <FormGroup label="Password (min 6 chars)"><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></FormGroup>
          <Btn fullWidth style={{ marginTop: 10 }}>{loading ? "Creating..." : "Sign Up"}</Btn>
        </form>
        <div style={{ textAlign: "center", fontSize: 12.5, color: t.text3, marginTop: 20 }}>
          Already have an account? <span style={{ color: t.brand, cursor: "pointer", fontWeight: 600 }} onClick={onGoLogin}>Sign in</span>
        </div>
      </Card>
    </div>
  );
};

const MainContent = () => {
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const [addTxOpen, setAddTxOpen] = useState(false);
  const [addLedgerOpen, setAddLedgerOpen] = useState(false);
  const [ledgerToEdit, setLedgerToEdit] = useState(null);
  const [selectedLedgerId, setSelectedLedgerId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [baseLedgers, setBaseLedgers] = useState([]); 
  const [userProfile, setUserProfile] = useState(null);
  
  const { currentUser } = useAuth(); 
  const t = dark ? tokens.dark : tokens.light;

  useEffect(() => {
    if (!currentUser) return;
    const qTxs = query(collection(db, "transactions"), where("userId", "==", currentUser.uid));
    const unsubTxs = onSnapshot(qTxs, (snapshot) => {
      const txData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      txData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setTransactions(txData);
    });

    const qLedgers = query(collection(db, "ledgers"), where("userId", "==", currentUser.uid));
    const unsubLedgers = onSnapshot(qLedgers, (snapshot) => {
      const ledgersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBaseLedgers(ledgersData);
    });

    const unsubUser = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
      if (docSnap.exists()) setUserProfile(docSnap.data());
      else setUserProfile(null);
    });
    
    return () => { unsubTxs(); unsubLedgers(); unsubUser(); };
  }, [currentUser]);

  const handleDeleteTx = async (txId) => { if(window.confirm("Delete transaction?")) await deleteDoc(doc(db, "transactions", txId)); };
  const handleSoftDeleteLedger = async (ledgerId) => { if(window.confirm("Move to trash?")) { await updateDoc(doc(db, "ledgers", ledgerId), { status: "deleted", deletedAt: new Date().toISOString() }); setPage("dashboard"); } };
  const handleRestoreLedger = async (ledgerId) => { await updateDoc(doc(db, "ledgers", ledgerId), { status: "active", deletedAt: null }); };
  const handleHardDeleteLedger = async (ledgerId) => { if(window.confirm("WARNING: Permanent delete?")) await deleteDoc(doc(db, "ledgers", ledgerId)); };

  const activeBaseLedgers = baseLedgers.filter(l => l.status !== "deleted");
  const deletedLedgers = baseLedgers.filter(l => l.status === "deleted");
  const dynamicLedgers = calculateDynamicLedgers(activeBaseLedgers, transactions);
  const activeLedger = dynamicLedgers.find(l => l.id === selectedLedgerId);

  const handleNavigateToLedger = (ledgerId) => { setSelectedLedgerId(ledgerId); setPage("ledger-detail"); };

  const [isRegistering, setIsRegistering] = useState(false);
  if (!currentUser) {
    if (isRegistering) return <RegisterPage onGoLogin={() => setIsRegistering(false)} t={t} />;
    return <LoginPage onGoOnboarding={() => setIsRegistering(true)} t={t} />;
  }

  const pageMap = {
    dashboard: <DashboardPage onNavigate={(p) => setPage(p)} onOpenAddTx={() => setAddTxOpen(true)} t={t} transactions={transactions} ledgers={dynamicLedgers} onLedgerClick={handleNavigateToLedger} userProfile={userProfile} isMobile={isMobile} />,
    ledgers: <LedgersPage onNavigate={(p) => setPage(p)} t={t} ledgers={dynamicLedgers} onOpenAddLedger={() => setAddLedgerOpen(true)} onLedgerClick={handleNavigateToLedger} deletedCount={deletedLedgers.length} isMobile={isMobile} />,
    "ledger-detail": <LedgerDetailPage onOpenAddTx={() => setAddTxOpen(true)} t={t} transactions={transactions} activeLedger={activeLedger} onDeleteTx={handleDeleteTx} onEditLedger={(l) => setLedgerToEdit(l)} onDeleteLedger={handleSoftDeleteLedger} isMobile={isMobile} />,
    trash: <TrashPage t={t} deletedLedgers={deletedLedgers} onRestore={handleRestoreLedger} onHardDelete={handleHardDeleteLedger} isMobile={isMobile} />,
    transactions: <TransactionsPage t={t} transactions={transactions} onDeleteTx={handleDeleteTx} />,
    clients: <ClientsPage t={t} isMobile={isMobile} />,
    invoices: <InvoicesPage t={t} isMobile={isMobile} />,
    receipts: <ReceiptsPage t={t} transactions={transactions} />,
    reports: <ReportsPage t={t} transactions={transactions} isMobile={isMobile} />,
    export: <ExportPage t={t} transactions={transactions} ledgers={dynamicLedgers} userProfile={userProfile} />,
    settings: <SettingsPage t={t} userProfile={userProfile} />,
    profile: <ProfilePage onEdit={() => setPage("settings")} t={t} />,
    billing: <BillingPage t={t} />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: t.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Sidebar activePage={page} onNavigate={setPage} t={t} isMobile={isMobile} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", width: isMobile ? "100%" : "auto" }}>
        
        <Header 
          title={page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')} 
          sub={userProfile?.companyName || `Workspace: ${currentUser.email}`} 
          dark={dark} 
          onToggleDark={() => setDark(!dark)} 
          onOpenAddTx={() => setAddTxOpen(true)} 
          t={t} 
          isMobile={isMobile} 
          onToggleSidebar={() => setSidebarOpen(true)}
          transactions={transactions} 
        />
        
        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? 16 : 24 }}>
          {dynamicLedgers.length === 0 && page === "dashboard" ? (
             <div style={{ textAlign: "center", padding: 60 }}>
                <h2>Welcome to Ledgr!</h2>
                <p style={{ color: t.text3, marginBottom: 20 }}>Let's start by creating your first financial account.</p>
                <Btn onClick={() => setAddLedgerOpen(true)}>Create First Ledger</Btn>
             </div>
          ) : (
            pageMap[page] || pageMap.dashboard
          )}
        </div>
      </div>
      
      {addTxOpen && <AddTransactionModal onClose={() => setAddTxOpen(false)} t={t} ledgers={dynamicLedgers} />}
      {addLedgerOpen && <AddLedgerModal onClose={() => setAddLedgerOpen(false)} t={t} />}
      {ledgerToEdit && <EditLedgerModal ledger={ledgerToEdit} onClose={() => setLedgerToEdit(null)} t={t} />}
    </div>
  );
};

export default function LedgrApp() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </AuthProvider>
  );
}