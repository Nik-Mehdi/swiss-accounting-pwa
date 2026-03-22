// src/components/UI.jsx

export const Pill = ({ color = "gray", children, style }) => {
  const styles = {
    green:  { background: "#ECFDF5", color: "#059669" },
    red:    { background: "#FEF2F2", color: "#DC2626" },
    brand:  { background: "#EEF4FF", color: "#1B6EF3" },
    orange: { background: "#FFFBEB", color: "#D97706" },
    gray:   { background: "#F3F4F6", color: "#6B7280" },
  };
  return <span style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4, ...styles[color], ...style }}>{children}</span>;
};

export const Avatar = ({ name = "N", gradient = "135deg, #6C47F5, #1B6EF3", size = 34, radius = 10 }) => (
  <div style={{ width: size, height: size, borderRadius: radius, flexShrink: 0, background: `linear-gradient(${gradient})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: size * 0.38 }}>{name.charAt(0).toUpperCase()}</div>
);

// FIX: Added type="button" as default to prevent accidental form submission.
// Pass type="submit" explicitly on Save/Confirm buttons inside <form> elements.
export const Btn = ({ variant = "primary", size = "md", children, onClick, style, fullWidth, type = "button", disabled }) => {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, cursor: disabled ? "not-allowed" : "pointer", border: "none", fontFamily: "inherit", fontWeight: 600, borderRadius: 10, transition: "all 0.15s", width: fullWidth ? "100%" : undefined, justifyContent: fullWidth ? "center" : undefined, opacity: disabled ? 0.6 : 1 };
  const variants = {
    primary: { background: "#1B6EF3", color: "white", padding: size === "sm" ? "6px 14px" : "10px 18px", fontSize: size === "sm" ? 12.5 : 13.5 },
    ghost:   { background: "transparent", color: "#4B5563", border: "1.5px solid #E8EAED", padding: size === "sm" ? "5px 13px" : "9px 17px", fontSize: size === "sm" ? 12.5 : 13.5 },
    danger:  { background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA", padding: size === "sm" ? "5px 13px" : "9px 17px", fontSize: 13.5 },
  };
  return <button type={type} disabled={disabled} style={{ ...base, ...variants[variant], ...style }} onClick={onClick}>{children}</button>;
};

export const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EAED", padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", ...style, cursor: onClick ? "pointer" : undefined }}>{children}</div>
);

export const StatCard = ({ label, value, color = "#111827", sub }) => (
  <Card style={{ padding: "18px 20px" }}>
    <div style={{ fontSize: 12, fontWeight: 500, color: "#9CA3AF", marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 5 }}>{sub}</div>}
  </Card>
);

export const FormGroup = ({ label, children }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#4B5563", marginBottom: 6 }}>{label}</label>
    {children}
  </div>
);

export const Input = ({ style, ...props }) => <input style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E8EAED", borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff", color: "#111827", boxSizing: "border-box", ...style }} {...props} />;
export const Select = ({ children, style, ...props }) => <select style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E8EAED", borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff", color: "#111827", boxSizing: "border-box", appearance: "none", ...style }} {...props}>{children}</select>;
export const Toggle = ({ on, onToggle }) => <div onClick={onToggle} style={{ width: 40, height: 22, borderRadius: 20, cursor: "pointer", background: on ? "#1B6EF3" : "#D1D5DB", position: "relative", transition: "all 0.2s", flexShrink: 0 }}><div style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.2s" }} /></div>;