"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  DoorOpen,
  Plus,
  Search,
  Filter,
  Layers,
  MapPin,
  Users,
  Camera,
  ImageOff,
  X,
  Pencil,
  Trash2,
  BookOpen,
  FlaskConical,
  Library,
  Briefcase,
  Landmark,
  HeartPulse,
  Building2,
  Bath,
  Warehouse,
  ClipboardList,
  Eye,
  Plus as PlusIcon,
  Minus,
  Save,
} from "lucide-react";

/**
 * app/admin/ruangan/page.jsx
 *
 * Halaman Data Ruangan — daftar seluruh ruangan sekolah lengkap dengan
 * jenis ruangan (kelas, laboratorium, dst), lantai, lokasi detail, daftar
 * sarpras/perlengkapan di dalamnya, dan foto ruangan yang bisa diunggah
 * sendiri oleh admin.
 *
 * Skema warna memakai biru brand SmartSchool (#155DFC), konsisten dengan
 * halaman Kartu Identitas Siswa, Wali Kelas, Jadwal Pelajaran, dan Sarpras.
 *
 * PENYIMPANAN DATA:
 * Data & foto disimpan di localStorage (key RUANGAN_KEY) supaya persist
 * antar-refresh tanpa backend. Kalau nanti nyambung ke API, tinggal ganti
 * loadRuangan()/persist() dengan pemanggilan endpoint yang bentuk datanya
 * sama (foto dikirim sebagai base64 atau diganti field url).
 */

const RUANGAN_KEY = "sarpras_ruangan_data";

const JENIS_OPTIONS = [
  { value: "Ruang Kelas", icon: BookOpen },
  { value: "Laboratorium", icon: FlaskConical },
  { value: "Perpustakaan", icon: Library },
  { value: "Ruang Guru", icon: Users },
  { value: "Ruang Pimpinan", icon: Briefcase },
  { value: "Aula", icon: Landmark },
  { value: "Ruang UKS", icon: HeartPulse },
  { value: "Musala", icon: Building2 },
  { value: "Toilet", icon: Bath },
  { value: "Gudang", icon: Warehouse },
  { value: "Lainnya", icon: DoorOpen },
];

const iconForJenis = (jenis) => (JENIS_OPTIONS.find((j) => j.value === jenis) || JENIS_OPTIONS.at(-1)).icon;

const KONDISI_OPTIONS = ["baik", "rusak ringan", "rusak berat"];
const KONDISI_CHIP = {
  baik: "bg-emerald-50 text-emerald-700",
  "rusak ringan": "bg-amber-50 text-amber-700",
  "rusak berat": "bg-rose-50 text-rose-700",
};

