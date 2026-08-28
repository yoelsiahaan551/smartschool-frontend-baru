"use client";

import { useState, useMemo } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  ChevronRight,
  Search,
  X,
  Eye,
  User,
  School,
  BookOpen,
  Layers,
  Phone,
  Mail,
  CalendarDays,
} from "lucide-react";


const initialPendaftar = [
  { id: 1, noPendaftaran: "PPDB001", nama: "Andi Saputra", asalSekolah: "SMP Negeri 1", jurusan: "RPL", gelombang: "1", status: "Menunggu", jalur: "Reguler", tanggalDaftar: "2026-01-08", telepon: "0812-3456-7801", email: "andi.saputra@mail.com" },
  { id: 2, noPendaftaran: "PPDB002", nama: "Budi Hartono", asalSekolah: "SMP Negeri 2", jurusan: "TKJ", gelombang: "1", status: "Terverifikasi", jalur: "Reguler", tanggalDaftar: "2026-01-08", telepon: "0812-3456-7802", email: "budi.hartono@mail.com" },
  { id: 3, noPendaftaran: "PPDB003", nama: "Citra Ayu Lestari", asalSekolah: "SMP Negeri 3", jurusan: "Multimedia", gelombang: "1", status: "Lulus", jalur: "Prestasi", tanggalDaftar: "2026-01-09", telepon: "0812-3456-7803", email: "citra.ayu@mail.com" },
  { id: 4, noPendaftaran: "PPDB004", nama: "Deni Firmansyah", asalSekolah: "SMP Islam Al-Amin", jurusan: "Akuntansi", gelombang: "2", status: "Daftar Ulang", jalur: "Reguler", tanggalDaftar: "2026-02-02", telepon: "0812-3456-7804", email: "deni.firmansyah@mail.com" },
  { id: 5, noPendaftaran: "PPDB005", nama: "Eka Putri Wulandari", asalSekolah: "SMP Negeri 4", jurusan: "RPL", gelombang: "2", status: "Tidak Lulus", jalur: "Reguler", tanggalDaftar: "2026-02-03", telepon: "0812-3456-7805", email: "eka.putri@mail.com" },
  { id: 6, noPendaftaran: "PPDB006", nama: "Fajar Nugroho", asalSekolah: "SMP Negeri 1", jurusan: "TKJ", gelombang: "1", status: "Terverifikasi", jalur: "Afirmasi", tanggalDaftar: "2026-01-10", telepon: "0812-3456-7806", email: "fajar.nugroho@mail.com" },
  { id: 7, noPendaftaran: "PPDB007", nama: "Gita Lestari", asalSekolah: "SMP Kristen Harapan", jurusan: "Multimedia", gelombang: "1", status: "Menunggu", jalur: "Reguler", tanggalDaftar: "2026-01-11", telepon: "0812-3456-7807", email: "gita.lestari@mail.com" },
  { id: 8, noPendaftaran: "PPDB008", nama: "Hendra Wijaya", asalSekolah: "SMP Negeri 5", jurusan: "Akuntansi", gelombang: "2", status: "Lulus", jalur: "Prestasi", tanggalDaftar: "2026-02-04", telepon: "0812-3456-7808", email: "hendra.wijaya@mail.com" },
  { id: 9, noPendaftaran: "PPDB009", nama: "Indah Permatasari", asalSekolah: "SMP Negeri 2", jurusan: "RPL", gelombang: "3", status: "Menunggu", jalur: "Reguler", tanggalDaftar: "2026-03-01", telepon: "0812-3456-7809", email: "indah.permata@mail.com" },
  { id: 10, noPendaftaran: "PPDB010", nama: "Joko Prasetyo", asalSekolah: "SMP Negeri 3", jurusan: "TKJ", gelombang: "2", status: "Terverifikasi", jalur: "Mutasi", tanggalDaftar: "2026-02-05", telepon: "0812-3456-7810", email: "joko.prasetyo@mail.com" },
  { id: 11, noPendaftaran: "PPDB011", nama: "Kartika Sari", asalSekolah: "SMP Negeri 4", jurusan: "Multimedia", gelombang: "1", status: "Daftar Ulang", jalur: "Reguler", tanggalDaftar: "2026-01-12", telepon: "0812-3456-7811", email: "kartika.sari@mail.com" },
  { id: 12, noPendaftaran: "PPDB012", nama: "Luthfi Rahman", asalSekolah: "SMP Islam Al-Amin", jurusan: "Akuntansi", gelombang: "1", status: "Tidak Lulus", jalur: "Reguler", tanggalDaftar: "2026-01-13", telepon: "0812-3456-7812", email: "luthfi.rahman@mail.com" },
  { id: 13, noPendaftaran: "PPDB013", nama: "Maya Anggraini", asalSekolah: "SMP Negeri 1", jurusan: "RPL", gelombang: "2", status: "Lulus", jalur: "Afirmasi", tanggalDaftar: "2026-02-06", telepon: "0812-3456-7813", email: "maya.anggraini@mail.com" },
  { id: 14, noPendaftaran: "PPDB014", nama: "Naufal Ardiansyah", asalSekolah: "SMP Negeri 5", jurusan: "TKJ", gelombang: "3", status: "Menunggu", jalur: "Reguler", tanggalDaftar: "2026-03-02", telepon: "0812-3456-7814", email: "naufal.ardiansyah@mail.com" },
  { id: 15, noPendaftaran: "PPDB015", nama: "Olivia Zahra", asalSekolah: "SMP Kristen Harapan", jurusan: "Multimedia", gelombang: "2", status: "Terverifikasi", jalur: "Prestasi", tanggalDaftar: "2026-02-07", telepon: "0812-3456-7815", email: "olivia.zahra@mail.com" },
  { id: 16, noPendaftaran: "PPDB016", nama: "Putra Wibowo", asalSekolah: "SMP Negeri 2", jurusan: "Akuntansi", gelombang: "1", status: "Daftar Ulang", jalur: "Reguler", tanggalDaftar: "2026-01-14", telepon: "0812-3456-7816", email: "putra.wibowo@mail.com" },
];

