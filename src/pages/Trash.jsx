// src/pages/Trash.jsx
import { Card, Btn } from "../components/UI";

export const TrashPage = ({ t, deletedLedgers, onRestore, onHardDelete }) => {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, marginBottom: 20, color: t.text }}>
        🗑️ Trash (Recently Deleted)
      </h2>
      <Card style={{ padding: "4px 20px", background: t.surface, border: `1px solid ${t.border}` }}>
        {deletedLedgers.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: t.text3 }}>Trash is empty.</div>
        ) : (
          deletedLedgers.map(l => (
            <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: `1px solid ${t.border}` }}>
              <div>
                <div style={{ fontWeight: 600, color: t.text, fontSize: 15 }}>{l.icon} {l.name}</div>
                <div style={{ fontSize: 12, color: t.text3, marginTop: 4 }}>
                  Deleted on: {l.deletedAt ? new Date(l.deletedAt).toLocaleDateString() : "Unknown"}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="ghost" size="sm" onClick={() => onRestore(l.id)}>♻️ Restore</Btn>
                <Btn variant="ghost" size="sm" style={{ color: t.red }} onClick={() => onHardDelete(l.id)}>❌ Delete Permanently</Btn>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};