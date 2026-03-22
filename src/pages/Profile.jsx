// src/pages/Profile.jsx
import { Card, Pill, Btn } from "../components/UI";
import { useAuth } from "../context/AuthContext";

export const ProfilePage = ({ onEdit, t }) => {
  const { currentUser } = useAuth();
  
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, marginBottom: 20, color: t.text }}>My Profile</h2>
      <Card style={{ textAlign: "center", padding: 32, marginBottom: 20, background: t.surface, border: `1px solid ${t.border}` }}>
        <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, #6C47F5, #1B6EF3)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 28, margin: "0 auto 16px" }}>
          {currentUser?.email?.charAt(0).toUpperCase() || "U"}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: t.text }}>{currentUser?.email || "User"}</div>
        <div style={{ color: t.text3, fontSize: 13.5, marginTop: 4 }}>Workspace Owner</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
          <Pill color="brand">Pro Plan</Pill>
          <Pill color="green">CHF Workspace</Pill>
          <Pill color="gray">🇨🇭 Switzerland</Pill>
        </div>
        <Btn variant="ghost" size="sm" onClick={onEdit} style={{ marginTop: 16 }}>Edit Profile</Btn>
      </Card>
      <Card style={{ padding: "4px 20px", background: t.surface, border: `1px solid ${t.border}` }}>
        {[["Status", "Active"], ["Member since", new Date(currentUser?.metadata?.creationTime).toLocaleDateString() || "Today"]].map(([l, v]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: `1px solid ${t.border}` }}>
            <div style={{ fontWeight: 600, fontSize: 13.5, color: t.text }}>{l}</div>
            <div style={{ fontSize: 13.5, color: t.text2 }}>{v}</div>
          </div>
        ))}
      </Card>
    </div>
  );
};