const MOCK_RUANGAN = [
  {
    id: 1,
    nama: "Laboratorium IPA",
    jenis: "Laboratorium",
    lantai: 2,
    lokasi: "Gedung B, ujung koridor timur, sebelah Ruang Guru",
    kapasitas: 32,
    luas: "72",
    status: "aktif",
    penanggungJawab: "Dewi Anggraini, S.Si",
    deskripsi: "Laboratorium untuk praktikum Biologi, Fisika, dan Kimia kelas VII-IX.",
    foto: null,
    sarpras: [
      { nama: "Meja praktikum", jumlah: 16, kondisi: "baik" },
      { nama: "Mikroskop", jumlah: 10, kondisi: "baik" },
      { nama: "Lemari asam", jumlah: 1, kondisi: "rusak ringan" },
    ],
  },
  {
    id: 2,
    nama: "Laboratorium Komputer",
    jenis: "Laboratorium",
    lantai: 2,
    lokasi: "Gedung B, ruang no. 5, seberang tangga utama",
    kapasitas: 30,
    luas: "64",
    status: "aktif",
    penanggungJawab: "Fajar Ramadhan, S.Pd",
    deskripsi: "Digunakan untuk mata pelajaran Informatika dan ujian berbasis komputer.",
    foto: null,
    sarpras: [
      { nama: "Unit komputer", jumlah: 30, kondisi: "baik" },
      { nama: "Proyektor", jumlah: 1, kondisi: "baik" },
      { nama: "AC", jumlah: 2, kondisi: "rusak ringan" },
    ],
  },
  {
    id: 3,
    nama: "Kelas 7A",
    jenis: "Ruang Kelas",
    lantai: 1,
    lokasi: "Gedung A, ruang no. 1, dekat pintu gerbang utama",
    kapasitas: 32,
    luas: "56",
    status: "aktif",
    penanggungJawab: "Siti Rahayu, S.Pd",
    deskripsi: "Ruang kelas reguler untuk kegiatan belajar mengajar kelas 7A.",
    foto: null,
    sarpras: [
      { nama: "Meja & kursi siswa", jumlah: 32, kondisi: "baik" },
      { nama: "Papan tulis", jumlah: 1, kondisi: "baik" },
      { nama: "Kipas angin", jumlah: 2, kondisi: "baik" },
    ],
  },
  {
    id: 4,
    nama: "Perpustakaan",
    jenis: "Perpustakaan",
    lantai: 1,
    lokasi: "Gedung A, ruang no. 8, sebelah Ruang UKS",
    kapasitas: 40,
    luas: "90",
    status: "aktif",
    penanggungJawab: "Sri Wulandari, S.Pd",
    deskripsi: "Ruang baca dan koleksi buku pelajaran, referensi, serta fiksi.",
    foto: null,
    sarpras: [
      { nama: "Rak buku", jumlah: 18, kondisi: "baik" },
      { nama: "Meja baca", jumlah: 10, kondisi: "baik" },
    ],
  },
  {
    id: 5,
    nama: "Ruang Kepala Sekolah",
    jenis: "Ruang Pimpinan",
    lantai: 1,
    lokasi: "Gedung A, ruang no. 2, sebelah Ruang TU",
    kapasitas: 6,
    luas: "24",
    status: "aktif",
    penanggungJawab: "-",
    deskripsi: "Ruang kerja kepala sekolah dan tempat menerima tamu.",
    foto: null,
    sarpras: [
      { nama: "Meja kerja", jumlah: 1, kondisi: "baik" },
      { nama: "Sofa tamu", jumlah: 1, kondisi: "baik" },
    ],
  },
  {
    id: 6,
    nama: "Aula Serbaguna",
    jenis: "Aula",
    lantai: 3,
    lokasi: "Gedung C, lantai atas, akses via tangga barat",
    kapasitas: 200,
    luas: "180",
    status: "aktif",
    penanggungJawab: "-",
    deskripsi: "Digunakan untuk upacara indoor, seminar, pertemuan wali murid, dan acara sekolah.",
    foto: null,
    sarpras: [
      { nama: "Kursi lipat", jumlah: 200, kondisi: "baik" },
      { nama: "Sound system", jumlah: 1, kondisi: "baik" },
      { nama: "Proyektor & layar", jumlah: 1, kondisi: "rusak ringan" },
    ],
  },
];

function loadRuangan() {
  if (typeof window === "undefined") return MOCK_RUANGAN;
  const stored = localStorage.getItem(RUANGAN_KEY);
  if (!stored) return MOCK_RUANGAN;
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_RUANGAN;
  } catch {
    return MOCK_RUANGAN;
  }
}

const emptyForm = {
  nama: "",
  jenis: "Ruang Kelas",
  lantai: 1,
  lokasi: "",
  kapasitas: "",
  luas: "",
  status: "aktif",
  penanggungJawab: "",
  deskripsi: "",
  foto: null,
  sarpras: [],
};

