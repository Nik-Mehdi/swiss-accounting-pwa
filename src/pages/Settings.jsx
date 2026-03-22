// src/pages/Settings.jsx
import { useState, useEffect } from "react";
// 👇 ایمپورت توابع فایربیس برای آپدیت دیتابیس و امنیت 👇
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updatePassword, updateEmail } from "firebase/auth";
import { db, storage } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { Card, FormGroup, Input, Btn } from "../components/UI";

export const SettingsPage = ({ t, userProfile }) => {
  const { currentUser, logout } = useAuth();
  const { lang, setLang, tr } = useLanguage();

  // تب فعال: general, profile, security
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // استیت‌های فرم تنظیمات
  const [currency, setCurrency] = useState("CHF");
  const [compName, setCompName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  // استیت‌های امنیتی
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // وقتی اطلاعات کاربر از سرور لود شد، فرم رو پر کن
  useEffect(() => {
    if (userProfile) {
      setCurrency(userProfile.baseCurrency || "CHF");
      setCompName(userProfile.companyName || "");
      setPhone(userProfile.phone || "");
      setAddress(userProfile.address || "");
      setLogoUrl(userProfile.logoUrl || "");
    }
    if (currentUser) {
      setNewEmail(currentUser.email || "");
    }
  }, [userProfile, currentUser]);

  // 🚀 تابع ذخیره اطلاعات عمومی و پروفایل 🚀
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      let finalLogoUrl = logoUrl;
      
      // اگر کاربر عکس جدید انتخاب کرده بود، اول آپلودش کن
      if (logoFile) {
        const fileRef = ref(storage, `logos/${currentUser.uid}/${Date.now()}_${logoFile.name}`);
        await uploadBytes(fileRef, logoFile);
        finalLogoUrl = await getDownloadURL(fileRef);
        setLogoUrl(finalLogoUrl); // آپدیت عکس رو صفحه
      }

      // ذخیره در دیتابیس (استفاده از setDoc با merge برای جلوگیری از ارور)
      await setDoc(doc(db, "users", currentUser.uid), {
        companyName: compName,
        phone: phone,
        address: address,
        baseCurrency: currency,
        logoUrl: finalLogoUrl,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      alert("✅ Settings saved successfully!");
    } catch (error) {
      alert("Error saving settings: " + error.message);
    }
    setIsSaving(false);
  };

  // 🔒 تابع ذخیره اطلاعات امنیتی (تغییر رمز و ایمیل) 🔒
  const handleSaveSecurity = async () => {
    setIsSaving(true);
    try {
      if (newPassword && newPassword.length >= 6) {
        await updatePassword(currentUser, newPassword);
      }
      if (newEmail && newEmail !== currentUser.email) {
        await updateEmail(currentUser, newEmail);
      }
      alert("✅ Security settings updated successfully!");
      setNewPassword(""); // پاک کردن فیلد پسورد بعد از موفقیت
    } catch (error) {
      // اگر کاربر خیلی وقت پیش لاگین کرده باشه، گوگل برای امنیت اجازه تغییر رمز نمی‌ده
      if (error.code === 'auth/requires-recent-login') {
        alert("⚠️ For security reasons, please log out and log back in to change your password/email.");
      } else {
        alert("Error updating security: " + error.message);
      }
    }
    setIsSaving(false);
  };

  // دیزاین تب‌ها
  const TabBtn = ({ id, icon, label }) => {
    const active = activeTab === id;
    return (
      <div 
        onClick={() => setActiveTab(id)}
        style={{
          padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: active ? 700 : 500,
          color: active ? t.brand : t.text3,
          borderBottom: active ? `2px solid ${t.brand}` : `2px solid transparent`,
          transition: "all 0.2s"
        }}
      >
        <span style={{ marginRight: 6 }}>{icon}</span>{label}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 650, margin: "0 auto", paddingBottom: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: t.text }}>{tr('settings')}</h2>
        <Btn variant="ghost" onClick={logout} style={{ color: t.red, border: `1px solid ${t.redSoft}` }}>🚪 {tr('logout')}</Btn>
      </div>

      {/* نوار تب‌ها */}
      <div style={{ display: "flex", borderBottom: `1px solid ${t.border}`, marginBottom: 24 }}>
        <TabBtn id="general" icon="⚙️" label="General" />
        <TabBtn id="profile" icon="🏢" label="Workspace Profile" />
        <TabBtn id="security" icon="🔒" label="Security" />
      </div>

      {/* ---------------- تب 1: General ---------------- */}
      {activeTab === "general" && (
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 16 }}>Preferences</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <FormGroup label={`🌐 ${tr('language')}`}>
              <select 
                value={lang} onChange={(e) => setLang(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 14, cursor: "pointer", outline: "none" }}
              >
                <option value="en">🇺🇸 English</option>
                <option value="de">🇨🇭 Deutsch (German)</option>
                <option value="fr">🇫🇷 Français (French)</option>
                <option value="it">🇮🇹 Italiano (Italian)</option>
                <option value="fa">🇮🇷 فارسی (Persian)</option>
              </select>
            </FormGroup>

            <FormGroup label="💱 Default Currency">
              <select 
                value={currency} onChange={(e) => setCurrency(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 14, cursor: "pointer", outline: "none" }}
              >
                <option value="CHF">CHF - Swiss Franc</option>
                <option value="EUR">EUR - Euro</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </FormGroup>
          </div>
          <Btn onClick={handleSaveProfile} style={{ marginTop: 10 }}>{isSaving ? "Saving..." : "Save Preferences"}</Btn>
        </Card>
      )}

      {/* ---------------- تب 2: Profile & Workspace ---------------- */}
      {activeTab === "profile" && (
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 20 }}>Company Details</h3>
          
          <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20 }}>
            {/* نمایش لوگو */}
            <div style={{ width: 80, height: 80, borderRadius: 16, background: t.border, border: `2px dashed ${t.border2}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {logoFile ? (
                 <img src={URL.createObjectURL(logoFile)} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : logoUrl ? (
                 <img src={logoUrl} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                 <span style={{ fontSize: 24 }}>🏢</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <FormGroup label="Upload Logo / Picture">
                <input 
                  type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])}
                  style={{ width: "100%", padding: "8px", fontSize: 13, color: t.text, border: `1.5px solid ${t.border}`, borderRadius: 10, background: t.surface, cursor: "pointer" }} 
                />
              </FormGroup>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <FormGroup label="Company / Personal Name">
              <Input placeholder="e.g. Acme Corp" value={compName} onChange={(e) => setCompName(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }} />
            </FormGroup>
            <FormGroup label="Phone Number">
              <Input placeholder="+41 79 123 45 67" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }} />
            </FormGroup>
          </div>

          <FormGroup label="Business Address">
            <Input placeholder="Street, City, ZIP Code" value={address} onChange={(e) => setAddress(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }} />
          </FormGroup>

          <Btn onClick={handleSaveProfile} style={{ marginTop: 10 }}>{isSaving ? "Uploading & Saving..." : "Save Profile Info"}</Btn>
        </Card>
      )}

      {/* ---------------- تب 3: Security ---------------- */}
      {activeTab === "security" && (
        <Card style={{ padding: 24, border: `1px solid ${t.redSoft}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 16 }}>Authentication Settings</h3>
          
          <FormGroup label="Email Address">
            <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }} />
          </FormGroup>

          <FormGroup label="New Password (min 6 characters)">
            <Input type="password" placeholder="Leave blank to keep current password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ background: t.surface, color: t.text, border: `1.5px solid ${t.border}` }} />
          </FormGroup>

          <div style={{ fontSize: 12, color: t.text3, marginBottom: 16 }}>
            * Note: Changing your email or password might require you to log in again.
          </div>

          <Btn variant="primary" onClick={handleSaveSecurity} style={{ background: t.red, color: "#fff", border: "none" }}>
            {isSaving ? "Updating Security..." : "Update Security Settings"}
          </Btn>
        </Card>
      )}
    </div>
  );
};