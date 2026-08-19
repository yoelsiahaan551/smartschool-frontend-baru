"use client";

import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Search,
  Filter,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Users,
  Plus,
  X,
  AlertTriangle,
} from "lucide-react";

/**
 * app/admin/akademik/sikap-perilaku/page.jsx
 *
 * Halaman Sikap dan Perilaku — jurnal catatan sikap (spiritual & sosial)
 * siswa sehari-hari, baik catatan positif maupun negatif, lengkap dengan
 * aspek sikap yang dinilai dan poin yang berpengaruh ke predikat akhir.
 *
 * CATATAN DATA:
 * MOCK_CATATAN di bawah masih dummy. Kalau backend/API sudah siap, tinggal
 * ganti `useState(MOCK_CATATAN)` dengan fetch ke endpoint yang sesuai —
 * bentuk data per entri dipertahankan sama supaya UI di bawah tidak perlu
 * diubah. Form tambah catatan (modal) sudah disiapkan strukturnya, tinggal
 * disambungkan ke endpoint POST saat backend tersedia (lihat `handleSimpan`).
 */

const JENIS_OPTIONS = ["Positif", "Negatif"];

const ASPEK_OPTIONS = [
  "Ketaatan Beribadah",
  "Kejujuran",
  "Kedisiplinan",
  "Tanggung Jawab",
  "Kesantunan",
  "Kepedulian",
  "Percaya Diri",
  "Kerja Sama",
];

const JENIS_TONE = {
  Positif: "text-emerald-600 bg-emerald-50 border-emerald-200",
  Negatif: "text-rose-600 bg-rose-50 border-rose-200",
};

