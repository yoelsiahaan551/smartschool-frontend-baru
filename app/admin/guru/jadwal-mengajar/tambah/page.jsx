"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import {
  ArrowLeft,
  CalendarClock,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  User,
  BookMarked,
  Info,
} from "lucide-react";

/**
 * app/admin/guru/jadwal-mengajar/tambah/page.jsx
 *
 * Halaman Tambah Jadwal Mengajar — pilih guru & mapel, lalu isi jam
 * mengajar & kelas untuk tiap hari (Senin-Sabtu). Hari yang tidak
 * mengajar cukup dikosongkan.
 *
 * CATATAN DATA:
 * MOCK_GURU & MOCK_MAPEL masih dummy, sama seperti MOCK_JADWAL di
 * halaman daftar. Ganti dengan hasil fetch API guru & mapel begitu
 * tersedia. Submit saat ini hanya console.log + redirect, tinggal
 * sambungkan ke endpoint createJadwalMengajar kalau sudah ada.
 */

const HARI = [
  { key: "senin", label: "Senin" },
  { key: "selasa", label: "Selasa" },
  { key: "rabu", label: "Rabu" },
  { key: "kamis", label: "Kamis" },
  { key: "jumat", label: "Jumat" },
  { key: "sabtu", label: "Sabtu" },
];

const MOCK_GURU = [
  { kode: "G-0231", nama: "Siti Rahayu, S.Pd" },
  { kode: "G-0232", nama: "Andi Prasetyo, S.Pd" },
  { kode: "G-0233", nama: "Dewi Anggraini, S.Si" },
  { kode: "G-0301", nama: "Budi Santoso, S.Pd" },
  { kode: "G-0401", nama: "Maria Christina, S.Pd" },
  { kode: "G-0501", nama: "Rudi Hartono, S.Pd" },
  { kode: "G-0601", nama: "Nina Kartika, S.Sn" },
  { kode: "G-0701", nama: "H. Ahmad Fauzi, S.Pd.I" },
];

const MOCK_MAPEL = [
  "Matematika",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Ilmu Pengetahuan Alam",
  "Ilmu Pengetahuan Sosial",
  "Pendidikan Jasmani",
  "Seni Budaya",
  "Pendidikan Agama Islam",
];

const emptyJadwal = () =>
  HARI.reduce((acc, h) => {
    acc[h.key] = { jamMulai: "", jamSelesai: "", kelas: "" };
    return acc;
  }, {});

