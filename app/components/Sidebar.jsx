"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Crown, PanelLeftClose, PanelLeftOpen, ChevronDown, X } from "lucide-react";

import { guruSidebarConfig } from "./sidebar/guruSidebar";
import { superadminSidebarConfig } from "./sidebar/superadmin";
import { yayasanSidebarConfig } from "./sidebar/yayasanSidebar";
import { adminSidebarConfig } from "./sidebar/adminSidebar";
import { cmsSidebarConfig } from "./sidebar/cmsSidebar";
import { siswaSidebarConfig } from "./sidebar/siswaSidebar";
import { adminSarprasSidebarConfig } from "./sidebar/adminsarprasSidebar";

const configByRole = {
  guru: guruSidebarConfig,
  "super-admin": superadminSidebarConfig,
  yayasan: yayasanSidebarConfig,
  admin: adminSidebarConfig,
  cms: cmsSidebarConfig,
  siswa: siswaSidebarConfig,
  adminSarpras: adminSarprasSidebarConfig,
};

const DEFAULT_ROLE = "super-admin";

function resolveRole(pathname) {
  if (pathname?.startsWith("/guru")) return "guru";
  if (pathname?.startsWith("/yayasan")) return "yayasan";
  if (pathname?.startsWith("/super-admin")) return "super-admin";
  if (pathname?.startsWith("/cmsAdmin")) return "cms";
  if (pathname?.startsWith("/adminSarpras")) return "adminSarpras";
  if (pathname?.startsWith("/admin")) return "admin";
  if (pathname?.startsWith("/siswa")) return "siswa";
  return DEFAULT_ROLE;
}

export default function Sidebar({ active, setActive, collapsed, setCollapsed, role: roleProp }) {
  const router = useRouter();
  const pathname = usePathname();

  let role = roleProp;
  if (!role) {
    role = resolveRole(pathname);
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[Sidebar] Prop "role" tidak dikirim untuk pathname "${pathname}". ` +
          `Fallback menebak dari pathname bisa menyebabkan hydration mismatch. ` +
          `Tambahkan prop role secara eksplisit, contoh: <Sidebar role="${role}" ... />`
      );
    }
  }

  const config = configByRole[role] ?? configByRole[DEFAULT_ROLE];
  const menuSections = config.menuSections;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");

    const applyMode = (mobile) => {
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };

    applyMode(mq.matches);
    const handleChange = (e) => applyMode(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

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

  const [openMenus, setOpenMenus] = useState(() => {
    const initial = {};
    menuSections.forEach((item) => {
      if (item.children) initial[item.key] = true;
    });
    return initial;
  });

  useEffect(() => {
    const next = {};
    menuSections.forEach((item) => {
      if (item.children) next[item.key] = true;
    });
    setOpenMenus((prev) => ({ ...next, ...prev }));
  }, [role]);

  const toggleSubmenu = (key) => {
    if (collapsed && !isMobile) setCollapsed(false);
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeMobileDrawer = () => {
    if (isMobile) setCollapsed(true);
  };

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
      {/* FLOATING TOGGLE — muncul di luar sidebar setiap kali sidebar lagi TERTUTUP */}
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

        {/* =============================================
            HEADER SIDEBAR — LOGO DARI public/hero/logo/
            ============================================= */}
        <div className="relative z-10 flex items-center justify-between px-4 h-20 border-b border-white/10">
          {showLabels ? (
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Kotak Logo dengan Gambar dari public/hero/logo/logoSS.png */}
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-xl bg-white border border-white/15 flex items-center justify-center shadow-lg shadow-blue-500/20 backdrop-blur-sm overflow-hidden">
                  <img
                    src="/logo/logoSS.png"
                    alt="Logo SmartSchool"
                    className="w-8 h-8 object-contain rounded-lg"
                    onError={(e) => {
                      // Fallback jika gambar tidak ditemukan
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold text-xs shadow-inner shadow-white/20">
                          SS
                        </div>
                      `;
                    }}
                  />
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-1 rounded-xl bg-blue-400/10 blur-md -z-10" />
              </div>

              {/* Teks Brand */}
              <div className="flex flex-col leading-tight min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-lg tracking-tight whitespace-nowrap">
                    Smart<span className="text-blue-300">School</span>
                  </span>
                  <Crown size={12} className="text-yellow-400/80 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                  <span className="text-[10px] text-blue-200/70 font-medium tracking-wider uppercase">
                    {config.brandName}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // ===== MODE COLLAPSED (hanya ikon logo) =====
            <button
              onClick={() => {
                if (!isMobile) setCollapsed(!collapsed);
              }}
              className="w-full flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-white border border-white/15 flex items-center justify-center shadow-lg shadow-blue-500/20 backdrop-blur-sm hover:border-white/30 transition-all duration-200 overflow-hidden">
                  <img
                    src="/logo/logoSS.png"
                    alt="Logo SmartSchool"
                    className="w-8 h-8 object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold text-xs shadow-inner shadow-white/20">
                          SS
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-blue-400/10 blur-md -z-10" />
              </div>
            </button>
          )}

          {/* Tombol Toggle */}
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