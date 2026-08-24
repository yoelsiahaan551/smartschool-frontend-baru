"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  GraduationCap,
  CheckCircle2,
  Search,
  Home,
  Download,
  CalendarClock,
  Info,
} from "lucide-react";

// Catatan: nomor pendaftaran & data ringkasan idealnya diterima dari response
// API setelah submit form (misal lewat query param, context, atau fetch ulang
// berdasarkan session), bukan digenerate di client seperti dummy di bawah ini.

function generateNomorPendaftaran() {
  const now = new Date();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `PPDB-${now.getFullYear()}-${rand}`;
}

export default function BerhasilPage() {
  const router = useRouter();
  const nomorPendaftaran = useMemo(() => generateNomorPendaftaran(), []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white flex-shrink-0">
            <GraduationCap size={16} />
          </div>
          <span className="text-sm font-semibold text-slate-800 truncate">PPDB SmartSchool 2026/2027</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* SUCCESS CARD */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="mt-5 text-xl sm:text-2xl font-semibold text-slate-800">
            Pendaftaran Berhasil Dikirim
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            Data dan dokumen kamu sudah kami terima. Simpan nomor pendaftaran di bawah ini untuk
            mengecek status seleksi.
          </p>

          <div className="mt-6 inline-flex flex-col items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-6 py-4">
            <span className="text-xs text-slate-500">Nomor Pendaftaran</span>
            <span className="text-lg sm:text-xl font-semibold tracking-wide text-blue-600">
              {nomorPendaftaran}
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => router.push("/PPDB/cek-pendaftaran")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors"
            >
              <Search size={15} />
              Cek Status Pendaftaran
            </button>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-200 hover:border-slate-300 px-5 py-2.5 rounded-lg transition-colors"
            >
              <Download size={15} />
              Simpan Bukti Pendaftaran
            </button>
          </div>

          <button
            onClick={() => router.push("/PPDB")}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Home size={13} />
            Kembali ke Beranda
          </button>
        </div>

        {/* NEXT STEPS */}
        <div className="mt-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <CalendarClock size={16} />
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-slate-800">Tahapan Selanjutnya</h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </span>
              Panitia akan memverifikasi berkas yang sudah diunggah.
            </li>
            <li className="flex gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </span>
              Hasil seleksi diumumkan sesuai jadwal pada halaman Pengumuman.
            </li>
            <li className="flex gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </span>
              Jika dinyatakan lolos, lakukan daftar ulang sesuai batas waktu yang ditentukan.
            </li>
          </ul>
          <div className="mt-4 flex items-start gap-2 text-xs text-slate-400 bg-slate-50 rounded-lg p-3">
            <Info size={14} className="flex-shrink-0 mt-0.5" />
            Gunakan nomor pendaftaran ini setiap kali menghubungi panitia atau mengecek status di halaman
            Cek Pendaftaran.
          </div>
        </div>
      </div>
    </div>
  );
}