"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Crown, ChevronRight, ChevronDown } from "lucide-react";

import { guruSidebarConfig } from "./sidebar/guruSidebar";
import { superadminSidebarConfig } from "./sidebar/superadmin";
import { yayasanSidebarConfig } from "./sidebar/yayasanSidebar";
import { adminSidebarConfig } from "./sidebar/adminSidebar";
import { cmsSidebarConfig } from "./sidebar/cmsSidebar";
import { siswaSidebarConfig } from "./sidebar/siswaSidebar";
import { adminSarprasSidebarConfig } from "./sidebar/adminsarprasSidebar";
import { adminPPDBSidebarConfig } from "./sidebar/adminppdbSidebar";

const configByRole = {
  guru: guruSidebarConfig,
  "super-admin": superadminSidebarConfig,
  yayasan: yayasanSidebarConfig,
  admin: adminSidebarConfig,
  cms: cmsSidebarConfig,
  siswa: siswaSidebarConfig,
  adminSarpras: adminSarprasSidebarConfig,
  adminPPDB: adminPPDBSidebarConfig,
};

const DEFAULT_ROLE = "super-admin";

// Key localStorage untuk menyimpan preferensi collapsed/expanded sidebar.
// Dipakai supaya kalau komponen Sidebar ini remount (mis. karena parent-nya
// ikut ter-remount saat pindah halaman lewat router.push), tampilan sidebar
// tidak balik lagi ke bentuk lebar/default — dia akan memulihkan status
// terakhir yang dipilih user.
const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";

function resolveRole(pathname) {
  if (pathname?.startsWith("/guru")) return "guru";
  if (pathname?.startsWith("/yayasan")) return "yayasan";
  if (pathname?.startsWith("/super-admin")) return "super-admin";
  if (pathname?.startsWith("/cmsAdmin")) return "cms";
  if (pathname?.startsWith("/adminSarpras")) return "adminSarpras";
  if (pathname?.startsWith("/adminPPDB")) return "adminPPDB";
  if (pathname?.startsWith("/admin")) return "admin";
  if (pathname?.startsWith("/siswa")) return "siswa";
  return DEFAULT_ROLE;
}

export default function Sidebar({ active, setActive, collapsed: collapsedProp, setCollapsed: setCollapsedProp, role: roleProp }) {
  const router = useRouter();
  const pathname = usePathname();

  let role = roleProp;
  if (!role) {
    role = resolveRole(pathname);
  }

  const config = configByRole[role] ?? configByRole[DEFAULT_ROLE];
  const menuSections = config.menuSections;

  const [collapsed, setCollapsedInternal] = useState(() => collapsedProp ?? false);

const setCollapsed = (value) => {
  setCollapsedInternal((prev) => {
    const next = typeof value === "function" ? value(prev) : value;
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
    } catch (e) {
      // abaikan, mis. private browsing / storage penuh
    }
    return next;
  });
};

