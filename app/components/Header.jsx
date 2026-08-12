"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Sparkles,
  Moon,
  Sun,
  Command,
} from "lucide-react";

export default function Header({
  notifications = [],
  user = { name: "Super Admin", email: "admin@smartschool.com", avatar: "SA" },
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-slate-200/60 h-16 px-4 md:px-8 flex items-center justify-between flex-shrink-0 sticky top-0 z-30 shadow-sm backdrop-blur-sm bg-white/95">
      {/* Left Section */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Breadcrumb / Page Title */}
        <div className="hidden md:flex items-center gap-2.5">
          <span className="text-sm text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
            Super Admin
          </span>
        </div>

        {/* Search - Lebih modern, responsive */}
        <div className="relative hidden lg:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari menu, fitur, atau halaman..."
            className="pl-10 pr-16 py-2 bg-slate-50/80 border border-slate-200/60 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 xl:w-80 transition-all duration-200 hover:bg-slate-50"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 flex items-center gap-0.5">
              <Command size={10} />
              K
            </kbd>
          </div>
        </div>

        {/* Search icon for mobile - muncul di layar kecil */}
        <button className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all">
          <Search size={19} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 text-slate-400 hover:text-slate-600 hover:scale-105 relative group"
        >
          {isDarkMode ? (
            <Sun size={18} className="text-yellow-500" />
          ) : (
            <Moon size={18} />
          )}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {isDarkMode ? "Mode Terang" : "Mode Gelap"}
          </span>
        </button>

        {/* Notifikasi - Dengan animasi */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 text-slate-400 hover:text-slate-600 hover:scale-105 relative group"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <>
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-red-500/30 animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full animate-ping bg-red-400/30" />
              </>
            )}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Notifikasi
            </span>
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/60 py-1 z-40 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={14} className="text-blue-500" />
                  <p className="text-sm font-semibold text-slate-700">Notifikasi</p>
                </div>
                {unreadCount > 0 && (
                  <span className="text-[10px] text-blue-600 font-medium hover:underline cursor-pointer">
                    Tandai semua dibaca
                  </span>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-slate-50 transition-all duration-150 cursor-pointer border-l-4 ${
                        !notif.read ? "border-l-blue-500 bg-blue-50/30" : "border-l-transparent"
                      }`}
                    >
                      <p className="text-sm font-medium text-slate-700">{notif.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{notif.desc}</p>
                      <p className="text-[10px] text-slate-300 mt-1">{notif.time || "2 menit lalu"}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Bell size={32} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">Tidak ada notifikasi</p>
                  </div>
                )}
              </div>
              <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors w-full text-center">
                  Lihat semua notifikasi →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile - Dengan desain lebih modern */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
                {user.avatar || user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-700 leading-tight">{user.name}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{user.email}</p>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-all duration-200 group-hover:text-slate-600 ${isProfileOpen ? "rotate-180" : ""}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200/60 py-1 z-40 overflow-hidden">
              {/* Profile Header */}
              <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {user.avatar || user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items - Sekarang hanya 3 menu (Bantuan & Dukungan sudah dihapus) */}
              <div className="py-1">
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-all duration-150 group">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors">
                    <User size={16} />
                  </div>
                  <span>Profil Saya</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-all duration-150 group">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 group-hover:bg-purple-100 transition-colors">
                    <Settings size={16} />
                  </div>
                  <span>Pengaturan</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-slate-100 pt-1">
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-150 group">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 group-hover:bg-red-100 transition-colors">
                    <LogOut size={16} />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>

              {/* Version Info */}
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                <p className="text-[10px] text-slate-400 text-center tracking-widest">
                  v2.0.0 • 2026
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}