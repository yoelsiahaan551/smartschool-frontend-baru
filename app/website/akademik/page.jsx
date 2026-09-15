// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   ArrowRight,
//   BookOpen,
//   GraduationCap,
//   Loader2,
//   AlertCircle,
//   Menu,
//   X,
//   School,
//   Users,
//   Award,
//   Building2,
//   RefreshCw,
//   Sparkles,
// } from "lucide-react";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // SESUAIKAN DENGAN SLUG YANG ADA DI DATABASE
// const SLUG_AKADEMIK = "akademik-1789371620436";

// export default function AkademikPage() {
//   const [subdomain, setSubdomain] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const [page, setPage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const path = window.location.pathname
//       .split("/")
//       .filter(Boolean);

//     // /website/smart/akademik
//     if (path[0] === "website" && path[1]) {
//       setSubdomain(path[1]);
//     }
//   }, []);

//   const fetchAkademik = async () => {
//     if (!subdomain || !API_URL) return;

//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch(
//         `${API_URL}/api/v1/publik/${subdomain}/halaman/${SLUG_AKADEMIK}`
//       );

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result?.message ||
//             "Gagal mengambil halaman akademik"
//         );
//       }

//       setPage(result?.data || null);
//     } catch (err) {
//       console.error("Akademik error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAkademik();
//   }, [subdomain]);

//   const websiteUrl = (path = "") =>
//     subdomain
//       ? `/website/${subdomain}${path}`
//       : "/website";

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
//       {/* =========================================================
//           NAVBAR
//       ========================================================= */}

//       <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
//           {/* LOGO */}

//           <Link
//             href={websiteUrl()}
//             className="flex items-center gap-3"
//           >
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-sm">
//               <School size={20} />
//             </div>

//             <div className="flex flex-col leading-tight">
//               <span className="text-lg font-bold tracking-tight text-[#0F172A]">
//                 Smart
//                 <span className="text-[#2563EB]">
//                   School
//                 </span>
//               </span>

//               <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                 Website Resmi Sekolah
//               </span>
//             </div>
//           </Link>

//           {/* DESKTOP NAV */}

//           <nav className="hidden items-center gap-1 md:flex">
//             {[
//               { label: "Beranda", path: "" },
//               { label: "Tentang", path: "/tentang" },
//               {
//                 label: "Akademik",
//                 path: "/akademik",
//                 active: true,
//               },
//               { label: "Artikel", path: "/articles" },
//               { label: "Kontak", path: "/kontak" },
//             ].map((item) => (
//               <Link
//                 key={item.label}
//                 href={websiteUrl(item.path)}
//                 className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
//                   item.active
//                     ? "bg-blue-50 text-[#2563EB]"
//                     : "text-slate-600 hover:bg-slate-100 hover:text-[#2563EB]"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* CTA */}

//           <div className="hidden md:block">
//             <Link
//               href={websiteUrl("/kontak")}
//               className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
//             >
//               Hubungi Kami
//               <ArrowRight size={16} />
//             </Link>
//           </div>

//           {/* MOBILE TOGGLE */}

//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* MOBILE MENU */}

//         {menuOpen && (
//           <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
//             <div className="flex flex-col gap-1">
//               {[
//                 { label: "Beranda", path: "" },
//                 { label: "Tentang", path: "/tentang" },
//                 { label: "Akademik", path: "/akademik" },
//                 { label: "Artikel", path: "/articles" },
//                 { label: "Kontak", path: "/kontak" },
//               ].map((item) => (
//                 <Link
//                   key={item.label}
//                   href={websiteUrl(item.path)}
//                   onClick={() => setMenuOpen(false)}
//                   className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </header>

//       {/* =========================================================
//           HERO
//       ========================================================= */}

//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-[#F8FAFC] to-indigo-50" />

//         <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl" />

//         <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
//           <Link
//             href={websiteUrl()}
//             className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
//           >
//             <ArrowLeft size={16} />
//             Kembali ke Beranda
//           </Link>

//           <div className="mt-8 max-w-3xl">
//             <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] shadow-sm">
//               <Sparkles size={14} />
//               Informasi Akademik
//             </span>

//             <div className="mt-6 flex items-start gap-4">
//               <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-sm sm:flex">
//                 <BookOpen size={28} />
//               </div>

//               <div className="min-w-0">
//                 <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#0F172A] md:text-5xl">
//                   {page?.judul || "Akademik"}
//                 </h1>

//                 <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
//                   Informasi akademik dan kegiatan
//                   pendidikan sekolah — kurikulum,
//                   mata pelajaran, tenaga pendidik,
//                   dan prestasi siswa.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =========================================================
//           CONTENT
//       ========================================================= */}

//       <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
//         {/* LOADING */}

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader2
//               className="animate-spin text-[#2563EB]"
//               size={36}
//             />

