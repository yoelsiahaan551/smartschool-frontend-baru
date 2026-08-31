"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../../../components/Header";
import Sidebar from "../../../../../components/Sidebar";

import {
  Building,
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
  Layers,
  Users,
  Ruler,
  FileText,
  Info,
  Hash,
  Printer,
  Share2,
  Home,
  DoorOpen,
  Grid,
} from "lucide-react";

// Data dummy untuk demo
const dummyData = [
  { 
    id: 1, 
    nama: "Gedung A", 
    kode: "A", 
    status: "aktif", 
    deskripsi: "Gedung utama perkantoran dan ruang teori. Terdiri dari 3 lantai dengan fasilitas lengkap untuk kegiatan belajar mengajar.",
    alamat: "Jl. Merdeka No. 1, Jakarta Pusat, DKI Jakarta",
    luas: "500 m²",
    tahunBerdiri: "2010",
    jumlahLantai: 3,
    kapasitas: "300 orang",
    fasilitas: ["Ruang Kelas", "Ruang Guru", "Kantor", "Toilet", "Musholla"],
    ruangan: [
      { nama: "Ruang Kelas A1", lantai: 1, kapasitas: 30 },
      { nama: "Ruang Kelas A2", lantai: 1, kapasitas: 30 },
      { nama: "Ruang Guru", lantai: 1, kapasitas: 20 },
      { nama: "Ruang Kelas A3", lantai: 2, kapasitas: 30 },
      { nama: "Ruang Kelas A4", lantai: 2, kapasitas: 30 },
      { nama: "Laboratorium", lantai: 2, kapasitas: 25 },
      { nama: "Ruang Kelas A5", lantai: 3, kapasitas: 30 },
      { nama: "Ruang Kelas A6", lantai: 3, kapasitas: 30 },
      { nama: "Aula", lantai: 3, kapasitas: 100 },
    ],
    created_at: "2024-01-15 08:30:00",
    updated_at: "2026-08-11 14:30:22",
  },
  { 
    id: 2, 
    nama: "Gedung B", 
    kode: "B", 
    status: "aktif", 
    deskripsi: "Gedung laboratorium dan praktikum untuk berbagai mata pelajaran.",
    alamat: "Jl. Merdeka No. 2, Jakarta Pusat, DKI Jakarta",
    luas: "400 m²",
    tahunBerdiri: "2012",
    jumlahLantai: 2,
    kapasitas: "200 orang",
    fasilitas: ["Lab Fisika", "Lab Kimia", "Lab Biologi", "Lab Komputer", "Toilet"],
    ruangan: [
      { nama: "Lab Fisika", lantai: 1, kapasitas: 25 },
      { nama: "Lab Kimia", lantai: 1, kapasitas: 25 },
      { nama: "Lab Biologi", lantai: 2, kapasitas: 25 },
      { nama: "Lab Komputer", lantai: 2, kapasitas: 30 },
    ],
    created_at: "2024-02-10 10:15:00",
    updated_at: "2026-08-09 16:20:10",
  },
];

