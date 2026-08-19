"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Users,
  Trash2,
  RotateCcw,
} from "lucide-react";

// =========================================================
// KONFIGURASI
// =========================================================
// Kolom yang diharapkan ada di file Excel/CSV.
// Sesuaikan `key` dengan nama kolom pada tabel `pengguna` & `siswa_kelas`.
const EXPECTED_COLUMNS = [
  { key: "nama", label: "Nama", required: true },
  { key: "nisn", label: "NISN", required: true },
  { key: "jenis_kelamin", label: "Jenis Kelamin (L/P)", required: true },
  { key: "kelas", label: "Kelas", required: true },
  { key: "email", label: "Email", required: false },
  { key: "password", label: "Password", required: false },
];

const IMPORT_API_URL = "/api/admin/siswa/impor";

// =========================================================
// HELPERS
// =========================================================
const normalizeHeader = (h) =>
  String(h || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

const readFileAsRows = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsArrayBuffer(file);
  });

const mapRow = (rawRow) => {
  // Normalisasi key header agar cocok dengan EXPECTED_COLUMNS.key
  const normalized = {};
  Object.keys(rawRow).forEach((k) => {
    normalized[normalizeHeader(k)] = rawRow[k];
  });

  const row = {};
  EXPECTED_COLUMNS.forEach(({ key }) => {
    row[key] = String(normalized[key] ?? "").trim();
  });
  return row;
};

const validateRow = (row) => {
  const errors = [];

  EXPECTED_COLUMNS.forEach(({ key, label, required }) => {
    if (required && !row[key]) {
      errors.push(`${label} kosong`);
    }
  });

  if (row.jenis_kelamin && !["L", "P"].includes(row.jenis_kelamin.toUpperCase())) {
    errors.push("Jenis Kelamin harus L atau P");
  }

  if (row.email && !/^\S+@\S+\.\S+$/.test(row.email)) {
    errors.push("Format email tidak valid");
  }

  return errors;
};

