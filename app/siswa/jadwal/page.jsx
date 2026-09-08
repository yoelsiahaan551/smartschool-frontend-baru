"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const hariList = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const tanggalHari = {
  Senin: "8 September 2025",
  Selasa: "9 September 2025",
  Rabu: "10 September 2025",
  Kamis: "11 September 2025",
  Jumat: "12 September 2025",
  Sabtu: "13 September 2025",
};

const jadwalMingguan = {
  Senin: [
    {
      id: 1,
      mulai: "07:00",
      selesai: "08:30",
      mapel: "Pemrograman Web",
      guru: "Budi Santoso, S.Kom",
      ruang: "Lab Komputer 1",
    },
    {
      id: 2,
      mulai: "08:45",
      selesai: "10:15",
      mapel: "Basis Data",
      guru: "Andi Wijaya, S.Kom",
      ruang: "Lab Komputer 2",
    },
    {
      id: 3,
      mulai: "10:30",
      selesai: "12:00",
      mapel: "Jaringan Komputer",
      guru: "Rina Marlina, S.Kom",
      ruang: "Lab Jaringan",
    },
    {
      id: 4,
      mulai: "13:00",
      selesai: "14:30",
      mapel: "Sistem Operasi",
      guru: "Dedi Kurniawan, S.Kom",
      ruang: "Ruang 4",
    },
  ],

  Selasa: [
    {
      id: 5,
      mulai: "07:00",
      selesai: "08:30",
      mapel: "Matematika",
      guru: "Siti Rahma, S.Pd",
      ruang: "Ruang 1",
    },
    {
      id: 6,
      mulai: "08:45",
      selesai: "10:15",
      mapel: "Bahasa Indonesia",
      guru: "Dewi Lestari, S.Pd",
      ruang: "Ruang 1",
    },
    {
      id: 7,
      mulai: "10:30",
      selesai: "12:00",
      mapel: "Pemrograman Dasar",
      guru: "Budi Santoso, S.Kom",
      ruang: "Lab Komputer 1",
    },
    {
      id: 8,
      mulai: "13:00",
      selesai: "14:30",
      mapel: "Pendidikan Agama",
      guru: "Drs. H. Mulyadi",
      ruang: "Ruang 2",
    },
  ],

  Rabu: [
    {
      id: 9,
      mulai: "07:00",
      selesai: "08:30",
      mapel: "UI/UX Design",
      guru: "Agus Setiawan, S.Ds",
      ruang: "Lab Multimedia",
    },
    {
      id: 10,
      mulai: "08:45",
      selesai: "10:15",
      mapel: "Bahasa Inggris",
      guru: "Rina Marlina, S.Pd",
      ruang: "Ruang 3",
    },
    {
      id: 11,
      mulai: "10:30",
      selesai: "12:00",
      mapel: "Analisis Sistem",
      guru: "Siti Rahma, S.Kom",
      ruang: "Ruang 5",
    },
  ],

  Kamis: [
    {
      id: 12,
      mulai: "07:00",
      selesai: "08:30",
      mapel: "Pemrograman Berorientasi Objek",
      guru: "Budi Santoso, S.Kom",
      ruang: "Lab Komputer 1",
    },
    {
      id: 13,
      mulai: "08:45",
      selesai: "10:15",
      mapel: "Basis Data Lanjutan",
      guru: "Andi Wijaya, S.Kom",
      ruang: "Lab Komputer 2",
    },
    {
      id: 14,
      mulai: "10:30",
      selesai: "12:00",
      mapel: "Kewirausahaan",
      guru: "Agus Setiawan, S.E",
      ruang: "Ruang 6",
    },
    {
      id: 15,
      mulai: "13:00",
      selesai: "14:30",
      mapel: "Pendidikan Pancasila",
      guru: "Dewi Lestari, S.Pd",
      ruang: "Ruang 2",
    },
  ],

  Jumat: [
    {
      id: 16,
      mulai: "07:00",
      selesai: "08:30",
      mapel: "PJOK",
      guru: "Hendra Saputra, S.Pd",
      ruang: "Lapangan",
    },
    {
      id: 17,
      mulai: "08:45",
      selesai: "10:15",
      mapel: "Pendidikan Agama",
      guru: "Drs. H. Mulyadi",
      ruang: "Ruang 2",
    },
    {
      id: 18,
      mulai: "10:30",
      selesai: "12:00",
      mapel: "Proyek Kreatif",
      guru: "Agus Setiawan, S.E",
      ruang: "Ruang 6",
    },
  ],

  Sabtu: [],
};