export default function DetailGedungPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      const found = dummyData.find((item) => item.id === parseInt(id));
      setData(found || null);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleDelete = () => {
    if (!confirm(`Yakin ingin menghapus gedung "${data?.nama}"?`)) return;
    console.log("Hapus gedung:", id);
    router.push("/admin/sarpras/gedung");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#f8fafc]">
        <Sidebar active="sarpras" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header toggleSidebar={() => setIsCollapsed(!isCollapsed)} notifications={[]} user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }} />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-500">Memuat detail gedung...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen bg-[#f8fafc]">
        <Sidebar active="sarpras" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header toggleSidebar={() => setIsCollapsed(!isCollapsed)} notifications={[]} user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }} />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
                  <Building size={32} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-700">Gedung tidak ditemukan</h3>
                <p className="mt-1 text-sm text-slate-500">Data gedung dengan ID #{id} tidak tersedia.</p>
                <button
                  onClick={() => router.push("/admin/sarpras/gedung")}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <ArrowLeft size={16} />
                  Kembali ke Daftar Gedung
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar
        active="sarpras"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-7 xl:p-8">
          <div className="mx-auto w-full max-w-[1200px] space-y-4 sm:space-y-5 lg:space-y-6">

            {/* BACK BUTTON */}
            <button
              onClick={() => router.push("/admin/sarpras/gedung")}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 group"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
              Kembali ke Daftar Gedung
            </button>

            {/* PAGE HEADER */}
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-50/70 blur-3xl" />

              <div className="relative flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-6">
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] sm:h-14 sm:w-14">
                    <Building size={22} strokeWidth={1.9} className="sm:h-[25px] sm:w-[25px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-xl font-semibold tracking-[-0.025em] text-slate-900 sm:text-2xl lg:text-[26px]">
                        Detail Gedung
                      </h1>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600 sm:px-3 sm:py-1 sm:text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        ID: #{data.id}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold sm:px-3 sm:py-1 ${
                          data.status === "aktif"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-rose-200 bg-rose-50 text-rose-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            data.status === "aktif" ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                        />
                        {data.status === "aktif" ? "Aktif" : "Nonaktif"}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 sm:gap-2">
                      <MapPin size={13} className="shrink-0 text-blue-400 sm:h-[14px] sm:w-[14px]" strokeWidth={2} />
                      <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                        {data.alamat}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-wrap gap-2 sm:flex-row lg:w-auto">
                  <button
                    type="button"
                    onClick={() => router.push(`/admin/sarpras/gedung/edit/${data.id}`)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 active:scale-[0.98] sm:h-11 sm:px-5"
                  >
                    <Edit size={16} className="sm:h-[17px] sm:w-[17px]" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 active:scale-[0.98] sm:h-11 sm:px-5"
                  >
                    <Trash2 size={16} className="sm:h-[17px] sm:w-[17px]" />
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(15,23,42,0.16)] transition-all hover:bg-slate-800 hover:shadow-[0_9px_22px_rgba(15,23,42,0.20)] active:scale-[0.98] sm:h-11 sm:px-5"
                  >
                    <Printer size={16} strokeWidth={2.3} className="sm:h-[17px] sm:w-[17px]" />
                    Cetak
                  </button>
                </div>
              </div>
            </section>

            {/* CONTENT */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {/* LEFT COLUMN - Info Utama */}
              <div className="space-y-5 lg:col-span-2">
                {/* DESKRIPSI */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] p-5 sm:p-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Deskripsi</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{data.deskripsi}</p>
                </section>

                {/* FASILITAS */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] p-5 sm:p-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Fasilitas</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.fasilitas?.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>

                {/* DAFTAR RUANGAN */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] overflow-hidden">
                  <div className="border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <DoorOpen size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Daftar Ruangan</p>
                        <p className="text-xs text-slate-400">
                          Total {data.ruangan?.length || 0} ruangan
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80">
                          <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                            Nama Ruangan
                          </th>
                          <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                            Lantai
                          </th>
                          <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                            Kapasitas
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {data.ruangan?.map((ruang, index) => (
                          <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                            <td className="px-4 py-3">
                              <span className="text-sm font-medium text-slate-800">{ruang.nama}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                                <Layers size={12} />
                                Lantai {ruang.lantai}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right text-sm text-slate-600">
                              {ruang.kapasitas} orang
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN - Sidebar Info */}
              <div className="space-y-5">
                {/* INFO CARD */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] p-5 sm:p-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Info size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Informasi Gedung</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Hash size={16} className="mt-0.5 shrink-0 text-slate-400" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">Kode Gedung</p>
                        <p className="text-sm font-semibold text-slate-800">{data.kode}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Layers size={16} className="mt-0.5 shrink-0 text-slate-400" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">Jumlah Lantai</p>
                        <p className="text-sm font-semibold text-slate-800">{data.jumlahLantai} Lantai</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Ruler size={16} className="mt-0.5 shrink-0 text-slate-400" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">Luas Gedung</p>
                        <p className="text-sm font-semibold text-slate-800">{data.luas}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users size={16} className="mt-0.5 shrink-0 text-slate-400" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">Kapasitas</p>
                        <p className="text-sm font-semibold text-slate-800">{data.kapasitas}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="mt-0.5 shrink-0 text-slate-400" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">Tahun Berdiri</p>
                        <p className="text-sm font-semibold text-slate-800">{data.tahunBerdiri}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* TIMESTAMP */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] p-5 sm:p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Dibuat</span>
                      <span className="font-medium text-slate-700">{data.created_at}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-3">
                      <span className="text-slate-500">Terakhir Diperbarui</span>
                      <span className="font-medium text-slate-700">{data.updated_at}</span>
                    </div>
                  </div>
                </section>

                {/* ACTION BUTTONS */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => router.push(`/admin/sarpras/gedung/edit/${data.id}`)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-600 transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-600 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                  >
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t border-slate-200/70 pt-4 text-center sm:pt-5">
              <p className="text-xs text-slate-400">© 2026 SmartSchool • Detail Gedung - Sarana & Prasarana</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}