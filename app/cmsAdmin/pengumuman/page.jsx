"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  Megaphone,
  Plus,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Clock,
  CheckCircle2,
  FileText,
} from "lucide-react";

export default function PengumumanPage() {
  const router = useRouter();

  // =====================================================
  // SIDEBAR
  // =====================================================
  const [active, setActive] = useState("pengumuman");
  const [collapsed, setCollapsed] = useState(false);

  // =====================================================
  // SEARCH & FILTER
  // =====================================================
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  // =====================================================
  // DATA PENGUMUMAN
  // =====================================================
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Libur Semester Ganjil 2026",
      status: "published",
      category: "Akademik",
      date: "2026-01-20",
    },
    {
      id: 2,
      title: "Pendaftaran Siswa Baru Dibuka",
      status: "scheduled",
      category: "PPDB",
      date: "2026-02-01",
    },
    {
      id: 3,
      title: "Pengumuman Hasil UTS",
      status: "draft",
      category: "Akademik",
      date: "2026-01-15",
    },
    {
      id: 4,
      title: "Upacara Hari Pahlawan",
      status: "published",
      category: "Kegiatan",
      date: "2025-11-10",
    },
  ]);

  // =====================================================
  // STATISTIK
  // =====================================================
  const stats = {
    total: announcements.length,

    published: announcements.filter(
      (item) => item.status === "published"
    ).length,

    scheduled: announcements.filter(
      (item) => item.status === "scheduled"
    ).length,

    draft: announcements.filter(
      (item) => item.status === "draft"
    ).length,
  };

  // =====================================================
  // FILTER DATA
  // =====================================================
  const filteredData = announcements.filter((item) => {
    const keyword = search.toLowerCase().trim();

    const matchSearch = item.title
      .toLowerCase()
      .includes(keyword);

    const matchStatus =
      filterStatus === "Semua" ||
      item.status === filterStatus;

    return matchSearch && matchStatus;
  });

  // =====================================================
  // DELETE
  // =====================================================
  const handleDelete = (id) => {
    if (
      !confirm(
        "Yakin ingin menghapus pengumuman ini?"
      )
    ) {
      return;
    }

    setAnnouncements((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "published":
        return {
          wrapper:
            "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
          dot: "bg-emerald-500",
          label: "Published",
        };

      case "scheduled":
        return {
          wrapper:
            "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
          dot: "bg-sky-500",
          label: "Terjadwal",
        };

      default:
        return {
          wrapper:
            "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
          dot: "bg-amber-500",
          label: "Draft",
        };
    }
  };

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-hidden">

      {/* =================================================
          SIDEBAR
      ================================================= */}
      <div className="shrink-0">
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* =================================================
          MAIN CONTENT

          PENTING:
          min-w-0 + w-0 membuat area utama mengikuti
          lebar yang tersedia setelah sidebar.
      ================================================= */}
      <main
        className="
          flex-1
          min-w-0
          w-0
          max-w-full
          overflow-x-hidden
          overflow-y-auto
          bg-slate-50
          transition-all
          duration-300
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}
        <Header
          title="Pengumuman"
          user={{ name: "Admin" }}
        />

        {/* =================================================
            CONTENT WRAPPER

            TIDAK ADA max-w-7xl DI SINI
            sehingga card bisa memenuhi area kanan-kiri.
        ================================================= */}
        <div
          className="
            w-full
            min-w-0
            max-w-none
            px-3
            py-4
            sm:px-4
            sm:py-5
            md:px-5
            md:py-6
            lg:px-6
            lg:py-7
            xl:px-8
            2xl:px-10
          "
        >

          {/* =================================================
              PAGE CONTENT

              FULL WIDTH
          ================================================= */}
          <div
            className="
              w-full
              max-w-none
              min-w-0
              mx-0
              space-y-4
              sm:space-y-5
              lg:space-y-6
            "
          >

            {/* =================================================
                BREADCRUMB
            ================================================= */}
            <nav className="w-full min-w-0 overflow-hidden">
              <ol
                className="
                  flex
                  items-center
                  flex-wrap
                  gap-x-2
                  gap-y-1
                  text-[11px]
                  sm:text-xs
                  lg:text-sm
                  font-medium
                  text-slate-500
                "
              >
                <li className="shrink-0">
                  <a
                    href="/cmsAdmin"
                    className="
                      hover:text-indigo-600
                      transition-colors
                    "
                  >
                    Dashboard
                  </a>
                </li>

                <li className="text-slate-300 shrink-0">
                  /
                </li>

                <li className="text-indigo-600 font-semibold truncate">
                  Pengumuman
                </li>
              </ol>
            </nav>

            {/* =================================================
                HEADER CARD
            ================================================= */}
            <section
              className="
                w-full
                min-w-0
                bg-white
                border
                border-slate-200/70
                shadow-sm
                rounded-xl
                lg:rounded-2xl
                p-4
                sm:p-5
                lg:p-6
              "
            >

              {/* HEADER TOP */}
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  lg:flex-row
                  lg:items-start
                  lg:justify-between
                "
              >

                {/* TITLE */}
                <div
                  className="
                    flex
                    items-start
                    gap-3
                    sm:gap-4
                    min-w-0
                    flex-1
                  "
                >

                  {/* ICON */}
                  <div
                    className="
                      shrink-0
                      flex
                      items-center
                      justify-center
                      p-2.5
                      sm:p-3
                      bg-indigo-50
                      border
                      border-indigo-100
                      rounded-xl
                      lg:rounded-2xl
                    "
                  >
                    <Megaphone className="w-5 h-5 text-indigo-600" />
                  </div>

                  {/* TEXT */}
                  <div className="min-w-0">
                    <h1
                      className="
                        text-lg
                        sm:text-xl
                        lg:text-2xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        truncate
                      "
                    >
                      Semua Pengumuman
                    </h1>

                    <p
                      className="
                        mt-1
                        text-xs
                        sm:text-sm
                        text-slate-500
                        leading-relaxed
                      "
                    >
                      Kelola semua pengumuman untuk siswa dan guru.
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/cmsAdmin/pengumuman/tambah"
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    lg:w-auto
                    shrink-0
                    px-4
                    sm:px-5
                    py-2.5
                    rounded-xl
                    lg:rounded-full
                    bg-indigo-600
                    text-white
                    text-xs
                    sm:text-sm
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
                  <Plus className="w-4 h-4 shrink-0" />

                  <span>
                    Buat Pengumuman
                  </span>
                </button>
              </div>

              {/* =================================================
                  STATS
              ================================================= */}
              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-4
                  gap-3
                  mt-5
                  pt-5
                  border-t
                  border-slate-100
                "
              >

                {/* TOTAL */}
                <div
                  className="
                    min-w-0
                    bg-slate-50/60
                    p-3
                    rounded-xl
                    border
                    border-slate-200/50
                    border-l-4
                    border-l-indigo-500
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-2.5 min-w-0">

                    <div
                      className="
                        shrink-0
                        p-1.5
                        bg-indigo-50
                        text-indigo-600
                        rounded-lg
                      "
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          text-slate-500
                          uppercase
                          tracking-wider
                          truncate
                        "
                      >
                        Total
                      </p>

                      <p className="text-lg sm:text-xl font-bold text-slate-900">
                        {stats.total}
                      </p>
                    </div>

                  </div>
                </div>

                {/* PUBLISHED */}
                <div
                  className="
                    min-w-0
                    bg-slate-50/60
                    p-3
                    rounded-xl
                    border
                    border-slate-200/50
                    border-l-4
                    border-l-emerald-500
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-2.5 min-w-0">

                    <div
                      className="
                        shrink-0
                        p-1.5
                        bg-emerald-50
                        text-emerald-600
                        rounded-lg
                      "
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          text-slate-500
                          uppercase
                          tracking-wider
                          truncate
                        "
                      >
                        Published
                      </p>

                      <p className="text-lg sm:text-xl font-bold text-slate-900">
                        {stats.published}
                      </p>
                    </div>

                  </div>
                </div>

                {/* TERJADWAL */}
                <div
                  className="
                    min-w-0
                    bg-slate-50/60
                    p-3
                    rounded-xl
                    border
                    border-slate-200/50
                    border-l-4
                    border-l-sky-500
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-2.5 min-w-0">

                    <div
                      className="
                        shrink-0
                        p-1.5
                        bg-sky-50
                        text-sky-600
                        rounded-lg
                      "
                    >
                      <Clock className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          text-slate-500
                          uppercase
                          tracking-wider
                          truncate
                        "
                      >
                        Terjadwal
                      </p>

                      <p className="text-lg sm:text-xl font-bold text-slate-900">
                        {stats.scheduled}
                      </p>
                    </div>

                  </div>
                </div>

                {/* DRAFT */}
                <div
                  className="
                    min-w-0
                    bg-slate-50/60
                    p-3
                    rounded-xl
                    border
                    border-slate-200/50
                    border-l-4
                    border-l-amber-500
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-2.5 min-w-0">

                    <div
                      className="
                        shrink-0
                        p-1.5
                        bg-amber-50
                        text-amber-600
                        rounded-lg
                      "
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          text-slate-500
                          uppercase
                          tracking-wider
                          truncate
                        "
                      >
                        Draft
                      </p>

                      <p className="text-lg sm:text-xl font-bold text-slate-900">
                        {stats.draft}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* =================================================
                SEARCH & FILTER
            ================================================= */}
            <section
              className="
                w-full
                min-w-0
                bg-white
                border
                border-slate-200/70
                shadow-sm
                rounded-xl
                lg:rounded-2xl
                p-3
                sm:p-4
              "
            >

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  gap-3
                  items-center
                  md:justify-between
                "
              >

                {/* SEARCH */}
                <div
                  className="
                    relative
                    w-full
                    md:flex-1
                    min-w-0
                  "
                >
                  <Search
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      w-4
                      h-4
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Cari judul pengumuman..."
                    className="
                      w-full
                      min-w-0
                      pl-10
                      pr-4
                      py-2.5
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-xs
                      sm:text-sm
                      text-slate-800
                      outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />
                </div>

                {/* FILTER */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    w-full
                    md:w-auto
                    shrink-0
                  "
                >

                  <Filter
                    className="
                      w-4
                      h-4
                      text-slate-400
                      shrink-0
                    "
                  />

                  <select
                    value={filterStatus}
                    onChange={(e) =>
                      setFilterStatus(e.target.value)
                    }
                    className="
                      flex-1
                      md:flex-none
                      w-full
                      md:w-auto
                      min-w-0
                      px-3
                      py-2.5
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-xs
                      sm:text-sm
                      text-slate-800
                      outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                    "
                  >
                    <option value="Semua">
                      Semua Status
                    </option>

                    <option value="published">
                      Published
                    </option>

                    <option value="draft">
                      Draft
                    </option>

                    <option value="scheduled">
                      Terjadwal
                    </option>
                  </select>

                  <span
                    className="
                      hidden
                      lg:inline-flex
                      items-center
                      justify-center
                      shrink-0
                      text-xs
                      text-slate-400
                      whitespace-nowrap
                      px-2
                    "
                  >
                    {filteredData.length} data
                  </span>

                </div>
              </div>
            </section>

            {/* =================================================
                TABLE CARD
            ================================================= */}
            <section
              className="
                w-full
                min-w-0
                bg-white
                rounded-xl
                lg:rounded-2xl
                border
                border-slate-200/70
                shadow-sm
                overflow-hidden
              "
            >

              {/* TABLE SCROLL */}
              <div
                className="
                  w-full
                  min-w-0
                  overflow-x-auto
                "
              >
                <table
                  className="
                    w-full
                    min-w-[680px]
                    border-collapse
                  "
                >

                  {/* TABLE HEADER */}
                  <thead
                    className="
                      bg-slate-50/70
                      border-b
                      border-slate-100
                    "
                  >
                    <tr>

                      <th
                        className="
                          px-3
                          sm:px-4
                          lg:px-5
                          py-3
                          text-left
                          min-w-[230px]
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            sm:text-xs
                            font-semibold
                            text-slate-500
                            uppercase
                            tracking-wider
                          "
                        >
                          Judul
                        </span>
                      </th>

                      <th
                        className="
                          px-3
                          sm:px-4
                          lg:px-5
                          py-3
                          text-left
                          min-w-[120px]
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            sm:text-xs
                            font-semibold
                            text-slate-500
                            uppercase
                            tracking-wider
                          "
                        >
                          Kategori
                        </span>
                      </th>

                      <th
                        className="
                          px-3
                          sm:px-4
                          lg:px-5
                          py-3
                          text-left
                          min-w-[120px]
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            sm:text-xs
                            font-semibold
                            text-slate-500
                            uppercase
                            tracking-wider
                          "
                        >
                          Status
                        </span>
                      </th>

                      <th
                        className="
                          px-3
                          sm:px-4
                          lg:px-5
                          py-3
                          text-left
                          min-w-[120px]
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            sm:text-xs
                            font-semibold
                            text-slate-500
                            uppercase
                            tracking-wider
                          "
                        >
                          Tanggal
                        </span>
                      </th>

                      <th
                        className="
                          px-3
                          sm:px-4
                          lg:px-5
                          py-3
                          text-right
                          min-w-[120px]
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            sm:text-xs
                            font-semibold
                            text-slate-500
                            uppercase
                            tracking-wider
                          "
                        >
                          Aksi
                        </span>
                      </th>

                    </tr>
                  </thead>

                  {/* TABLE BODY */}
                  <tbody className="divide-y divide-slate-100">

                    {filteredData.length > 0 ? (
                      filteredData.map((item) => {

                        const statusStyle =
                          getStatusStyle(item.status);

                        return (
                          <tr
                            key={item.id}
                            className="
                              group
                              hover:bg-indigo-50/30
                              transition-colors
                            "
                          >

                            {/* JUDUL */}
                            <td
                              className="
                                px-3
                                sm:px-4
                                lg:px-5
                                py-4
                                align-middle
                              "
                            >
                              <div
                                className="
                                  min-w-0
                                  flex
                                  items-center
                                  gap-3
                                "
                              >

                                {/* INITIAL */}
                                <div
                                  className="
                                    shrink-0
                                    w-9
                                    h-9
                                    rounded-lg
                                    bg-indigo-50
                                    text-indigo-600
                                    flex
                                    items-center
                                    justify-center
                                    text-xs
                                    font-bold
                                    shadow-sm
                                    ring-1
                                    ring-indigo-100/50
                                  "
                                >
                                  {item.title
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>

                                {/* TITLE */}
                                <div className="min-w-0 flex-1">

                                  <p
                                    className="
                                      text-xs
                                      sm:text-sm
                                      font-semibold
                                      text-slate-800
                                      group-hover:text-indigo-600
                                      transition-colors
                                      truncate
                                      max-w-[280px]
                                      sm:max-w-[360px]
                                      lg:max-w-[500px]
                                      xl:max-w-[700px]
                                    "
                                  >
                                    {item.title}
                                  </p>

                                  {/* MOBILE INFO */}
                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-2
                                      mt-1.5
                                      md:hidden
                                      flex-wrap
                                    "
                                  >

                                    <span
                                      className={`
                                        inline-flex
                                        items-center
                                        gap-1
                                        text-[10px]
                                        px-2
                                        py-1
                                        rounded-full
                                        font-medium
                                        ${statusStyle.wrapper}
                                      `}
                                    >
                                      <span
                                        className={`
                                          w-1.5
                                          h-1.5
                                          rounded-full
                                          ${statusStyle.dot}
                                        `}
                                      />

                                      {statusStyle.label}
                                    </span>

                                    <span className="text-[10px] text-slate-400">
                                      {item.date}
                                    </span>

                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* KATEGORI */}
                            <td
                              className="
                                px-3
                                sm:px-4
                                lg:px-5
                                py-4
                                text-xs
                                sm:text-sm
                                text-slate-500
                                whitespace-nowrap
                              "
                            >
                              {item.category}
                            </td>

                            {/* STATUS */}
                            <td
                              className="
                                px-3
                                sm:px-4
                                lg:px-5
                                py-4
                              "
                            >
                              <span
                                className={`
                                  hidden
                                  md:inline-flex
                                  items-center
                                  gap-1.5
                                  px-2.5
                                  py-1
                                  rounded-full
                                  text-[10px]
                                  sm:text-xs
                                  font-medium
                                  whitespace-nowrap
                                  ${statusStyle.wrapper}
                                `}
                              >
                                <span
                                  className={`
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                    ${statusStyle.dot}
                                  `}
                                />

                                {statusStyle.label}
                              </span>
                            </td>

                            {/* TANGGAL */}
                            <td
                              className="
                                px-3
                                sm:px-4
                                lg:px-5
                                py-4
                                text-xs
                                text-slate-500
                                whitespace-nowrap
                              "
                            >
                              {item.date}
                            </td>

                            {/* AKSI */}
                            <td
                              className="
                                px-3
                                sm:px-4
                                lg:px-5
                                py-4
                              "
                            >
                              <div
                                className="
                                  flex
                                  items-center
                                  justify-end
                                  gap-0.5
                                  sm:gap-1
                                "
                              >

                                {/* DETAIL */}
                                <button
                                  type="button"
                                  className="
                                    p-1.5
                                    sm:p-2
                                    rounded-lg
                                    text-slate-400
                                    hover:text-indigo-600
                                    hover:bg-indigo-50
                                    transition-colors
                                  "
                                  title="Detail"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                {/* EDIT */}
                                <button
                                  type="button"
                                  className="
                                    p-1.5
                                    sm:p-2
                                    rounded-lg
                                    text-slate-400
                                    hover:text-blue-600
                                    hover:bg-blue-50
                                    transition-colors
                                  "
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>

                                {/* DELETE */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(item.id)
                                  }
                                  className="
                                    p-1.5
                                    sm:p-2
                                    rounded-lg
                                    text-slate-400
                                    hover:text-red-600
                                    hover:bg-red-50
                                    transition-colors
                                  "
                                  title="Hapus"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>

                              </div>
                            </td>

                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="
                            px-6
                            py-12
                            text-center
                            text-xs
                            sm:text-sm
                            text-slate-500
                          "
                        >
                          Tidak ada pengumuman ditemukan.
                        </td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>

              {/* =================================================
                  TABLE FOOTER
              ================================================= */}
              <div
                className="
                  px-3
                  sm:px-5
                  py-3
                  border-t
                  border-slate-100
                  bg-slate-50/60
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >

                <span
                  className="
                    text-[10px]
                    sm:text-xs
                    text-slate-400
                    truncate
                  "
                >
                  Menampilkan {filteredData.length} pengumuman
                </span>

                <span
                  className="
                    shrink-0
                    text-[9px]
                    sm:text-[10px]
                    font-medium
                    text-slate-400
                    bg-slate-100/80
                    px-2.5
                    py-1
                    rounded-full
                    ring-1
                    ring-slate-200/50
                  "
                >
                  ⚡ Data simulasi
                </span>

              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}