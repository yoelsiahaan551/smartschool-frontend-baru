"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Crown, PanelLeftClose, PanelLeftOpen, ChevronDown, X } from "lucide-react";

import { guruSidebarConfig } from "./sidebar/guruSidebar";
import { superadminSidebarConfig } from "./sidebar/superadmin";
import { yayasanSidebarConfig } from "./sidebar/yayasanSidebar";
import { adminSidebarConfig } from "./sidebar/adminSidebar"; // sesuaikan path kalau beda
import { cmsSidebarConfig } from "./sidebar/cmsSidebar";

/**
 * Sidebar.jsx = JEMBATAN.
 * Komponen ini TIDAK menyimpan menu apapun secara langsung — dia cuma:
 * 1. Menentukan role aktif — WAJIB lewat prop `role` (lihat catatan di bawah).
 * 2. Mengambil config menu yang sesuai (guruSidebarConfig / superadminSidebarConfig / yayasanSidebarConfig / adminSidebarConfig / cmsSidebarConfig)
 * 3. Merender UI sidebar generik berdasarkan config itu
 *
 * =========================================================================
 * PENTING SOAL HYDRATION (FIX FINAL):
 * =========================================================================
 * SEBELUMNYA, kalau prop `role` tidak dikirim, komponen ini menebak role
 * dari `usePathname()` lewat `resolveRole(pathname)`. Ini BERBAHAYA karena
 * kalau ada kondisi di mana `pathname` belum tersedia / berbeda saat first
 * render di server vs saat hydrate di client (middleware, rewrite, dsb),
 * server bisa render role A sedangkan client render role B -> hasilnya teks
 * (brandName, initials, email, dst) beda -> Hydration mismatch persis
 * seperti yang kejadian di /cmsAdmin (server: "Super Admin", client:
 * "CMS Admin").
 *
 * FIX: sekarang `role` WAJIB dikirim eksplisit dari page/layout yang
 * memanggil <Sidebar />, contoh:
 *
 *     <Sidebar role="cms" active="dashboard" ... />
 *
 * `resolveRole(pathname)` TETAP ada tapi HANYA sebagai fallback darurat
 * (misal ada page lama yang lupa dikasih prop role) — dan dev akan diberi
 * warning di console supaya ketauan & langsung dibenerin, bukan dibiarkan
 * silent. JANGAN mengandalkan fallback ini di production.
 *
 * Kalau mau nambah role baru: bikin file config baru di ./sidebar/<role>.jsx
 * dengan bentuk yang sama (basePath, brandName, initials, email, menuSections),
 * lalu daftarkan di configByRole di bawah.
 *
 * PENTING SOAL ACTIVE STATE:
 * Menu yang sedang aktif (di-highlight) ditentukan MURNI dari `pathname`
 * (URL saat ini), bukan dari prop `active` yang dikirim tiap halaman.
 * Prop `active` / `setActive` tetap dipertahankan di signature komponen
 * supaya semua page.jsx yang sudah memanggil <Sidebar active=... /> tidak
 * perlu diubah satu-satu, tapi nilainya tidak dipakai untuk logika highlight.
 *
 * RESPONSIVE:
 * Props `collapsed` / `setCollapsed` dipakai untuk DUA hal sekaligus:
 * - Desktop (>= 1024px): collapsed = true -> sidebar menciut jadi ikon 72px.
 * - Mobile  (<  1024px): collapsed dipakai sebagai status buka/tutup drawer.
 */
const configByRole = {
  guru: guruSidebarConfig,
  "super-admin": superadminSidebarConfig,
  yayasan: yayasanSidebarConfig,
  admin: adminSidebarConfig,
  cms: cmsSidebarConfig,
};

const DEFAULT_ROLE = "super-admin";

