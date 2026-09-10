"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

import {
  Search,
  Plus,
  Users,
  Eye,
  Edit3,
  Trash2,
  Download,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  UserRound,
  School,
  GraduationCap,
  CalendarDays,
  Phone,
  Mail,
  MapPin,
  FileCheck2,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const DATA = [
  {
    id: 1,
    nomor: "SPMB-2026-0001",
    nama: "Ahmad Fauzan",
    nisn: "0123456789",
    asalSekolah: "SMP Negeri 1 Jakarta",
    jurusan: "IPA",
    gelombang: "Gelombang 1",
    tanggal: "09 September 2026",
    status: "Terverifikasi",
    pembayaran: "Lunas",
    telepon: "081234567890",
    email: "ahmad@email.com",
    alamat: "Jakarta Timur",
  },
  {
    id: 2,
    nomor: "SPMB-2026-0002",
    nama: "Siti Rahma",
    nisn: "0123456790",
    asalSekolah: "SMP Negeri 5 Jakarta",
    jurusan: "IPS",
    gelombang: "Gelombang 1",
    tanggal: "09 September 2026",
    status: "Menunggu Verifikasi",
    pembayaran: "Lunas",
    telepon: "081298765432",
    email: "siti@email.com",
    alamat: "Jakarta Selatan",
  },
  {
    id: 3,
    nomor: "SPMB-2026-0003",
    nama: "Budi Santoso",
    nisn: "0123456791",
    asalSekolah: "SMP Negeri 8 Jakarta",
    jurusan: "Teknik",
    gelombang: "Gelombang 1",
    tanggal: "08 September 2026",
    status: "Terverifikasi",
    pembayaran: "Lunas",
    telepon: "082112345678",
    email: "budi@email.com",
    alamat: "Jakarta Barat",
  },
  {
    id: 4,
    nomor: "SPMB-2026-0004",
    nama: "Nabila Putri",
    nisn: "0123456792",
    asalSekolah: "SMP Negeri 3 Jakarta",
    jurusan: "IPA",
    gelombang: "Gelombang 2",
    tanggal: "08 September 2026",
    status: "Menunggu Verifikasi",
    pembayaran: "Belum Lunas",
    telepon: "083112345678",
    email: "nabila@email.com",
    alamat: "Jakarta Pusat",
  },
  {
    id: 5,
    nomor: "SPMB-2026-0005",
    nama: "Fajar Hidayat",
    nisn: "0123456793",
    asalSekolah: "SMP Negeri 10 Jakarta",
    jurusan: "IPS",
    gelombang: "Gelombang 2",
    tanggal: "07 September 2026",
    status: "Ditolak",
    pembayaran: "Lunas",
    telepon: "085612345678",
    email: "fajar@email.com",
    alamat: "Jakarta Utara",
  },
  {
    id: 6,
    nomor: "SPMB-2026-0006",
    nama: "Sarah Aulia",
    nisn: "0123456794",
    asalSekolah: "SMP Negeri 12 Jakarta",
    jurusan: "IPA",
    gelombang: "Gelombang 2",
    tanggal: "07 September 2026",
    status: "Terverifikasi",
    pembayaran: "Lunas",
    telepon: "087712345678",
    email: "sarah@email.com",
    alamat: "Jakarta Timur",
  },
  {
    id: 7,
    nomor: "SPMB-2026-0007",
    nama: "Rizky Pratama",
    nisn: "0123456795",
    asalSekolah: "SMP Negeri 7 Jakarta",
    jurusan: "Teknik",
    gelombang: "Gelombang 2",
    tanggal: "06 September 2026",
    status: "Menunggu Verifikasi",
    pembayaran: "Lunas",
    telepon: "081987654321",
    email: "rizky@email.com",
    alamat: "Jakarta Selatan",
  },
  {
    id: 8,
    nomor: "SPMB-2026-0008",
    nama: "Putri Amelia",
    nisn: "0123456796",
    asalSekolah: "SMP Negeri 2 Jakarta",
    jurusan: "IPA",
    gelombang: "Gelombang 2",
    tanggal: "05 September 2026",
    status: "Terverifikasi",
    pembayaran: "Lunas",
    telepon: "082298765432",
    email: "putri@email.com",
    alamat: "Jakarta Barat",
  },
];

function StatusBadge({ status }) {
  const config = {
    Terverifikasi:
      "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Menunggu Verifikasi":
      "bg-amber-50 text-amber-700 border-amber-100",
    Ditolak:
      "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-[10px] font-semibold ${
        config[status] || config["Menunggu Verifikasi"]
      }`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({ status }) {
  return (
    <span
      className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${
        status === "Lunas"
          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
          : "border-red-100 bg-red-50 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function PendaftaranPage() {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");
  const [gelombang, setGelombang] = useState("Semua");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return DATA.filter((item) => {
      const q = search.toLowerCase();

      return (
        (!q ||
          item.nama.toLowerCase().includes(q) ||
          item.nisn.includes(q) ||
          item.nomor.toLowerCase().includes(q) ||
          item.asalSekolah.toLowerCase().includes(q)) &&
        (status === "Semua" || item.status === status) &&
        (gelombang === "Semua" ||
          item.gelombang === gelombang)
      );
    });
  }, [search, status, gelombang]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <Sidebar
        active="spmb"
        setActive={() => {}}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        role="admin"
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0">
          <Header
            toggleSidebar={() =>
              setCollapsed((v) => !v)
            }
            notifications={[]}
            user={{
              name: "Admin Sekolah",
              email: "admin@smartschool.com",
              avatar: "AD",
            }}
          />
        </div>

        <main className="min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full min-h-0 flex-col p-4 sm:p-5 lg:p-6">
            {/* HEADER */}

            <div className="mb-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf1ff]">
                  <Users
                    size={20}
                    className="text-[#155DFC]"
                  />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-800">
                    Data Pendaftaran
                  </h1>

                  <p className="text-xs text-slate-500">
                    Kelola seluruh data calon siswa SPMB
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Download size={15} />
                  Export
                </button>

                <button
                  onClick={() =>
                    router.push(
                      "/admin/spmb/data-pendaftaran/tambah"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d47c9]"
                >
                  <Plus size={16} />
                  Tambah Pendaftar
                </button>
              </div>
            </div>

            {/* STAT */}

            <div className="mb-4 grid shrink-0 grid-cols-2 gap-3 lg:grid-cols-4">
              <Stat
                title="Total Pendaftar"
                value="248"
                icon={Users}
              />

              <Stat
                title="Terverifikasi"
                value="186"
                icon={CheckCircle2}
              />

              <Stat
                title="Menunggu"
                value="47"
                icon={Clock3}
              />

              <Stat
                title="Ditolak"
                value="15"
                icon={XCircle}
              />
            </div>

            {/* TABLE */}

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex shrink-0 flex-col gap-3 border-b border-slate-100 p-4 xl:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Cari nama, NISN, nomor pendaftaran..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#8bb4ff] focus:bg-white focus:ring-2 focus:ring-[#155DFC]/10"
                  />
                </div>

                <select
                  value={gelombang}
                  onChange={(e) =>
                    setGelombang(e.target.value)
                  }
                  className="h-10 rounded-lg border border-slate-200 px-3 text-xs text-slate-600 outline-none"
                >
                  <option>Semua</option>
                  <option>Gelombang 1</option>
                  <option>Gelombang 2</option>
                </select>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="h-10 rounded-lg border border-slate-200 px-3 text-xs text-slate-600 outline-none"
                >
                  <option>Semua</option>
                  <option>Terverifikasi</option>
                  <option>Menunggu Verifikasi</option>
                  <option>Ditolak</option>
                </select>

                <button
                  onClick={() => {
                    setSearch("");
                    setStatus("Semua");
                    setGelombang("Semua");
                  }}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-xs text-slate-500 hover:bg-slate-50"
                >
                  <RefreshCw size={14} />
                  Reset
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-auto">
                <table className="w-full min-w-[1100px]">
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <Th>Pendaftar</Th>
                      <Th>Asal Sekolah</Th>
                      <Th>Jurusan</Th>
                      <Th>Gelombang</Th>
                      <Th>Tanggal</Th>
                      <Th>Pembayaran</Th>
                      <Th>Status</Th>
                      <Th>Aksi</Th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/70"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf1ff] text-xs font-bold text-[#155DFC]">
                              {item.nama
                                .split(" ")
                                .map((x) => x[0])
                                .slice(0, 2)
                                .join("")}
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-700">
                                {item.nama}
                              </p>

                              <p className="text-[10px] text-slate-400">
                                {item.nomor}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <p className="max-w-[190px] truncate text-xs font-medium text-slate-600">
                            {item.asalSekolah}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            NISN {item.nisn}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                            {item.jurusan}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-xs text-slate-500">
                          {item.gelombang}
                        </td>

                        <td className="px-4 py-3 text-xs text-slate-500">
                          {item.tanggal}
                        </td>

                        <td className="px-4 py-3">
                          <PaymentBadge
                            status={item.pembayaran}
                          />
                        </td>

                        <td className="px-4 py-3">
                          <StatusBadge
                            status={item.status}
                          />
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() =>
                                setSelected(item)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-[#eaf1ff] hover:text-[#155DFC]"
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              onClick={() =>
                                router.push(
                                  `/admin/spmb/pendaftaran/${item.id}/edit`
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-[#eaf1ff] hover:text-[#155DFC]"
                            >
                              <Edit3 size={15} />
                            </button>

                            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex shrink-0 items-center justify-between border-t border-slate-100 px-4 py-3">
                <p className="text-xs text-slate-400">
                  Menampilkan {filtered.length} dari 248 data
                </p>

                <div className="flex gap-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
                    <ChevronLeft size={15} />
                  </button>

                  <button className="h-8 min-w-8 rounded-lg bg-[#155DFC] px-2 text-xs font-semibold text-white">
                    1
                  </button>

                  <button className="h-8 min-w-8 rounded-lg px-2 text-xs text-slate-500 hover:bg-slate-100">
                    2
                  </button>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* DETAIL MODAL */}

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Detail Pendaftar
                </h2>
                <p className="text-xs text-slate-400">
                  Informasi calon siswa SPMB
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto p-5">
              <div className="flex items-center gap-3 rounded-xl border border-[#c7dbff] bg-[#f5f8ff] p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white font-bold text-[#155DFC]">
                  {selected.nama
                    .split(" ")
                    .map((x) => x[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="flex-1">
                  <p className="font-bold text-slate-800">
                    {selected.nama}
                  </p>
                  <p className="text-xs text-slate-400">
                    {selected.nomor}
                  </p>
                </div>

                <StatusBadge
                  status={selected.status}
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Detail
                  icon={UserRound}
                  label="Nama Lengkap"
                  value={selected.nama}
                />
                <Detail
                  icon={FileCheck2}
                  label="NISN"
                  value={selected.nisn}
                />
                <Detail
                  icon={School}
                  label="Asal Sekolah"
                  value={selected.asalSekolah}
                />
                <Detail
                  icon={GraduationCap}
                  label="Jurusan"
                  value={selected.jurusan}
                />
                <Detail
                  icon={CalendarDays}
                  label="Tanggal Pendaftaran"
                  value={selected.tanggal}
                />
                <Detail
                  icon={Phone}
                  label="No. Telepon"
                  value={selected.telepon}
                />
                <Detail
                  icon={Mail}
                  label="Email"
                  value={selected.email}
                />
                <Detail
                  icon={MapPin}
                  label="Alamat"
                  value={selected.alamat}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Tutup
              </button>

              <button
                onClick={() =>
                  router.push(
                    `/admin/spmb/pendaftaran/${selected.id}/edit`
                  )
                }
                className="rounded-lg bg-[#155DFC] px-4 py-2 text-xs font-semibold text-white"
              >
                Edit Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf1ff]">
          <Icon
            size={18}
            className="text-[#155DFC]"
          />
        </div>
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">
      {children}
    </th>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex gap-2.5">
        <Icon
          size={15}
          className="mt-0.5 text-slate-400"
        />

        <div>
          <p className="text-[10px] uppercase text-slate-400">
            {label}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-slate-700">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}