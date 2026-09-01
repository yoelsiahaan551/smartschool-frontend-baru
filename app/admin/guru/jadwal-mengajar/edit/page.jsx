"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import {
  ArrowLeft,
  Save,
  User,
  BookMarked,
  Hash,
  Clock,
  Users2,
} from "lucide-react";

/**
 * app/admin/guru/jadwal-mengajar/edit/page.jsx
 *
 * Form edit jadwal mengajar seorang guru. Guru yang diedit ditentukan lewat
 * query param `?id=`, dipanggil dari halaman list via:
 *   router.push(`/admin/guru/jadwal-mengajar/edit?id=${guru.id}`)
 *
 * Menampilkan info guru (read-only ringkas) dan daftar 6 hari
 * (Senin-Sabtu), tiap hari bisa di-toggle aktif/nonaktif; kalau aktif,
 * isi jam mulai, jam selesai, dan kelas.
 */

const HARI = [
  { key: "senin", label: "Senin" },
  { key: "selasa", label: "Selasa" },
  { key: "rabu", label: "Rabu" },
  { key: "kamis", label: "Kamis" },
  { key: "jumat", label: "Jumat" },
  { key: "sabtu", label: "Sabtu" },
];

// TODO: pindahkan ke lib/mock-jadwal.js dan import di halaman list, tambah,
// dan edit supaya data guru konsisten di semua tempat (saat ini didupe
// manual per halaman).
const MOCK_JADWAL = [
  {
    id: 1,
    kode: "G-0231",
    nama: "Siti Rahayu, S.Pd",
    mapel: "Matematika",
    jadwal: {
      senin: "07:00–08:30 • 7A",
      selasa: "09:00–10:30 • 8A",
      rabu: "-",
      kamis: "07:00–08:30 • 7B",
      jumat: "-",
      sabtu: "08:00–09:30 • 7A",
    },
  },
  {
    id: 2,
    kode: "G-0232",
    nama: "Andi Prasetyo, S.Pd",
    mapel: "Bahasa Indonesia",
    jadwal: {
      senin: "09:00–10:30 • 7B",
      selasa: "-",
      rabu: "07:00–08:30 • 7A",
      kamis: "-",
      jumat: "08:00–09:30 • 7C",
      sabtu: "-",
    },
  },
  {
    id: 3,
    kode: "G-0233",
    nama: "Dewi Anggraini, S.Si",
    mapel: "Ilmu Pengetahuan Alam",
    jadwal: {
      senin: "-",
      selasa: "07:00–08:30 • 8A",
      rabu: "09:00–10:30 • 8B",
      kamis: "-",
      jumat: "07:00–08:30 • 8A",
      sabtu: "-",
    },
  },
  {
    id: 4,
    kode: "G-0301",
    nama: "Budi Santoso, S.Pd",
    mapel: "Ilmu Pengetahuan Sosial",
    jadwal: {
      senin: "10:30–12:00 • 9A",
      selasa: "-",
      rabu: "-",
      kamis: "10:30–12:00 • 9B",
      jumat: "-",
      sabtu: "09:00–10:30 • 9C",
    },
  },
  {
    id: 5,
    kode: "G-0401",
    nama: "Maria Christina, S.Pd",
    mapel: "Bahasa Inggris",
    jadwal: {
      senin: "-",
      selasa: "08:00–09:30 • 7A",
      rabu: "10:30–12:00 • 8A",
      kamis: "-",
      jumat: "-",
      sabtu: "07:00–08:30 • 9A",
    },
  },
  {
    id: 6,
    kode: "G-0501",
    nama: "Rudi Hartono, S.Pd",
    mapel: "Pendidikan Jasmani",
    jadwal: {
      senin: "-",
      selasa: "-",
      rabu: "07:00–08:30 • 7A",
      kamis: "07:00–08:30 • 7B",
      jumat: "07:00–08:30 • 7C",
      sabtu: "-",
    },
  },
  {
    id: 7,
    kode: "G-0601",
    nama: "Nina Kartika, S.Sn",
    mapel: "Seni Budaya",
    jadwal: {
      senin: "-",
      selasa: "10:30–12:00 • 8B",
      rabu: "-",
      kamis: "-",
      jumat: "-",
      sabtu: "10:30–12:00 • 8C",
    },
  },
  {
    id: 8,
    kode: "G-0701",
    nama: "H. Ahmad Fauzi, S.Pd.I",
    mapel: "Pendidikan Agama Islam",
    jadwal: {
      senin: "08:00–09:30 • 7A",
      selasa: "-",
      rabu: "08:00–09:30 • 9A",
      kamis: "-",
      jumat: "09:00–10:30 • 9B",
      sabtu: "-",
    },
  },
];

// "07:00–08:30 • 7A"  ->  { aktif: true, mulai: "07:00", selesai: "08:30", kelas: "7A" }
// "-"                 ->  { aktif: false, mulai: "", selesai: "", kelas: "" }
function parseSlot(slot) {
  if (!slot || slot === "-") {
    return { aktif: false, mulai: "", selesai: "", kelas: "" };
  }
  const [jam, kelas] = slot.split("•").map((s) => s.trim());
  const [mulai, selesai] = jam.split("–").map((s) => s.trim());
  return { aktif: true, mulai: mulai || "", selesai: selesai || "", kelas: kelas || "" };
}

