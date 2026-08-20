"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Clock,
  Calendar,
  Pencil,
  Trash2,
  ArrowLeft,
  CheckCircle,
  Plus,
} from "lucide-react";

export default function TerjadwalPage() {
  const router = useRouter();

  const [active, setActive] = useState("pengumuman");
  const [collapsed, setCollapsed] = useState(false);

  // Dummy Data
  const [scheduled, setScheduled] = useState([
    {
      id: 2,
      title: "Pendaftaran Siswa Baru Dibuka",
      category: "PPDB",
      date: "2026-02-01 08:00",
      status: "akan datang",
    },
    {
      id: 5,
      title: "Pengumuman Kelulusan",
      category: "Akademik",
      date: "2026-03-15 09:00",
      status: "akan datang",
    },
    {
      id: 6,
      title: "Sosialisasi MPLS",
      category: "Kegiatan",
      date: "2025-12-20 10:00",
      status: "akan datang",
    },
  ]);

  const handleDelete = (id) => {
    if (
      confirm(
        "Hapus pengumuman terjadwal ini? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      setScheduled(scheduled.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside className="flex-shrink-0">
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="flex min-w-0 w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto bg-slate-50 transition-all duration-300">
        <Header title="Pengumuman Terjadwal" user={{ name: "Admin" }} />

        {/* ===================================================
            CONTENT WRAPPER
        ==================================================== */}
        <div className="w-full min-w-0 px-3 py-5 sm:px-5 sm:py-7 md:px-7 lg:px-8 xl:px-10 lg:py-9">
          <div className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-6">

            {/* =================================================
                BREADCRUMB
            ================================================== */}
            <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <nav className="min-w-0">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
                  <li className="shrink-0">
                    <a
                      href="/cmsAdmin"
                      className="transition-colors hover:text-indigo-600"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li className="text-slate-300">/</li>

                  <li className="shrink-0">
                    <a
                      href="/cmsAdmin/pengumuman"
                      className="transition-colors hover:text-indigo-600"
                    >
                      Pengumuman
                    </a>
                  </li>

                  <li className="text-slate-300">/</li>

                  <li className="min-w-0 truncate font-semibold text-indigo-600">
                    Terjadwal
                  </li>
                </ol>
              </nav>

              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex w-fit shrink-0 items-center gap-2 text-xs font-medium text-slate-600 transition-colors hover:text-indigo-600 sm:text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </button>
            </div>

            {/* =================================================
                HEADER CARD
            ================================================== */}
            <div className="flex w-full min-w-0 flex-col gap-4 rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5 md:p-6 lg:flex-row lg:items-start lg:justify-between">

              {/* TITLE */}
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>

                <div className="min-w-0">
                  <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
                    Daftar Terjadwal
                  </h1>

                  <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Pengumuman yang akan terbit otomatis di waktu yang
                    ditentukan.
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={() =>
                  router.push("/cmsAdmin/pengumuman/tambah")
                }
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98] sm:w-fit sm:rounded-full sm:text-sm"
              >
                <Calendar className="h-4 w-4" />
                Buat Jadwal Baru
              </button>
            </div>

            {/* =================================================
                LIST
            ================================================== */}
            <div className="w-full min-w-0 space-y-4">

              {scheduled.length > 0 ? (
                scheduled.map((item) => (
                  <div
                    key={item.id}
                    className="group relative w-full min-w-0 overflow-hidden rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:rounded-2xl sm:p-5"
                  >
                    {/* ACCENT */}
                    <div className="absolute bottom-0 left-0 top-0 w-1 rounded-l-xl bg-blue-500 sm:rounded-l-2xl" />

                    {/* CARD CONTENT */}
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">

                      {/* ICON */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-200/50 shadow-sm sm:h-11 sm:w-11 sm:self-center">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>

                      {/* INFO */}
                      <div className="min-w-0 flex-1">

                        {/* TITLE + CATEGORY */}
                        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
                          <h4 className="min-w-0 max-w-full truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-base">
                            {item.title}
                          </h4>

                          <span className="inline-flex shrink-0 items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                            {item.category}
                          </span>
                        </div>

                        {/* DATE + STATUS */}
                        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">

                          {/* DATE */}
                          <span className="inline-flex max-w-full items-center gap-1.5 text-[11px] text-slate-500 sm:text-xs">
                            <Calendar className="h-3 w-3 shrink-0 text-slate-400" />

                            <span className="truncate font-medium">
                              {item.date}
                            </span>
                          </span>

                          {/* STATUS */}
                          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 ring-1 ring-blue-200/50">
                            <CheckCircle className="h-3 w-3" />
                            Menunggu diterbitkan
                          </span>
                        </div>
                      </div>

                      {/* ACTION */}
                      <div className="flex shrink-0 items-center justify-end gap-1 border-t border-slate-100 pt-3 sm:ml-auto sm:border-t-0 sm:pt-0">

                        <button
                          type="button"
                          className="rounded-full p-2 text-slate-400 shadow-sm transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow"
                          title="Edit Jadwal"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-full p-2 text-slate-400 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:shadow"
                          title="Hapus Jadwal"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                /* =================================================
                   EMPTY STATE
                ================================================== */
                <div className="w-full rounded-xl border border-slate-200/70 bg-white p-8 text-center shadow-sm sm:rounded-2xl sm:p-14">

                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 shadow-inner sm:h-16 sm:w-16">
                    <Clock className="h-7 w-7 text-slate-400 sm:h-8 sm:w-8" />
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                    Belum ada jadwal
                  </h3>

                  <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Anda belum membuat pengumuman terjadwal. Buat jadwal baru
                    agar pengumuman terbit otomatis tepat waktu.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      router.push("/cmsAdmin/pengumuman/tambah")
                    }
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200 sm:text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    Buat Jadwal Sekarang
                  </button>
                </div>
              )}
            </div>

            {/* =================================================
                FOOTER NOTE
            ================================================== */}
            <div className="w-full rounded-xl border border-slate-200/60 bg-white px-4 py-3 text-center sm:rounded-2xl sm:px-6">
              <p className="text-[10px] font-medium text-slate-400 sm:text-xs">
                Data simulasi (Dummy) • Total {scheduled.length} jadwal
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}