const JURUSAN_OPTIONS = ["Semua Jurusan", "RPL", "TKJ", "Multimedia", "Akuntansi"];
const GELOMBANG_OPTIONS = ["Semua Gelombang", "1", "2", "3"];
const STATUS_OPTIONS = ["Semua Status", "Menunggu", "Terverifikasi", "Lulus", "Tidak Lulus", "Daftar Ulang"];

const STATUS_STYLES = {
  Menunggu: "bg-amber-50 text-amber-600 border-amber-100",
  Terverifikasi: "bg-blue-50 text-blue-600 border-blue-100",
  Lulus: "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Tidak Lulus": "bg-rose-50 text-rose-600 border-rose-100",
  "Daftar Ulang": "bg-violet-50 text-violet-600 border-violet-100",
};

const ROWS_PER_PAGE = 10;

function formatTanggal(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function DataPendaftarPPDBPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [filterJurusan, setFilterJurusan] = useState("Semua Jurusan");
  const [filterGelombang, setFilterGelombang] = useState("Semua Gelombang");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [page, setPage] = useState(1);
  const [detailTarget, setDetailTarget] = useState(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initialPendaftar.filter((p) => {
      const matchSearch =
        !q ||
        p.nama.toLowerCase().includes(q) ||
        p.noPendaftaran.toLowerCase().includes(q);
      const matchJurusan = filterJurusan === "Semua Jurusan" || p.jurusan === filterJurusan;
      const matchGelombang = filterGelombang === "Semua Gelombang" || p.gelombang === filterGelombang;
      const matchStatus = filterStatus === "Semua Status" || p.status === filterStatus;
      return matchSearch && matchJurusan && matchGelombang && matchStatus;
    });
  }, [search, filterJurusan, filterGelombang, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  const updateFilter = (setter) => (val) => {
    setter(val);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setFilterJurusan("Semua Jurusan");
    setFilterGelombang("Semua Gelombang");
    setFilterStatus("Semua Status");
    setPage(1);
  };

  const activeFilterCount =
    (filterJurusan !== "Semua Jurusan" ? 1 : 0) +
    (filterGelombang !== "Semua Gelombang" ? 1 : 0) +
    (filterStatus !== "Semua Status" ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <div className="flex h-screen w-full bg-[#EEF0F2] overflow-hidden">
      <Sidebar
        role="adminPPDB"
        active="pendaftar"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin PPDB", email: "adminppdb@smartschool.com", avatar: "PP" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="w-full space-y-5 max-w-[1320px] mx-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>PPDB</span>
                <ChevronRight size={12} />
                <span className="text-slate-600 font-medium">Data Pendaftar</span>
              </div>

              {/* ===== KARTU RINGKASAN ===== */}
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5">
                  <p className="text-xs text-slate-400">Total Pendaftar</p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">{initialPendaftar.length}</p>
                </div>
                <div className="bg-white rounded-xl p-5">
                  <p className="text-xs text-slate-400">Hasil Filter Saat Ini</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">{filtered.length}</p>
                </div>
                <div className="bg-white rounded-xl p-5">
                  <p className="text-xs text-slate-400">Menunggu Verifikasi</p>
                  <p className="text-2xl font-bold text-amber-500 mt-2">
                    {initialPendaftar.filter((p) => p.status === "Menunggu").length}
                  </p>
                </div>
                <div className="bg-[#F6F7F8] rounded-xl p-5 flex flex-col items-center justify-center text-center">
                  <p className="text-xs text-slate-400">Sudah Lulus</p>
                  <p className="text-3xl font-bold text-slate-500 mt-3">
                    {initialPendaftar.filter((p) => p.status === "Lulus" || p.status === "Daftar Ulang").length}
                  </p>
                </div>
              </section>

              {/* ===== PANEL UTAMA ===== */}
              <section className="bg-white rounded-xl overflow-hidden">
                {/* Search & Filter */}
                <div className="flex flex-wrap items-center gap-3 px-5 pt-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500 border border-slate-200 rounded-md px-3 py-2 flex-1 min-w-[200px]">
                    <Search size={13} className="text-slate-400 flex-shrink-0" />
                    <input
                      value={search}
                      onChange={(e) => updateFilter(setSearch)(e.target.value)}
                      placeholder="Cari nama atau no. pendaftaran..."
                      className="outline-none bg-transparent placeholder:text-slate-400 w-full"
                    />
                  </div>

                  <select
                    value={filterJurusan}
                    onChange={(e) => updateFilter(setFilterJurusan)(e.target.value)}
                    className="text-xs text-slate-600 border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400 bg-white"
                  >
                    {JURUSAN_OPTIONS.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>

                  <select
                    value={filterGelombang}
                    onChange={(e) => updateFilter(setFilterGelombang)(e.target.value)}
                    className="text-xs text-slate-600 border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400 bg-white"
                  >
                    {GELOMBANG_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g === "Semua Gelombang" ? g : `Gelombang ${g}`}</option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => updateFilter(setFilterStatus)(e.target.value)}
                    className="text-xs text-slate-600 border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400 bg-white"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <X size={12} />
                      Reset ({activeFilterCount})
                    </button>
                  )}
                </div>

                {/* Tabel */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                        <th className="px-5 py-3 font-medium">No</th>
                        <th className="px-5 py-3 font-medium">No. Pendaftaran</th>
                        <th className="px-5 py-3 font-medium">Nama</th>
                        <th className="px-5 py-3 font-medium">Asal Sekolah</th>
                        <th className="px-5 py-3 font-medium">Jurusan</th>
                        <th className="px-5 py-3 font-medium">Gelombang</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 font-medium text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paged.length === 0 && (
                        <tr>
                          <td colSpan={8} className="px-5 py-10 text-center text-slate-400 text-sm">
                            Tidak ada pendaftar yang cocok dengan pencarian/filter.
                          </td>
                        </tr>
                      )}
                      {paged.map((p, idx) => (
                        <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-3.5 text-slate-500">
                            {(currentPage - 1) * ROWS_PER_PAGE + idx + 1}
                          </td>
                          <td className="px-5 py-3.5 font-mono text-slate-600">{p.noPendaftaran}</td>
                          <td className="px-5 py-3.5 font-medium text-slate-700">{p.nama}</td>
                          <td className="px-5 py-3.5 text-slate-500">{p.asalSekolah}</td>
                          <td className="px-5 py-3.5 text-slate-500">{p.jurusan}</td>
                          <td className="px-5 py-3.5 text-slate-500">{p.gelombang}</td>
                          <td className="px-5 py-3.5">
                            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLES[p.status]}`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center justify-end">
                              <button
                                onClick={() => setDetailTarget(p)}
                                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-md transition-colors"
                              >
                                <Eye size={13} />
                                Detail
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filtered.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                      Menampilkan {(currentPage - 1) * ROWS_PER_PAGE + 1}
                      –{Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} dari {filtered.length} pendaftar
                    </p>
                    <div className="flex items-center gap-1.5">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="text-xs px-3 py-1.5 rounded-md border border-slate-200 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                      >
                        Sebelumnya
                      </button>
                      <span className="text-xs text-slate-500 px-2">
                        Hal. {currentPage} / {totalPages}
                      </span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className="text-xs px-3 py-1.5 rounded-md border border-slate-200 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                      >
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                )}
              </section>

              <footer className="text-center text-[11px] text-slate-400 py-3">
                © 2026 SmartSchool &middot; Dashboard Admin PPDB &middot; All rights reserved
              </footer>
            </div>
          </div>
        </main>
      </div>

      {/* ===== MODAL DETAIL PENDAFTAR ===== */}
      {detailTarget && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Detail Pendaftar</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">{detailTarget.noPendaftaran}</p>
              </div>
              <button
                onClick={() => setDetailTarget(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{detailTarget.nama}</p>
                <span className={`inline-block mt-1 text-[11px] font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLES[detailTarget.status]}`}>
                  {detailTarget.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <School size={14} className="text-slate-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">Asal Sekolah</p>
                  <p className="text-sm text-slate-700 mt-0.5">{detailTarget.asalSekolah}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <BookOpen size={14} className="text-slate-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">Jurusan Pilihan</p>
                  <p className="text-sm text-slate-700 mt-0.5">{detailTarget.jurusan}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Layers size={14} className="text-slate-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">Gelombang</p>
                  <p className="text-sm text-slate-700 mt-0.5">Gelombang {detailTarget.gelombang}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Layers size={14} className="text-slate-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">Jalur Pendaftaran</p>
                  <p className="text-sm text-slate-700 mt-0.5">{detailTarget.jalur}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CalendarDays size={14} className="text-slate-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">Tanggal Daftar</p>
                  <p className="text-sm text-slate-700 mt-0.5">{formatTanggal(detailTarget.tanggalDaftar)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={14} className="text-slate-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">No. Telepon</p>
                  <p className="text-sm text-slate-700 mt-0.5">{detailTarget.telepon}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 col-span-2">
                <Mail size={14} className="text-slate-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">Email</p>
                  <p className="text-sm text-slate-700 mt-0.5">{detailTarget.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-5 mt-5 border-t border-slate-100">
              <button
                onClick={() => setDetailTarget(null)}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 px-4 py-2"
              >
                Tutup
              </button>
              <button className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                Lihat Berkas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}