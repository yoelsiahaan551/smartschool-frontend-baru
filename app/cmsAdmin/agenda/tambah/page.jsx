"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Save,
  X,
  ArrowLeft,
  Calendar,
  MapPin,
  FileText,
  Clock,
  Tag,
} from "lucide-react";

export default function TambahAgendaPage() {
  const router = useRouter();

  const [active, setActive] = useState("agenda");
  const [collapsed, setCollapsed] = useState(false);

  const [form, setForm] = useState({
    judul: "",
    kategori: "",
    lokasi: "",
    deskripsi: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    status: "draft",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.judul || !form.tanggalMulai) {
      alert("Harap isi Judul dan Tanggal Mulai agenda!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("✅ Agenda berhasil disimpan! (Mockup)");
      router.push("/cmsAdmin/agenda");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <div className="flex-shrink-0">
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="flex-1 min-w-0 w-0 overflow-y-auto overflow-x-hidden bg-slate-50 transition-all duration-300">
        <Header title="Tambah Agenda" user={{ name: "Admin" }} />

        {/* =====================================================
            CONTENT CONTAINER
            Tidak menggunakan max-w agar card melebar
        ====================================================== */}
        <div className="w-full min-w-0 px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-6">
          
          {/* =====================================================
              BREADCRUMB
          ====================================================== */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            
            <nav className="min-w-0 max-w-full overflow-x-auto">
              <ol className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-slate-500 tracking-wide">
                
                <li>
                  <a
                    href="/cmsAdmin"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Dashboard
                  </a>
                </li>

                <li className="text-slate-300">
                  /
                </li>

                <li>
                  <a
                    href="/cmsAdmin/agenda"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Agenda
                  </a>
                </li>

                <li className="text-slate-300">
                  /
                </li>

                <li className="text-indigo-600 font-semibold">
                  Tambah Baru
                </li>

              </ol>
            </nav>

            <button
              type="button"
              onClick={() => router.back()}
              className="flex w-fit shrink-0 items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>

          </div>

          {/* =====================================================
              FORM CARD
          ====================================================== */}
          <form
            onSubmit={handleSubmit}
            className="
              w-full
              min-w-0
              bg-white
              rounded-2xl
              border border-slate-200/70
              shadow-sm
              overflow-hidden
              p-4
              sm:p-5
              md:p-6
              lg:p-8
              space-y-6
            "
          >

            {/* =================================================
                FORM HEADER
            ================================================== */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              
              <div className="flex-shrink-0 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate">
                  Detail Agenda / Event
                </h3>

                <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
                  Lengkapi informasi agenda sekolah.
                </p>
              </div>

            </div>

            {/* =================================================
                FORM GRID
            ================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

              {/* =================================================
                  JUDUL
              ================================================== */}
              <div className="md:col-span-2 min-w-0">
                <label
                  htmlFor="judul"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  Judul Agenda{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                  <input
                    id="judul"
                    type="text"
                    required
                    value={form.judul}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        judul: e.target.value,
                      })
                    }
                    placeholder="Contoh: Rapat Evaluasi Semester"
                    className="
                      w-full
                      min-w-0
                      pl-10
                      pr-4
                      py-3
                      rounded-xl
                      border border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      placeholder:text-slate-400
                      outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  KATEGORI
              ================================================== */}
              <div className="min-w-0">
                <label
                  htmlFor="kategori"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  Kategori
                </label>

                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                  <select
                    id="kategori"
                    value={form.kategori}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        kategori: e.target.value,
                      })
                    }
                    className="
                      w-full
                      min-w-0
                      pl-10
                      pr-4
                      py-3
                      rounded-xl
                      border border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Rapat">Rapat</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="PPDB">PPDB</option>
                  </select>
                </div>
              </div>

              {/* =================================================
                  LOKASI
              ================================================== */}
              <div className="min-w-0">
                <label
                  htmlFor="lokasi"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  Lokasi
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                  <input
                    id="lokasi"
                    type="text"
                    value={form.lokasi}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        lokasi: e.target.value,
                      })
                    }
                    placeholder="Aula utama, Gedung B"
                    className="
                      w-full
                      min-w-0
                      pl-10
                      pr-4
                      py-3
                      rounded-xl
                      border border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      placeholder:text-slate-400
                      outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  TANGGAL MULAI
              ================================================== */}
              <div className="min-w-0">
                <label
                  htmlFor="tanggalMulai"
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5"
                >
                  <Clock className="w-4 h-4 text-indigo-500" />

                  Tanggal Mulai

                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                  <input
                    id="tanggalMulai"
                    type="datetime-local"
                    required
                    value={form.tanggalMulai}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tanggalMulai: e.target.value,
                      })
                    }
                    className="
                      w-full
                      min-w-0
                      pl-10
                      pr-3
                      py-3
                      rounded-xl
                      border border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  TANGGAL SELESAI
              ================================================== */}
              <div className="min-w-0">
                <label
                  htmlFor="tanggalSelesai"
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5"
                >
                  <Clock className="w-4 h-4 text-indigo-500" />

                  Tanggal Selesai
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                  <input
                    id="tanggalSelesai"
                    type="datetime-local"
                    value={form.tanggalSelesai}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tanggalSelesai: e.target.value,
                      })
                    }
                    className="
                      w-full
                      min-w-0
                      pl-10
                      pr-3
                      py-3
                      rounded-xl
                      border border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  STATUS
              ================================================== */}
              <div className="min-w-0">
                <label
                  htmlFor="status"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  Status
                </label>

                <select
                  id="status"
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                  className="
                    w-full
                    min-w-0
                    px-4
                    py-3
                    rounded-xl
                    border border-slate-200
                    bg-white
                    text-sm
                    text-slate-800
                    outline-none
                    focus:ring-2
                    focus:ring-indigo-500/20
                    focus:border-indigo-500
                    transition-all
                  "
                >
                  <option value="draft">
                    📝 Draft
                  </option>

                  <option value="published">
                    ✅ Publikasikan Sekarang
                  </option>

                  <option value="scheduled">
                    ⏰ Jadwalkan Nanti
                  </option>
                </select>
              </div>

              {/* =================================================
                  DESKRIPSI
              ================================================== */}
              <div className="md:col-span-2 min-w-0">
                <label
                  htmlFor="deskripsi"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  Deskripsi
                </label>

                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />

                  <textarea
                    id="deskripsi"
                    rows={5}
                    value={form.deskripsi}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deskripsi: e.target.value,
                      })
                    }
                    placeholder="Tulis deskripsi agenda..."
                    className="
                      w-full
                      min-w-0
                      pl-10
                      pr-4
                      py-3
                      rounded-xl
                      border border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      placeholder:text-slate-400
                      outline-none
                      resize-y
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />
                </div>
              </div>

            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================== */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-5 border-t border-slate-100">

              <button
                type="button"
                onClick={() => router.back()}
                className="
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-2.5
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  text-sm
                  font-semibold
                  rounded-xl
                  hover:bg-slate-50
                  hover:border-slate-300
                  transition-all
                "
              >
                <X className="w-4 h-4" />
                Batal
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-8
                  py-2.5
                  bg-indigo-600
                  text-white
                  text-sm
                  font-semibold
                  rounded-xl
                  shadow-lg
                  shadow-indigo-600/20
                  hover:bg-indigo-700
                  hover:shadow-xl
                  active:scale-[0.98]
                  transition-all
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan Agenda
                  </>
                )}
              </button>

            </div>

          </form>
        </div>
      </main>
    </div>
  );
}