export default function RuanganPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [ruanganList, setRuanganList] = useState([]);
  const [search, setSearch] = useState("");
  const [lantaiFilter, setLantaiFilter] = useState("Semua Lantai");
  const [jenisFilter, setJenisFilter] = useState("Semua Jenis");
  const [detailRuangan, setDetailRuangan] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const fileInputRef = useRef(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    setRuanganList(loadRuangan());
  }, []);

  const persist = (newList) => {
    setRuanganList(newList);
    if (typeof window !== "undefined") {
      localStorage.setItem(RUANGAN_KEY, JSON.stringify(newList));
    }
  };

  const lantaiOptions = useMemo(
    () => ["Semua Lantai", ...Array.from(new Set(ruanganList.map((r) => r.lantai))).sort((a, b) => a - b)],
    [ruanganList]
  );
  const jenisOptions = useMemo(
    () => ["Semua Jenis", ...Array.from(new Set(ruanganList.map((r) => r.jenis)))],
    [ruanganList]
  );

  const filteredRuangan = useMemo(() => {
    return ruanganList.filter((r) => {
      const matchSearch =
        r.nama.toLowerCase().includes(search.toLowerCase()) ||
        r.lokasi.toLowerCase().includes(search.toLowerCase());
      const matchLantai = lantaiFilter === "Semua Lantai" || r.lantai === lantaiFilter;
      const matchJenis = jenisFilter === "Semua Jenis" || r.jenis === jenisFilter;
      return matchSearch && matchLantai && matchJenis;
    });
  }, [ruanganList, search, lantaiFilter, jenisFilter]);

  const totalRuangan = ruanganList.length;
  const totalLantai = new Set(ruanganList.map((r) => r.lantai)).size;
  const totalLab = ruanganList.filter((r) => r.jenis === "Laboratorium").length;
  const totalSarprasRusak = ruanganList.reduce(
    (sum, r) => sum + r.sarpras.filter((s) => s.kondisi !== "baik").length,
    0
  );

  // ---- FORM HANDLERS ----
  function openTambah() {
    setEditingId(null);
    setFormData(emptyForm);
    setFormOpen(true);
  }

  function openEdit(ruangan) {
    setEditingId(ruangan.id);
    setFormData({ ...ruangan, sarpras: ruangan.sarpras.map((s) => ({ ...s })) });
    setFormOpen(true);
    setDetailRuangan(null);
  }

  function handleFotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setFormData((prev) => ({ ...prev, foto: evt.target.result }));
    };
    reader.readAsDataURL(file);
  }

  function addSarprasRow() {
    setFormData((prev) => ({
      ...prev,
      sarpras: [...prev.sarpras, { nama: "", jumlah: "", kondisi: "baik" }],
    }));
  }

  function updateSarprasRow(idx, field, value) {
    setFormData((prev) => {
      const next = [...prev.sarpras];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, sarpras: next };
    });
  }

  function removeSarprasRow(idx) {
    setFormData((prev) => ({ ...prev, sarpras: prev.sarpras.filter((_, i) => i !== idx) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.lokasi.trim()) return;

    const cleaned = {
      ...formData,
      lantai: Number(formData.lantai) || 1,
      kapasitas: formData.kapasitas === "" ? "" : Number(formData.kapasitas),
      sarpras: formData.sarpras.filter((s) => s.nama.trim() !== ""),
    };

    if (editingId) {
      persist(ruanganList.map((r) => (r.id === editingId ? { ...cleaned, id: editingId } : r)));
    } else {
      const newId = ruanganList.length > 0 ? Math.max(...ruanganList.map((r) => r.id)) + 1 : 1;
      persist([...ruanganList, { ...cleaned, id: newId }]);
    }
    setFormOpen(false);
    setFormData(emptyForm);
    setEditingId(null);
  }

  function handleDelete(id) {
    persist(ruanganList.filter((r) => r.id !== id));
    setConfirmDeleteId(null);
    setDetailRuangan(null);
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar active="ruangan" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} role="admin" />
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
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10">
                  <DoorOpen size={20} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Data Ruangan</h1>
                  <p className="text-sm text-slate-500">
                    Lokasi, lantai, dan sarpras tiap ruangan — lengkap dengan foto.
                  </p>
                </div>
              </div>
              <button
                onClick={openTambah}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white text-sm font-semibold hover:brightness-110 transition-all self-start sm:self-auto"
              >
                <Plus size={16} />
                Tambah Ruangan
              </button>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <DoorOpen size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Total Ruangan</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalRuangan}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Jumlah Lantai</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalLantai}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <FlaskConical size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Laboratorium</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalLab}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <ClipboardList size={14} className="text-rose-500" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Sarpras Bermasalah</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalSarprasRusak}</p>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama ruangan atau lokasi..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={15} className="text-slate-400 hidden sm:block" />
                <select
                  value={lantaiFilter}
                  onChange={(e) =>
                    setLantaiFilter(e.target.value === "Semua Lantai" ? "Semua Lantai" : Number(e.target.value))
                  }
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >
                  {lantaiOptions.map((l) => (
                    <option key={l} value={l}>
                      {l === "Semua Lantai" ? l : `Lantai ${l}`}
                    </option>
                  ))}
                </select>
                <select
                  value={jenisFilter}
                  onChange={(e) => setJenisFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >
                  {jenisOptions.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* GRID KARTU RUANGAN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRuangan.map((r) => {
                const JenisIcon = iconForJenis(r.jenis);
                const sarprasRusak = r.sarpras.filter((s) => s.kondisi !== "baik").length;
                return (
                  <div
                    key={r.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-lg hover:border-[#155DFC]/30 transition-all flex flex-col"
                  >
                    <div className="h-36 bg-gradient-to-br from-[#eaf1ff] to-slate-50 relative flex items-center justify-center">
                      {r.foto ? (
                        <img src={r.foto} alt={r.nama} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-[#155DFC]/40">
                          <JenisIcon size={32} />
                          <p className="text-[10px] mt-1 font-medium">Belum ada foto</p>
                        </div>
                      )}
                      <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-white/90 text-[#155DFC] shadow-sm">
                        <Layers size={11} />
                        Lantai {r.lantai}
                      </span>
                      {sarprasRusak > 0 && (
                        <span className="absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-rose-500/90 text-white shadow-sm">
                          {sarprasRusak} bermasalah
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#155DFC] mb-1">
                        <JenisIcon size={12} />
                        {r.jenis}
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm leading-tight">{r.nama}</h3>
                      <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-1.5">
                        <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{r.lokasi}</span>
                      </div>
                      {r.kapasitas !== "" && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <Users size={12} className="flex-shrink-0" />
                          Kapasitas {r.kapasitas} orang
                        </div>
                      )}

                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => setDetailRuangan(r)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-[#155DFC] bg-[#eaf1ff] hover:bg-[#d6e6ff] text-xs font-medium transition-colors"
                        >
                          <Eye size={13} />
                          Detail
                        </button>
                        <button
                          onClick={() => openEdit(r)}
                          className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-white bg-gradient-to-r from-[#155DFC] to-[#0d47c9] hover:brightness-110 text-xs font-medium transition-all"
                        >
                          <Pencil size={13} />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredRuangan.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-14 text-slate-400 bg-white rounded-2xl border border-slate-200/80">
                  <ImageOff size={26} className="mb-2" />
                  <p className="text-sm">Tidak ada ruangan yang cocok dengan filter ini.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL DETAIL RUANGAN */}
      {detailRuangan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden max-h-[88vh] flex flex-col">
            <div className="h-44 bg-gradient-to-br from-[#155DFC] to-[#0d47c9] relative flex-shrink-0 flex items-center justify-center">
              {detailRuangan.foto ? (
                <img src={detailRuangan.foto} alt={detailRuangan.nama} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-white/60">
                  <Camera size={30} />
                  <p className="text-xs mt-1">Belum ada foto ruangan</p>
                </div>
              )}
              <button
                onClick={() => setDetailRuangan(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-white bg-black/25 hover:bg-black/40"
              >
                <X size={15} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-bold text-base leading-tight">{detailRuangan.nama}</p>
                <p className="text-white/80 text-xs mt-0.5">
                  {detailRuangan.jenis} · Lantai {detailRuangan.lantai}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="col-span-2">
                  <p className="text-[11px] text-slate-400">Lokasi</p>
                  <p className="font-medium text-slate-800 mt-0.5">{detailRuangan.lokasi}</p>
                </div>
                {detailRuangan.kapasitas !== "" && (
                  <div>
                    <p className="text-[11px] text-slate-400">Kapasitas</p>
                    <p className="font-medium text-slate-800 mt-0.5">{detailRuangan.kapasitas} orang</p>
                  </div>
                )}
                {detailRuangan.luas && (
                  <div>
                    <p className="text-[11px] text-slate-400">Luas</p>
                    <p className="font-medium text-slate-800 mt-0.5">{detailRuangan.luas} m²</p>
                  </div>
                )}
                {detailRuangan.penanggungJawab && (
                  <div className="col-span-2">
                    <p className="text-[11px] text-slate-400">Penanggung Jawab</p>
                    <p className="font-medium text-slate-800 mt-0.5">{detailRuangan.penanggungJawab}</p>
                  </div>
                )}
              </div>

              {detailRuangan.deskripsi && (
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[11px] text-slate-400 mb-1">Deskripsi</p>
                  <p className="text-sm text-slate-600">{detailRuangan.deskripsi}</p>
                </div>
              )}

              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <ClipboardList size={14} className="text-[#155DFC]" />
                  <p className="text-sm font-semibold text-slate-800">
                    Sarpras di Ruangan Ini ({detailRuangan.sarpras.length})
                  </p>
                </div>
                {detailRuangan.sarpras.length === 0 ? (
                  <p className="text-xs text-slate-400">Belum ada data sarpras untuk ruangan ini.</p>
                ) : (
                  <div className="space-y-1.5">
                    {detailRuangan.sarpras.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 text-sm"
                      >
                        <span className="text-slate-700 font-medium">{s.nama}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-xs">{s.jumlah} unit</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${KONDISI_CHIP[s.kondisi] || "bg-slate-100 text-slate-600"}`}>
                            {s.kondisi}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => openEdit(detailRuangan)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white text-sm font-semibold hover:brightness-110 transition-all"
                >
                  <Pencil size={15} />
                  Edit Ruangan
                </button>
                <button
                  onClick={() => setConfirmDeleteId(detailRuangan.id)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT RUANGAN */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl max-w-xl w-full overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <p className="font-bold text-white text-sm">
                {editingId ? "Edit Ruangan" : "Tambah Ruangan Baru"}
              </p>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:bg-white/15"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              {/* UPLOAD FOTO */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Foto Ruangan</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFotoChange}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer h-36 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#155DFC]/50 bg-slate-50 flex items-center justify-center overflow-hidden relative"
                >
                  {formData.foto ? (
                    <>
                      <img src={formData.foto} alt="Preview" className="w-full h-full object-cover" />
                      <span className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                        Ganti Foto
                      </span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-slate-400">
                      <Camera size={22} />
                      <p className="text-xs mt-1">Klik untuk unggah foto ruangan</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Nama Ruangan</label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Contoh: Laboratorium IPA"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Jenis Ruangan</label>
                  <select
                    value={formData.jenis}
                    onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white"
                  >
                    {JENIS_OPTIONS.map((j) => (
                      <option key={j.value} value={j.value}>
                        {j.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Lantai</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.lantai}
                    onChange={(e) => setFormData({ ...formData, lantai: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Lokasi Detail</label>
                  <input
                    type="text"
                    required
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    placeholder="Contoh: Gedung B, ujung koridor timur"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Kapasitas (orang)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.kapasitas}
                    onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Luas (m²)</label>
                  <input
                    type="text"
                    value={formData.luas}
                    onChange={(e) => setFormData({ ...formData, luas: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Penanggung Jawab</label>
                  <input
                    type="text"
                    value={formData.penanggungJawab}
                    onChange={(e) => setFormData({ ...formData, penanggungJawab: e.target.value })}
                    placeholder="Nama guru/staf penanggung jawab (opsional)"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Deskripsi</label>
                  <textarea
                    rows={2}
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 resize-none"
                  />
                </div>
              </div>

              {/* DAFTAR SARPRAS DI RUANGAN */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-600">Sarpras di Ruangan Ini</label>
                  <button
                    type="button"
                    onClick={addSarprasRow}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#155DFC] hover:underline"
                  >
                    <PlusIcon size={13} />
                    Tambah Item
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.sarpras.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Nama barang"
                        value={s.nama}
                        onChange={(e) => updateSarprasRow(idx, "nama", e.target.value)}
                        className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Jml"
                        value={s.jumlah}
                        onChange={(e) => updateSarprasRow(idx, "jumlah", e.target.value)}
                        className="w-16 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50"
                      />
                      <select
                        value={s.kondisi}
                        onChange={(e) => updateSarprasRow(idx, "kondisi", e.target.value)}
                        className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white"
                      >
                        {KONDISI_OPTIONS.map((k) => (
                          <option key={k} value={k}>
                            {k}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeSarprasRow(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                      >
                        <Minus size={14} />
                      </button>
                    </div>
                  ))}
                  {formData.sarpras.length === 0 && (
                    <p className="text-xs text-slate-400">Belum ada item sarpras ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-slate-100 flex-shrink-0">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white text-sm font-semibold hover:brightness-110 transition-all"
              >
                <Save size={15} />
                {editingId ? "Simpan Perubahan" : "Simpan Ruangan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* KONFIRMASI HAPUS */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5">
            <p className="font-semibold text-slate-800 text-sm">Hapus ruangan ini?</p>
            <p className="text-xs text-slate-500 mt-1">
              Data ruangan beserta daftar sarpras dan fotonya akan dihapus permanen.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="flex-1 px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}