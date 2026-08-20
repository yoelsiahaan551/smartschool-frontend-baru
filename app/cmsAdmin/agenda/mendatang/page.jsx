"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Calendar,
  MapPin,
  Clock,
  Pencil,
  Trash2,
  ArrowLeft,
  Plus,
} from "lucide-react";

export default function AgendaMendatangPage() {
  const router = useRouter();

  const [active, setActive] = useState("agenda");
  const [collapsed, setCollapsed] = useState(false);

  // Dummy Data
  const [upcoming, setUpcoming] = useState([
    {
      id: 2,
      title: "Pendaftaran Siswa Baru 2026",
      category: "PPDB",
      location: "Gedung A",
      date: "2026-02-01 08:00",
      status: "scheduled",
    },
    {
      id: 5,
      title: "Pembagian Raport Semester Ganjil",
      category: "Kegiatan",
      location: "Ruang Auditorium",
      date: "2026-01-28 08:00",
      status: "scheduled",
    },
    {
      id: 4,
      title: "Rapat Evaluasi UTS",
      category: "Rapat",
      location: "Ruangan Guru",
      date: "2026-01-25 14:00",
      status: "draft",
    },
  ]);

  const handleDelete = (id) => {
    if (confirm("Hapus agenda mendatang ini?")) {
      setUpcoming((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Format tanggal untuk kotak tanggal
  const getDateInfo = (dateString) => {
    const date = new Date(dateString.replace(" ", "T"));

    if (Number.isNaN(date.getTime())) {
      return {
        month: "---",
        day: "--",
      };
    }

    return {
      month: date
        .toLocaleDateString("id-ID", {
          month: "short",
        })
        .replace(".", ""),
      day: date.getDate(),
    };
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
        <Header title="Agenda Mendatang" user={{ name: "Admin" }} />

        {/* =====================================================
            CONTENT CONTAINER
            Tidak menggunakan max-w-4xl
        ====================================================== */}
        <div
          className="
            w-full
            min-w-0
            px-4
            py-6
            sm:px-6
            md:px-8
            lg:px-10
            xl:px-12
            2xl:px-16
            space-y-6
          "
        >
          {/* =================================================
              BREADCRUMB
          ================================================== */}
          <nav className="w-full min-w-0 overflow-x-auto">
            <ol
              className="
                inline-flex
                items-center
                gap-2
                whitespace-nowrap
                text-sm
                font-medium
                text-slate-500
                tracking-wide
              "
            >
              <li>
                <a
                  href="/cmsAdmin"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Dashboard
                </a>
              </li>

              <li className="text-slate-300">/</li>

              <li>
                <a
                  href="/cmsAdmin/agenda"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Agenda
                </a>
              </li>

              <li className="text-slate-300">/</li>

              <li className="text-indigo-600 font-semibold">
                Mendatang
              </li>
            </ol>
          </nav>

          {/* =================================================
              HEADER CARD
          ================================================== */}
          <div
            className="
              w-full
              min-w-0
              bg-white
              p-4
              sm:p-5
              md:p-6
              rounded-2xl
              border border-slate-200/60
              shadow-sm
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              {/* Title */}
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                <div
                  className="
                    flex-shrink-0
                    p-3
                    bg-blue-50
                    rounded-2xl
                    border border-blue-100
                  "
                >
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>

                <div className="min-w-0">
                  <h1
                    className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      tracking-tight
                      text-slate-900
                    "
                  >
                    Agenda Mendatang
                  </h1>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      mt-0.5
                      leading-relaxed
                    "
                  >
                    Event dan jadwal yang akan datang dalam waktu dekat.
                  </p>
                </div>
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={() =>
                  router.push("/cmsAdmin/agenda/tambah")
                }
                className="
                  w-full
                  lg:w-auto
                  shrink-0
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-xl
                  lg:rounded-full
                  bg-indigo-600
                  text-white
                  text-sm
                  font-semibold
                  shadow-lg
                  shadow-indigo-600/20
                  hover:bg-indigo-700
                  hover:shadow-xl
                  transition-all
                  duration-200
                  active:scale-[0.98]
                "
              >
                <Calendar className="w-4 h-4" />
                Buat Agenda Baru
              </button>
            </div>
          </div>

          {/* =================================================
              LIST AGENDA
          ================================================== */}
          <div className="w-full min-w-0 space-y-4">
            {upcoming.length > 0 ? (
              upcoming.map((item) => {
                const dateInfo = getDateInfo(item.date);

                return (
                  <div
                    key={item.id}
                    className="
                      group
                      relative
                      w-full
                      min-w-0
                      bg-white
                      rounded-2xl
                      border border-slate-200/70
                      shadow-sm
                      hover:shadow-md
                      transition-all
                      duration-300
                      overflow-hidden
                    "
                  >
                    {/* Accent Line */}
                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        bottom-0
                        w-1
                        bg-blue-500
                      "
                    />

                    <div
                      className="
                        flex
                        flex-col
                        gap-4
                        p-4
                        sm:p-5
                        lg:flex-row
                        lg:items-center
                      "
                    >
                      {/* =================================================
                          DATE BOX
                      ================================================== */}
                      <div
                        className="
                          flex-shrink-0
                          w-14
                          h-14
                          rounded-2xl
                          bg-slate-50
                          border border-slate-200
                          flex
                          flex-col
                          items-center
                          justify-center
                          shadow-sm
                        "
                      >
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {dateInfo.month}
                        </span>

                        <span className="text-lg font-extrabold text-slate-800 leading-none">
                          {dateInfo.day}
                        </span>
                      </div>

                      {/* =================================================
                          DETAIL
                      ================================================== */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="
                            text-base
                            font-bold
                            text-slate-900
                            group-hover:text-indigo-600
                            transition-colors
                            break-words
                            sm:truncate
                          "
                        >
                          {item.title}
                        </h4>

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-2
                            mt-2
                            text-xs
                          "
                        >
                          {/* Location */}
                          <span className="flex items-center gap-1 text-slate-500 min-w-0">
                            <MapPin className="w-3 h-3 flex-shrink-0" />

                            <span className="truncate max-w-[220px]">
                              {item.location}
                            </span>
                          </span>

                          {/* Time */}
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3 flex-shrink-0" />

                            <span>
                              {item.date.split(" ")[1]}
                            </span>
                          </span>

                          {/* Category */}
                          <span
                            className="
                              px-2
                              py-0.5
                              bg-slate-100
                              rounded-full
                              text-slate-600
                              text-[10px]
                              font-medium
                            "
                          >
                            {item.category}
                          </span>
                        </div>

                        {/* Mobile status */}
                        <div className="mt-2 lg:hidden">
                          <span
                            className={`
                              inline-flex
                              items-center
                              px-2.5
                              py-1
                              rounded-full
                              text-[10px]
                              font-semibold
                              ${
                                item.status === "scheduled"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-amber-50 text-amber-700"
                              }
                            `}
                          >
                            {item.status === "scheduled"
                              ? "Terjadwal"
                              : "Draft"}
                          </span>
                        </div>
                      </div>

                      {/* =================================================
                          ACTIONS
                      ================================================== */}
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          flex-shrink-0
                          lg:ml-auto
                        "
                      >
                        <button
                          type="button"
                          className="
                            p-2
                            rounded-xl
                            text-slate-400
                            hover:text-indigo-600
                            hover:bg-indigo-50
                            transition-all
                            duration-200
                          "
                          title="Edit Agenda"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="
                            p-2
                            rounded-xl
                            text-slate-400
                            hover:text-red-600
                            hover:bg-red-50
                            transition-all
                            duration-200
                          "
                          title="Hapus Agenda"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* =================================================
                  EMPTY STATE
              ================================================== */
              <div
                className="
                  w-full
                  bg-white
                  rounded-2xl
                  border border-slate-200/70
                  shadow-sm
                  p-8
                  sm:p-12
                  text-center
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    rounded-full
                    bg-slate-100
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <Clock className="w-8 h-8 text-slate-400" />
                </div>

                <h3 className="text-base font-semibold text-slate-900">
                  Tidak ada agenda mendatang
                </h3>

                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  Semua jadwal selesai. Saatnya membuat agenda baru!
                </p>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/cmsAdmin/agenda/tambah")
                  }
                  className="
                    mt-5
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-indigo-600
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-indigo-700
                    transition-colors
                  "
                >
                  <Plus className="w-4 h-4" />
                  Buat Agenda
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              FOOTER INFO
          ================================================== */}
          {upcoming.length > 0 && (
            <div
              className="
                w-full
                px-4
                py-3
                bg-white
                rounded-2xl
                border border-slate-200/60
                text-center
              "
            >
              <p className="text-[10px] sm:text-xs font-medium text-slate-400">
                ⚡ Data simulasi (Dummy) • Total{" "}
                {upcoming.length} agenda mendatang
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}