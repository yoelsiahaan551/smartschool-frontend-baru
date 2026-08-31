"use client";

import { useState, useMemo, useRef } from "react";
import * as XLSX from "xlsx";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  CalendarDays,
  Clock,
  BookOpen,
  Users,
  Download,
  Upload,
  School,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

/**
 * app/admin/jadwal/page.jsx
 *
 * Halaman Jadwal Mata Pelajaran — jadwal mingguan lengkap per kelas
 * (Senin s/d Sabtu), tiap kelas punya susunan mata pelajaran yang
 * berbeda-beda. Dilengkapi tombol Export ke Excel (.xlsx) dan Import
 * dari Excel untuk memperbarui jadwal secara massal.
 *
 * DEPENDENSI: paket "xlsx" (SheetJS). Jalankan `npm install xlsx` di
 * root project sebelum memakai halaman ini.
 *
 * CATATAN DATA:
 * Jadwal dibuat otomatis dari MAPEL_POOL memakai fungsi buildJadwalKelas()
 * supaya tiap kelas punya kombinasi berbeda tapi tetap konsisten dan mudah
 * diubah. Kalau nanti nyambung ke API, tinggal ganti hasil buildJadwalKelas
 * dengan data jadwal sungguhan dari server yang bentuknya sama.
 */

const KELAS_LIST = ["7A", "7B", "7C", "8A", "8B", "9A"];

const HARI_LIST = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

// Baris waktu acuan (8 slot). Sabtu hanya memakai 6 slot pertama.
const PERIOD_TIMES = [
  "07.00 - 07.40",
  "07.40 - 08.20",
  "08.20 - 09.00",
  "09.00 - 09.15",
  "09.15 - 09.55",
  "09.55 - 10.35",
  "10.35 - 11.15",
  "11.15 - 11.55",
];

const MAPEL_POOL = [
  { mapel: "Matematika", guru: "Andi Prasetyo, S.Pd" },
  { mapel: "Bahasa Indonesia", guru: "Siti Rahayu, S.Pd" },
  { mapel: "Bahasa Inggris", guru: "Budi Santoso, S.Pd" },
  { mapel: "IPA", guru: "Dewi Anggraini, S.Si" },
  { mapel: "IPS", guru: "Fajar Ramadhan, S.Pd" },
  { mapel: "PPKn", guru: "Yeni Kusnadi, S.Pd" },
  { mapel: "Pendidikan Agama Islam", guru: "Ahmad Fauzi, S.Pd.I" },
  { mapel: "Seni Budaya", guru: "Lina Marlina, S.Pd" },
  { mapel: "PJOK", guru: "Deni Iskandar, S.Pd" },
  { mapel: "Prakarya", guru: "Ira Susanti, S.Pd" },
  { mapel: "Bahasa Sunda", guru: "Wati Rohaeti, S.Pd" },
  { mapel: "IPA", guru: "Rina Marlina, S.Pd" },
  { mapel: "Bimbingan Konseling", guru: "Sri Wulandari, S.Pd" },
];

// Bangun jadwal satu kelas. `offset` membuat kombinasi tiap kelas beda-beda,
// termasuk mata pelajaran di hari Senin.
function buildJadwalKelas(offset) {
  const jadwal = {};
  HARI_LIST.forEach((hari, hariIdx) => {
    const jumlahSlot = hari === "Sabtu" ? 6 : 8;
    const slots = [];
    for (let slotIdx = 0; slotIdx < jumlahSlot; slotIdx++) {
      const jam = PERIOD_TIMES[slotIdx];

      if (slotIdx === 3) {
        slots.push({ jam, mapel: "Istirahat", guru: "-", tipe: "istirahat" });
        continue;
      }
      if (hari === "Senin" && slotIdx === 0) {
        slots.push({ jam, mapel: "Upacara Bendera", guru: "Seluruh Guru", tipe: "upacara" });
        continue;
      }
      if (hari === "Sabtu" && slotIdx === jumlahSlot - 1) {
        slots.push({ jam, mapel: "Ekstrakurikuler", guru: "Pembina Ekskul", tipe: "ekskul" });
        continue;
      }
      const poolIndex = (offset + hariIdx * 3 + slotIdx * 5) % MAPEL_POOL.length;
      const item = MAPEL_POOL[poolIndex];
      slots.push({ jam, mapel: item.mapel, guru: item.guru, tipe: "reguler" });
    }
    jadwal[hari] = slots;
  });
  return jadwal;
}