export default function TambahJadwalMengajarPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const [guruKode, setGuruKode] = useState("");
  const [mapel, setMapel] = useState("");
  const [jadwal, setJadwal] = useState(emptyJadwal());

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const guruTerpilih = useMemo(
    () => MOCK_GURU.find((g) => g.kode === guruKode) || null,
    [guruKode]
  );

  const handleSlotChange = (hariKey, field) => (e) => {
    const value = e.target.value;
    setJadwal((prev) => ({
      ...prev,
      [hariKey]: { ...prev[hariKey], [field]: value },
    }));
  };

  const jumlahHariDiisi = HARI.filter((h) => {
    const slot = jadwal[h.key];
    return slot.jamMulai && slot.jamSelesai && slot.kelas.trim();
  }).length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guruKode) {
      setError("Guru wajib dipilih.");
      return;
    }
    if (!mapel) {
      setError("Mata pelajaran wajib dipilih.");
      return;
    }
    if (jumlahHariDiisi === 0) {
      setError("Isi jam mengajar untuk minimal satu hari.");
      return;
    }

    const payload = {
      guruKode,
      mapel,
      jadwal: HARI.reduce((acc, h) => {
        const slot = jadwal[h.key];
        acc[h.key] =
          slot.jamMulai && slot.jamSelesai && slot.kelas.trim()
            ? `${slot.jamMulai}–${slot.jamSelesai} • ${slot.kelas.trim()}`
            : "-";
        return acc;
      }, {}),
    };

    try {
      setSaving(true);
      setError("");

      // TODO: ganti dengan panggilan API sesungguhnya, contoh:
      // const response = await createJadwalMengajar(payload);
      console.log("Simpan jadwal mengajar:", payload);
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuccess(true);

      setTimeout(() => {
        router.push("/admin/guru/jadwal-mengajar");
      }, 900);
    } catch (err) {
      console.error("Error create jadwal mengajar:", err);
      setError(err?.message || "Gagal menambahkan jadwal mengajar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="guruJadwalMengajar"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/admin/guru/jadwal-mengajar")}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0"
                title="Kembali ke daftar jadwal"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10 shrink-0">
                <CalendarClock size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Tambah Jadwal Mengajar
                </h1>
                <p className="text-sm text-slate-500">
                  Pilih guru & mapel, lalu atur jam mengajar tiap hari.
                </p>
              </div>
            </div>

            {/* SUCCESS */}
            {success && (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-200 bg-emerald-50">
                <CheckCircle2
                  size={20}
                  className="text-emerald-600 shrink-0"
                />
                <p className="text-sm font-medium text-emerald-800">
                  Jadwal mengajar berhasil ditambahkan. Mengalihkan...
                </p>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50">
                <AlertCircle
                  size={20}
                  className="text-rose-600 mt-0.5 shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-rose-800">
                    Gagal menambahkan jadwal mengajar
                  </p>
                  <p className="text-sm text-rose-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* KONTEN: FORM + PANEL INFO */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="text-sm font-semibold text-slate-700">
                    Guru & Mata Pelajaran
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pilih guru dan mapel yang akan dijadwalkan.
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* GURU */}
                    <div>
                      <label
                        htmlFor="guru"
                        className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5"
                      >
                        <User size={14} className="text-slate-400" />
                        Guru
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="guru"
                        value={guruKode}
                        onChange={(e) => setGuruKode(e.target.value)}
                        disabled={saving}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                      >
                        <option value="">Pilih guru...</option>
                        {MOCK_GURU.map((g) => (
                          <option key={g.kode} value={g.kode}>
                            {g.nama} ({g.kode})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* MAPEL */}
                    <div>
                      <label
                        htmlFor="mapel"
                        className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5"
                      >
                        <BookMarked size={14} className="text-slate-400" />
                        Mata Pelajaran
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="mapel"
                        value={mapel}
                        onChange={(e) => setMapel(e.target.value)}
                        disabled={saving}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                      >
                        <option value="">Pilih mapel...</option>
                        {MOCK_MAPEL.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-b border-slate-100 bg-slate-50/60">
                  <h2 className="text-sm font-semibold text-slate-700">
                    Jam Mengajar per Hari
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kosongkan hari yang tidak ada jadwal mengajar.
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {HARI.map((h) => (
                    <div
                      key={h.key}
                      className="grid grid-cols-1 sm:grid-cols-[90px_1fr_1fr_1fr] gap-3 items-center pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <p className="text-sm font-semibold text-slate-700">
                        {h.label}
                      </p>
                      <input
                        type="time"
                        value={jadwal[h.key].jamMulai}
                        onChange={handleSlotChange(h.key, "jamMulai")}
                        disabled={saving}
                        className="px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <input
                        type="time"
                        value={jadwal[h.key].jamSelesai}
                        onChange={handleSlotChange(h.key, "jamSelesai")}
                        disabled={saving}
                        className="px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <input
                        type="text"
                        value={jadwal[h.key].kelas}
                        onChange={handleSlotChange(h.key, "kelas")}
                        placeholder="Kelas, contoh: 7A"
                        disabled={saving}
                        className="px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                      />
                    </div>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/60">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#155DFC] hover:bg-[#0d47c9] text-white rounded-xl transition-all shadow-sm font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Simpan Jadwal
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/admin/guru/jadwal-mengajar")}
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm disabled:opacity-60"
                  >
                    Batal
                  </button>
                </div>
              </form>

              {/* PANEL KANAN: PREVIEW + TIPS */}
              <div className="space-y-6">
                {/* PREVIEW CARD */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                    <h2 className="text-sm font-semibold text-slate-700">
                      Pratinjau Jadwal
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {jumlahHariDiisi} dari {HARI.length} hari terisi.
                    </p>
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <span className="font-mono text-xs font-medium text-[#155DFC] bg-[#eaf1ff] px-2 py-1 rounded-md">
                        {guruKode || "KODE"}
                      </span>
                    </div>
                    <p className="text-base font-semibold text-slate-900">
                      {guruTerpilih?.nama || "Nama guru"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {mapel || "Mata pelajaran"}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      {HARI.map((h) => {
                        const slot = jadwal[h.key];
                        const terisi =
                          slot.jamMulai && slot.jamSelesai && slot.kelas.trim();
                        return (
                          <div
                            key={h.key}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="font-medium text-slate-500 w-14 shrink-0">
                              {h.label}
                            </span>
                            {terisi ? (
                              <span className="font-medium text-slate-700">
                                {slot.jamMulai}–{slot.jamSelesai} •{" "}
                                {slot.kelas.trim()}
                              </span>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* TIPS / INFO */}
                <div className="bg-[#eaf1ff] rounded-xl border border-[#155DFC]/15 p-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Info size={16} className="text-[#155DFC]" />
                    <h2 className="text-sm font-semibold text-[#0d47c9]">
                      Tips Pengisian
                    </h2>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                    <li>Pastikan tidak ada jam bentrok dengan jadwal guru lain di kelas yang sama.</li>
                    <li>Isi kelas dengan format singkat, contoh "7A" atau "9C".</li>
                    <li>Hari yang tidak diisi otomatis dianggap tidak ada jadwal.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}