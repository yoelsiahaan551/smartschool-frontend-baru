"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  ArrowUpRight,
} from "lucide-react";

import {
  getPaket,
  getFitur,
  deletePaket,
  updatePaket,
} from "../../../services/paket.service";

/* =========================================================
   ICON MODULE
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

/* =========================================================
   DEFAULT MODULE
========================================================= */

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
   PACKAGE COLOR
========================================================= */

const PACKAGE_THEMES = {
  blue: {
    card:
      "from-blue-600 via-blue-600 to-indigo-700",
    soft:
      "bg-blue-50",
    softText:
      "text-blue-700",
    icon:
      "bg-blue-100 text-blue-700",
    badge:
      "bg-blue-100 text-blue-700",
    line:
      "border-blue-100",
    button:
      "bg-blue-600 hover:bg-blue-700",
    glow:
      "bg-blue-500/10",
  },

  purple: {
    card:
      "from-indigo-600 via-purple-600 to-violet-700",
    soft:
      "bg-purple-50",
    softText:
      "text-purple-700",
    icon:
      "bg-purple-100 text-purple-700",
    badge:
      "bg-purple-100 text-purple-700",
    line:
      "border-purple-100",
    button:
      "bg-purple-600 hover:bg-purple-700",
    glow:
      "bg-purple-500/10",
  },

  emerald: {
    card:
      "from-emerald-600 via-teal-600 to-cyan-700",
    soft:
      "bg-emerald-50",
    softText:
      "text-emerald-700",
    icon:
      "bg-emerald-100 text-emerald-700",
    badge:
      "bg-emerald-100 text-emerald-700",
    line:
      "border-emerald-100",
    button:
      "bg-emerald-600 hover:bg-emerald-700",
    glow:
      "bg-emerald-500/10",
  },

  orange: {
    card:
      "from-orange-500 via-amber-500 to-yellow-600",
    soft:
      "bg-orange-50",
    softText:
      "text-orange-700",
    icon:
      "bg-orange-100 text-orange-700",
    badge:
      "bg-orange-100 text-orange-700",
    line:
      "border-orange-100",
    button:
      "bg-orange-500 hover:bg-orange-600",
    glow:
      "bg-orange-500/10",
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
  const id =
    getFeatureId(item) ??
    `fitur-${index}`;

  const nama =
    getFeatureName(item);

  const iconKey = String(nama)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "");

  return {
    ...item,
    id,
    nama,
    deskripsi:
      getFeatureDescription(item),
    icon:
      ICON_MAP[id] ||
      ICON_MAP[iconKey] ||
      Layers,
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

  return status === "aktif"
    ? "aktif"
    : "nonaktif";
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
  return getPaketFeatures(paket)
    .map((item) => {
      if (
        typeof item === "string" ||
        typeof item === "number"
      ) {
        return item;
      }

      return getFeatureId(item);
    })
    .filter(Boolean);
}

/* =========================================================
   PACKAGE THEME
========================================================= */

function getPackageTheme(paket, index) {
  const name =
    getPaketName(paket).toLowerCase();

  if (
    name.includes("premium") ||
    name.includes("enterprise") ||
    name.includes("professional")
  ) {
    return PACKAGE_THEMES.purple;
  }

  if (
    name.includes("custom")
  ) {
    return PACKAGE_THEMES.blue;
  }

  if (
    name.includes("basic") ||
    name.includes("starter") ||
    name.includes("trial")
  ) {
    return PACKAGE_THEMES.emerald;
  }

  const themes = [
    PACKAGE_THEMES.blue,
    PACKAGE_THEMES.purple,
    PACKAGE_THEMES.emerald,
    PACKAGE_THEMES.orange,
  ];

  return themes[index % themes.length];
}

function getPackageIcon(paket, index) {
  const nama =
    getPaketName(paket).toLowerCase();

  if (
    nama.includes("enterprise") ||
    nama.includes("premium")
  ) {
    return Crown;
  }

  if (
    nama.includes("professional") ||
    nama.includes("custom")
  ) {
    return Zap;
  }

  if (
    nama.includes("trial")
  ) {
    return Sparkles;
  }

  if (
    nama.includes("starter") ||
    nama.includes("basic")
  ) {
    return Star;
  }

  const icons = [
    Star,
    Zap,
    Crown,
    Sparkles,
  ];

  return icons[index % icons.length];
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function PaketModulPage() {
  const router = useRouter();

  const [activeMenu, setActiveMenu] =
    useState("paket-modul");

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [paketList, setPaketList] =
    useState([]);

  const [fiturList, setFiturList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [confirmDelete, setConfirmDelete] =
    useState(null);

  const [search, setSearch] =
    useState("");

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

      const [
        paketResponse,
        fiturResponse,
      ] = await Promise.all([
        getPaket(),
        getFitur(),
      ]);

      const paketData =
        getResponseData(
          paketResponse
        );

      const fiturData =
        getResponseData(
          fiturResponse
        );

      setPaketList(paketData);

      setFiturList(
        fiturData.map(
          (item, index) =>
            normalizeFeature(
              item,
              index
            )
        )
      );
    } catch (err) {
      console.error(
        "Gagal memuat data paket:",
        err
      );

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
     NORMALIZED DATA
  ======================================================= */

  const normalizedPaket =
    useMemo(() => {
      return paketList.map(
        (paket, index) => ({
          ...paket,

          id:
            getPaketId(paket),

          nama:
            getPaketName(paket),

          harga:
            getPaketPrice(paket),

          deskripsi:
            getPaketDescription(
              paket
            ),

          status:
            getPaketStatus(paket),

          siklus:
            getPaketCycle(paket),

          langganan:
            getPaketSubscribers(
              paket
            ),

          fiturIds:
            getFeatureIdsFromPaket(
              paket
            ),

          theme:
            getPackageTheme(
              paket,
              index
            ),

          icon:
            getPackageIcon(
              paket,
              index
            ),

          populer:
            paket?.populer === true ||
            paket?.isPopular === true ||
            paket?.is_popular === true,
        })
      );
    }, [paketList]);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalPaket =
    normalizedPaket.length;

  const paketAktif =
    normalizedPaket.filter(
      (p) => p.status === "aktif"
    ).length;

  const totalLangganan =
    normalizedPaket.reduce(
      (sum, p) =>
        sum +
        Number(
          p.langganan || 0
        ),
      0
    );

  const totalPendapatan =
    normalizedPaket.reduce(
      (sum, p) =>
        sum +
        Number(p.harga || 0) *
          Number(
            p.langganan || 0
          ),
      0
    );

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredPaket =
    normalizedPaket.filter(
      (paket) =>
        paket.nama
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  /* =======================================================
     NAVIGATION
  ======================================================= */

  function navigateToTambah() {
    router.push(
      "/super-admin/paketModul/tambah"
    );
  }

  function navigateToEdit(paket) {
    const id =
      getPaketId(paket);

    router.push(
      `/super-admin/paketModul/edit/${id}`
    );
  }

  /* =======================================================
     DELETE
  ======================================================= */

  async function hapusPaket(paket) {
    try {
      setError("");

      const id =
        getPaketId(paket);

      await deletePaket(id);

      setConfirmDelete(null);

      await loadData(false);
    } catch (err) {
      console.error(
        "Gagal menghapus paket:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Gagal menghapus paket."
      );
    }
  }

  /* =======================================================
     TOGGLE STATUS
  ======================================================= */

  async function toggleStatus(paket) {
    try {
      setError("");

      const id =
        getPaketId(paket);

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
      console.error(
        "Gagal mengubah status:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Gagal mengubah status paket."
      );
    }
  }

  /* =======================================================
     DUPLICATE
  ======================================================= */

  function duplikatPaket(paket) {
    const data = {
      ...paket,
      id: undefined,
      nama: `${paket.nama} (Salinan)`,
      populer: false,
      langganan: 0,
    };

    sessionStorage.setItem(
      "duplikatPaket",
      JSON.stringify(data)
    );

    router.push(
      "/super-admin/paketModul/tambah?duplikat=true"
    );
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar
          active={activeMenu}
          setActive={setActiveMenu}
          collapsed={!sidebarOpen}
          setCollapsed={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header
            toggleSidebar={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
            notifications={
              notifications
            }
            user={{
              name: "Sarah",
              email:
                "sarah@smartschool.com",
              avatar: "SA",
            }}
          />

          <main className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Loader2
                  size={24}
                  className="animate-spin text-white"
                />
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700">
                  Memuat paket...
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Menyiapkan data langganan
                </p>
              </div>
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
    <div className="flex min-h-screen bg-white">
      {/* SIDEBAR */}

      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
      />

      {/* CONTENT */}

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
          notifications={
            notifications
          }
          user={{
            name: "Sarah",
            email:
              "sarah@smartschool.com",
            avatar: "SA",
          }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1500px] mx-auto space-y-6">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f172a] via-[#172554] to-[#1d4ed8] p-6 md:p-7 shadow-lg shadow-blue-900/10">
              
              {/* decorative */}
              <div className="absolute -right-10 -top-16 w-56 h-56 rounded-full bg-blue-400/10 blur-2xl" />
              <div className="absolute right-24 bottom-[-80px] w-48 h-48 rounded-full bg-indigo-400/10 blur-2xl" />

              <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Package
                        size={21}
                        className="text-white"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">
                        Product Management
                      </p>

                      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Paket Langganan
                      </h1>
                    </div>
                  </div>

                  <p className="text-sm text-blue-100/80 mt-3 max-w-xl">
                    Kelola paket langganan dan
                    modul yang tersedia untuk
                    setiap sekolah.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      loadData(false)
                    }
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium backdrop-blur-sm transition"
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
                    onClick={
                      navigateToTambah
                    }
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-sm font-semibold shadow-lg transition"
                  >
                    <Plus size={16} />

                    Tambah Paket
                  </button>
                </div>
              </div>
            </section>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50">
                <AlertCircle
                  size={18}
                  className="text-rose-500 mt-0.5"
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold text-rose-700">
                    Terjadi kesalahan
                  </p>

                  <p className="text-xs text-rose-600 mt-1">
                    {error}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setError("")
                  }
                  className="text-rose-400 hover:text-rose-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* =================================================
                STATS
            ================================================= */}

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                icon={Package}
                label="Total Paket"
                value={totalPaket}
                description="Paket tersedia"
                theme="blue"
              />

              <StatCard
                icon={BadgeCheck}
                label="Paket Aktif"
                value={paketAktif}
                description="Sedang tersedia"
                theme="emerald"
              />

              <StatCard
                icon={Users}
                label="Total Langganan"
                value={totalLangganan}
                description="Sekolah berlangganan"
                theme="purple"
              />

              <StatCard
                icon={CircleDollarSign}
                label="Estimasi Pendapatan"
                value={formatRupiah(
                  totalPendapatan
                )}
                description="Per periode"
                theme="orange"
              />
            </div>

            {/* =================================================
                SEARCH
            ================================================= */}

            <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Paket Tersedia
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Pilih paket untuk melihat
                  detail dan modulnya.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-full md:w-72">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Cari paket..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                  />
                </div>

                <span className="hidden sm:flex items-center whitespace-nowrap px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-500">
                  {filteredPaket.length} paket
                </span>
              </div>
            </section>

            {/* =================================================
                PACKAGE GRID
            ================================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
              {filteredPaket.map(
                (paket) => (
                  <PaketCard
                    key={paket.id}
                    paket={paket}
                    fiturList={
                      fiturList
                    }
                    onEdit={() =>
                      navigateToEdit(
                        paket
                      )
                    }
                    onDelete={() =>
                      setConfirmDelete(
                        paket
                      )
                    }
                    onDuplicate={() =>
                      duplikatPaket(
                        paket
                      )
                    }
                    onToggleStatus={() =>
                      toggleStatus(
                        paket
                      )
                    }
                  />
                )
              )}

              {filteredPaket.length ===
                0 && (
                <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-slate-300 bg-white/70 py-16 text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">
                    <Package
                      size={25}
                      className="text-slate-400"
                    />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-600">
                    Paket tidak ditemukan
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Coba gunakan kata kunci
                    pencarian lain.
                  </p>
                </div>
              )}
            </div>

            {/* =================================================
                MODULE MATRIX
            ================================================= */}

            <ModulMatrix
              paketList={
                normalizedPaket
              }
              fiturList={
                fiturList.length
                  ? fiturList
                  : DEFAULT_MODULES
              }
            />
          </div>
        </main>
      </div>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {confirmDelete && (
        <ConfirmDeleteModal
          paket={confirmDelete}
          onCancel={() =>
            setConfirmDelete(null)
          }
          onConfirm={() =>
            hapusPaket(
              confirmDelete
            )
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
  description,
  theme,
}) {
  const themes = {
    blue: {
      icon: "bg-blue-100 text-blue-700",
      accent: "bg-blue-600",
      glow: "bg-blue-500/10",
    },

    emerald: {
      icon: "bg-emerald-100 text-emerald-700",
      accent: "bg-emerald-600",
      glow: "bg-emerald-500/10",
    },

    purple: {
      icon: "bg-purple-100 text-purple-700",
      accent: "bg-purple-600",
      glow: "bg-purple-500/10",
    },

    orange: {
      icon: "bg-orange-100 text-orange-700",
      accent: "bg-orange-500",
      glow: "bg-orange-500/10",
    },
  };

  const t =
    themes[theme] ||
    themes.blue;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
      <div
        className={`absolute right-0 top-0 w-24 h-24 rounded-full blur-2xl ${t.glow}`}
      />

      <div className="relative flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${t.icon}`}
        >
          <Icon size={19} />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="text-xl font-bold text-slate-800 truncate mt-0.5">
            {value}
          </p>

          <p className="text-[11px] text-slate-400 mt-0.5">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PACKAGE CARD
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

  const Icon =
    paket.icon || Package;

  const theme =
    paket.theme ||
    PACKAGE_THEMES.blue;

  const selectedFeatures =
    paket.fiturIds || [];

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/30 transition-all duration-300">

      {/* =================================================
          COLOR HEADER
      ================================================= */}

      <div
        className={`relative h-24 bg-gradient-to-br ${theme.card} overflow-hidden`}
      >
        <div className="absolute -right-8 -top-12 w-32 h-32 rounded-full bg-white/10" />

        <div className="absolute right-8 bottom-[-35px] w-24 h-24 rounded-full bg-white/5" />

        <div className="relative flex items-center justify-between p-5">
          <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon
              size={21}
              className="text-white"
            />
          </div>

          <div className="relative">
            <button
              onClick={() =>
                setMenuOpen(
                  (value) =>
                    !value
                )
              }
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <MoreHorizontal
                size={18}
              />
            </button>

            {menuOpen && (
              <div
                onMouseLeave={() =>
                  setMenuOpen(
                    false
                  )
                }
                className="absolute right-0 top-10 w-44 rounded-xl border border-slate-200 bg-white shadow-xl py-1.5 z-30"
              >
                <MenuButton
                  icon={Pencil}
                  label="Edit Paket"
                  onClick={() => {
                    onEdit();
                    setMenuOpen(
                      false
                    );
                  }}
                />

                <MenuButton
                  icon={Copy}
                  label="Duplikat"
                  onClick={() => {
                    onDuplicate();
                    setMenuOpen(
                      false
                    );
                  }}
                />

                <MenuButton
                  icon={
                    ShieldCheck
                  }
                  label={
                    paket.status ===
                    "aktif"
                      ? "Nonaktifkan"
                      : "Aktifkan"
                  }
                  onClick={() => {
                    onToggleStatus();
                    setMenuOpen(
                      false
                    );
                  }}
                />

                <MenuButton
                  icon={Trash2}
                  label="Hapus"
                  danger
                  onClick={() => {
                    onDelete();
                    setMenuOpen(
                      false
                    );
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="flex flex-col flex-1 p-5">

        {/* PACKAGE NAME */}

        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-800">
              {paket.nama}
            </h3>

            {paket.populer && (
              <span className="shrink-0 px-2 py-1 rounded-lg bg-blue-50 text-blue-700 text-[9px] font-bold uppercase tracking-wide">
                Populer
              </span>
            )}
          </div>

          <p className="text-xs leading-relaxed text-slate-400 mt-1.5 min-h-[36px]">
            {paket.deskripsi ||
              "Paket layanan SmartSchool untuk kebutuhan sekolah."}
          </p>
        </div>

        {/* PRICE */}

        <div className="mt-5">
          <div className="flex items-end gap-1">
            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {formatRupiah(
                paket.harga
              )}
            </span>

            {paket.harga > 0 && (
              <span className="text-xs text-slate-400 pb-1">
                / {paket.siklus}
              </span>
            )}
          </div>
        </div>

        {/* STATUS */}

        <div className="flex items-center justify-between mt-4 pb-4 border-b border-slate-100">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
              paket.status ===
              "aktif"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                paket.status ===
                "aktif"
                  ? "bg-emerald-500"
                  : "bg-slate-400"
              }`}
            />

            {paket.status ===
            "aktif"
              ? "Aktif"
              : "Nonaktif"}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Users
              size={13}
            />

            {paket.langganan} sekolah
          </span>
        </div>

        {/* MODULE */}

        <div className="mt-4 flex-1">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Modul tersedia
            </p>

            <span className="text-[10px] font-bold text-slate-400">
              {selectedFeatures.length}
            </span>
          </div>

          {selectedFeatures.length >
          0 ? (
            <div className="space-y-2">
              {selectedFeatures
                .slice(0, 4)
                .map(
                  (
                    featureId,
                    index
                  ) => {
                    const feature =
                      fiturList.find(
                        (f) =>
                          String(
                            f.id
                          ) ===
                          String(
                            featureId
                          )
                      );

                    const nama =
                      feature?.nama ||
                      String(
                        featureId
                      );

                    const FeatureIcon =
                      feature?.icon ||
                      Check;

                    return (
                      <div
                        key={`${featureId}-${index}`}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                          <FeatureIcon
                            size={
                              12
                            }
                            className="text-slate-500"
                          />
                        </div>

                        <span className="text-xs text-slate-600 truncate">
                          {nama}
                        </span>

                        <Check
                          size={
                            13
                          }
                          className="ml-auto text-emerald-500 shrink-0"
                        />
                      </div>
                    );
                  }
                )}

              {selectedFeatures.length >
                4 && (
                <p className="text-[10px] text-slate-400 pl-8 pt-1">
                  +
                  {selectedFeatures.length -
                    4}{" "}
                  modul lainnya
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center">
                <X
                  size={12}
                  className="text-slate-300"
                />
              </div>

              Belum ada modul
            </div>
          )}
        </div>

        {/* BUTTON */}

        <button
          onClick={onEdit}
          className={`group/btn mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white ${theme.button} shadow-sm transition`}
        >
          Kelola Paket

          <ArrowUpRight
            size={15}
            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MENU BUTTON
========================================================= */

function MenuButton({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs transition ${
        danger
          ? "text-rose-500 hover:bg-rose-50"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Icon size={14} />

      {label}
    </button>
  );
}

/* =========================================================
   MODULE MATRIX
========================================================= */

function ModulMatrix({
  paketList,
  fiturList,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}

      <div className="px-5 md:px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Layers size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Matriks Modul per Paket
            </h3>

            <p className="text-xs text-slate-400 mt-0.5">
              Perbandingan modul yang tersedia
              di setiap paket.
            </p>
          </div>
        </div>
      </div>

      {/* TABLE */}

      {fiturList.length ===
      0 ? (
        <div className="py-12 text-center">
          <Layers
            size={28}
            className="mx-auto text-slate-300"
          />

          <p className="text-sm text-slate-400 mt-3">
            Belum ada data modul.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="bg-slate-50/70 text-left">
                <th className="px-5 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-400 sticky left-0 bg-slate-50 z-10">
                  Modul
                </th>

                {paketList.map(
                  (paket) => (
                    <th
                      key={paket.id}
                      className="px-4 py-3 text-center text-[10px] uppercase tracking-wider font-bold text-slate-400"
                    >
                      {paket.nama}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {fiturList.map(
                (fitur) => {
                  const Icon =
                    fitur.icon ||
                    Layers;

                  return (
                    <tr
                      key={
                        fitur.id
                      }
                      className="border-t border-slate-100 hover:bg-blue-50/30 transition"
                    >
                      <td className="px-5 py-3.5 sticky left-0 bg-white">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Icon
                              size={
                                14
                              }
                              className="text-slate-500"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-xs text-slate-700">
                              {
                                fitur.nama
                              }
                            </p>

                            {fitur.deskripsi && (
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {
                                  fitur.deskripsi
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {paketList.map(
                        (paket) => {
                          const active =
                            paket.fiturIds.some(
                              (
                                id
                              ) =>
                                String(
                                  id
                                ) ===
                                String(
                                  fitur.id
                                )
                            );

                          return (
                            <td
                              key={
                                paket.id
                              }
                              className="px-4 py-3.5 text-center"
                            >
                              {active ? (
                                <div className="w-7 h-7 mx-auto rounded-full bg-emerald-50 flex items-center justify-center">
                                  <Check
                                    size={
                                      14
                                    }
                                    className="text-emerald-600"
                                  />
                                </div>
                              ) : (
                                <div className="w-7 h-7 mx-auto rounded-full bg-slate-50 flex items-center justify-center">
                                  <X
                                    size={
                                      13
                                    }
                                    className="text-slate-300"
                                  />
                                </div>
                              )}
                            </td>
                          );
                        }
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   DELETE MODAL
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* TOP */}

        <div className="bg-gradient-to-br from-rose-500 to-red-600 p-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
            <Trash2
              size={24}
              className="text-white"
            />
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-6">
          <h3 className="text-center text-lg font-bold text-slate-800">
            Hapus paket?
          </h3>

          <p className="text-center text-sm text-slate-500 mt-2 leading-relaxed">
            Kamu akan menghapus paket{" "}
            <span className="font-semibold text-slate-700">
              "{paket.nama}"
            </span>
            . Tindakan ini tidak dapat
            dibatalkan.
          </p>

          {paket.langganan >
            0 && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-100 text-xs text-amber-700">
              Paket ini masih memiliki{" "}
              <strong>
                {
                  paket.langganan
                }{" "}
                sekolah
              </strong>{" "}
              yang berlangganan.
            </div>
          )}

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={
                onCancel
              }
              disabled={
                deleting
              }
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
            >
              Batal
            </button>

            <button
              onClick={
                handleDelete
              }
              disabled={
                deleting
              }
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold shadow-sm transition disabled:opacity-60"
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
    </div>
  );
}