function buildInitialJadwal() {
  const data = {};
  KELAS_LIST.forEach((kelas, idx) => {
    data[kelas] = buildJadwalKelas(idx * 4);
  });
  return data;
}

function cellStyle(tipe) {
  switch (tipe) {
    case "istirahat":
      return "bg-slate-50 text-slate-400";
    case "upacara":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "ekskul":
      return "bg-violet-50 text-violet-700 border border-violet-200";
    default:
      return "bg-[#f5f8ff] text-slate-800 border border-slate-100";
  }
}

export default function JadwalPelajaranPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [jadwalData, setJadwalData] = useState(buildInitialJadwal);
  const [kelasAktif, setKelasAktif] = useState(KELAS_LIST[0]);
  const [importMsg, setImportMsg] = useState(null);
  const fileInputRef = useRef(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const jadwalKelasAktif = jadwalData[kelasAktif];

  const totalMapelUnik = useMemo(() => {
    const set = new Set();
    Object.values(jadwalData).forEach((jadwal) => {
      Object.values(jadwal).forEach((slots) => {
        slots.forEach((s) => {
          if (s.tipe === "reguler") set.add(s.mapel);
        });
      });
    });
    return set.size;
  }, [jadwalData]);

  const totalJamPerMinggu = useMemo(() => {
    let total = 0;
    HARI_LIST.forEach((hari) => {
      jadwalKelasAktif[hari].forEach((s) => {
        if (s.tipe !== "istirahat") total += 1;
      });
    });
    return total;
  }, [jadwalKelasAktif]);

  const guruPengampu = useMemo(() => {
    const set = new Set();
    HARI_LIST.forEach((hari) => {
      jadwalKelasAktif[hari].forEach((s) => {
        if (s.tipe === "reguler") set.add(s.guru);
      });
    });
    return set.size;
  }, [jadwalKelasAktif]);

  // ---- EXPORT KE EXCEL (semua kelas, satu sheet per kelas) ----
  function handleExportExcel() {
    const workbook = XLSX.utils.book_new();

    KELAS_LIST.forEach((kelas) => {
      const jadwal = jadwalData[kelas];
      const header = ["Jam", ...HARI_LIST];
      const rows = PERIOD_TIMES.map((jam, rowIdx) => {
        const row = [jam];
        HARI_LIST.forEach((hari) => {
          const slot = jadwal[hari][rowIdx];
          if (!slot) {
            row.push("-");
          } else if (slot.tipe === "istirahat") {
            row.push("Istirahat");
          } else {
            row.push(`${slot.mapel} — ${slot.guru}`);
          }
        });
        return row;
      });
      const sheetData = [header, ...rows];
      const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
      worksheet["!cols"] = [{ wch: 14 }, ...HARI_LIST.map(() => ({ wch: 30 }))];
      XLSX.utils.book_append_sheet(workbook, worksheet, kelas);
    });

    const petunjuk = XLSX.utils.aoa_to_sheet([
      ["Petunjuk Import Jadwal"],
      [""],
      ["1. Satu sheet mewakili satu kelas. Nama sheet harus sama persis dengan nama kelas, contoh: 7A"],
      ["2. Kolom A berisi jam pelajaran, jangan diubah urutannya."],
      ["3. Isi tiap sel dengan format: Nama Mata Pelajaran — Nama Guru"],
      ["4. Untuk jam istirahat, tulis: Istirahat"],
      ["5. Setelah selesai edit, simpan file lalu klik tombol Import di halaman Jadwal Pelajaran."],
    ]);
    petunjuk["!cols"] = [{ wch: 90 }];
    XLSX.utils.book_append_sheet(workbook, petunjuk, "Petunjuk");

    XLSX.writeFile(workbook, "jadwal-pelajaran-smartschool.xlsx");
  }

  // ---- IMPORT DARI EXCEL ----
  function handleImportExcel(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const workbook = XLSX.read(evt.target.result, { type: "array" });
        const updated = { ...jadwalData };
        let kelasDiimpor = 0;

        KELAS_LIST.forEach((kelas) => {
          const sheet = workbook.Sheets[kelas];
          if (!sheet) return;

          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const dataRows = rows.slice(1); // lewati header
          const jadwalBaru = {};

          HARI_LIST.forEach((hari, hariIdx) => {
            const jumlahSlot = hari === "Sabtu" ? 6 : 8;
            const slots = [];
            for (let slotIdx = 0; slotIdx < jumlahSlot; slotIdx++) {
              const row = dataRows[slotIdx];
              const cell = row ? row[hariIdx + 1] : null;
              const jam = PERIOD_TIMES[slotIdx];

              if (!cell || cell === "-") {
                slots.push({ jam, mapel: "-", guru: "-", tipe: "reguler" });
              } else if (String(cell).toLowerCase().includes("istirahat")) {
                slots.push({ jam, mapel: "Istirahat", guru: "-", tipe: "istirahat" });
              } else if (String(cell).toLowerCase().includes("upacara")) {
                slots.push({ jam, mapel: "Upacara Bendera", guru: "Seluruh Guru", tipe: "upacara" });
              } else if (String(cell).toLowerCase().includes("ekstrakurikuler")) {
                slots.push({ jam, mapel: "Ekstrakurikuler", guru: "Pembina Ekskul", tipe: "ekskul" });
              } else {
                const [mapel, guru] = String(cell).split("—").map((s) => s.trim());
                slots.push({ jam, mapel: mapel || String(cell), guru: guru || "-", tipe: "reguler" });
              }
            }
            jadwalBaru[hari] = slots;
          });

          updated[kelas] = jadwalBaru;
          kelasDiimpor += 1;
        });

        setJadwalData(updated);
        setImportMsg(
          kelasDiimpor > 0
            ? { type: "sukses", text: `Berhasil mengimpor jadwal untuk ${kelasDiimpor} kelas.` }
            : { type: "gagal", text: "Tidak ada sheet yang cocok dengan nama kelas (7A, 7B, dst)." }
        );
      } catch (err) {
        setImportMsg({ type: "gagal", text: "Gagal membaca file. Pastikan formatnya sesuai template." });
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="jadwalPelajaran"
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
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Jadwal Mata Pelajaran</h1>
                  <p className="text-sm text-slate-500">
                    Jadwal mingguan setiap kelas, Senin sampai Sabtu.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportExcel}
                  accept=".xlsx,.xls"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  <Upload size={15} />
                  Import Excel
                </button>
                <button
                  onClick={handleExportExcel}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white text-sm font-semibold hover:brightness-110 transition-all"
                >
                  <Download size={15} />
                  Export Excel
                </button>
              </div>
            </div>

            {importMsg && (
              <div
                className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                  importMsg.type === "sukses"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {importMsg.type === "sukses" ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <AlertCircle size={15} />
                  )}
                  {importMsg.text}
                </div>
                <button onClick={() => setImportMsg(null)}>
                  <X size={14} />
                </button>
              </div>
            )}

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <School size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Total Kelas</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{KELAS_LIST.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Mapel Diajarkan</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalMapelUnik}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Jam/Minggu ({kelasAktif})</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalJamPerMinggu}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Guru Pengampu ({kelasAktif})</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{guruPengampu}</p>
              </div>
            </div>

            {/* TAB PILIH KELAS */}
            <div className="flex flex-wrap items-center gap-2">
              {KELAS_LIST.map((kelas) => (
                <button
                  key={kelas}
                  onClick={() => setKelasAktif(kelas)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    kelasAktif === kelas
                      ? "bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-[#eaf1ff] hover:text-[#155DFC]"
                  }`}
                >
                  Kelas {kelas}
                </button>
              ))}
            </div>

            {/* GRID JADWAL */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">
                      <th className="text-left font-semibold px-3 py-3 whitespace-nowrap w-28">Jam</th>
                      {HARI_LIST.map((hari) => (
                        <th key={hari} className="text-left font-semibold px-3 py-3 min-w-[150px]">
                          {hari}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PERIOD_TIMES.map((jam, rowIdx) => (
                      <tr key={jam} className="border-b border-slate-100 last:border-0">
                        <td className="px-3 py-2.5 text-xs font-mono text-slate-500 whitespace-nowrap align-top">
                          {jam}
                        </td>
                        {HARI_LIST.map((hari) => {
                          const slot = jadwalKelasAktif[hari][rowIdx];
                          if (!slot) {
                            return (
                              <td key={hari} className="px-3 py-2.5 align-top">
                                <span className="text-xs text-slate-300">-</span>
                              </td>
                            );
                          }
                          return (
                            <td key={hari} className="px-2 py-1.5 align-top">
                              <div className={`rounded-lg px-2.5 py-1.5 ${cellStyle(slot.tipe)}`}>
                                <p className="text-xs font-semibold leading-tight">{slot.mapel}</p>
                                {slot.tipe === "reguler" && (
                                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{slot.guru}</p>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Butuh paket <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">xlsx</code> (SheetJS).
              Jalankan <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">npm install xlsx</code> di
              root project sebelum memakai fitur Import/Export.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}