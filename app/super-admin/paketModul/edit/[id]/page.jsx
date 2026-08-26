"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";

import {
  Package,
  Layers,
  X,
  Check,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

import { getFitur, getPaket, updatePaket } from "../../../../../services/paket.service";

// ============================================================
// KONFIGURASI ICON
// ============================================================
const ICON_MAP = {
  akademik: Layers,
  keuangan: Layers,
  kepegawaian: Layers,
  perpustakaan: Layers,
  presensi: Layers,
  ppdb: Layers,
  komunikasi: Layers,
  inventaris: Layers,
};

// ============================================================
// HELPER FUNCTIONS (sama seperti halaman utama & tambah)
// ============================================================

function getResponseData(response) {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.data?.data)) return response.data.data;
  if (Array.isArray(response.result)) return response.result;
  if (Array.isArray(response.results)) return response.results;
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
  return item.deskripsi ?? item.description ?? item.keterangan ?? "";
}

function normalizeFeature(item, index) {
  const id = getFeatureId(item) ?? `fitur-${index}`;
  const nama = getFeatureName(item);
  const iconKey = String(nama).toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/g, "");
  return {
    ...item,
    id,
    nama,
    deskripsi: getFeatureDescription(item),
    icon: ICON_MAP[id] || ICON_MAP[iconKey] || Layers,
  };
}

function getPaketId(paket) {
  return paket?.id ?? paket?.paketId ?? paket?.paket_id;
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
  return paket?.deskripsi ?? paket?.description ?? paket?.keterangan ?? "";
}

function getPaketStatus(paket) {
  const status = String(
    paket?.status ?? paket?.statusPaket ?? paket?.status_paket ?? "aktif"
  ).toLowerCase();
  return status === "aktif" ? "aktif" : "nonaktif";
}

function getPaketCycle(paket) {
  return paket?.siklus ?? paket?.periode ?? paket?.durasi ?? "bulan";
}

function getPaketFeatures(paket) {
  if (!paket) return [];
  if (Array.isArray(paket.modul)) return paket.modul;
  if (Array.isArray(paket.fitur)) return paket.fitur;
  if (Array.isArray(paket.fiturs)) return paket.fiturs;
  if (Array.isArray(paket.features)) return paket.features;
  if (Array.isArray(paket.fiturIds)) return paket.fiturIds;
  if (Array.isArray(paket.fitur_ids)) return paket.fitur_ids;
  return [];
}

function getFeatureIdsFromPaket(paket) {
  const features = getPaketFeatures(paket);
  return features
    .map((item) => {
      if (typeof item === "string" || typeof item === "number") return item;
      return getFeatureId(item);
    })
    .filter(Boolean);
}

// ============================================================
// KOMPONEN UTAMA
// ============================================================

