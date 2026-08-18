"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  Package,
  Layers,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Search,
  Sparkles,
  Crown,
  Star,
  Zap,
  Users,
  CircleDollarSign,
  BadgeCheck,
  BookOpen,
  Wallet,
  UserCog,
  Library,
  ClipboardCheck,
  UserPlus,
  MessageSquare,
  Boxes,
  MoreHorizontal,
  Copy,
  ShieldCheck,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import {
  getPaket,
  getFitur,
  createPaket,
  updatePaket,
  deletePaket,
} from "../../../services/paket.service";

/* =========================================================
   KONFIGURASI ICON
========================================================= */

const ICON_MAP = {
  akademik: BookOpen,
  keuangan: Wallet,
  kepegawaian: UserCog,
  perpustakaan: Library,
  presensi: ClipboardCheck,
  ppdb: UserPlus,
  komunikasi: MessageSquare,
  inventaris: Boxes,
};

const DEFAULT_MODULES = [
  {
    id: "akademik",
    nama: "Akademik",
    desk: "Nilai, jadwal & rapor digital",
    icon: BookOpen,
  },
  {
    id: "keuangan",
    nama: "Keuangan",
    desk: "SPP, tagihan & laporan keuangan",
    icon: Wallet,
  },
  {
    id: "kepegawaian",
    nama: "Kepegawaian",
    desk: "Data guru & staff sekolah",
    icon: UserCog,
  },
  {
    id: "perpustakaan",
    nama: "Perpustakaan",
    desk: "Katalog & sirkulasi buku",
    icon: Library,
  },
  {
    id: "presensi",
    nama: "Presensi",
    desk: "Absensi digital siswa & guru",
    icon: ClipboardCheck,
  },
  {
    id: "ppdb",
    nama: "PPDB",
    desk: "Pendaftaran siswa baru online",
    icon: UserPlus,
  },
  {
    id: "komunikasi",
    nama: "Komunikasi",
    desk: "Pesan ke orang tua & wali murid",
    icon: MessageSquare,
  },
  {
    id: "inventaris",
    nama: "Inventaris",
    desk: "Aset & barang milik sekolah",
    icon: Boxes,
  },
];

/* =========================================================
   WARNA
========================================================= */

const WARNA_MAP = {
  slate: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    ring: "ring-slate-200",
    solid: "bg-slate-600",
  },

  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    ring: "ring-blue-200",
    solid: "bg-blue-600",
  },

  purple: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    ring: "ring-purple-200",
    solid: "bg-purple-600",
  },

  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    ring: "ring-amber-200",
    solid: "bg-amber-600",
  },

  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    ring: "ring-emerald-200",
    solid: "bg-emerald-600",
  },
};

/* =========================================================
   HELPER
========================================================= */

function formatRupiah(value) {
  const angka = Number(value || 0);

  if (angka === 0) {
    return "Gratis";
  }

  return "Rp" + angka.toLocaleString("id-ID");
}

function getResponseData(response) {
  if (!response) return [];

  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data?.data)) {
    return response.data.data;
  }

  if (Array.isArray(response.result)) {
    return response.result;
  }

  if (Array.isArray(response.results)) {
    return response.results;
  }

  return [];
}

function getFeatureId(item) {
  if (!item) return null;

  return (
    item.id ??
    item.fiturId ??
    item.fitur_id ??
    item.modulId ??
    item.modul_id ??
    item.kode ??
    item.slug ??
    null
  );
}

function getFeatureName(item) {
  if (!item) return "Fitur";

  return (
    item.nama ??
    item.namaFitur ??
    item.nama_fitur ??
    item.namaModul ??
    item.nama_modul ??
    item.name ??
    item.label ??
    item.judul ??
    "Fitur"
  );
}

function getFeatureDescription(item) {
  if (!item) return "";

  return (
    item.deskripsi ??
    item.description ??
    item.keterangan ??
    ""
  );
}