// Sinkronkan status collapsed ke parent (setCollapsedProp) lewat effect,
// BUKAN langsung di dalam updater setCollapsedInternal di atas. Memanggil
// setState milik komponen lain (parent) dari dalam updater function akan
// dieksekusi React pada fase render, sehingga memicu error
// "Cannot update a component while rendering a different component".
useEffect(() => {
  setCollapsedProp?.(collapsed);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [collapsed]);

  const [isMobile, setIsMobile] = useState(false);

  const [allowTransition, setAllowTransition] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");

    let stored = null;
    try {
      stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    } catch (e) {
      stored = null;
    }

    const applyMode = (mobile) => {
      setIsMobile(mobile);
      if (stored !== null) {
        setCollapsedInternal(stored === "true");
      } else if (mobile) {

        setCollapsedInternal(true);
        try {
          localStorage.setItem(SIDEBAR_COLLAPSED_KEY, "true");
        } catch (e) {
          // abaikan
        }
      }
    };

    applyMode(mq.matches);

    // Baru nyalakan transisi CSS SETELAH koreksi awal di atas selesai
    // di-commit. requestAnimationFrame dipakai supaya benar-benar menunggu
    // satu frame render (dengan width yang sudah benar) sebelum transisi
    // diaktifkan, jadi tidak ada lompatan yang ikut teranimasi.
    const raf = requestAnimationFrame(() => setAllowTransition(true));

    const handleChange = (e) => {
      // Hanya update flag isMobile saat breakpoint berubah (resize / rotate).
      // Status collapsed yang sudah dipilih user tidak diutak-atik lagi di sini,
      // supaya klik logo/toggle tidak ketiban reset oleh listener resize.
      setIsMobile(e.matches);
    };

    mq.addEventListener("change", handleChange);
    return () => {
      mq.removeEventListener("change", handleChange);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  // ---- flyout submenu saat sidebar collapsed, dirender via Portal ----
  const [flyoutState, setFlyoutState] = useState(null);
  const [mounted, setMounted] = useState(false);
  const sidebarNavRef = useRef(null);
  const flyoutPanelRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => setMounted(true), []);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openFlyoutFor = (item, triggerEl) => {
    clearCloseTimeout();
    const rect = triggerEl.getBoundingClientRect();
    setFlyoutState({
      key: item.key,
      item,
      top: rect.top,
      left: rect.right + 12,
    });
  };

  const scheduleCloseFlyout = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setFlyoutState(null), 150);
  };

  const toggleFlyoutByClick = (item, triggerEl) => {
    setFlyoutState((prev) => {
      if (prev && prev.key === item.key) return null;
      const rect = triggerEl.getBoundingClientRect();
      return { key: item.key, item, top: rect.top, left: rect.right + 12 };
    });
  };

  useEffect(() => {
    if (!flyoutState) return;
    const handleOutsideClick = (e) => {
      const clickedInsideNav = sidebarNavRef.current?.contains(e.target);
      const clickedInsidePanel = flyoutPanelRef.current?.contains(e.target);
      if (!clickedInsideNav && !clickedInsidePanel) {
        setFlyoutState(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [flyoutState]);

  useEffect(() => {
    if (!flyoutState) return;
    const close = () => setFlyoutState(null);
    window.addEventListener("resize", close);
    sidebarNavRef.current?.addEventListener("scroll", close);
    return () => {
      window.removeEventListener("resize", close);
      sidebarNavRef.current?.removeEventListener("scroll", close);
    };
  }, [flyoutState]);

  useEffect(() => {
    if (!collapsed) setFlyoutState(null);
  }, [collapsed]);
  // ---- akhir bagian flyout submenu ----

  // ---- tooltip logo (portal) ----
  const [logoTooltip, setLogoTooltip] = useState(null);
  const logoWrapRef = useRef(null);
  const logoTooltipTimeoutRef = useRef(null);

  const clearLogoTooltipTimeout = () => {
    if (logoTooltipTimeoutRef.current) {
      clearTimeout(logoTooltipTimeoutRef.current);
      logoTooltipTimeoutRef.current = null;
    }
  };

  const showLogoTooltip = () => {
    clearLogoTooltipTimeout();
    if (!logoWrapRef.current) return;
    const rect = logoWrapRef.current.getBoundingClientRect();
    setLogoTooltip({
      top: rect.top + rect.height / 2,
      left: rect.right + 12,
    });
  };

  const hideLogoTooltip = () => {
    clearLogoTooltipTimeout();
    logoTooltipTimeoutRef.current = setTimeout(() => setLogoTooltip(null), 100);
  };

  useEffect(() => {
    if (!logoTooltip) return;
    const close = () => setLogoTooltip(null);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [logoTooltip]);
  // ---- akhir tooltip logo ----

  // ---- tooltip label menu item (portal), dipakai saat sidebar collapsed ----
  const [itemTooltip, setItemTooltip] = useState(null);
  const itemTooltipTimeoutRef = useRef(null);

  const clearItemTooltipTimeout = () => {
    if (itemTooltipTimeoutRef.current) {
      clearTimeout(itemTooltipTimeoutRef.current);
      itemTooltipTimeoutRef.current = null;
    }
  };

  const showItemTooltip = (item, triggerEl) => {
    clearItemTooltipTimeout();
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    setItemTooltip({
      key: item.key,
      label: item.label,
      top: rect.top + rect.height / 2,
      left: rect.right + 12,
    });
  };

  const hideItemTooltip = () => {
    clearItemTooltipTimeout();
    itemTooltipTimeoutRef.current = setTimeout(() => setItemTooltip(null), 100);
  };

  useEffect(() => {
    if (!itemTooltip) return;
    const close = () => setItemTooltip(null);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    sidebarNavRef.current?.addEventListener("scroll", close);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
      sidebarNavRef.current?.removeEventListener("scroll", close);
    };
  }, [itemTooltip]);

  useEffect(() => {
    if (!collapsed) setItemTooltip(null);
  }, [collapsed]);

  useEffect(() => {
    if (flyoutState) setItemTooltip(null);
  }, [flyoutState]);
  // ---- akhir tooltip label menu item ----

  const toggleSidebar = () => setCollapsed(!collapsed);

  // PENTING: sudah tidak ada lagi "if (collapsed) setCollapsed(false)" di sini.
  // Toggle submenu sekarang murni cuma buka/tutup accordion openMenus,
  // tidak pernah mengubah status collapsed sidebar secara otomatis.
  const toggleSubmenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // FIX: closeMobileDrawer sengaja TIDAK dipanggil lagi di handleMenuClick
  // maupun handleSubItemClick. Sebelumnya, setiap kali user tap item menu
  // di mode mobile, drawer otomatis tertutup lagi (collapsed jadi true).
  // Sekarang drawer tetap terbuka setelah item di-klik/navigasi, dan hanya
  // tertutup kalau user sendiri yang menutupnya (tap tombol toggle chevron
  // atau tap area backdrop gelap di luar sidebar).
  const closeMobileDrawer = () => {
    // sengaja dikosongkan (no-op) untuk mobile, lihat catatan di atas
  };

  const handleMenuClick = (item, collapsedIconMode, triggerEl) => {
    if (collapsedIconMode && item.children) {
      // FIX: di mode mobile/ciut, jangan buka flyout mengambang.
      // Flyout yang muncul tepat di sebelah sidebar ciut bikin sidebar
      // kelihatan "melebar" secara visual di layar HP yang sempit.
      // Cukup arahkan ke path item (kalau ada), atau diam saja.
      if (isMobile) {
        if (item.path) {
          setActive?.(item.key);
          router.push(item.path);
        }
        return;
      }
      toggleFlyoutByClick(item, triggerEl);
      return;
    }

    setItemTooltip(null);

    const alreadyOnThisPage = pathname === item.path;
    setActive?.(item.key);

    if (item.children && alreadyOnThisPage) {
      toggleSubmenu(item.key);
      return;
    }
    if (item.path) {
      router.push(item.path);
    }
  };

  const handleSubItemClick = (parentKey, child) => {
    setActive?.(child.key);
    router.push(child.path);
    setFlyoutState(null);
  };

  const showLabels = !collapsed;

  const transitionClass = allowTransition ? "transition-all duration-300 ease-in-out" : "transition-none";

  const asideClasses = isMobile
    ? `
        fixed inset-y-0 left-0 z-50
        ${collapsed ? "w-[72px]" : "w-64 max-w-[85vw]"}
        bg-blue-50
        flex flex-col
        ${transitionClass}
        overflow-hidden border-r border-slate-200
      `
    : `
        ${collapsed ? "w-[72px]" : "w-64"}
        bg-blue-100
        flex flex-col
        ${transitionClass}
        flex-shrink-0 h-screen sticky top-0
        relative overflow-hidden
        border-r border-slate-200
      `;


  const wrapperClasses = isMobile
    ? `relative flex-shrink-0 h-screen z-40 ${transitionClass} ${
        collapsed ? "w-[72px]" : "w-64 max-w-[85vw]"
      }`
    : `relative flex-shrink-0 sticky top-0 h-screen z-40 ${transitionClass} ${
        collapsed ? "w-[72px]" : "w-64"
      }`;

  return (
    <>
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <div className={wrapperClasses}>
        <aside className={asideClasses}>
          <div className="relative z-10 h-[3px] w-full bg-[#155DFC]" />

          <div className="relative z-10 flex items-center px-4 h-20 border-b-2 border-[#155DFC]/20 bg-white/40">
            <div
              ref={logoWrapRef}
              onMouseEnter={showLogoTooltip}
              onMouseLeave={hideLogoTooltip}
              className={`flex items-center gap-3 min-w-0 ${collapsed ? "w-full justify-center" : ""}`}
            >
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src="/logo/logoSS.png"
                  alt="Logo SmartSchool"
                  fill
                  sizes="44px"
                  className="object-contain"
                  priority
                />
              </div>

              {showLabels && (
                <div className="flex flex-col leading-tight text-left min-w-0">
                  <span className="font-bold text-slate-800 text-xl tracking-tight truncate">
                    Smart<span className="text-blue-600">School</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Crown size={10} className="text-yellow-500 flex-shrink-0" />
                    <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase truncate">
                      {config.brandName}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <nav
            ref={sidebarNavRef}
            className="relative z-10 flex-1 overflow-y-auto px-3 py-4 mt-2 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent pb-6"
          >
            {menuSections.map((item, index) => {
              if (item.type === "header") {
                if (!showLabels) return null;
                return (
                  <div key={`header-${index}`} className="px-2 pt-5 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-blue-200" />
                      <span className="text-[9px] font-semibold text-blue-500/80 uppercase tracking-[0.2em]">
                        {item.label}
                      </span>
                      <div className="flex-1 h-px bg-blue-200" />
                    </div>
                  </div>
                );
              }

              const hasChildren = !!item.children;
              const isChildActive = hasChildren && item.children.some((c) => pathname === c.path);
              const isActive = pathname === item.path || isChildActive;
              const isOpen = !!openMenus[item.key];
              const collapsedIconMode = collapsed;
              const isFlyoutActive = flyoutState?.key === item.key;

              return (
                <div key={item.key} className="relative">
                  <div
                    onClick={(e) => handleMenuClick(item, collapsedIconMode, e.currentTarget)}
                    onMouseEnter={(e) => {
                      // FIX: hover flyout/tooltip hanya untuk desktop.
                      // Di mobile, tap ditangani sepenuhnya oleh onClick,
                      // dan flyout tidak pernah dipakai (lihat handleMenuClick).
                      if (isMobile) return;
                      if (collapsedIconMode && hasChildren) openFlyoutFor(item, e.currentTarget);
                      if (collapsedIconMode && !hasChildren) showItemTooltip(item, e.currentTarget);
                    }}
                    onMouseLeave={() => {
                      if (isMobile) return;
                      if (collapsedIconMode && hasChildren) scheduleCloseFlyout();
                      if (collapsedIconMode && !hasChildren) hideItemTooltip();
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleMenuClick(item, collapsedIconMode, e.currentTarget);
                      }
                    }}
                    className={`
                      relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl 
                      text-sm font-medium transition-all duration-200 ease-out cursor-pointer select-none
                      ${isActive ? "text-blue-700 bg-white border border-blue-200" : "text-slate-600 hover:text-blue-700 hover:bg-white/60"}
                      ${collapsedIconMode ? "justify-center px-2" : ""}
                      group
                    `}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-500" />
                    )}

                    <div
                      className={`
                      relative flex items-center justify-center
                      transition-all duration-200
                      ${isActive ? "text-blue-600" : "text-blue-400 group-hover:text-blue-500"}
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
                    </div>

                    {showLabels && <span className="flex-1 text-left text-xs tracking-wide">{item.label}</span>}

                    {showLabels && hasChildren && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubmenu(item.key);
                        }}
                        className="p-1 -m-1 rounded-md hover:bg-slate-200/60 transition-colors duration-150"
                        title={isOpen ? "Tutup submenu" : "Buka submenu"}
                      >
                        <ChevronDown
                          size={14}
                          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}

                    {showLabels && !hasChildren && isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                  </div>

                  {hasChildren && showLabels && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-out ${
                        isOpen ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-4 pl-3 border-l border-blue-200 space-y-0.5 py-1">
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
                                    ? "text-blue-700 bg-white border border-blue-200"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                                }
                              `}
                            >
                              <child.icon size={15} className={isChildItemActive ? "text-blue-600" : "text-slate-400"} />
                              <span className="flex-1 text-left tracking-wide">{child.label}</span>
                              {isChildItemActive && <div className="w-1 h-1 rounded-full bg-blue-500" />}
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

        {/* Flyout submenu via Portal (desktop only, lihat handleMenuClick & onMouseEnter) */}
        {mounted &&
          flyoutState &&
          createPortal(
            <div
              ref={flyoutPanelRef}
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={scheduleCloseFlyout}
              style={{
                position: "fixed",
                top: flyoutState.top,
                left: flyoutState.left,
                zIndex: 9999,
              }}
              className="min-w-[230px] bg-white rounded-xl shadow-xl border border-slate-200 p-2"
            >
              <div className="absolute -left-1.5 top-5 w-3 h-3 bg-white border-l border-b border-slate-200 rotate-45" />

              <div className="px-2 pt-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {flyoutState.item.label}
              </div>

              <div className="space-y-0.5">
                {flyoutState.item.children.map((child) => {
                  const isChildItemActive = pathname === child.path;
                  return (
                    <button
                      key={child.key}
                      onClick={() => handleSubItemClick(flyoutState.item.key, child)}
                      className={`
                        flex items-center gap-2.5 w-full px-3 py-2 rounded-lg
                        text-xs font-medium text-left transition-all duration-200
                        ${
                          isChildItemActive
                            ? "text-blue-700 bg-blue-50 border border-blue-200"
                            : "text-slate-600 hover:text-blue-700 hover:bg-sky-50"
                        }
                      `}
                    >
                      <child.icon size={15} className={isChildItemActive ? "text-blue-600" : "text-slate-400"} />
                      <span className="flex-1 truncate">{child.label}</span>
                      {isChildItemActive && <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body
          )}

        {/* Tooltip logo via Portal */}
        {mounted &&
          logoTooltip &&
          createPortal(
            <div
              style={{
                position: "fixed",
                top: logoTooltip.top,
                left: logoTooltip.left,
                transform: "translateY(-50%)",
                zIndex: 9999,
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-[10px] font-bold whitespace-nowrap shadow-lg pointer-events-none"
            >
              {config.brandName}
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-800 rotate-45" />
            </div>,
            document.body
          )}

        {/* Tooltip label menu item via Portal */}
        {mounted &&
          itemTooltip &&
          createPortal(
            <div
              style={{
                position: "fixed",
                top: itemTooltip.top,
                left: itemTooltip.left,
                transform: "translateY(-50%)",
                zIndex: 9999,
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-[10px] font-bold whitespace-nowrap shadow-lg pointer-events-none"
            >
              {itemTooltip.label}
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-800 rotate-45" />
            </div>,
            document.body
          )}

        <button
          onClick={toggleSidebar}
          title={collapsed ? "Buka Sidebar" : "Ciutkan Sidebar"}
          aria-label={collapsed ? "Buka Sidebar" : "Ciutkan Sidebar"}
          aria-expanded={!collapsed}
          className="absolute z-[100] top-8 -right-3 w-7 h-7 rounded-full
            bg-white
            border border-blue-200
            flex items-center justify-center text-blue-500
            shadow-md shadow-blue-100
            hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300
            hover:scale-110 active:scale-95
            transition-all duration-200 ease-in-out"
        >
          <ChevronRight
            size={14}
            className={`transition-transform duration-300 ease-in-out ${collapsed ? "" : "rotate-180"}`}
          />
        </button>
      </div>
    </>
  );
}