function buildInitialForm(guru) {
  const jadwalForm = {};
  HARI.forEach((h) => {
    jadwalForm[h.key] = parseSlot(guru?.jadwal?.[h.key]);
  });
  return {
    kode: guru?.kode ?? "",
    nama: guru?.nama ?? "",
    mapel: guru?.mapel ?? "",
    jadwal: jadwalForm,
  };
}

export default function EditJadwalMengajarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isCollapsed, setIsCollapsed] = useState(false);

  const guru = useMemo(
    () => MOCK_JADWAL.find((g) => String(g.id) === String(id)),
    [id]
  );

  const [form, setForm] = useState(() => buildInitialForm(guru));
  const [saving, setSaving] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const updateHari = (key, field, value) => {
    setForm((prev) => ({
      ...prev,
      jadwal: {
        ...prev.jadwal,
        [key]: { ...prev.jadwal[key], [field]: value },
      },
    }));
  };

  const toggleHariAktif = (key) => {
    setForm((prev) => ({
      ...prev,
      jadwal: {
        ...prev.jadwal,
        [key]: {
          ...prev.jadwal[key],
          aktif: !prev.jadwal[key].aktif,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Rakit ulang ke format "jam–jam • kelas" seperti data mock
    const jadwalPayload = {};
    HARI.forEach((h) => {
      const slot = form.jadwal[h.key];
      jadwalPayload[h.key] =
        slot.aktif && slot.mulai && slot.selesai && slot.kelas
          ? `${slot.mulai}–${slot.selesai} • ${slot.kelas}`
          : "-";
    });

    const payload = {
      id: guru?.id,
      kode: form.kode,
      nama: form.nama,
      mapel: form.mapel,
      jadwal: jadwalPayload,
    };

    // TODO: ganti dengan panggilan API sesungguhnya (PUT/PATCH)
    console.log("Simpan jadwal:", payload);

    setSaving(false);
    router.push("/admin/guru/jadwal-mengajar");
  };

  if (!guru) {
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
            user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
          />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-slate-500 mb-4">
                {id ? "Data guru tidak ditemukan." : "Tidak ada guru yang dipilih untuk diedit."}
              </p>
              <button
                onClick={() => router.push("/admin/guru/jadwal-mengajar")}
                className="px-4 py-2 rounded-lg bg-[#155DFC] text-white text-sm font-medium hover:bg-[#0d47c9]"
              >
                Kembali ke Jadwal Mengajar
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />
        <main className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/admin/guru/jadwal-mengajar")}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10">
                <Clock size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Edit Jadwal Mengajar</h1>
                <p className="text-sm text-slate-500">Perbarui jadwal mengajar guru per hari.</p>
              </div>
            </div>

            {/* INFO GURU */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <h2 className="text-sm font-semibold text-slate-700">Informasi Guru</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Hash size={13} /> Kode Guru
                  </label>
                  <input
                    type="text"
                    value={form.kode}
                    onChange={(e) => setForm((p) => ({ ...p, kode: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <User size={13} /> Nama Guru
                  </label>
                  <input
                    type="text"
                    value={form.nama}
                    onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <BookMarked size={13} /> Mata Pelajaran
                  </label>
                  <input
                    type="text"
                    value={form.mapel}
                    onChange={(e) => setForm((p) => ({ ...p, mapel: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* JADWAL PER HARI */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-3">
              <h2 className="text-sm font-semibold text-slate-700 mb-1">Jadwal per Hari</h2>

              {HARI.map((h) => {
                const slot = form.jadwal[h.key];
                return (
                  <div
                    key={h.key}
                    className={`rounded-lg border p-4 transition-colors ${
                      slot.aktif ? "border-[#155DFC]/30 bg-[#f5f8ff]" : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-slate-800">{h.label}</span>
                      <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                        <span className="text-xs text-slate-500">
                          {slot.aktif ? "Ada jadwal" : "Tidak mengajar"}
                        </span>
                        <span
                          onClick={() => toggleHariAktif(h.key)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            slot.aktif ? "bg-[#155DFC]" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                              slot.aktif ? "translate-x-4.5" : "translate-x-1"
                            }`}
                          />
                        </span>
                      </label>
                    </div>

                    {slot.aktif && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-medium text-slate-500 mb-1 block">Jam Mulai</label>
                          <input
                            type="time"
                            value={slot.mulai}
                            onChange={(e) => updateHari(h.key, "mulai", e.target.value)}
                            required={slot.aktif}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-500 mb-1 block">Jam Selesai</label>
                          <input
                            type="time"
                            value={slot.selesai}
                            onChange={(e) => updateHari(h.key, "selesai", e.target.value)}
                            required={slot.aktif}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                            <Users2 size={12} /> Kelas
                          </label>
                          <input
                            type="text"
                            value={slot.kelas}
                            onChange={(e) => updateHari(h.key, "kelas", e.target.value)}
                            placeholder="mis. 7A"
                            required={slot.aktif}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => router.push("/admin/guru/jadwal-mengajar")}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#155DFC] hover:bg-[#0d47c9] text-white rounded-xl transition-all shadow-sm font-medium text-sm disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}