function normalizeFeature(item, index) {
  const id = getFeatureId(item) ?? `fitur-${index}`;

  const nama = getFeatureName(item);

  const iconKey = String(nama)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "");

  return {
    ...item,
    id,
    nama,
    deskripsi: getFeatureDescription(item),
    icon: ICON_MAP[id] || ICON_MAP[iconKey] || Layers,
  };
}

function getPaketId(paket) {
  return (
    paket?.id ??
    paket?.paketId ??
    paket?.paket_id
  );
}

function getPaketName(paket) {
  return (
    paket?.nama ??
    paket?.namaPaket ??
    paket?.nama_paket ??
    paket?.name ??
    "Tanpa Nama"
  );
}

function getPaketPrice(paket) {
  return Number(
    paket?.harga ??
      paket?.hargaBulanan ??
      paket?.harga_bulanan ??
      paket?.hargaPerBulan ??
      paket?.harga_per_bulan ??
      0
  );
}

function getPaketDescription(paket) {
  return (
    paket?.deskripsi ??
    paket?.description ??
    paket?.keterangan ??
    ""
  );
}

function getPaketStatus(paket) {
  const status = String(
    paket?.status ??
      paket?.statusPaket ??
      paket?.status_paket ??
      "aktif"
  ).toLowerCase();

  return status === "aktif" ? "aktif" : "nonaktif";
}

function getPaketCycle(paket) {
  return (
    paket?.siklus ??
    paket?.periode ??
    paket?.durasi ??
    "bulan"
  );
}

function getPaketSubscribers(paket) {
  return Number(
    paket?.langganan ??
      paket?.jumlahLangganan ??
      paket?.jumlah_langganan ??
      paket?.jumlahSekolah ??
      paket?.jumlah_sekolah ??
      paket?._count?.langgananSekolah ??
      0
  );
}

function getPaketFeatures(paket) {
  if (!paket) return [];

  if (Array.isArray(paket.modul)) {
    return paket.modul;
  }

  if (Array.isArray(paket.fitur)) {
    return paket.fitur;
  }

  if (Array.isArray(paket.fiturs)) {
    return paket.fiturs;
  }

  if (Array.isArray(paket.features)) {
    return paket.features;
  }

  if (Array.isArray(paket.fiturIds)) {
    return paket.fiturIds;
  }

  if (Array.isArray(paket.fitur_ids)) {
    return paket.fitur_ids;
  }

  return [];
}

function getFeatureIdsFromPaket(paket) {
  const features = getPaketFeatures(paket);

  return features
    .map((item) => {
      if (typeof item === "string" || typeof item === "number") {
        return item;
      }

      return getFeatureId(item);
    })
    .filter(Boolean);
}

function getPaketColor(paket, index) {
  if (paket?.warna && WARNA_MAP[paket.warna]) {
    return paket.warna;
  }

  const colors = ["slate", "blue", "purple", "amber"];

  return colors[index % colors.length];
}

function getPaketIcon(paket, index) {
  const nama = getPaketName(paket).toLowerCase();

  if (nama.includes("enterprise")) return Crown;
  if (nama.includes("professional")) return Zap;
  if (nama.includes("trial")) return Sparkles;
  if (nama.includes("starter")) return Star;

  const icons = [Star, Zap, Crown, Sparkles];

  return icons[index % icons.length];
}

/* =========================================================
   HALAMAN UTAMA
========================================================= */

