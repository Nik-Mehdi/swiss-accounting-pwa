import { useEffect, useState, useMemo } from "react";
import { collection, onSnapshot, query, where, addDoc, deleteDoc, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { Card, Btn, Input, FormGroup } from "../components/UI";

export const ClientsPage = ({ t, isMobile }) => {
  const { currentUser } = useAuth();
  const { tr } = useLanguage();
  
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", website: "", notes: ""
  });

  // 📡 Real-time Listener
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "clients"), 
      where("userId", "==", currentUser.uid),
      orderBy("name", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setClients(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [currentUser]);

  // 🔍 Search Logic
  const filteredClients = useMemo(() => {
    return clients.filter(c => 
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [clients, searchQuery]);

  const handleOpenModal = (client = null) => {
    if (client) {
      setEditingClient(client);
      setFormData({ ...client });
    } else {
      setEditingClient(null);
      setFormData({ name: "", email: "", phone: "", address: "", website: "", notes: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingClient) {
        await updateDoc(doc(db, "clients", editingClient.id), formData);
      } else {
        await addDoc(collection(db, "clients"), { ...formData, userId: currentUser.uid, createdAt: new Date().toISOString() });
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(tr('errorSave'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(tr('confirmDelete'))) {
      await deleteDoc(doc(db, "clients", id));
    }
  };

  return (
    <div style={{ padding: isMobile ? 16 : 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 15 }}>
        <div>
          <h2 style={{ margin: 0, color: t.text }}>👥 {tr('clients')}</h2>
          <p style={{ margin: 0, color: t.text3, fontSize: 13 }}>{clients.length} {tr('activeClients')}</p>
        </div>
        <Btn onClick={() => handleOpenModal()}>+ {tr('addClient')}</Btn>
      </div>

      {/* 🔎 Search Bar */}
      <Card style={{ marginBottom: 20, padding: "8px 16px" }}>
        <input 
          placeholder={tr('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", border: "none", outline: "none", background: "transparent", color: t.text, padding: "8px 0" }}
        />
      </Card>

      {/* 📋 Clients List */}
      <div style={{ display: "grid", gap: 12 }}>
        {filteredClients.map(client => (
          <Card key={client.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px" }}>
            <div onClick={() => handleOpenModal(client)} style={{ cursor: "pointer", flex: 1 }}>
              <div style={{ fontWeight: 700, color: t.text, fontSize: 16 }}>{client.name}</div>
              <div style={{ fontSize: 13, color: t.text2, marginTop: 4 }}>{client.email || tr('noEmail')} • {client.phone || tr('noPhone')}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={() => handleOpenModal(client)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✏️</button>
              <button type="button" onClick={() => handleDelete(client.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>🗑️</button>
            </div>
          </Card>
        ))}
      </div>

      {/* 🏗️ Full Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <Card style={{ width: "100%", maxWidth: 500, padding: 30, maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ marginTop: 0 }}>{editingClient ? tr('edit') : tr('addClient')}</h3>
            <form onSubmit={handleSave}>
              <FormGroup label={tr('clientName')}><Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></FormGroup>
              <FormGroup label={tr('email')}><Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></FormGroup>
              <FormGroup label={tr('phone')}><Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></FormGroup>
              <FormGroup label={tr('address')}><Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} /></FormGroup>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <Btn type="submit" fullWidth disabled={isSaving}>{isSaving ? tr('saving') : tr('save')}</Btn>
                <Btn variant="ghost" fullWidth onClick={() => setIsModalOpen(false)}>{tr('cancel')}</Btn>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};