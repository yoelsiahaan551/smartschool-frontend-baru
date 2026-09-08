"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  Menu,
  Newspaper,
  School,
  Trophy,
  Users,
  X,
  UserCircle,
  Lock,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SUBDOMAIN = "smart";

export default function WebsiteHomePage() {
  const [artikel, setArtikel] = useState([]);
  const [loadingArtikel, setLoadingArtikel] = useState(true);
  const [errorArtikel, setErrorArtikel] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    async function fetchArtikel() {
      try {
        setLoadingArtikel(true);
        setErrorArtikel("");
        if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi.");

        const response = await fetch(`${API_URL}/api/v1/publik/${SUBDOMAIN}/artikel`);
        const result = await response.json();
        if (!response.ok) throw new Error(result?.message || "Gagal mengambil artikel.");
        setArtikel(result?.data || []);
      } catch (error) {
        console.error("Gagal mengambil artikel publik:", error);
        setErrorArtikel(error?.message || "Gagal mengambil artikel.");
      } finally {
        setLoadingArtikel(false);
      }
    }
    fetchArtikel();
  }, []);

  const artikelTerbaru = artikel.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 overflow-x-hidden">
      {/* ======================================================
          NAVBAR
      ====================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/website" className="flex items-center gap-3 group">
            <div className="relative flex h-11 w-11 items-center justify-center bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white rounded-xl shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
              <School size={22} />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center bg-amber-400 rounded-full text-[8px] font-bold text-slate-900">S</span>
            </div>
            <div>
              <p className="text-[15px] font-extrabold tracking-tight text-[#0f172a]">SMK SMART SCHOOL</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Sekolah Digital</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/website" className="text-sm font-semibold text-blue-600 relative group">
              Beranda
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
            <Link href="/website/tentang" className="text-sm font-medium text-slate-500 transition hover:text-blue-600">Tentang</Link>
            <Link href="/website/akademik" className="text-sm font-medium text-slate-500 transition hover:text-blue-600">Akademik</Link>
            <Link href="/website/articles" className="text-sm font-medium text-slate-500 transition hover:text-blue-600">Artikel</Link>
            <Link href="/website/kontak" className="text-sm font-medium text-slate-500 transition hover:text-blue-600">Kontak</Link>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-600 md:hidden rounded-lg hover:bg-slate-50"
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden shadow-xl">
            <nav className="space-y-1">
              {[
                { href: "/website", label: "Beranda" },
                { href: "/website/tentang", label: "Tentang" },
                { href: "/website/akademik", label: "Akademik" },
                { href: "/website/articles", label: "Artikel" },
                { href: "/website/kontak", label: "Kontak" },
              ].map((item) => (
                <MobileNavLink key={item.href} href={item.href} label={item.label} onClick={() => setMobileMenu(false)} />
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ======================================================
          HERO – Premium Dark
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#0f172a]">
        {/* Animated backgrounds */}
        <div className="absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl animate-float-delay" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 border border-blue-400/30 bg-blue-500/10 px-4 py-2 rounded-full text-xs font-bold text-blue-200 backdrop-blur-sm">
              <Sparkles size={15} />
              Portal Sekolah Digital Masa Depan
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Membangun Generasi
              <span className="mt-2 block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Berprestasi & Berkarakter
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-slate-300 sm:text-base">
              Selamat datang di portal resmi sekolah. Akses informasi akademik, berita, kegiatan, prestasi, dan layanan digital sekolah dalam satu platform terintegrasi.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/website/artikel" className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-105">
                Lihat Artikel
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/website/tentang" className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40">
                Tentang Sekolah
              </Link>
            </div>
          </div>

          {/* HERO STATISTICS */}
          <div className="grid grid-cols-2 gap-5 animate-fade-up-delay">
            <StatCard icon={<Users size={24} />} value="1.200+" label="Siswa Aktif" />
            <StatCard icon={<GraduationCap size={24} />} value="80+" label="Guru & Staff" />
            <StatCard icon={<Trophy size={24} />} value="50+" label="Prestasi" />
            <StatCard icon={<School size={24} />} value="25+" label="Program" />
          </div>
        </div>
      </section>

      {/* ======================================================
          QUICK INFO – Premium Light
      ====================================================== */}
      <section className="relative z-10 -mt-10 px-5 sm:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3">
          <QuickInfo
            icon={<GraduationCap size={22} />}
            title="Pendidikan Berkualitas"
            description="Pembelajaran berorientasi kompetensi dan pengembangan karakter."
          />
          <QuickInfo
            icon={<Trophy size={22} />}
            title="Prestasi Siswa"
            description="Mendorong siswa untuk berkembang dan berprestasi di berbagai bidang."
          />
          <QuickInfo
            icon={<Users size={22} />}
            title="Lingkungan Positif"
            description="Membangun lingkungan sekolah yang aman, positif, dan kolaboratif."
          />
        </div>
      </section>

      {/* ======================================================
          PORTAL SECTION
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
            <Lock size={14} />
            Akses Cepat
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0f172a] sm:text-4xl">Portal Sekolah</h2>
          <p className="mt-2 text-slate-500">Masuk ke layanan digital sekolah</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <PortalCard
            icon={<UserCircle size={28} />}
            title="Portal Siswa"
            description="Akses jadwal, nilai, tugas, dan informasi akademik."
            link="/website/portal/siswa"
            variant="blue"
          />
          <PortalCard
            icon={<GraduationCap size={28} />}
            title="Portal Guru"
            description="Kelola kelas, materi, dan penilaian siswa."
            link="/website/portal/guru"
            variant="green"
          />
          <PortalCard
            icon={<Users size={28} />}
            title="Portal Orang Tua"
            description="Pantau perkembangan dan kegiatan anak di sekolah."
            link="/website/portal/orangtua"
            variant="amber"
          />
        </div>
      </section>

      {/* ======================================================
          ARTIKEL TERBARU
      ====================================================== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                <Newspaper size={15} />
                Informasi Sekolah
              </span>
              <h2 className="mt-2 text-3xl font-bold text-[#0f172a] sm:text-4xl">Artikel Terbaru</h2>
              <p className="mt-2 text-slate-500">Berita dan informasi terbaru dari sekolah.</p>
            </div>
            <Link href="/website/artikel" className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
              Lihat Semua
              <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* LOADING */}
          {loadingArtikel && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((item) => <ArticleSkeleton key={item} />)}
            </div>
          )}

          {/* ERROR */}
          {!loadingArtikel && errorArtikel && (
            <div className="border border-red-100 bg-red-50 p-6 rounded-2xl">
              <p className="text-sm font-bold text-red-700">Gagal memuat artikel</p>
              <p className="mt-1 text-xs text-red-600">{errorArtikel}</p>
            </div>
          )}

          {/* EMPTY */}
          {!loadingArtikel && !errorArtikel && artikelTerbaru.length === 0 && (
            <div className="border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center rounded-2xl">
              <Newspaper size={42} className="mx-auto text-slate-300" />
              <h3 className="mt-4 text-sm font-bold text-slate-700">Belum ada artikel</h3>
              <p className="mt-2 text-xs text-slate-400">Artikel yang dipublikasikan melalui CMS akan muncul di sini.</p>
            </div>
          )}

          {/* ARTICLES */}
          {!loadingArtikel && !errorArtikel && artikelTerbaru.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {artikelTerbaru.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          CTA / TENTANG
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] shadow-2xl lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-10 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Tentang Sekolah</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white">
              Mempersiapkan siswa untuk masa depan yang lebih baik.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100">
              Sekolah berkomitmen memberikan pendidikan berkualitas dengan mengembangkan kemampuan akademik, keterampilan, karakter, dan kreativitas siswa.
            </p>
            <Link href="/website/tentang" className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#1e3a8a] shadow-lg transition-all hover:bg-blue-50 hover:scale-105">
              Kenali Sekolah Kami
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="hidden border-l border-white/10 p-10 lg:flex lg:items-center">
            <div className="w-full">
              <div className="border border-white/10 bg-white/5 p-6 rounded-2xl backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">SmartSchool</p>
                <p className="mt-3 text-lg font-bold leading-7 text-white">Satu platform untuk mengelola informasi sekolah secara modern.</p>
                <div className="mt-6 space-y-3">
                  <FeatureItem text="Informasi sekolah" />
                  <FeatureItem text="Berita & artikel" />
                  <FeatureItem text="Prestasi siswa" />
                  <FeatureItem text="Kegiatan sekolah" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}
      <footer className="bg-[#0f172a]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-xl">
                  <School size={19} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">SMK SMART SCHOOL</p>
                  <p className="text-[10px] text-slate-500">Sekolah Digital</p>
                </div>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
                Website resmi sekolah sebagai pusat informasi, berita, kegiatan, dan prestasi sekolah.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Navigasi</h3>
              <div className="mt-4 space-y-3">
                <FooterLink href="/website" label="Beranda" />
                <FooterLink href="/website/tentang" label="Tentang Sekolah" />
                <FooterLink href="/website/akademik" label="Akademik" />
                <FooterLink href="/website/artikel" label="Artikel" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Kontak</h3>
              <div className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
                <p>Jl. Pendidikan No. 1</p>
                <p>Indonesia</p>
                <p>info@smartschool.id</p>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800 pt-6">
            <p className="text-xs text-slate-500">© 2026 SmartSchool. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* ======================================================
          ANIMATION STYLES
      ====================================================== */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 7s ease-in-out infinite;
          animation-delay: 1s;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }
        .animate-fade-up-delay {
          animation: fade-up 1s ease-out 0.2s forwards;
        }
      `}</style>
    </main>
  );
}

/* ============================================================
   COMPONENTS
============================================================ */

function ArticleCard({ article }) {
  return (
    <Link href={`/website/articles/${article.id}`} className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200">
      <div className="aspect-[16/9] overflow-hidden bg-slate-100">
        {article.gambarUtama ? (
          <img src={article.gambarUtama} alt={article.judul || "Artikel"} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-blue-200">
            <Newspaper size={48} />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          {article.kategoriArtikel?.nama && (
            <span className="bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600 rounded-full">
              {article.kategoriArtikel.nama}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
            <CalendarDays size={12} />
            {formatDate(article.dibuatPada)}
          </span>
        </div>
        <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-7 text-[#0f172a] transition group-hover:text-blue-600">
          {article.judul}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
          {article.ringkasan || "Baca informasi lengkap mengenai artikel ini."}
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs font-bold text-blue-600">
          Baca Selengkapnya
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10">
      <div className="text-blue-300">{icon}</div>
      <p className="mt-4 text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}

function QuickInfo({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#0f172a]">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

function PortalCard({ icon, title, description, link, variant }) {
  const variants = {
    blue: "from-blue-600 to-cyan-500 shadow-blue-500/30",
    green: "from-emerald-600 to-teal-500 shadow-emerald-500/30",
    amber: "from-amber-500 to-orange-500 shadow-amber-500/30",
  };
  return (
    <Link href={link} className="group block rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${variants[variant]} text-white shadow-lg transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0f172a]">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600">
        Masuk <ExternalLink size={14} />
      </span>
    </Link>
  );
}

function FeatureItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-1.5 bg-blue-300 rounded-full" />
      <span className="text-sm text-blue-100">{text}</span>
    </div>
  );
}

function MobileNavLink({ href, label, onClick }) {
  return (
    <Link href={href} onClick={onClick} className="block border-b border-slate-100 px-2 py-3 text-sm font-semibold text-slate-600 transition hover:text-blue-600">
      {label}
    </Link>
  );
}

function FooterLink({ href, label }) {
  return (
    <Link href={href} className="block text-sm text-slate-400 transition hover:text-white">
      {label}
    </Link>
  );
}

function ArticleSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="aspect-[16/9] animate-pulse bg-slate-100" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 animate-pulse bg-slate-100" />
        <div className="h-5 w-full animate-pulse bg-slate-100" />
        <div className="h-5 w-4/5 animate-pulse bg-slate-100" />
        <div className="h-4 w-full animate-pulse bg-slate-100" />
        <div className="h-4 w-3/4 animate-pulse bg-slate-100" />
      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "-";
  try {
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
  } catch {
    return "-";
  }
}