//             <p className="mt-4 text-sm font-medium text-slate-500">
//               Memuat informasi akademik...
//             </p>
//           </div>
//         ) : error ? (
//           /* ERROR */

//           <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
//             <div className="border-b border-red-100 bg-red-50 px-6 py-5">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
//                   <AlertCircle size={20} />
//                 </div>

//                 <div>
//                   <h2 className="font-bold text-red-800">
//                     Gagal memuat halaman
//                   </h2>

//                   <p className="mt-0.5 text-xs text-red-600">
//                     Terjadi kesalahan saat mengambil data.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               <p className="text-sm leading-relaxed text-slate-600">
//                 {error}
//               </p>

//               <button
//                 onClick={fetchAkademik}
//                 className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
//               >
//                 <RefreshCw size={16} />
//                 Coba Lagi
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* CUSTOM CONTENT */}

//             {page?.konten ? (
//               <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
//                       <BookOpen size={18} />
//                     </div>

//                     <div>
//                       <h2 className="font-bold text-[#0F172A]">
//                         Informasi Akademik
//                       </h2>

//                       <p className="mt-0.5 text-xs text-slate-500">
//                         Konten dari halaman akademik
//                         sekolah.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="px-6 py-8 sm:px-8 sm:py-10">
//                   <div
//                     className="prose prose-slate max-w-none text-sm leading-7 text-slate-700 sm:text-base"
//                     dangerouslySetInnerHTML={{
//                       __html: page.konten,
//                     }}
//                   />
//                 </div>
//               </article>
//             ) : (
//               /* DEFAULT GRID */

//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <AkademikCard
//                   icon={GraduationCap}
//                   title="Kurikulum"
//                   description="Informasi kurikulum dan proses pembelajaran sekolah."
//                 />

//                 <AkademikCard
//                   icon={BookOpen}
//                   title="Mata Pelajaran"
//                   description="Daftar mata pelajaran yang tersedia di setiap jenjang."
//                 />

//                 <AkademikCard
//                   icon={Users}
//                   title="Tenaga Pendidik"
//                   description="Informasi guru dan tenaga pendidik profesional."
//                 />

//                 <AkademikCard
//                   icon={Award}
//                   title="Prestasi"
//                   description="Prestasi akademik dan non-akademik siswa."
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </main>

//       {/* =========================================================
//           FOOTER
//       ========================================================= */}

//       <footer className="bg-[#0F172A] px-5 py-12 text-white lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
//             {/* BRAND */}

//             <div>
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white">
//                   <School size={20} />
//                 </div>

//                 <div className="flex flex-col leading-tight">
//                   <span className="text-lg font-bold tracking-tight text-white">
//                     Smart
//                     <span className="text-blue-400">
//                       School
//                     </span>
//                   </span>

//                   <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                     Website Resmi Sekolah
//                   </span>
//                 </div>
//               </div>

//               <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
//                 Platform informasi dan layanan
//                 pendidikan sekolah yang modern,
//                 cepat, dan mudah diakses.
//               </p>
//             </div>

//             {/* NAVIGASI */}

//             <div>
//               <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">
//                 Navigasi
//               </h4>

//               <ul className="mt-4 space-y-2.5 text-sm">
//                 {[
//                   { label: "Beranda", path: "" },
//                   { label: "Tentang", path: "/tentang" },
//                   {
//                     label: "Akademik",
//                     path: "/akademik",
//                   },
//                   {
//                     label: "Artikel",
//                     path: "/articles",
//                   },
//                   {
//                     label: "Kontak",
//                     path: "/kontak",
//                   },
//                 ].map((item) => (
//                   <li key={item.label}>
//                     <Link
//                       href={websiteUrl(item.path)}
//                       className="text-slate-400 transition hover:text-white"
//                     >
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* KONTAK */}

//             <div>
//               <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">
//                 Kontak
//               </h4>

//               <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
//                 <li>info@smartschool.sch.id</li>
//                 <li>(021) 1234-5678</li>
//                 <li>Senin – Jumat, 07.00 – 16.00</li>
//               </ul>
//             </div>
//           </div>

//           {/* BOTTOM */}

//           <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
//             <p>
//               © {new Date().getFullYear()} SmartSchool.
//               All rights reserved.
//             </p>

//             <p>
//               Dibuat dengan ❤️ untuk pendidikan
//               Indonesia.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// /* =========================================================
//    AKADEMIK CARD
// ========================================================= */

// function AkademikCard({
//   icon: Icon,
//   title,
//   description,
// }) {
//   return (
//     <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-md">
//       <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] transition group-hover:bg-[#2563EB] group-hover:text-white">
//         <Icon size={24} />
//       </div>

//       <h3 className="mt-5 text-base font-bold text-[#0F172A]">
//         {title}
//       </h3>

//       <p className="mt-2 text-sm leading-relaxed text-slate-500">
//         {description}
//       </p>
//     </div>
//   );
// }