export default function JadwalSiswaPage() {
  const [hariAktif, setHariAktif] = useState("Senin");

  const jadwal = jadwalMingguan[hariAktif] || [];

  const pindahHari = (arah) => {
    const index = hariList.indexOf(hariAktif);

    const nextIndex =
      arah === "next"
        ? (index + 1) % hariList.length
        : (index - 1 + hariList.length) % hariList.length;

    setHariAktif(hariList[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* AREA KANAN */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* HEADER */}
        <Header />

        {/* CONTENT */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-6">
          {/* BREADCRUMB */}
          <div className="mb-3">
            <p className="text-sm text-slate-500">
              Akademik
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-slate-700">
                Jadwal Pelajaran
              </span>
            </p>
          </div>

          {/* TITLE */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <CalendarDays
                  size={24}
                  className="text-white"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Jadwal Pelajaran
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Lihat jadwal pelajaran kelas Anda.
                </p>
              </div>
            </div>

            {/* KELAS */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">
                Kelas
              </span>

              <span className="font-semibold text-slate-700">
                XII PPLG 1
              </span>
            </div>
          </div>

          {/* HARI */}
          <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => pindahHari("prev")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition"
              aria-label="Hari sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>

            {hariList.map((hari) => (
              <button
                type="button"
                key={hari}
                onClick={() => setHariAktif(hari)}
                className={`shrink-0 rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                  hariAktif === hari
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {hari}
              </button>
            ))}

            <button
              type="button"
              onClick={() => pindahHari("next")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition"
              aria-label="Hari berikutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* INFO HARI */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {hariAktif}, {tanggalHari[hariAktif]}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {jadwal.length} mata pelajaran hari ini
              </p>
            </div>
          </div>

          {/* JADWAL */}
          {jadwal.length > 0 ? (
            <>
              {/* DESKTOP */}
              <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="w-16 text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          No
                        </th>

                        <th className="w-48 text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Jam
                        </th>

                        <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Mata Pelajaran
                        </th>

                        <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Guru
                        </th>

                        <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Ruang
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {jadwal.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          {/* NO */}
                          <td className="px-5 py-5 text-sm font-medium text-slate-500">
                            {index + 1}
                          </td>

                          {/* JAM */}
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 whitespace-nowrap">
                              <Clock3
                                size={17}
                                className="text-blue-500 shrink-0"
                              />

                              <span>
                                {item.mulai} - {item.selesai}
                              </span>
                            </div>
                          </td>

                          {/* MAPEL */}
                          <td className="px-5 py-5">
                            <p className="text-sm font-semibold text-slate-800">
                              {item.mapel}
                            </p>
                          </td>

                          {/* GURU */}
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <UserRound
                                size={16}
                                className="text-slate-400 shrink-0"
                              />

                              <span>
                                {item.guru}
                              </span>
                            </div>
                          </td>

                          {/* RUANG */}
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <MapPin
                                size={16}
                                className="text-slate-400 shrink-0"
                              />

                              <span>
                                {item.ruang}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MOBILE */}
              <div className="md:hidden bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {jadwal.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4"
                    >
                      {/* HEADER ITEM */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-xs font-medium text-slate-400">
                          Pelajaran {index + 1}
                        </span>

                        <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 whitespace-nowrap">
                          <Clock3
                            size={15}
                            className="text-blue-500"
                          />

                          <span>
                            {item.mulai} - {item.selesai}
                          </span>
                        </div>
                      </div>

                      {/* MAPEL */}
                      <h3 className="text-base font-semibold text-slate-800 mb-3">
                        {item.mapel}
                      </h3>

                      {/* GURU */}
                      <div className="flex items-start gap-2 text-sm text-slate-500 mb-2">
                        <UserRound
                          size={15}
                          className="text-slate-400 mt-0.5 shrink-0"
                        />

                        <span>
                          {item.guru}
                        </span>
                      </div>

                      {/* RUANG */}
                      <div className="flex items-start gap-2 text-sm text-slate-500">
                        <MapPin
                          size={15}
                          className="text-slate-400 mt-0.5 shrink-0"
                        />

                        <span>
                          {item.ruang}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* EMPTY STATE */
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl px-5 py-16 text-center">
              <CalendarDays
                size={38}
                className="mx-auto text-slate-300 mb-3"
              />

              <p className="text-sm font-semibold text-slate-700">
                Tidak Ada Jadwal
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Tidak ada mata pelajaran untuk hari{" "}
                {hariAktif}.
              </p>
            </div>
          )}

          {/* INFO */}
          <div className="mt-5 flex items-start gap-2.5 text-sm text-slate-500">
            <Info
              size={17}
              className="mt-0.5 shrink-0 text-blue-500"
            />

            <p>
              Jadwal dapat berubah sewaktu-waktu sesuai
              informasi dari sekolah.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}