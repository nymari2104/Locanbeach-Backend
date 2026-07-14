"use client";

import { useState } from "react";
import SideNavBar from "@/components/admin/SideNavBar";
import styles from "./layout.module.css";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={styles.adminWrapper}>
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <SideNavBar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      <main className={`${styles.adminMain} ${isSidebarCollapsed ? styles.adminMainCollapsed : ''}`}>
        {/* Mobile Header */}
        <header className={styles.mobileHeader}>
          <div className={styles.mobileBrand}>
            <div className={styles.mobileLogo}>
              <img 
                alt="Lộc An Beach Logo" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC63fPEZhWhvU55JIkbViURS55j5q5kDcPbpZR_bwqR71tLJFxzIyWh9r4Q5vHFgGK_GOZteySv_qliX84iBS-yYz2dPlDP612DCrUiqnY85dv1SlVIgsZWHUbRpDlwVinqjxU5It6KoNcqZqbk3tjUd6MdRoc3Mdv56xmvr6DcYL4OIzDoJB7Ttk4yuoVPsmLkVO428zazuLQpng8HCorpThOwHyaDAtM8qiCjabmHTynCP7iX_5J7TC0f7O8AlrBigg"
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
              />
            </div>
            <h1 className={styles.mobileBrandName}>Lộc An Beach</h1>
          </div>
          <button className={styles.mobileMenuBtn} onClick={() => setIsMobileMenuOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <div className={styles.adminContent}>
          {children}
        </div>
      </main>
    </div>
  );
}