export default function PaketModulPage() {
  const [activeMenu, setActiveMenu] = useState("paket-modul");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [paketList, setPaketList] = useState([]);
  const [fiturList, setFiturList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPaket, setEditingPaket] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(null);

  const [search, setSearch] = useState("");

  const notifications = [
    {
      id: 1,
      title: "Pembaruan Sistem v2.0",
      desc: "Dikirim 2 jam lalu",
      read: false,
    },
    {
      id: 2,
      title: "Pengingat: Backup Data",
      desc: "Dikirim 1 hari lalu",
      read: false,
    },
  ];

  /* =======================================================
     LOAD DATA
  ======================================================= */

  async function loadData(showLoading = true) {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const [paketResponse, fiturResponse] = await Promise.all([
        getPaket(),
        getFitur(),
      ]);

      const paketData = getResponseData(paketResponse);
      const fiturData = getResponseData(fiturResponse);

      setPaketList(paketData);
      setFiturList(
        fiturData.map((item, index) =>
          normalizeFeature(item, index)
        )
      );
    } catch (err) {
      console.error("Gagal memuat data paket:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Gagal mengambil data paket dari server."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  /* =======================================================
     DATA YANG SUDAH DINORMALISASI
  ======================================================= */

  const normalizedPaket = useMemo(() => {
    return paketList.map((paket, index) => {
      return {
        ...paket,

        id: getPaketId(paket),

        nama: getPaketName(paket),

        harga: getPaketPrice(paket),

        deskripsi: getPaketDescription(paket),

        status: getPaketStatus(paket),

        siklus: getPaketCycle(paket),

        langganan: getPaketSubscribers(paket),

        fiturIds: getFeatureIdsFromPaket(paket),

        warna: getPaketColor(paket, index),

        icon: getPaketIcon(paket, index),

        populer:
          paket?.populer === true ||
          paket?.isPopular === true ||
          paket?.is_popular === true ||
          false,
      };
    });
  }, [paketList]);

  /* =======================================================
     STATISTIK
  ======================================================= */

  const totalPaket = normalizedPaket.length;

  const paketAktif = normalizedPaket.filter(
    (p) => p.status === "aktif"
  ).length;

  const totalLangganan = normalizedPaket.reduce(
    (sum, p) => sum + Number(p.langganan || 0),
    0
  );

  const totalPendapatan = normalizedPaket.reduce(
    (sum, p) => sum + Number(p.harga || 0) * Number(p.langganan || 0),
    0
  );

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredPaket = normalizedPaket.filter((paket) =>
    paket.nama
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* =======================================================
     TAMBAH
  ======================================================= */

  function openTambah() {
    setEditingPaket(null);
    setModalOpen(true);
  }

  /* =======================================================
     EDIT
  ======================================================= */

  function openEdit(paket) {
    setEditingPaket(paket);
    setModalOpen(true);
  }

  /* =======================================================
     SIMPAN
  ======================================================= */

  async function simpanPaket(data) {
    try {
      setError("");

      if (editingPaket) {
        const id = getPaketId(editingPaket);

        await updatePaket(id, data);
      } else {
        await createPaket(data);
      }

      setModalOpen(false);
      setEditingPaket(null);

      await loadData(false);
    } catch (err) {
      console.error("Gagal menyimpan paket:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Gagal menyimpan paket."
      );
    }
  }

  /* =======================================================
     HAPUS
  ======================================================= */

  async function hapusPaket(paket) {
    try {
      setError("");

      const id = getPaketId(paket);

      await deletePaket(id);

      setConfirmDelete(null);

      await loadData(false);
    } catch (err) {
      console.error("Gagal menghapus paket:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Gagal menghapus paket."
      );
    }
  }

  /* =======================================================
     DUPLIKAT
  ======================================================= */

  function duplikatPaket(paket) {
    setEditingPaket({
      ...paket,

      id: undefined,

      nama: `${paket.nama} (Salinan)`,

      populer: false,

      langganan: 0,
    });

    setModalOpen(true);
  }

  /* =======================================================
     TOGGLE STATUS
  ======================================================= */

  async function toggleStatus(paket) {
    try {
      setError("");

      const id = getPaketId(paket);

      const nextStatus =
        paket.status === "aktif"
          ? "nonaktif"
          : "aktif";

      await updatePaket(id, {
        ...paket,
        status: nextStatus,
      });

      await loadData(false);
    } catch (err) {
      console.error("Gagal mengubah status paket:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Gagal mengubah status paket."
      );
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar
          active={activeMenu}
          setActive={setActiveMenu}
          collapsed={!sidebarOpen}
          setCollapsed={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header
            toggleSidebar={() =>
              setSidebarOpen(!sidebarOpen)
            }
            notifications={notifications}
            user={{
              name: "Sarah",
              email: "sarah@smartschool.com",
              avatar: "SA",
            }}
          />

          <main className="flex-1 flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-3">
              <Loader2
                size={32}
                className="animate-spin text-blue-600"
              />

              <p className="text-sm text-slate-500">
                Memuat data paket...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() =>
            setSidebarOpen(!sidebarOpen)
          }
          notifications={notifications}
          user={{
            name: "Sarah",
            email: "sarah@smartschool.com",
            avatar: "SA",
          }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-5 md:space-y-7">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-600 text-white shadow-sm">
                    <Package size={18} />
                  </span>

                  Paket & Modul
                </h1>

                <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5 ml-[44px]">
                  <Sparkles
                    size={14}
                    className="text-slate-400"
                  />

                  Kelola paket langganan dan modul yang
                  tersedia untuk setiap sekolah.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadData(false)}
                  disabled={refreshing}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition"
                >
                  <RefreshCw
                    size={15}
                    className={
                      refreshing
                        ? "animate-spin"
                        : ""
                    }
                  />

                  Refresh
                </button>

                <button
                  onClick={openTambah}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
                >
                  <Plus size={16} />

                  Tambah Paket
                </button>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700">
                <AlertCircle
                  size={18}
                  className="mt-0.5 flex-shrink-0"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Terjadi kesalahan
                  </p>

                  <p className="text-xs mt-1 text-rose-600">
                    {error}
                  </p>
                </div>

                <button
                  onClick={() => setError("")}
                  className="text-rose-400 hover:text-rose-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* =================================================
                STAT
            ================================================= */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <StatCard
                icon={Package}
                label="Total Paket"
                value={totalPaket}
                color="blue"
              />

              <StatCard
                icon={BadgeCheck}
                label="Paket Aktif"
                value={paketAktif}
                color="emerald"
              />

              <StatCard
                icon={Users}
                label="Total Langganan"
                value={totalLangganan}
                color="purple"
              />

              <StatCard
                icon={CircleDollarSign}
                label="Estimasi Pendapatan"
                value={formatRupiah(totalPendapatan)}
                color="orange"
              />
            </div>

            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Cari paket..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-slate-400 transition"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>
                  {filteredPaket.length} paket ditemukan
                </span>
              </div>
            </div>

            {/* =================================================
                GRID PAKET
            ================================================= */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {filteredPaket.map((paket) => (
                <PaketCard
                  key={paket.id}
                  paket={paket}
                  fiturList={fiturList}
                  onEdit={() =>
                    openEdit(paket)
                  }
                  onDelete={() =>
                    setConfirmDelete(paket)
                  }
                  onDuplicate={() =>
                    duplikatPaket(paket)
                  }
                  onToggleStatus={() =>
                    toggleStatus(paket)
                  }
                />
              ))}

              {filteredPaket.length === 0 && (
                <div className="col-span-full text-center py-14 text-slate-400 text-sm border border-dashed border-slate-200 rounded-xl bg-white">
                  <Package
                    size={34}
                    className="mx-auto text-slate-300 mb-3"
                  />

                  <p className="font-medium text-slate-500">
                    Tidak ada paket ditemukan
                  </p>

                  <p className="text-xs mt-1">
                    Coba gunakan kata kunci pencarian lain.
                  </p>
                </div>
              )}
            </div>

            {/* =================================================
                MATRIKS
            ================================================= */}

            <ModulMatrix
              paketList={normalizedPaket}
              fiturList={fiturList}
            />
          </div>
        </main>
      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {modalOpen && (
        <PaketModal
          paket={editingPaket}
          fiturList={fiturList}
          onClose={() => {
            setModalOpen(false);
            setEditingPaket(null);
          }}
          onSave={simpanPaket}
        />
      )}

      {/* =====================================================
          DELETE
      ===================================================== */}

      {confirmDelete && (
        <ConfirmDeleteModal
          paket={confirmDelete}
          onCancel={() =>
            setConfirmDelete(null)
          }
          onConfirm={() =>
            hapusPaket(confirmDelete)
          }
        />
      )}
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald:
      "bg-emerald-50 text-emerald-600",
    purple:
      "bg-purple-50 text-purple-600",
    orange:
      "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl ${colorMap[color]} flex items-center justify-center flex-shrink-0`}
        >
          <Icon size={18} />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            {label}
          </p>

          <p className="text-lg font-semibold text-slate-800 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   KARTU PAKET
========================================================= */

function PaketCard({
  paket,
  fiturList,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
}) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const warna =
    WARNA_MAP[paket.warna] ||
    WARNA_MAP.slate;

  const Icon =
    paket.icon || Package;

  const selectedFeatures =
    paket.fiturIds || [];

  return (
    <div
      className={`relative bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
        paket.populer
          ? "border-blue-300 ring-1 ring-blue-200"
          : "border-slate-200/80"
      }`}
    >
      {/* POPULER */}

      {paket.populer && (
        <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white bg-blue-600 shadow-sm">
          Paling Populer
        </span>
      )}

      {/* TOP */}

      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl ${warna.bg} ${warna.text} flex items-center justify-center shadow-sm`}
        >
          <Icon size={18} />
        </div>

        <div className="relative">
          <button
            onClick={() =>
              setMenuOpen((v) => !v)
            }
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>

          {menuOpen && (
            <div
              onMouseLeave={() =>
                setMenuOpen(false)
              }
              className="absolute right-0 mt-1 w-40 bg-white rounded-lg border border-slate-200 shadow-lg py-1 z-20"
            >
              <button
                onClick={() => {
                  onEdit();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
              >
                <Pencil size={12} />
                Edit
              </button>

              <button
                onClick={() => {
                  onDuplicate();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
              >
                <Copy size={12} />
                Duplikat
              </button>

              <button
                onClick={() => {
                  onToggleStatus();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
              >
                <ShieldCheck size={12} />

                {paket.status === "aktif"
                  ? "Nonaktifkan"
                  : "Aktifkan"}
              </button>

              <button
                onClick={() => {
                  onDelete();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-500 hover:bg-rose-50"
              >
                <Trash2 size={12} />
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NAME */}

      <h3 className="text-base font-semibold text-slate-800">
        {paket.nama}
      </h3>

      <p className="text-xs text-slate-400 mt-1 min-h-[2.4em] leading-relaxed">
        {paket.deskripsi ||
          "Tidak ada deskripsi paket."}
      </p>

      {/* PRICE */}

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-xl font-bold text-slate-800">
          {formatRupiah(paket.harga)}
        </span>

        {paket.harga > 0 && (
          <span className="text-xs text-slate-400">
            / {paket.siklus}
          </span>
        )}
      </div>

      {/* STATUS */}

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
            paket.status === "aktif"
              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
              : "bg-slate-50 text-slate-500 border-slate-200"
          }`}
        >
          {paket.status === "aktif"
            ? "Aktif"
            : "Nonaktif"}
        </span>

        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Users size={12} />

          {paket.langganan} sekolah
        </span>
      </div>

      {/* FEATURES */}

      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">
          {selectedFeatures.length} Fitur termasuk
        </p>

        {selectedFeatures
          .slice(0, 4)
          .map((featureId, index) => {
            const feature =
              fiturList.find(
                (f) =>
                  String(f.id) ===
                  String(featureId)
              );

            const nama =
              feature?.nama ||
              String(featureId);

            return (
              <div
                key={`${featureId}-${index}`}
                className="flex items-center gap-1.5 text-xs text-slate-600"
              >
                <Check
                  size={12}
                  className="text-emerald-500 flex-shrink-0"
                />

                {nama}
              </div>
            );
          })}

        {selectedFeatures.length === 0 && (
          <p className="text-xs text-slate-400">
            Belum ada fitur
          </p>
        )}

        {selectedFeatures.length > 4 && (
          <p className="text-[10px] text-slate-400 pl-[18px]">
            +{selectedFeatures.length - 4} fitur lainnya
          </p>
        )}
      </div>

      {/* BUTTON */}

      <button
        onClick={onEdit}
        className="mt-4 w-full text-center py-2 rounded-lg text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors"
      >
        Kelola Paket
      </button>
    </div>
  );
}

/* =========================================================
   MATRIKS
========================================================= */

function ModulMatrix({
  paketList,
  fiturList,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 md:p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
          <Layers size={16} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-700">
            Matriks Modul per Paket
          </h3>

          <p className="text-xs text-slate-400">
            Perbandingan fitur yang tersedia di setiap paket
          </p>
        </div>
      </div>

      {fiturList.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-400">
          <Layers
            size={28}
            className="mx-auto mb-2 text-slate-300"
          />

          Belum ada data fitur dari server.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[650px]">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-200/60">
                <th className="pb-2 font-medium sticky left-0 bg-white z-10">
                  Modul
                </th>

                {paketList.map((paket) => (
                  <th
                    key={paket.id}
                    className="pb-2 font-medium text-center px-3"
                  >
                    {paket.nama}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {fiturList.map((fitur) => {
                const Icon =
                  fitur.icon || Layers;

                return (
                  <tr
                    key={fitur.id}
                    className="border-b border-slate-100/80 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-2.5 sticky left-0 bg-white">
                      <div className="flex items-center gap-2">
                        <Icon
                          size={14}
                          className="text-slate-400"
                        />

                        <span className="font-medium text-slate-700">
                          {fitur.nama}
                        </span>
                      </div>
                    </td>

                    {paketList.map((paket) => (
                      <td
                        key={paket.id}
                        className="py-2.5 text-center"
                      >
                        {paket.fiturIds.some(
                          (id) =>
                            String(id) ===
                            String(fitur.id)
                        ) ? (
                          <Check
                            size={16}
                            className="text-emerald-500 mx-auto"
                          />
                        ) : (
                          <X
                            size={16}
                            className="text-slate-200 mx-auto"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MODAL TAMBAH / EDIT
========================================================= */

function PaketModal({
  paket,
  fiturList,
  onClose,
  onSave,
}) {
  const [nama, setNama] = useState(
    paket?.nama || ""
  );

  const [deskripsi, setDeskripsi] =
    useState(paket?.deskripsi || "");

  const [harga, setHarga] = useState(
    paket?.harga ?? 0
  );

  const [siklus, setSiklus] = useState(
    paket?.siklus || "bulan"
  );

  const [status, setStatus] = useState(
    paket?.status || "aktif"
  );

  const [fiturTerpilih, setFiturTerpilih] =
    useState(paket?.fiturIds || []);

  const [saving, setSaving] =
    useState(false);

  const [localError, setLocalError] =
    useState("");

  function toggleFitur(id) {
    setFiturTerpilih((list) => {
      const exists = list.some(
        (item) =>
          String(item) === String(id)
      );

      if (exists) {
        return list.filter(
          (item) =>
            String(item) !== String(id)
        );
      }

      return [...list, id];
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nama.trim()) {
      setLocalError(
        "Nama paket wajib diisi."
      );
      return;
    }

    try {
      setSaving(true);
      setLocalError("");

      /*
       * Payload yang dikirim ke service.
       *
       * Jika controller backend kamu menggunakan
       * nama field yang berbeda, bagian ini nanti
       * tinggal disesuaikan.
       */

      const payload = {
        nama: nama.trim(),
        deskripsi: deskripsi.trim(),
        harga: Number(harga) || 0,
        siklus,
        status,
        fiturIds: fiturTerpilih,
      };

      await onSave(payload);
    } catch (err) {
      console.error(err);

      setLocalError(
        err?.response?.data?.message ||
          err?.message ||
          "Gagal menyimpan paket."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* HEADER */}

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {paket
                ? "Edit Paket"
                : "Tambah Paket Baru"}
            </h3>

            <p className="text-xs text-slate-400 mt-0.5">
              Atur informasi dan fitur paket.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={saving}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          {/* ERROR */}

          {localError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600">
              <AlertCircle
                size={16}
                className="mt-0.5 flex-shrink-0"
              />

              <p className="text-xs">
                {localError}
              </p>
            </div>
          )}

          {/* NAMA */}

          <div>
            <label className="text-xs font-medium text-slate-500">
              Nama Paket
            </label>

            <input
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
              required
              placeholder="Contoh: Professional"
              className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 transition"
            />
          </div>

          {/* DESKRIPSI */}

          <div>
            <label className="text-xs font-medium text-slate-500">
              Deskripsi
            </label>

            <textarea
              value={deskripsi}
              onChange={(e) =>
                setDeskripsi(e.target.value)
              }
              rows={3}
              placeholder="Deskripsi singkat paket ini"
              className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 resize-none transition"
            />
          </div>

          {/* HARGA + SIKLUS */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500">
                Harga (Rp)
              </label>

              <input
                type="number"
                min="0"
                value={harga}
                onChange={(e) =>
                  setHarga(e.target.value)
                }
                className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 transition"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500">
                Siklus
              </label>

              <select
                value={siklus}
                onChange={(e) =>
                  setSiklus(e.target.value)
                }
                className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 bg-white transition"
              >
                <option value="bulan">
                  Per Bulan
                </option>

                <option value="tahun">
                  Per Tahun
                </option>

                <option value="14 hari">
                  14 Hari (Trial)
                </option>
              </select>
            </div>
          </div>

          {/* STATUS */}

          <div>
            <label className="text-xs font-medium text-slate-500">
              Status
            </label>

            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setStatus("aktif")
                }
                className={`flex-1 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                  status === "aktif"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                Aktif
              </button>

              <button
                type="button"
                onClick={() =>
                  setStatus("nonaktif")
                }
                className={`flex-1 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                  status === "nonaktif"
                    ? "bg-slate-100 text-slate-600 border-slate-300"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                Nonaktif
              </button>
            </div>
          </div>

          {/* FITUR */}

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-500">
                Modul / Fitur Termasuk
              </label>

              <span className="text-[10px] text-slate-400">
                {fiturTerpilih.length} dipilih
              </span>
            </div>

            <div className="mt-1.5 grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {fiturList.map((fitur) => {
                const checked =
                  fiturTerpilih.some(
                    (id) =>
                      String(id) ===
                      String(fitur.id)
                  );

                const Icon =
                  fitur.icon || Layers;

                return (
                  <button
                    type="button"
                    key={fitur.id}
                    onClick={() =>
                      toggleFitur(fitur.id)
                    }
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-colors ${
                      checked
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border ${
                        checked
                          ? "bg-blue-600 border-blue-600"
                          : "border-slate-300"
                      }`}
                    >
                      {checked && (
                        <Check
                          size={10}
                          className="text-white"
                        />
                      )}
                    </span>

                    <Icon
                      size={13}
                      className="text-slate-400 flex-shrink-0"
                    />

                    <span className="text-xs text-slate-600 truncate">
                      {fitur.nama}
                    </span>
                  </button>
                );
              })}

              {fiturList.length === 0 && (
                <div className="col-span-2 py-6 text-center text-xs text-slate-400">
                  Belum ada fitur dari server.
                </div>
              )}
            </div>
          </div>

          {/* BUTTON */}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all disabled:opacity-60"
            >
              {saving && (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Menyimpan..."
                : paket
                ? "Simpan Perubahan"
                : "Tambah Paket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   MODAL DELETE
========================================================= */

function ConfirmDeleteModal({
  paket,
  onCancel,
  onConfirm,
}) {
  const [deleting, setDeleting] =
    useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);

      await onConfirm();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} />
        </div>

        <h3 className="text-center text-lg font-semibold text-slate-800">
          Hapus paket "{paket.nama}"?
        </h3>

        <p className="text-center text-sm text-slate-500 mt-2">
          Tindakan ini tidak dapat dibatalkan.
          {paket.langganan > 0 &&
            ` Paket ini masih memiliki ${paket.langganan} sekolah berlangganan.`}
        </p>

        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Batal
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 shadow-sm hover:shadow transition-all disabled:opacity-60"
          >
            {deleting && (
              <Loader2
                size={15}
                className="animate-spin"
              />
            )}

            {deleting
              ? "Menghapus..."
              : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}