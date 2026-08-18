"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Crown, PanelLeftClose, ChevronDown, X, Sparkles } from "lucide-react";

import { guruSidebarConfig } from "./sidebar/guruSidebar";
import { superadminSidebarConfig } from "./sidebar/superadmin";
import { yayasanSidebarConfig } from "./sidebar/yayasanSidebar";
import { adminSidebarConfig } from "./sidebar/adminSidebar"; // 👈 tambahkan import

/**
 * Sidebar Premium — Mendukung 4 role: Guru, Yayasan, Super Admin, Admin.
 * Klik logo SmartSchool untuk toggle collapse/expand.
 * Tanpa Mini Profile.
 */
const configByRole = {
  guru: guruSidebarConfig,
  "super-admin": superadminSidebarConfig,
  yayasan: yayasanSidebarConfig,
  admin: adminSidebarConfig, // 👈 tambahkan
};

function resolveRole(pathname) {
  if (pathname?.startsWith("/guru")) return "guru";
  if (pathname?.startsWith("/yayasan")) return "yayasan";
  if (pathname?.startsWith("/super-admin")) return "super-admin";
  if (pathname?.startsWith("/admin")) return "admin"; // 👈 tambahkan
  return "super-admin"; // fallback
}

const roleLabels = {
  guru: "Guru",
  "super-admin": "Super Admin",
  yayasan: "Yayasan",
  admin: "Admin Sekolah", // 👈 tambahkan
};

