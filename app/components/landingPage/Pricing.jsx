"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Rocket } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Trial Basic",
      price: "Gratis",
      description: "Rasakan ekosistem digital tanpa batasan waktu. Mulai transformasi sekolah Anda hari ini.",
      button: "Mulai Uji Coba",
      popular: false,
      features: [
        "Akses Penuh Dashboard Manajemen",
        "Manajemen Data Guru & Siswa",
        "Sistem Absensi Digital Terintegrasi",
        "Penyusunan Jadwal Otomatis",
        "Dukungan Tim Support 24/7 via Email",
      ],
    },
    {
      name: "Professional",
      price: "Hubungi Kami",
      description: "Solusi all-in-one yang mengakselerasi seluruh aktivitas operasional dan akademik sekolah.",
      button: "Konsultasi Sekarang",
      popular: true,
      features: [
        "Semua Fitur Basic (Tanpa Batas)",
        "Manajemen Keuangan & Digital Payment",
        "Penerbitan Rapor Digital & E-Raport",
        "Modul PPDB Online Terintegrasi",
        "LMS & E-Learning Terpadu",
        "Broadcast & Notifikasi Multi-Saluran",
        "Business Intelligence & Laporan Real-time",
        "Dukungan Prioritas & Onboarding Khusus",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Arsitektur skalabel tanpa batas untuk yayasan, multi-cabang, dan institusi pendidikan besar.",
      button: "Hubungi Tim Sales",
      popular: false,
      features: [
        "Semua Fitur Professional (Ditingkatkan)",
        "Manajemen Multi-Yayasan & Sekolah",
        "Akses API Penuh & Sistem Integrasi",
        "Infrastruktur Cloud Dedicated Private",
        "Sesi Training & Workshop Digitalisasi",
        "Pendampingan Transformasi Menyeluruh",
        "C-Level Dashboard & Data Mining",
        "Dukungan Teknis 24/7 (SLA Prioritas)",
      ],
    },
  ];

  // 🔥 Animasi Super Hidup (Stagger + Spring Scale)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
  };

  return (
    <section className="relative bg-slate-50 overflow-hidden py-24 lg:py-28">
      
      {/* 🌟 Glowing Nebula Background - Menciptakan suasana Industrial Tech */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-blue-400/20 rounded-full blur-[130px] mix-blend-multiply" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-400/10 rounded-full blur-[140px] mix-blend-multiply" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">

        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 px-4 py-1.5 text-xs font-bold text-blue-600 mb-4 shadow-sm">
            <Zap size={14} className="fill-blue-600" />
            Pilihan Paket
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Pilih Paket yang Tepat untuk{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-fuchsia-600">
              Digitalisasi Sekolah
            </span>
          </h2>

          <p className="mt-4 text-slate-500 leading-7 max-w-xl mx-auto font-medium">
            Solusi terbaik untuk kebutuhan manajemen sekolah. Mulai dari uji coba gratis hingga dukungan enterprise.
          </p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-8 lg:grid-cols-3 items-stretch"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group flex flex-col h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl border ${
                plan.popular
                  ? // 🚀 PAKET POPULER: Dark Industrial Premium dengan Glowing Edge
                    "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.25)] hover:shadow-[0_0_80px_rgba(59,130,246,0.4)]"
                  : // 🧊 PAKET LAIN: Glassmorphism Transparan Putih
                    "bg-white/60 border-slate-200/70 shadow-lg hover:shadow-2xl hover:border-blue-400/50"
              }`}
            >
              {/* 🏷️ Badge Populer - Kini lebih menyatu dengan desain gelap */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-1.5 text-xs font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.8)] uppercase tracking-wider flex items-center gap-2 ring-2 ring-white/40">
                  <Sparkles size={14} fill="white" />
                  Paling Populer
                </div>
              )}

              {/* 🔥 HEADER - Perbedaan warna teks berdasarkan paket */}
              <div className={`flex items-start justify-between pb-4 border-b ${plan.popular ? "border-white/10" : "border-slate-200/60"}`}>
                <div className="flex flex-col">
                  <h3 className={`text-xl font-bold tracking-tight ${plan.popular ? "text-white" : "text-slate-800"}`}>
                    {plan.name}
                  </h3>
                  {/* Pill Recommended khusus untuk paket populer */}
                  {plan.popular && (
                    <span className="mt-1 text-[9px] font-bold bg-white/20 text-blue-300 px-2 py-0.5 rounded-full w-fit backdrop-blur-sm border border-white/10">
                      Rekomendasi Utama
                    </span>
                  )}
                </div>
                
                <div className="text-right flex flex-col items-end">
                  <span className={`text-2xl font-extrabold whitespace-nowrap tracking-tight ${
                    plan.price === "Hubungi Kami" || plan.price === "Custom" 
                      ? plan.popular ? "text-blue-400 text-xl" : "text-slate-700 text-xl"
                      : plan.popular ? "text-blue-400" : "text-blue-600"
                  }`}>
                    {plan.price}
                  </span>
                  
                  {/* Label hanya muncul jika relevan */}
                  {plan.price !== "Gratis" && plan.price !== "Hubungi Kami" && plan.price !== "Custom" && (
                    <span className={`text-[10px] font-medium mt-0.5 uppercase tracking-wider ${plan.popular ? "text-slate-400" : "text-slate-400"}`}>
                      /bulan
                    </span>
                  )}
                </div>
              </div>

              {/* Deskripsi */}
              <p className={`mt-5 text-[14px] leading-relaxed font-medium ${plan.popular ? "text-slate-300" : "text-slate-500"}`}>
                {plan.description}
              </p>

              {/* 🚀 TOMBOL CTA - Paket Populer diberi efek Glow kuat */}
              <button
                className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105 hover:brightness-110"
                    : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl hover:scale-[1.02]"
                }`}
              >
                {plan.button}
                {/* Icon berbeda untuk paket populer */}
                {plan.popular ? <Rocket size={16} className="fill-white" /> : <Zap size={16} className="fill-white" />}
              </button>

              {/* Daftar Fitur */}
              <div className="mt-8 flex-1 space-y-3.5">
                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                  >
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                      plan.popular 
                        ? "bg-blue-500/20 text-blue-400 shadow-sm shadow-blue-500/30" 
                        : "bg-emerald-100 text-emerald-600"
                    }`}>
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <span className={`text-[14px] leading-relaxed font-medium ${plan.popular ? "text-slate-200" : "text-slate-700"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}