export default function EditPaketPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [activeMenu, setActiveMenu] = useState("paket-modul");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [loading, setLoading] = useState(true);
  const [fiturList, setFiturList] = useState([]);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState(0);
  const [siklus, setSiklus] = useState("bulan");
  const [status, setStatus] = useState("aktif");
  const [fiturTerpilih, setFiturTerpilih] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  // ============================================================
  // LOAD DATA
  // ============================================================
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [paketResponse, fiturResponse] = await Promise.all([
          getPaket(),
          getFitur(),
        ]);

        const paketDataArray = getResponseData(paketResponse);
        const fiturDataArray = getResponseData(fiturResponse);

        // Cari paket berdasarkan ID
        const found = paketDataArray.find(
          (p) => String(getPaketId(p)) === String(id)
        );

        if (!found) {
          setError("Paket tidak ditemukan.");
          setLoading(false);
          return;
        }

        // Isi form dengan data paket
        setNama(getPaketName(found));
        setDeskripsi(getPaketDescription(found));
        setHarga(getPaketPrice(found));
        setSiklus(getPaketCycle(found));
        setStatus(getPaketStatus(found));
        setFiturTerpilih(getFeatureIdsFromPaket(found));

        // Normalisasi fitur
        setFiturList(
          fiturDataArray.map((item, index) => normalizeFeature(item, index))
        );
      } catch (err) {
        console.error("Gagal memuat data:", err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Gagal memuat data paket."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  // ============================================================
  // HANDLER
  // ============================================================

  function toggleFitur(fiturId) {
    setFiturTerpilih((prev) => {
      const exists = prev.some((item) => String(item) === String(fiturId));
      if (exists) {
        return prev.filter((item) => String(item) !== String(fiturId));
      }
      return [...prev, fiturId];
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nama.trim()) {
      setError("Nama paket wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        nama: nama.trim(),
        deskripsi: deskripsi.trim(),
        harga: Number(harga) || 0,
        siklus,
        status,
        fiturIds: fiturTerpilih,
      };

      await updatePaket(id, payload);
      router.push("/paket-modul");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Gagal memperbarui paket."
      );
    } finally {
      setSaving(false);
    }
  }

  function goBack() {
    router.push("/paket-modul");
  }

  // ============================================================
  // RENDER LOADING
  // ============================================================
  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar
          active={activeMenu}
          setActive={setActiveMenu}
          collapsed={!sidebarOpen}
          setCollapsed={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            notifications={notifications}
            user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
          />
          <main className="flex-1 flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={32} className="animate-spin text-blue-600" />
              <p className="text-sm text-slate-500">Memuat data paket...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER UTAMA
  // ============================================================
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={goBack}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-600 text-white shadow-sm">
                    <Package size={18} />
                  </span>
                  Edit Paket
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  Ubah informasi paket dan modul yang tersedia.
                </p>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 mb-6">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Terjadi kesalahan</p>
                  <p className="text-xs mt-1 text-rose-600">{error}</p>
                </div>
                <button onClick={() => setError("")} className="text-rose-400 hover:text-rose-600">
                  <X size={16} />
                </button>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm space-y-5">
              {/* NAMA */}
              <div>
                <label className="text-xs font-medium text-slate-500">Nama Paket *</label>
                <input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  placeholder="Contoh: Professional"
                  className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 transition"
                />
              </div>

              {/* DESKRIPSI */}
              <div>
                <label className="text-xs font-medium text-slate-500">Deskripsi</label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={3}
                  placeholder="Deskripsi singkat paket ini"
                  className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 resize-none transition"
                />
              </div>

              {/* HARGA + SIKLUS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500">Harga (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">Siklus</label>
                  <select
                    value={siklus}
                    onChange={(e) => setSiklus(e.target.value)}
                    className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 bg-white transition"
                  >
                    <option value="bulan">Per Bulan</option>
                    <option value="tahun">Per Tahun</option>
                    <option value="14 hari">14 Hari (Trial)</option>
                  </select>
                </div>
              </div>

              {/* STATUS */}
              <div>
                <label className="text-xs font-medium text-slate-500">Status</label>
                <div className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus("aktif")}
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
                    onClick={() => setStatus("nonaktif")}
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
                  <label className="text-xs font-medium text-slate-500">Modul / Fitur Termasuk</label>
                  <span className="text-[10px] text-slate-400">
                    {fiturTerpilih.length} dipilih
                  </span>
                </div>

                <div className="mt-1.5 grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {fiturList.map((fitur) => {
                    const checked = fiturTerpilih.some(
                      (id) => String(id) === String(fitur.id)
                    );
                    const Icon = fitur.icon || Layers;
                    return (
                      <button
                        type="button"
                        key={fitur.id}
                        onClick={() => toggleFitur(fitur.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-colors ${
                          checked
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border ${
                            checked ? "bg-blue-600 border-blue-600" : "border-slate-300"
                          }`}
                        >
                          {checked && <Check size={10} className="text-white" />}
                        </span>
                        <Icon size={13} className="text-slate-400 flex-shrink-0" />
                        <span className="text-xs text-slate-600 truncate">{fitur.nama}</span>
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
                  onClick={goBack}
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
                  {saving && <Loader2 size={15} className="animate-spin" />}
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}