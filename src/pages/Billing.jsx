// src/pages/Billing.jsx
import { useState } from "react";
import { Card, Btn, Pill } from "../components/UI";
import { useLanguage } from "../context/LanguageContext";

export const BillingPage = ({ t }) => {
  const { tr } = useLanguage();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("Basic");

  // شبیه‌ساز اتصال به درگاه پرداخت (Stripe/PayPal)
  const handleUpgrade = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      alert("💳 Redirecting to Secure Payment Gateway...\n\n(This is a simulation for the MVP. In the live version, this will open Stripe or a Swiss bank payment page!)");
      setIsUpgrading(false);
    }, 1500);
  };

  const featuresBasic = [
    "Up to 3 Ledgers",
    "Basic Reporting",
    "Standard Support",
    "Community Access"
  ];

  const featuresPro = [
    "Unlimited Ledgers",
    "Advanced PDF & Excel Export",
    "Multi-currency Support",
    "24/7 Priority Support",
    "Custom Company Logo"
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", paddingBottom: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, marginBottom: 8 }}>
          Upgrade your Workspace
        </h2>
        <p style={{ color: t.text3, fontSize: 15 }}>
          Choose the right plan for your business. Simple, transparent pricing.
        </p>
      </div>

      {/* 📊 وضعیت پلن فعلی و مصرف */}
      <Card style={{ padding: 24, marginBottom: 40, borderLeft: `4px solid ${t.text3}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, color: t.text3, fontWeight: 600, marginBottom: 4 }}>CURRENT PLAN</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{currentPlan} Plan</span>
              <Pill color="gray">Free Forever</Pill>
            </div>
          </div>
          
          <div style={{ width: "100%", maxWidth: 300 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: t.text2, marginBottom: 6, fontWeight: 600 }}>
              <span>Ledgers Used</span>
              <span>1 / 3</span>
            </div>
            {/* نوار پیشرفت (Progress Bar) */}
            <div style={{ width: "100%", height: 8, background: t.border, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: "33%", height: "100%", background: t.text3, borderRadius: 4 }}></div>
            </div>
            <div style={{ fontSize: 11, color: t.text3, marginTop: 6 }}>
              Upgrade to Pro for unlimited ledgers.
            </div>
          </div>
        </div>
      </Card>

      {/* 💳 کارت‌های قیمت‌گذاری */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        
        {/* پلن Basic */}
        <Card style={{ padding: 32, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 8 }}>Basic</h3>
          <p style={{ color: t.text3, fontSize: 14, minHeight: 42 }}>Perfect for individuals and freelancers starting out.</p>
          <div style={{ margin: "24px 0", display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: t.text }}>CHF 0</span>
            <span style={{ color: t.text3, fontWeight: 500 }}>/ month</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            {featuresBasic.map((feat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: t.text2, fontSize: 14 }}>
                <span style={{ color: t.text3 }}>✓</span> {feat}
              </div>
            ))}
          </div>
          <Btn variant="ghost" style={{ width: "100%", border: `1.5px solid ${t.border}`, color: t.text }} disabled>
            Current Plan
          </Btn>
        </Card>

        {/* پلن Pro (برجسته شده) */}
        <Card style={{ padding: 32, display: "flex", flexDirection: "column", border: `2px solid ${t.brand}`, position: "relative", boxShadow: `0 10px 30px ${t.brand}20` }}>
          <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: t.brand, color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
            MOST POPULAR
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: t.brand, marginBottom: 8 }}>Professional</h3>
          <p style={{ color: t.text3, fontSize: 14, minHeight: 42 }}>Everything a growing Swiss SME needs to manage finances.</p>
          <div style={{ margin: "24px 0", display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: t.text }}>CHF 29</span>
            <span style={{ color: t.text3, fontWeight: 500 }}>/ month</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            {featuresPro.map((feat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: t.text2, fontSize: 14, fontWeight: 500 }}>
                <span style={{ color: t.brand }}>✓</span> {feat}
              </div>
            ))}
          </div>
          <Btn variant="primary" onClick={handleUpgrade} style={{ width: "100%", padding: "14px", fontSize: 15 }}>
            {isUpgrading ? "Connecting securely..." : "Upgrade to Pro"}
          </Btn>
        </Card>

      </div>

      <div style={{ textAlign: "center", marginTop: 40, fontSize: 13, color: t.text3 }}>
        🔒 Secure payments processed by Stripe. Cancel anytime.
      </div>
    </div>
  );
};