const downloadTemplate = () => {
  const headers = EXPECTED_COLUMNS.map((c) => c.label);
  const sample = [
    {
      Nama: "Contoh Nama Siswa",
      NISN: "0012345678",
      "Jenis Kelamin (L/P)": "L",
      Kelas: "7A",
      Email: "siswa@sekolah.sch.id",
      Password: "siswa123",
    },
  ];
  const ws = XLSX.utils.json_to_sheet(sample, { header: headers });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template Siswa");
  XLSX.writeFile(wb, "template_impor_siswa.xlsx");
};

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function ImporSiswaPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [step, setStep] = useState("upload"); // upload | preview | result
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState([]); // { data, errors }
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null); // { success: [], failed: [] }
  const [dragActive, setDragActive] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const validCount = rows.filter((r) => r.errors.length === 0).length;
  const invalidCount = rows.length - validCount;

  const resetAll = () => {
    setStep("upload");
    setFileName("");
    setRows([]);
    setImportResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFile = async (file) => {
    if (!file) return;
    const okExt = /\.(xlsx|xls|csv)$/i.test(file.name);
    if (!okExt) {
      alert("Format file harus .xlsx, .xls, atau .csv");
      return;
    }

    setIsParsing(true);
    setFileName(file.name);
    try {
      const rawRows = await readFileAsRows(file);
      const mapped = rawRows.map((r) => {
        const data = mapRow(r);
        return { data, errors: validateRow(data) };
      });
      setRows(mapped);
      setStep("preview");
    } catch (err) {
      alert("Gagal membaca file: " + err.message);
    } finally {
      setIsParsing(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const removeRow = (idx) => {
    setRows((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImport = async () => {
    const dataToSend = rows.filter((r) => r.errors.length === 0).map((r) => r.data);
    if (dataToSend.length === 0) return;

    setIsImporting(true);
    try {
      const res = await fetch(IMPORT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siswa: dataToSend }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.message || "Gagal mengimpor data siswa");
      }

      setImportResult({
        success: json.success || dataToSend,
        failed: json.failed || [],
      });
      setStep("result");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar active="siswa" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-5">
              {/* HEADER */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all"
                >
                  <ArrowLeft size={16} className="text-slate-500" />
                </button>
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200 flex-shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-800">Impor Siswa</h1>
                  <p className="text-sm text-slate-500">
                    Upload Excel/CSV untuk menambahkan siswa langsung ke pengguna & kelas
                  </p>
                </div>
              </div>

              {/* STEP: UPLOAD */}
              {step === "upload" && (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-10">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-all py-14 px-6 text-center ${
                      dragActive ? "border-teal-400 bg-teal-50/60" : "border-slate-200 bg-slate-50/50"
                    }`}
                  >
                    <div className="p-3.5 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-md">
                      {isParsing ? <Loader2 size={22} className="animate-spin" /> : <Upload size={22} />}
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">
                        {isParsing ? "Membaca file..." : "Seret file ke sini atau klik untuk memilih"}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Format didukung: .xlsx, .xls, .csv</p>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isParsing}
                      className="mt-2 px-4 py-2 rounded-xl bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all disabled:opacity-50"
                    >
                      Pilih File
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                      Kolom wajib: {EXPECTED_COLUMNS.filter((c) => c.required).map((c) => c.label).join(", ")}
                    </p>
                    <button
                      onClick={downloadTemplate}
                      className="flex items-center gap-1.5 text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      <Download size={14} />
                      Unduh Template
                    </button>
                  </div>
                </div>
              )}

              {/* STEP: PREVIEW */}
              {step === "preview" && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FileSpreadsheet size={16} className="text-teal-500" />
                      <span className="font-medium">{fileName}</span>
                      <span className="text-slate-400">• {rows.length} baris</span>
                    </div>
                    <button
                      onClick={resetAll}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700"
                    >
                      <RotateCcw size={14} />
                      Ganti File
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Baris</p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">{rows.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Valid</p>
                      </div>
                      <p className="text-2xl font-bold text-emerald-600 mt-1">{validCount}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <XCircle size={14} className="text-rose-500" />
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Tidak Valid</p>
                      </div>
                      <p className="text-2xl font-bold text-rose-600 mt-1">{invalidCount}</p>
                    </div>
                  </div>

                  {invalidCount > 0 && (
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800">
                        {invalidCount} baris memiliki kesalahan dan akan dilewati saat impor. Perbaiki file sumber
                        lalu upload ulang, atau lanjutkan mengimpor baris yang valid saja.
                      </p>
                    </div>
                  )}

                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-slate-50/95 backdrop-blur z-10">
                          <tr className="text-slate-500 text-[11px] uppercase tracking-wide">
                            <th className="text-left font-medium px-4 py-2.5">#</th>
                            {EXPECTED_COLUMNS.map((c) => (
                              <th key={c.key} className="text-left font-medium px-4 py-2.5">
                                {c.label}
                              </th>
                            ))}
                            <th className="text-left font-medium px-4 py-2.5">Status</th>
                            <th className="px-4 py-2.5" />
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r, idx) => (
                            <tr
                              key={idx}
                              className={`border-t border-slate-100 ${
                                r.errors.length > 0 ? "bg-rose-50/40" : "hover:bg-slate-50/60"
                              }`}
                            >
                              <td className="px-4 py-2.5 text-slate-400">{idx + 1}</td>
                              {EXPECTED_COLUMNS.map((c) => (
                                <td key={c.key} className="px-4 py-2.5 text-slate-700 whitespace-nowrap">
                                  {r.data[c.key] || <span className="text-slate-300">—</span>}
                                </td>
                              ))}
                              <td className="px-4 py-2.5">
                                {r.errors.length === 0 ? (
                                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-emerald-50 text-emerald-700">
                                    <CheckCircle2 size={12} /> Valid
                                  </span>
                                ) : (
                                  <span
                                    title={r.errors.join(", ")}
                                    className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-rose-50 text-rose-700"
                                  >
                                    <XCircle size={12} /> {r.errors[0]}
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-2.5">
                                <button
                                  onClick={() => removeRow(idx)}
                                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition-colors"
                                  title="Hapus baris ini"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={resetAll}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleImport}
                      disabled={validCount === 0 || isImporting}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white text-sm font-medium shadow-md shadow-teal-200 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isImporting ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                      {isImporting ? "Mengimpor..." : `Impor ${validCount} Siswa`}
                    </button>
                  </div>
                </>
              )}

              {/* STEP: RESULT */}
              {step === "result" && importResult && (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-10 text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 size={28} />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">Impor Selesai</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {importResult.success.length} siswa berhasil ditambahkan ke pengguna & kelas
                    {importResult.failed.length > 0 && `, ${importResult.failed.length} gagal`}.
                  </p>

                  {importResult.failed.length > 0 && (
                    <div className="mt-5 text-left bg-rose-50 border border-rose-200 rounded-xl p-4 max-h-56 overflow-y-auto">
                      <p className="text-xs font-medium text-rose-700 mb-2">Baris yang gagal diimpor:</p>
                      <ul className="text-xs text-rose-600 space-y-1 list-disc list-inside">
                        {importResult.failed.map((f, i) => (
                          <li key={i}>{f.nama || `Baris ${i + 1}`} — {f.reason || "Gagal disimpan"}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                      onClick={resetAll}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
                    >
                      Impor File Lain
                    </button>
                    <button
                      onClick={() => router.push("/admin/siswa")}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all"
                    >
                      Lihat Daftar Siswa
                    </button>
                  </div>
                </div>
              )}

              <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
                © 2026 SmartSchool • Impor Siswa
              </footer>
            </div>
        </main>
      </div>
    </div>
  );
}