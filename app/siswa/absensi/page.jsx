"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Camera,
  RotateCcw,
  Check,
  X,
  ClipboardCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  FileText,
  Loader2,
} from "lucide-react";

// ...sisanya sama persis, tidak ada yang berubah

/**
 * Halaman Absensi Siswa (/siswa/absensi)
 *
 * Alur:
 * 1. Kalau belum absen hari ini -> tampil kartu kamera untuk foto absen masuk.
 * 2. Kalau sudah absen -> tampil status "Sudah Absen" + jam & foto.
 * 3. Ada juga opsi "Ajukan Izin/Sakit" buat hari ini kalau nggak masuk fisik.
 * 4. Di bawahnya, kalender bulan berjalan menampilkan status tiap hari
 *    (hadir/izin/sakit/alpa/libur) + rekap ringkas + riwayat terbaru.
 *
 * Data `attendanceLog` masih dummy (object tanggal -> status).
 * Ganti dengan data asli dari API. Foto hasil capture juga belum
 * di-upload ke server, cuma disimpan di state lokal sebagai contoh.
 */

const STATUS_STYLE = {
  hadir: { label: "Hadir", dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  izin: { label: "Izin", dot: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
  sakit: { label: "Sakit", dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
  alpa: { label: "Alpa", dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700" },
  libur: { label: "Libur", dot: "bg-slate-300", bg: "bg-slate-50", text: "text-slate-400" },
};

// Dummy rekap absensi bulan berjalan (key = tanggal, 1-31)
const attendanceLog = {
  1: "hadir", 2: "hadir", 3: "hadir", 4: "libur", 5: "libur",
  6: "hadir", 7: "hadir", 8: "izin", 9: "hadir", 10: "hadir",
  11: "libur", 12: "libur", 13: "hadir", 14: "hadir", 15: "sakit",
  16: "sakit", 17: "hadir", 18: "libur", 19: "libur", 20: "hadir",
};

const riwayatTerbaru = [
  { tanggal: "20 Agu 2026", status: "hadir", jam: "07:12", keterangan: "Absen otomatis via foto" },
  { tanggal: "17 Agu 2026", status: "hadir", jam: "06:58", keterangan: "Absen otomatis via foto" },
  { tanggal: "16 Agu 2026", status: "sakit", jam: "-", keterangan: "Demam, ada surat dokter" },
  { tanggal: "15 Agu 2026", status: "sakit", jam: "-", keterangan: "Demam" },
  { tanggal: "8 Agu 2026", status: "izin", jam: "-", keterangan: "Acara keluarga" },
];

const HARI = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function AbsensiSiswaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ==== State kamera & absen hari ini ====
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [sudahAbsen, setSudahAbsen] = useState(false);
  const [jamAbsen, setJamAbsen] = useState(null);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [showIzinForm, setShowIzinForm] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // ==== State kalender (bulan berjalan, dummy = Agustus 2026) ====
  const bulanIni = { nama: "Agustus 2026", jumlahHari: 31, hariPertama: 6 }; // 6 = Sabtu

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setLoadingCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      setCameraError("Kamera tidak bisa diakses. Pastikan izin kamera sudah diaktifkan.");
    } finally {
      setLoadingCamera(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    // Mirror biar sesuai preview (selfie-style)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedPhoto(dataUrl);
    stopCamera();
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const handleSubmitAbsen = () => {
    // TODO: upload `capturedPhoto` ke server + simpan absensi hari ini.
    const now = new Date();
    setJamAbsen(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    setSudahAbsen(true);
  };

  const handleReset = () => {
    setSudahAbsen(false);
    setCapturedPhoto(null);
    setJamAbsen(null);
  };

  // Susun grid kalender: null utk padding sebelum tanggal 1
  const calendarCells = [
    ...Array(bulanIni.hariPertama).fill(null),
    ...Array.from({ length: bulanIni.jumlahHari }, (_, i) => i + 1),
  ];

  const rekap = Object.values(attendanceLog).reduce((acc, status) => {
    if (status === "libur") return acc;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const notifications = [
    { id: 1, title: "Jangan lupa absen hari ini", desc: "Absen ditutup pukul 08:00", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        role="siswa"
        active="absensi"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Andi Saputra", email: "siswa@smartschool.com", avatar: "AS" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-7xl mx-auto space-y-6">

            {/* PAGE HEADER */}
            <div>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Kamis, 20 Agustus 2026</p>
              <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 mt-1 tracking-tight">
                Absensi
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Absen masuk pakai foto, atau ajukan izin/sakit kalau tidak masuk hari ini.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* ==== KARTU ABSEN HARI INI ==== */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5 flex flex-col">
                <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <ClipboardCheck size={16} className="text-blue-600" />
                  Absen Masuk
                </h2>

                {/* SUDAH ABSEN */}
                {sudahAbsen ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                      <Check size={28} strokeWidth={2.5} />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">Kamu sudah absen hari ini</p>
                    <p className="text-xs text-slate-500 mt-1">Tercatat pukul {jamAbsen} &middot; Hadir</p>
                    {capturedPhoto && (
                      <img
                        src={capturedPhoto}
                        alt="Foto absen"
                        className="mt-4 w-32 h-32 object-cover rounded-xl border border-slate-200"
                      />
                    )}
                    <button
                      onClick={handleReset}
                      className="mt-4 text-xs font-medium text-slate-400 hover:text-slate-600"
                    >
                      Reset (khusus demo)
                    </button>
                  </div>
                ) : showIzinForm ? (
                  /* ==== FORM IZIN/SAKIT ==== */
                  <IzinForm
                    onCancel={() => setShowIzinForm(false)}
                    onSubmit={() => setShowIzinForm(false)}
                  />
                ) : (
                  /* ==== BELUM ABSEN: KAMERA ==== */
                  <div className="flex-1 flex flex-col mt-4">
                    <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
                      {capturedPhoto ? (
                        <img
                          src={capturedPhoto}
                          alt="Preview foto absen"
                          className="w-full h-full object-cover"
                        />
                      ) : cameraActive ? (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover scale-x-[-1]"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400 px-4 text-center">
                          <Camera size={28} />
                          <span className="text-xs">
                            {loadingCamera ? "Membuka kamera..." : "Kamera belum aktif"}
                          </span>
                        </div>
                      )}
                      <canvas ref={canvasRef} className="hidden" />
                    </div>

                    {cameraError && (
                      <p className="text-xs text-red-500 mt-2">{cameraError}</p>
                    )}

                    <div className="mt-4 space-y-2">
                      {capturedPhoto ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleRetake}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors rounded-xl py-2.5"
                          >
                            <RotateCcw size={15} /> Ambil Ulang
                          </button>
                          <button
                            onClick={handleSubmitAbsen}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl py-2.5"
                          >
                            <Check size={15} /> Kirim Absen
                          </button>
                        </div>
                      ) : cameraActive ? (
                        <button
                          onClick={handleCapture}
                          className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl py-2.5"
                        >
                          <Camera size={15} /> Ambil Foto
                        </button>
                      ) : (
                        <button
                          onClick={startCamera}
                          disabled={loadingCamera}
                          className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition-colors rounded-xl py-2.5"
                        >
                          {loadingCamera ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <Camera size={15} />
                          )}
                          Nyalakan Kamera
                        </button>
                      )}

                      <button
                        onClick={() => setShowIzinForm(true)}
                        className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors py-2"
                      >
                        <FileText size={14} /> Tidak masuk? Ajukan Izin/Sakit
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ==== KALENDER + REKAP ==== */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <CalendarDays size={16} className="text-blue-600" />
                      Kalender Absensi
                    </h2>
                    <div className="flex items-center gap-3">
                      <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-xs font-medium text-slate-600 w-24 text-center">
                        {bulanIni.nama}
                      </span>
                      <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                        <ChevronRightIcon size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {HARI.map((h) => (
                      <div key={h} className="text-center text-[11px] font-medium text-slate-400 pb-1">
                        {h}
                      </div>
                    ))}
                    {calendarCells.map((day, i) => {
                      if (!day) return <div key={`pad-${i}`} />;
                      const status = attendanceLog[day] || (day > 20 ? null : "libur");
                      const style = status ? STATUS_STYLE[status] : null;
                      const isToday = day === 20;
                      return (
                        <div
                          key={day}
                          className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5 text-xs
                            ${style ? style.bg : "bg-white"}
                            ${isToday ? "ring-2 ring-blue-500" : "border border-slate-100"}
                          `}
                        >
                          <span className={`font-medium ${style ? style.text : "text-slate-400"}`}>
                            {day}
                          </span>
                          {style && status !== "libur" && (
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Legenda */}
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-100">
                    {Object.entries(STATUS_STYLE).map(([key, s]) => (
                      <div key={key} className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span className="text-[11px] text-slate-500">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* REKAP RINGKAS */}
                <div className="grid grid-cols-3 gap-3">
                  {["hadir", "izin", "sakit"].map((key) => {
                    const s = STATUS_STYLE[key];
                    return (
                      <div key={key} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-4 text-center">
                        <p className="text-2xl font-bold text-slate-900">{rekap[key] || 0}</p>
                        <div className="flex items-center justify-center gap-1.5 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          <span className="text-xs text-slate-500">{s.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIWAYAT TERBARU */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800">Riwayat Terbaru</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {riwayatTerbaru.map((item, i) => {
                  const s = STATUS_STYLE[item.status];
                  return (
                    <div key={i} className="flex items-center justify-between gap-3 px-5 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-lg flex-shrink-0 ${s.bg} ${s.text}`}>
                          {s.label}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm text-slate-700 truncate">{item.keterangan}</p>
                          <p className="text-xs text-slate-400">{item.tanggal}{item.jam !== "-" ? ` · ${item.jam}` : ""}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// ==== Sub-komponen form Izin/Sakit ====
function IzinForm({ onCancel, onSubmit }) {
  const [jenis, setJenis] = useState("izin");
  const [keterangan, setKeterangan] = useState("");

  return (
    <div className="flex-1 flex flex-col mt-4">
      <div className="flex gap-2">
        {["izin", "sakit"].map((j) => (
          <button
            key={j}
            onClick={() => setJenis(j)}
            className={`flex-1 text-sm font-medium py-2 rounded-xl border transition-colors ${
              jenis === j
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            {j === "izin" ? "Izin" : "Sakit"}
          </button>
        ))}
      </div>

      <textarea
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
        placeholder="Tulis alasan singkat..."
        rows={4}
        className="mt-3 w-full text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
      />

      <div className="flex gap-2 mt-3">
        <button
          onClick={onCancel}
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors rounded-xl py-2.5"
        >
          <X size={15} /> Batal
        </button>
        <button
          onClick={onSubmit}
          disabled={!keterangan.trim()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors rounded-xl py-2.5"
        >
          <Check size={15} /> Kirim
        </button>
      </div>
    </div>
  );
}