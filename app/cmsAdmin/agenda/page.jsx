"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  Eye,
  MapPin,
  LayoutGrid,
  Clock,
} from "lucide-react";

export default function AgendaPage() {
  const router = useRouter();

  const [active, setActive] = useState("agenda");
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");

  // =====================================================
  // DUMMY DATA
  // =====================================================
  const [agendas, setAgendas] = useState([
    {
      id: 1,
      title: "Rapat Guru & Karyawan",
      category: "Rapat",
      location: "Aula Utama",
      date: "2026-01-25 09:00",
      status: "published",
    },
    {
      id: 2,
      title: "Pendaftaran Siswa Baru 2026",
      category: "PPDB",
      location: "Gedung A",
      date: "2026-02-01 08:00",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Upacara Hari Pahlawan",
      category: "Kegiatan",
      location: "Lapangan Sekolah",
      date: "2025-11-10 07:00",
      status: "published",
    },
    {
      id: 4,
      title: "Rapat Evaluasi UTS",
      category: "Rapat",
      location: "Ruangan Guru",
      date: "2026-01-15 14:00",
      status: "draft",
    },
  ]);

  // =====================================================
  // FILTER
  // =====================================================
  const filteredData = agendas.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "Semua" || item.category === filterCategory;
    return matchSearch && matchCategory;
  });

  // =====================================================
  // DELETE
  // =====================================================
  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus agenda ini?")) {
      setAgendas((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // =====================================================
  // STYLE HELPERS (Premium Color Accents)
  // =====================================================
  const getStatusStyle = (status) => {
    if (status === "published") {
      return {
        wrapper: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        dot: "bg-emerald-500",
        label: "Published",
      };
    }
    if (status === "scheduled") {
      return {
        wrapper: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
        dot: "bg-sky-500",
        label: "Terjadwal",
      };
    }
    return {
      wrapper: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
      dot: "bg-amber-500",
      label: "Draft",
    };
  };

  const getCategoryStyle = (category) => {
    const styles = {
      "Rapat": "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
      "PPDB": "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
      "Kegiatan": "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
    };
    return styles[category] || "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="shrink-0">
        <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 w-0 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-slate-50 via-slate-50/90 to-indigo-50/30 transition-all duration-300">
        <Header title="Agenda" user={{ name: "Admin" }} />

        <div className="w-full min-w-0 px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-8 xl:px-10 2xl:px-12 space-y-5 md:space-y-6">

          {/* BREADCRUMB */}
          <nav className="w-full min-w-0">
            <ol className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-slate-500">
              <li className="shrink-0">
                <a href="/cmsAdmin" className="hover:text-violet-600 transition-colors">
                  Dashboard
                </a>
              </li>
              <li className="text-slate-300">/</li>
              <li className="text-violet-600 font-semibold">
                Agenda
              </li>
            </ol>
          </nav>

          {/* HEADER CARD */}
          <section className="w-full min-w-0 bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-200/70 shadow-md shadow-indigo-500/5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                <div className="shrink-0 p-2.5 sm:p-3 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-violet-200/70">
                  <Calendar className="w-5 h-5 text-violet-600" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                    Semua Agenda
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    Kelola jadwal kegiatan, rapat, dan acara sekolah.
                  </p>
                </div>
              </div>

              <button onClick={() => router.push("/cmsAdmin/agenda/tambah")} className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl lg:rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200">
                <Plus className="w-4 h-4" />
                <span>Buat Agenda</span>
              </button>
            </div>
          </section>

          {/* STATISTICS */}
          <section className="w-full grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="min-w-0 bg-white p-4 rounded-2xl border border-slate-200/60 border-l-4 border-l-violet-500 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 p-2 bg-violet-50 text-violet-600 rounded-lg">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                    Total Agenda
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    {agendas.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="min-w-0 bg-white p-4 rounded-2xl border border-slate-200/60 border-l-4 border-l-sky-500 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 p-2 bg-sky-50 text-sky-600 rounded-lg">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                    Mendatang
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    2
                  </p>
                </div>
              </div>
            </div>

            <div className="min-w-0 bg-white p-4 rounded-2xl border border-slate-200/60 border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                    Published
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    {agendas.filter((a) => a.status === "published").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="min-w-0 bg-white p-4 rounded-2xl border border-slate-200/60 border-l-4 border-l-rose-500 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 p-2 bg-rose-50 text-rose-600 rounded-lg">
                  <Pencil className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                    Draft
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    {agendas.filter((a) => a.status === "draft").length}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEARCH + FILTER */}
          <section className="w-full min-w-0 bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center lg:justify-between">
              <div className="relative w-full lg:flex-1 lg:max-w-2xl min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Cari judul agenda..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full min-w-0 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all" />
              </div>

              <div className="flex flex-col min-[420px]:flex-row items-stretch min-[420px]:items-center gap-2 w-full lg:w-auto shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                  <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="flex-1 lg:flex-none min-w-0 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all">
                    <option value="Semua">Semua Kategori</option>
                    <option value="Rapat">Rapat</option>
                    <option value="PPDB">PPDB</option>
                    <option value="Kegiatan">Kegiatan</option>
                  </select>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap text-center min-[420px]:text-left self-center">
                  {filteredData.length} data
                </span>
              </div>
            </div>
          </section>

          {/* TABLE CARD */}
          <section className="w-full min-w-0 bg-white rounded-2xl border border-slate-200/70 shadow-md overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[680px] table-auto">
                <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr>
                    <th className="px-4 sm:px-6 py-3.5 text-left">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Agenda</span>
                    </th>
                    <th className="px-4 sm:px-6 py-3.5 text-left">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal</span>
                    </th>
                    <th className="px-4 sm:px-6 py-3.5 text-left">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lokasi</span>
                    </th>
                    <th className="px-4 sm:px-6 py-3.5 text-left">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</span>
                    </th>
                    <th className="px-4 sm:px-6 py-3.5 text-right">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => {
                      const status = getStatusStyle(item.status);
                      const categoryStyle = getCategoryStyle(item.category);
                      return (
                        <tr key={item.id} className="group hover:bg-violet-50/30 transition-colors duration-200">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-800 group-hover:text-violet-700 transition-colors break-words line-clamp-2">
                                {item.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ring-1 ${categoryStyle}`}>
                                  {item.category}
                                </span>
                                <span className="text-[10px] text-slate-500 max-w-[180px] truncate">
                                  <MapPin className="w-3 h-3 inline mr-1" />
                                  {item.location}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
                              {item.date}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-1.5 max-w-[180px]">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="text-sm text-slate-500 truncate">
                                {item.location}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${status.wrapper}`}>
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`} />
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 rounded-md text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors" title="Detail">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 rounded-md text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors" title="Edit">
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Hapus">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-sm text-slate-500">
                        Tidak ada agenda yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="w-full px-4 sm:px-6 py-3 border-t border-slate-100 bg-slate-50/60 flex justify-end">
              <span className="text-[10px] font-medium text-slate-400 bg-slate-100/80 px-3 py-1 rounded-full ring-1 ring-slate-200/50 whitespace-nowrap">
                ⚡ Data simulasi
              </span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}