"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Search, ClipboardCheck, RefreshCw, Calendar, Users, CheckCircle, XCircle, Clock, Filter } from "lucide-react";

const dummyAbsensi = [
  { id: 1, nama: "Andi Pratama", kelas: "XII RPL 1", tanggal: "18/08/2026", status: "Hadir", jam_masuk: "07:25" },
  { id: 2, nama: "Siti Aisyah", kelas: "XI TKJ 2", tanggal: "18/08/2026", status: "Hadir", jam_masuk: "07:30" },
  { id: 3, nama: "Budi Santoso", kelas: "X AKL 1", tanggal: "18/08/2026", status: "Sakit", jam_masuk: "-" },
  { id: 4, nama: "Dewi Lestari", kelas: "XII RPL 2", tanggal: "18/08/2026", status: "Izin", jam_masuk: "-" },
  { id: 5, nama: "Eko Prasetyo", kelas: "XI TKJ 1", tanggal: "18/08/2026", status: "Alpa", jam_masuk: "-" },
];

export default function AdminAbsensiPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filtered = dummyAbsensi.filter((a) => {
    const matchSearch = a.nama.toLowerCase().includes(search.toLowerCase()) || a.kelas.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Semua" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status) => {
    const map = {
      Hadir: "bg-emerald-50 text-emerald-600 border-emerald-200",
      Sakit: "bg-amber-50 text-amber-600 border-amber-200",
      Izin: "bg-blue-50 text-blue-600 border-blue-200",
      Alpa: "bg-rose-50 text-rose-600 border-rose-200",
    };
    return map[status] || map.Hadir;
  };

  const getStatusIcon = (status) => {
    const map = { Hadir: CheckCircle, Sakit: XCircle, Izin: Clock, Alpa: XCircle };
    return map[status] || CheckCircle;
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar
          active="absensi"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Header
            toggleSidebar={toggleSidebar}
            notifications={[]}
            user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
          />

          <main className="flex-1 w-full p-4 md:p-6 lg:p-8">
            <div className="w-full space-y-5">
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-600 text-white shadow-sm flex-shrink-0">
                    <ClipboardCheck size={18} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">Absensi Siswa</h1>
                    <p className="text-sm text-slate-500">Rekapitulasi kehadiran siswa hari ini</p>
                  </div>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                >
                  <RefreshCw size={16} className="text-slate-500" />
                </button>
              </div>

              {/* SEARCH + FILTER */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama atau kelas..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 text-slate-600 min-w-[140px]"
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Hadir">Hadir</option>
                    <option value="Sakit">Sakit</option>
                    <option value="Izin">Izin</option>
                    <option value="Alpa">Alpa</option>
                  </select>
                  <button
                    onClick={() => { setSearch(""); setFilterStatus("Semua"); }}
                    className="px-3 py-2.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* TABLE FULL WIDTH */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[22%]">Nama</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[18%]">Kelas</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[18%]">Tanggal</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[22%]">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[20%]">Jam Masuk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((item) => {
                        const Icon = getStatusIcon(item.status);
                        return (
                          <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-4 py-4">
                              <p className="font-semibold text-slate-800 text-sm break-words">{item.nama}</p>
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-sm text-slate-600 break-words">{item.kelas}</span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-sm text-slate-500 whitespace-nowrap">{item.tanggal}</span>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusBadge(item.status)}`}>
                                <Icon size={12} />
                                {item.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-sm text-slate-500 whitespace-nowrap">{item.jam_masuk}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {filtered.length === 0 && (
                  <div className="p-8 text-center">
                    <ClipboardCheck size={48} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">Tidak ada data absensi</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}