export default function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  const router = useRouter();
  const pathname = usePathname();

  const role = resolveRole(pathname);
  const config = configByRole[role];
  const menuSections = config.menuSections;

  // ===== Responsive =====
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

  // Lock scroll mobile
  useEffect(() => {
    if (isMobile && !collapsed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, collapsed]);

  // Submenu auto-open
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

  // ===== Logo Click: toggle sidebar =====
  const handleLogoClick = () => {
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  const handleMenuClick = (item) => {
    const alreadyOnThisPage = pathname === item.path;
    setActive(item.key);
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
    setActive(child.key);
    router.push(child.path);
    closeMobileDrawer();
  };

  const showLabels = isMobile ? !collapsed : !collapsed;

  const asideClasses = isMobile
    ? `
        fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw]
        bg-gradient-to-b from-[#0A0F1A] via-[#15203A] to-[#0A0F1A]
        flex flex-col
        transition-transform duration-300 ease-in-out
        overflow-hidden border-r border-white/8
        ${collapsed ? "-translate-x-full" : "translate-x-0"}
      `
    : `
        ${collapsed ? "w-[72px]" : "w-64"}
        bg-gradient-to-b from-[#0A0F1A] via-[#15203A] to-[#0A0F1A]
        flex flex-col
        transition-all duration-300 ease-in-out
        flex-shrink-0 h-screen sticky top-0
        relative overflow-hidden
        border-r border-white/8
      `;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <aside className={asideClasses}>
        {/* ===== Background Glow ===== */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-2xl" />
        </div>

        {/* ===== Garis Gradasi Atas ===== */}
        <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

        {/* ===== HEADER: Logo + Toggle ===== */}
        <div className="relative z-10 flex items-center justify-between px-4 h-[72px] border-b border-white/8">
          {/* Logo — klik untuk toggle */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer group"
            title={collapsed ? "Klik untuk expand" : "Klik untuk collapse"}
          >
            {showLabels ? (
              <div className="flex flex-col leading-tight text-left transition-all duration-300 group-hover:scale-105 origin-left">
                <span className="font-bold text-white text-xl tracking-tight">
                  Smart<span className="text-blue-300">School</span>
                </span>
                <div className="flex items-center gap-2">
                  <Crown size={10} className="text-yellow-400/80" />
                  <span className="text-[10px] text-blue-200/60 font-medium tracking-wider uppercase">
                    {config.brandName}
                  </span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/8 text-white/50 border border-white/8">
                    {roleLabels[role] || role}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/40">
                S
              </div>
            )}
          </button>

          {/* Desktop: collapse button */}
          {!isMobile && showLabels && (
            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center w-8 h-8 rounded-lg 
                bg-white/5 hover:bg-white/12 transition-all duration-200
                border border-white/8 hover:border-white/25
                text-white/40 hover:text-white"
              title="Ciutkan Sidebar"
            >
              <PanelLeftClose size={17} />
            </button>
          )}

          {/* Mobile: close button */}
          {isMobile && (
            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center w-8 h-8 rounded-lg 
                bg-white/5 hover:bg-white/12 transition-all duration-200
                border border-white/8 hover:border-white/25
                text-white/40 hover:text-white flex-shrink-0"
              title="Tutup Menu"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* ===== MINI PROFILE — DIHAPUS ===== */}

        {/* ===== NAVIGATION ===== */}
        <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-thin scrollbar-thumb-white/8 scrollbar-track-transparent pb-6">
          {menuSections.map((item, index) => {
            if (item.type === "header") {
              if (!showLabels) return null;
              return (
                <div key={`header-${index}`} className="px-2 pt-5 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-white/8" />
                    <span className="text-[9px] font-semibold text-white/25 uppercase tracking-[0.25em]">
                      {item.label}
                    </span>
                    <div className="flex-1 h-px bg-white/8" />
                  </div>
                </div>
              );
            }

            const hasChildren = !!item.children;
            const isChildActive = hasChildren && item.children.some((c) => pathname?.startsWith(c.path));
            const isActive = active === item.key || pathname === item.path || isChildActive;
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
                    ${
                      isActive
                        ? "text-white bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-blue-500/8"
                        : "text-white/35 hover:text-white hover:bg-white/6"
                    }
                    ${collapsedIconMode ? "justify-center px-2" : ""}
                    group
                  `}
                >
                  {/* Active indicator — garis gradasi kiri */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-gradient-to-b from-blue-400 to-indigo-400 shadow-lg shadow-blue-400/40" />
                  )}

                  {/* Icon */}
                  <div
                    className={`
                      relative flex items-center justify-center
                      transition-all duration-200
                      ${isActive ? "text-white" : "text-white/35 group-hover:text-white/75"}
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
                      <div className="absolute inset-0 bg-blue-400/15 rounded-lg blur-xl -z-10" />
                    )}
                    {isActive && collapsedIconMode && (
                      <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl -z-10" />
                    )}
                  </div>

                  {/* Label */}
                  {showLabels && (
                    <span className="flex-1 text-left text-xs tracking-wide truncate">
                      {item.label}
                    </span>
                  )}

                  {/* Chevron for submenu */}
                  {showLabels && hasChildren && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubmenu(item.key);
                      }}
                      className="p-1 -m-1 rounded-md hover:bg-white/8 transition-colors duration-150"
                    >
                      <ChevronDown
                        size={14}
                        className={`text-white/30 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}

                  {/* Bullet indicator for active leaf item */}
                  {showLabels && !hasChildren && isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-glow" />
                  )}

                  {/* Tooltip saat collapsed */}
                  {collapsedIconMode && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1A2332] backdrop-blur-md text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-out translate-x-1 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-white/15 shadow-lg shadow-black/30">
                      {item.label}
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1A2332] rotate-45 border-l border-b border-white/15" />
                    </div>
                  )}
                </div>

                {/* Submenu */}
                {hasChildren && showLabels && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-4 pl-3 border-l-2 border-white/8 space-y-0.5 py-1">
                      {item.children.map((child) => {
                        const isChildItemActive = active === child.key || pathname === child.path;
                        return (
                          <button
                            key={child.key}
                            onClick={() => handleSubItemClick(item.key, child)}
                            className={`
                              flex items-center gap-2.5 w-full px-3 py-2 rounded-lg
                              text-xs font-medium transition-all duration-200
                              ${
                                isChildItemActive
                                  ? "text-white bg-white/8 border border-white/15"
                                  : "text-white/35 hover:text-white hover:bg-white/6"
                              }
                            `}
                          >
                            <child.icon size={15} className={isChildItemActive ? "text-blue-300" : "text-white/25"} />
                            <span className="flex-1 text-left tracking-wide truncate">{child.label}</span>
                            {isChildItemActive && <div className="w-1 h-1 rounded-full bg-blue-400" />}
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

        {/* ===== FOOTER ===== */}
        <div className="relative z-10 p-3 border-t border-white/8">
          <div className="flex items-center justify-center gap-2 text-[9px] text-white/15">
            <Sparkles size={12} className="text-blue-300/20" />
            <span>v2.0 • Premium</span>
          </div>
        </div>
      </aside>
    </>
  );
}