// Fallback darurat SAJA — jangan diandalkan sebagai sumber kebenaran utama.
function resolveRole(pathname) {
  if (pathname?.startsWith("/guru")) return "guru";
  if (pathname?.startsWith("/yayasan")) return "yayasan";
  if (pathname?.startsWith("/super-admin")) return "super-admin";
  if (pathname?.startsWith("/cmsAdmin")) return "cms";
  if (pathname?.startsWith("/admin")) return "admin";
  return DEFAULT_ROLE;
}

export default function Sidebar({ active, setActive, collapsed, setCollapsed, role: roleProp }) {
  const router = useRouter();
  const pathname = usePathname();

  // Role WAJIB dikirim lewat prop supaya deterministik antara server & client.
  // Fallback ke resolveRole(pathname) hanya untuk kompatibilitas mundur —
  // dan kita warn di console (dev only) supaya kelihatan page mana yang
  // masih belum dikasih prop role.
  let role = roleProp;
  if (!role) {
    role = resolveRole(pathname);
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `[Sidebar] Prop "role" tidak dikirim untuk pathname "${pathname}". ` +
          `Fallback menebak dari pathname bisa menyebabkan hydration mismatch. ` +
          `Tambahkan prop role secara eksplisit, contoh: <Sidebar role="${role}" ... />`
      );
    }
  }

  // Guard tambahan: kalau role nggak ada di configByRole (typo, role baru
  // belum didaftarkan, dst), jangan crash — fallback ke DEFAULT_ROLE.
  const config = configByRole[role] ?? configByRole[DEFAULT_ROLE];
  const menuSections = config.menuSections;

  // ===== RESPONSIVE: deteksi mobile via matchMedia =====
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");

    const applyMode = (mobile) => {
      setIsMobile(mobile);
      // Begitu terdeteksi mobile, paksa drawer mulai dalam keadaan tertutup —
      // terlepas dari nilai `collapsed` awal yang dikirim tiap halaman (yang
      // biasanya false/expanded, karena itu memang default yang benar untuk desktop).
      if (mobile) setCollapsed(true);
    };

    applyMode(mq.matches);
    const handleChange = (e) => applyMode(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Kunci scroll body saat drawer mobile terbuka
  useEffect(() => {
    if (isMobile && !collapsed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, collapsed]);

  // Semua item yang punya children langsung terbuka dari awal (nggak perlu diklik dulu)
  const [openMenus, setOpenMenus] = useState(() => {
    const initial = {};
    menuSections.forEach((item) => {
      if (item.children) initial[item.key] = true;
    });
    return initial;
  });

  // Kalau role/config berganti (misal pindah dari /guru ke /yayasan), pastikan
  // submenu role yang baru juga otomatis kebuka.
  useEffect(() => {
    const next = {};
    menuSections.forEach((item) => {
      if (item.children) next[item.key] = true;
    });
    setOpenMenus((prev) => ({ ...next, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const toggleSubmenu = (key) => {
    if (collapsed && !isMobile) setCollapsed(false);
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Tutup drawer setelah navigasi, khusus mobile
  const closeMobileDrawer = () => {
    if (isMobile) setCollapsed(true);
  };

  // Klik di badan item:
  // - Kalau belum di halaman itu -> navigasi ke halamannya (submenu belum kebuka)
  // - Kalau udah di halaman itu (klik ke-2 kalinya) -> toggle buka/tutup submenu
  // - Klik di chevron kapan saja -> toggle buka/tutup submenu
  const handleMenuClick = (item) => {
    const alreadyOnThisPage = pathname === item.path;
    setActive?.(item.key);

    if (item.children && alreadyOnThisPage) {
      toggleSubmenu(item.key);
      return;
    }
    if (item.path) {
      router.push(item.path);
      closeMobileDrawer();
    }
  };

  const handleSubItemClick = (parentKey, child) => {
    setActive?.(child.key);
    router.push(child.path);
    closeMobileDrawer();
  };

  // Di mobile, drawer selalu tampil penuh (bukan mode ikon-saja) saat terbuka.
  const showLabels = isMobile ? !collapsed : !collapsed;

  const asideClasses = isMobile
    ? `
        fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw]
        bg-gradient-to-b from-[#1A2332] via-[#0F1729] to-[#0A0F1A]
        flex flex-col
        transition-transform duration-300 ease-in-out
        overflow-hidden border-r border-white/5
        ${collapsed ? "-translate-x-full" : "translate-x-0"}
      `
    : `
        ${collapsed ? "w-[72px]" : "w-64"}
        bg-gradient-to-b from-[#1A2332] via-[#0F1729] to-[#0A0F1A]
        flex flex-col
        transition-all duration-300 ease-in-out
        flex-shrink-0 h-screen sticky top-0
        relative overflow-hidden
        border-r border-white/5
      `;

  return (
    <>
      {/* FLOATING TOGGLE — muncul di luar sidebar setiap kali sidebar lagi TERTUTUP
          (mobile: drawer off-canvas, desktop: bisa dipakai juga sebagai shortcut buka).
          Ini yang bikin sidebar bisa dimunculkan lagi tanpa tergantung Header.jsx. */}
      {collapsed && isMobile && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-[60] flex items-center justify-center
            w-11 h-11 rounded-xl
            bg-gradient-to-b from-[#1A2332] to-[#0F1729]
            border border-white/20 hover:border-white/40
            text-white/80 hover:text-white
            shadow-lg shadow-black/30
            transition-all duration-200 hover:scale-105 active:scale-95"
          title="Buka Sidebar"
        >
          <PanelLeftOpen size={20} />
        </button>
      )}

      {/* OVERLAY — hanya muncul di mobile saat drawer terbuka */}
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <aside className={asideClasses}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-2xl" />
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-400/5 rounded-full blur-2xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

        {/* Header sidebar: logo + tombol toggle/close */}
        <div className="relative z-10 flex items-center justify-between px-4 h-20 border-b border-white/10">
          <button
            onClick={() => {
              if (!isMobile) setCollapsed(!collapsed);
            }}
            className={`flex items-center gap-3 flex-1 min-w-0 ${
              !isMobile && collapsed ? "justify-center" : "justify-start"
            }`}
          >
            {showLabels && (
              <div className="flex flex-col leading-tight text-left">
                <span className="font-bold text-white text-xl tracking-tight">
                  Smart<span className="text-blue-300">School</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <Crown size={10} className="text-yellow-400/80" />
                  <span className="text-[10px] text-blue-200/70 font-medium tracking-wider uppercase">
                    {config.brandName}
                  </span>
                </div>
              </div>
            )}

            {/* Ikon mini saat collapsed di desktop — sekaligus affordance tombol expand */}
            {!isMobile && collapsed && (
              <div
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/20
                  flex items-center justify-center text-blue-300
                  hover:bg-white/20 hover:border-white/40 transition-colors duration-200"
                title="Buka Sidebar"
              >
                <PanelLeftOpen size={18} />
              </div>
            )}
          </button>

          {/* Desktop: tombol ciutkan sidebar jadi ikon */}
          {!isMobile && showLabels && (
            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center w-8 h-8 rounded-lg 
                bg-white/10 hover:bg-white/20 transition-colors duration-200
                border border-white/20 hover:border-white/40
                text-white/70 hover:text-white flex-shrink-0"
              title="Ciutkan Sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          )}

          {/* Mobile: tombol tutup drawer */}
          {isMobile && (
            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center w-8 h-8 rounded-lg 
                bg-white/10 hover:bg-white/20 transition-colors duration-200
                border border-white/20 hover:border-white/40
                text-white/70 hover:text-white flex-shrink-0"
              title="Tutup Menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Mini Profile */}
        {showLabels && (
          <div className="relative z-10 mx-3 mt-4 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white/30 flex items-center justify-center text-white text-sm font-bold">
                  {config.initials}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1A2332] ring-2 ring-emerald-400/50 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{config.brandName}</p>
                <p className="text-[10px] text-blue-200/60 truncate">{config.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pb-6">
          {menuSections.map((item, index) => {
            if (item.type === "header") {
              if (!showLabels) return null;
              return (
                <div key={`header-${index}`} className="px-2 pt-5 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[9px] font-semibold text-white/40 uppercase tracking-[0.2em]">
                      {item.label}
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                </div>
              );
            }

            const hasChildren = !!item.children;
            // Highlight murni berdasarkan pathname (URL saat ini) — bukan prop
            // `active` yang diketik manual per-halaman. Exact match, BUKAN
            // startsWith, supaya "/admin/guru" tidak ikut ke-highlight cuma
            // karena "/admin/guru-mapel" kebetulan diawali kata yang sama.
            const isChildActive = hasChildren && item.children.some((c) => pathname === c.path);
            const isActive = pathname === item.path || isChildActive;
            const isOpen = !!openMenus[item.key];
            const collapsedIconMode = !isMobile && collapsed;

            return (
              <div key={item.key}>
                <div
                  onClick={() => handleMenuClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleMenuClick(item);
                    }
                  }}
                  className={`
                    relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl 
                    text-sm font-medium transition-all duration-200 ease-out cursor-pointer select-none
                    ${isActive ? "text-white bg-white/20 border border-white/30" : "text-white/50 hover:text-white hover:bg-white/10"}
                    ${collapsedIconMode ? "justify-center px-2" : ""}
                    group
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-blue-300 to-indigo-300" />
                  )}

                  <div
                    className={`
                    relative flex items-center justify-center
                    transition-all duration-200
                    ${isActive ? "text-white" : "text-white/40 group-hover:text-white/80"}
                    ${collapsedIconMode ? "w-10 h-10" : ""}
                  `}
                  >
                    <item.icon
                      size={20}
                      className={`
                        transition-all duration-200
                        ${isActive ? "scale-110" : ""}
                        group-hover:scale-110
                      `}
                    />
                    {isActive && showLabels && (
                      <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl -z-10" />
                    )}
                    {isActive && collapsedIconMode && (
                      <div className="absolute inset-0 bg-blue-400/30 rounded-lg blur-xl -z-10" />
                    )}
                  </div>

                  {showLabels && <span className="flex-1 text-left text-xs tracking-wide">{item.label}</span>}

                  {showLabels && hasChildren && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubmenu(item.key);
                      }}
                      className="p-1 -m-1 rounded-md hover:bg-white/10 transition-colors duration-150"
                      title={isOpen ? "Tutup submenu" : "Buka submenu"}
                    >
                      <ChevronDown
                        size={14}
                        className={`text-white/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}

                  {showLabels && !hasChildren && isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}

                  {collapsedIconMode && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1A2332] backdrop-blur-md text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-out translate-x-1 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-white/20">
                      {item.label}
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1A2332] rotate-45 border-l border-b border-white/20" />
                    </div>
                  )}
                </div>

                {/* Submenu */}
                {hasChildren && showLabels && (
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-out ${
                      isOpen ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-4 pl-3 border-l border-white/10 space-y-0.5 py-1">
                      {item.children.map((child) => {
                        // Sama seperti di atas: exact match ke pathname, bukan
                        // pakai prop `active` per-halaman.
                        const isChildItemActive = pathname === child.path;
                        return (
                          <button
                            key={child.key}
                            onClick={() => handleSubItemClick(item.key, child)}
                            className={`
                              flex items-center gap-2.5 w-full px-3 py-2 rounded-lg
                              text-xs font-medium transition-all duration-200
                              ${
                                isChildItemActive
                                  ? "text-white bg-white/15 border border-white/20"
                                  : "text-white/45 hover:text-white hover:bg-white/10"
                              }
                            `}
                          >
                            <child.icon size={15} className={isChildItemActive ? "text-blue-300" : "text-white/35"} />
                            <span className="flex-1 text-left tracking-wide">{child.label}</span>
                            {isChildItemActive && <div className="w-1 h-1 rounded-full bg-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}