function getPredikat(poin) {
  if (poin >= 15) return { label: "Sangat Baik", singkat: "SB", tone: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  if (poin >= 5) return { label: "Baik", singkat: "B", tone: "text-blue-600 bg-blue-50 border-blue-200" };
  if (poin >= -4) return { label: "Cukup", singkat: "C", tone: "text-amber-600 bg-amber-50 border-amber-200" };
  return { label: "Perlu Bimbingan", singkat: "K", tone: "text-rose-600 bg-rose-50 border-rose-200" };
}

const MOCK_CATATAN = [
  {
    id: 1,
    namaSiswa: "Ahmad Fauzan Ramadhan",
    kelas: "VII-A",
    tanggal: "2026-08-03",
    jenis: "Positif",
    aspek: "Kepedulian",
    deskripsi: "Membantu teman sekelas yang kesulitan memahami materi Matematika tanpa diminta.",
    poin: 3,
    pencatat: "Siti Rahmawati, S.Pd.",
  },
  {
    id: 2,
    namaSiswa: "Muhammad Rizky Pratama",
    kelas: "VII-B",
    tanggal: "2026-08-05",
    jenis: "Negatif",
    aspek: "Kedisiplinan",
    deskripsi: "Terlambat masuk kelas tanpa keterangan setelah jam istirahat.",
    poin: -2,
    pencatat: "Budi Santoso, S.Pd.",
  },
  {
    id: 3,
    namaSiswa: "Aisyah Putri Wulandari",
    kelas: "VII-B",
    tanggal: "2026-08-06",
    jenis: "Positif",
    aspek: "Kejujuran",
    deskripsi: "Mengembalikan dompet yang ditemukan di kantin kepada petugas piket.",
    poin: 4,
    pencatat: "Budi Santoso, S.Pd.",
  },
  {
    id: 4,
    namaSiswa: "Dewi Anggraini",
    kelas: "VIII-A",
    tanggal: "2026-08-10",
    jenis: "Positif",
    aspek: "Tanggung Jawab",
    deskripsi: "Menyelesaikan tugas piket kelas dengan baik meski tidak mendapat giliran.",
    poin: 2,
    pencatat: "Rina Kartika, S.Pd.",
  },
  {
    id: 5,
    namaSiswa: "Fajar Nugroho",
    kelas: "VIII-A",
    tanggal: "2026-08-11",
    jenis: "Negatif",
    aspek: "Kesantunan",
    deskripsi: "Berbicara kurang sopan kepada teman sekelas saat diskusi kelompok.",
    poin: -3,
    pencatat: "Rina Kartika, S.Pd.",
  },
  {
    id: 6,
    namaSiswa: "Muhammad Rizky Pratama",
    kelas: "VII-B",
    tanggal: "2026-08-13",
    jenis: "Negatif",
    aspek: "Tanggung Jawab",
    deskripsi: "Tidak mengerjakan dan tidak mengumpulkan tugas rumah selama dua kali berturut-turut.",
    poin: -3,
    pencatat: "Budi Santoso, S.Pd.",
  },
  {
    id: 7,
    namaSiswa: "Nadia Salsabila",
    kelas: "IX-A",
    tanggal: "2026-08-14",
    jenis: "Positif",
    aspek: "Percaya Diri",
    deskripsi: "Berani tampil mempresentasikan hasil proyek kelompok di depan kelas.",
    poin: 3,
    pencatat: "Agus Prasetyo, S.Pd.",
  },
  {
    id: 8,
    namaSiswa: "Ahmad Fauzan Ramadhan",
    kelas: "VII-A",
    tanggal: "2026-08-17",
    jenis: "Positif",
    aspek: "Ketaatan Beribadah",
    deskripsi: "Selalu mengajak teman salat berjamaah saat waktu istirahat siang.",
    poin: 2,
    pencatat: "Siti Rahmawati, S.Pd.",
  },
];

const KELAS_OPTIONS = ["Semua Kelas", ...Array.from(new Set(MOCK_CATATAN.map((c) => c.kelas))).sort()];

const emptyForm = {
  namaSiswa: "",
  kelas: "",
  tanggal: new Date().toISOString().slice(0, 10),
  jenis: "Positif",
  aspek: "Kejujuran",
  deskripsi: "",
  poin: 1,
  pencatat: "",
};

export default function SikapPerilakuPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [data, setData] = useState(MOCK_CATATAN);
  const [search, setSearch] = useState("");
  const [kelasFilter, setKelasFilter] = useState("Semua Kelas");
  const [jenisFilter, setJenisFilter] = useState("Semua Jenis");
  const [aspekFilter, setAspekFilter] = useState("Semua Aspek");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filteredData = useMemo(() => {
    return data
      .filter((c) => {
        const matchSearch = c.namaSiswa.toLowerCase().includes(search.toLowerCase());
        const matchKelas = kelasFilter === "Semua Kelas" || c.kelas === kelasFilter;
        const matchJenis = jenisFilter === "Semua Jenis" || c.jenis === jenisFilter;
        const matchAspek = aspekFilter === "Semua Aspek" || c.aspek === aspekFilter;
        return matchSearch && matchKelas && matchJenis && matchAspek;
      })
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  }, [data, search, kelasFilter, jenisFilter, aspekFilter]);

  // ===== Statistik ringkas =====
  const totalCatatan = data.length;
  const totalPositif = data.filter((c) => c.jenis === "Positif").length;
  const totalNegatif = data.filter((c) => c.jenis === "Negatif").length;
  const siswaTercatat = new Set(data.map((c) => c.namaSiswa)).size;

  // ===== Ringkasan poin per siswa (untuk badge perlu perhatian) =====
  const poinPerSiswa = useMemo(() => {
    const map = {};
    data.forEach((c) => {
      map[c.namaSiswa] = (map[c.namaSiswa] || 0) + c.poin;
    });
    return map;
  }, [data]);

  const siswaPerluPerhatian = Object.entries(poinPerSiswa).filter(([, poin]) => poin < 0).length;

  const handleSimpan = () => {
    if (!form.namaSiswa || !form.deskripsi) return;
    // TODO: ganti dengan POST ke API saat backend tersedia.
    const poinFinal = form.jenis === "Negatif" ? -Math.abs(Number(form.poin)) : Math.abs(Number(form.poin));
    setData((prev) => [{ id: Date.now(), ...form, poin: poinFinal }, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="akademikSikapPerilaku"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
                  <Heart size={20} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Sikap dan Perilaku</h1>
                  <p className="text-sm text-slate-500">Jurnal catatan sikap spiritual dan sosial siswa sehari-hari.</p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm shadow-blue-200 transition-colors self-start sm:self-auto"
              >
                <Plus size={16} />
                Tambah Catatan
              </button>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Heart size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Catatan</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{totalCatatan}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <ThumbsUp size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Catatan Positif</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{totalPositif}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                    <ThumbsDown size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Catatan Negatif</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{totalNegatif}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <Users size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Siswa Tercatat</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{siswaTercatat}</p>
              </div>
            </div>

            {siswaPerluPerhatian > 0 && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl px-4 py-3">
                <AlertTriangle size={16} className="flex-shrink-0" />
                <p>
                  <span className="font-semibold">{siswaPerluPerhatian} siswa</span> memiliki akumulasi poin negatif dan
                  perlu perhatian atau bimbingan lebih lanjut.
                </p>
              </div>
            )}

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama siswa..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Filter size={15} className="text-slate-400 hidden lg:block" />
                <select
                  value={kelasFilter}
                  onChange={(e) => setKelasFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                >
                  {KELAS_OPTIONS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
                <select
                  value={jenisFilter}
                  onChange={(e) => setJenisFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                >
                  {["Semua Jenis", ...JENIS_OPTIONS].map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
                <select
                  value={aspekFilter}
                  onChange={(e) => setAspekFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                >
                  {["Semua Aspek", ...ASPEK_OPTIONS].map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TABEL CATATAN */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Siswa</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Tanggal</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Jenis</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Aspek</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Catatan</th>
                      <th className="text-center font-medium text-slate-500 px-4 py-3">Poin</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Dicatat Oleh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((c) => (
                      <tr key={c.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {c.namaSiswa
                                .split(" ")
                                .slice(0, 2)
                                .map((w) => w[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{c.namaSiswa}</p>
                              <p className="text-xs text-slate-400">{c.kelas}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                          {new Date(c.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md border whitespace-nowrap ${JENIS_TONE[c.jenis]}`}>
                            {c.jenis === "Positif" ? <ThumbsUp size={11} /> : <ThumbsDown size={11} />}
                            {c.jenis}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{c.aspek}</td>
                        <td className="px-4 py-3 text-slate-600 max-w-[280px]">{c.deskripsi}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-semibold ${c.poin >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                            {c.poin >= 0 ? `+${c.poin}` : c.poin}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{c.pencatat}</td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                          Tidak ada catatan sikap yang cocok dengan filter ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL TAMBAH CATATAN */}
      {showForm && (
        <>
          <div onClick={() => setShowForm(false)} className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 sticky top-0 bg-white">
                <h2 className="text-sm font-semibold text-slate-800">Tambah Catatan Sikap</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Nama Siswa</label>
                  <input
                    type="text"
                    value={form.namaSiswa}
                    onChange={(e) => setForm({ ...form, namaSiswa: e.target.value })}
                    placeholder="Contoh: Ahmad Fauzan Ramadhan"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Kelas</label>
                  <input
                    type="text"
                    value={form.kelas}
                    onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                    placeholder="Contoh: VII-A"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Jenis</label>
                    <select
                      value={form.jenis}
                      onChange={(e) => setForm({ ...form, jenis: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                    >
                      {JENIS_OPTIONS.map((j) => (
                        <option key={j} value={j}>
                          {j}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Tanggal</label>
                    <input
                      type="date"
                      value={form.tanggal}
                      onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Aspek Sikap</label>
                  <select
                    value={form.aspek}
                    onChange={(e) => setForm({ ...form, aspek: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                  >
                    {ASPEK_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Deskripsi Catatan</label>
                  <textarea
                    value={form.deskripsi}
                    onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                    placeholder="Jelaskan kejadian atau perilaku yang diamati..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Poin</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={form.poin}
                      onChange={(e) => setForm({ ...form, poin: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Tanda otomatis mengikuti jenis (positif/negatif).
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Dicatat Oleh</label>
                    <input
                      type="text"
                      value={form.pencatat}
                      onChange={(e) => setForm({ ...form, pencatat: e.target.value })}
                      placeholder="Contoh: Siti Rahmawati, S.Pd."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-100">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSimpan}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-200"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}