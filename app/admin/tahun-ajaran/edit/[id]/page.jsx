"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  Save,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";

import {
  getTahunAjaran,
  updateTahunAjaran,
} from "../../../../../services/tahunAjaran.service";

export default function EditTahunAjaranPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [nama, setNama] = useState("");
  const [semester, setSemester] = useState("Ganjil");
  const [status, setStatus] = useState("tidak_aktif");

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTahunAjaran();
        const item = data.find((row) => row.id === id);

        if (!item) {
          throw new Error("Tahun ajaran tidak ditemukan.");
        }

        setNama(item.nama ?? "");
        setSemester(item.semester ?? "Ganjil");
        setStatus(item.status ?? "tidak_aktif");
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil data tahun ajaran."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      load();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!id) return;

    setError("");

    if (!nama.trim()) {
      setError("Nama tahun ajaran wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      await updateTahunAjaran(id, {
        nama: nama.trim(),
        semester,
        status,
      });

      router.replace("/admin/tahun-ajaran");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Gagal memperbarui tahun ajaran."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        <Sidebar
          active="tahunAjaran"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            toggleSidebar={toggleSidebar}
            notifications={[]}
            user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
          />
          <main className="flex min-h-0 flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#155DFC] border-t-transparent" />
              <p className="text-sm font-medium text-slate-500">Memuat data tahun ajaran...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <Sidebar
        active="tahunAjaran"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-50/80 to-white">
          <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
            <div className="space-y-8">
              {/* =================================================
                  BREADCRUMB & BACK
              ================================================== */}
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-[#155DFC]"
                >
                  <ArrowLeft size={16} />
                  <span className="font-medium">Kembali</span>
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-600 font-medium">Edit Tahun Ajaran</span>
              </div>

              {/* =================================================
                  ERROR
              ================================================== */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50/80 p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertCircle size={20} className="text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-red-800">Terjadi kesalahan</p>
                      <p className="mt-1 text-sm text-red-600">{error}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setError("")}
                      className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}

              {/* =================================================
                  FORM CARD
              ================================================== */}
              <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                {/* Header Card */}
                <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-6 py-6 sm:px-8 sm:py-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/5 text-white">
                      <CalendarDays size={28} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                        Data Master
                      </p>
                      <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Edit Tahun Ajaran
                      </h1>
                      <p className="mt-1 text-sm text-slate-300">
                        Perbarui informasi tahun ajaran yang terdaftar
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                  {/* Nama */}
                  <div>
                    <label htmlFor="nama" className="mb-2 block text-sm font-semibold text-slate-700">
                      Nama Tahun Ajaran <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nama"
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      disabled={saving}
                      placeholder="Contoh: 2026/2027"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10 disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                    <p className="mt-1.5 text-xs text-slate-400">
                      Nama tahun ajaran yang akan ditampilkan di sistem
                    </p>
                  </div>

                  {/* Semester */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Semester <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Ganjil", "Genap"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          disabled={saving}
                          onClick={() => setSemester(item)}
                          className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                            semester === item
                              ? "border-[#155DFC] bg-[#eaf1ff] text-[#155DFC] shadow-sm"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400">
                      Pilih semester ganjil atau genap
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="mb-2 block text-sm font-semibold text-slate-700">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      disabled={saving}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10 disabled:bg-slate-50 disabled:cursor-not-allowed"
                    >
                      <option value="tidak_aktif">Tidak Aktif</option>
                      <option value="aktif">Aktif</option>
                    </select>
                    <p className="mt-1.5 text-xs text-slate-400">
                      Status menentukan apakah tahun ajaran ini digunakan secara aktif
                    </p>
                  </div>

                  {/* Current Status Preview */}
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          status === "aktif"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {status === "aktif" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Status saat ini: <span className={status === "aktif" ? "text-emerald-600" : "text-slate-500"}>
                            {status === "aktif" ? "Aktif" : "Tidak Aktif"}
                          </span>
                        </p>
                        <p className="text-xs text-slate-400">
                          {status === "aktif"
                            ? "Tahun ajaran ini akan digunakan sebagai periode akademik aktif."
                            : "Tahun ajaran ini tidak akan digunakan sebagai periode aktif."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:border-slate-300"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#155DFC] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d47c9] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Simpan Perubahan
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <footer className="pt-6 text-center text-xs text-slate-400 border-t border-slate-200/50">
                © 2026 SmartSchool • Edit Tahun Ajaran
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}