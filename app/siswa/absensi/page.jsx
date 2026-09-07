"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useSearchParams } from "next/navigation";

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
  AlertCircle,
} from "lucide-react";

import {
  getAbsensiSaya,
  absenDenganFace,
  absenManual,
} from "../../../services/absensi.service";

const STATUS_STYLE = {
  hadir: {
    label: "Hadir",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },

  izin: {
    label: "Izin",
    dot: "bg-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },

  sakit: {
    label: "Sakit",
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },

  alpha: {
    label: "Alpha",
    dot: "bg-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
  },

  alpa: {
    label: "Alpha",
    dot: "bg-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
  },

  libur: {
    label: "Libur",
    dot: "bg-slate-300",
    bg: "bg-slate-50",
    text: "text-slate-400",
  },
};

const HARI = [
  "Min",
  "Sen",
  "Sel",
  "Rab",
  "Kam",
  "Jum",
  "Sab",
];

export default function AbsensiSiswaPage() {
  const searchParams = useSearchParams();

  // =========================
  // KELAS ID DARI URL
  // =========================
  const kelasId = searchParams.get("kelasId");

  // =========================
  // SIDEBAR
  // =========================
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // =========================
  // DATA ABSENSI DARI BE
  // =========================
  const [absensiData, setAbsensiData] = useState([]);
  const [loadingAbsensi, setLoadingAbsensi] = useState(true);
  const [absensiError, setAbsensiError] = useState(null);

  // =========================
  // KAMERA
  // =========================
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [sudahAbsen, setSudahAbsen] = useState(false);
  const [jamAbsen, setJamAbsen] = useState(null);

  const [loadingCamera, setLoadingCamera] = useState(false);
  const [submittingAbsensi, setSubmittingAbsensi] = useState(false);

  const [cameraError, setCameraError] = useState(null);

  const [showIzinForm, setShowIzinForm] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // =========================
  // TANGGAL SEKARANG
  // =========================
  const sekarang = new Date();

  const bulanSekarang = sekarang.getMonth();
  const tahunSekarang = sekarang.getFullYear();

  const namaBulan = sekarang.toLocaleDateString(
    "id-ID",
    {
      month: "long",
      year: "numeric",
    },
  );

  const tanggalHariIni = sekarang.getDate();

  // =========================
  // LOAD DATA ABSENSI
  // =========================
  const fetchAbsensi = useCallback(async () => {
    try {
      setLoadingAbsensi(true);
      setAbsensiError(null);

      const data = await getAbsensiSaya();

      const dataArray = Array.isArray(data)
        ? data
        : [];

      setAbsensiData(dataArray);

      // =========================
      // CEK SUDAH ABSEN HARI INI
      // =========================
      const today = new Date();

      const sudahAdaHariIni = dataArray.find(
        (item) => {
          if (!item?.tanggal) return false;

          const tanggal = new Date(item.tanggal);

          return (
            tanggal.getFullYear() ===
              today.getFullYear() &&
            tanggal.getMonth() ===
              today.getMonth() &&
            tanggal.getDate() ===
              today.getDate()
          );
        },
      );

      if (sudahAdaHariIni) {
        setSudahAbsen(true);

        if (sudahAdaHariIni.dibuatPada) {
          setJamAbsen(
            new Date(
              sudahAdaHariIni.dibuatPada,
            ).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          );
        }
      } else {
        setSudahAbsen(false);
        setJamAbsen(null);
      }
    } catch (error) {
      console.error(
        "Error fetch absensi:",
        error,
      );

      setAbsensiError(
        error?.message ||
          "Gagal mengambil data absensi.",
      );
    } finally {
      setLoadingAbsensi(false);
    }
  }, []);

  useEffect(() => {
    fetchAbsensi();
  }, [fetchAbsensi]);

  // =========================
  // START CAMERA
  // =========================
  const startCamera = useCallback(async () => {
    setCameraError(null);
    setLoadingCamera(true);

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "Browser tidak mendukung kamera.",
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraActive(true);
    } catch (error) {
      console.error(
        "Camera error:",
        error,
      );

      setCameraError(
        error?.message ||
          "Kamera tidak bisa diakses. Pastikan izin kamera sudah diaktifkan.",
      );
    } finally {
      setLoadingCamera(false);
    }
  }, []);

  // =========================
  // STOP CAMERA
  // =========================
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;
    }

    setCameraActive(false);
  }, []);

  // =========================
  // CLEANUP CAMERA
  // =========================
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });
      }
    };
  }, []);

  // =========================
  // CAPTURE FOTO
  // =========================
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    if (
      !video.videoWidth ||
      !video.videoHeight
    ) {
      setCameraError(
        "Kamera belum siap. Tunggu sebentar lalu coba lagi.",
      );

      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setCameraError(
        "Gagal mengambil gambar dari kamera.",
      );

      return;
    }

    // Mirror seperti preview selfie
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    const dataUrl = canvas.toDataURL(
      "image/jpeg",
      0.9,
    );

    setCapturedPhoto(dataUrl);

    stopCamera();
  };

  // =========================
  // RETAKE
  // =========================
  const handleRetake = () => {
    setCapturedPhoto(null);
    setCameraError(null);
    startCamera();
  };

  // =========================
  // AMBIL GPS
  // =========================
  const getCurrentLocation = () => {
    return new Promise(
      (resolve, reject) => {
        if (
          typeof navigator ===
            "undefined" ||
          !navigator.geolocation
        ) {
          reject(
            new Error(
              "Browser tidak mendukung akses lokasi.",
            ),
          );

          return;
        }

        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(
                  new Error(
                    "Akses lokasi ditolak. Silakan izinkan lokasi pada browser.",
                  ),
                );
                break;

              case error.POSITION_UNAVAILABLE:
                reject(
                  new Error(
                    "Lokasi tidak tersedia.",
                  ),
                );
                break;

              case error.TIMEOUT:
                reject(
                  new Error(
                    "Waktu mengambil lokasi habis.",
                  ),
                );
                break;

              default:
                reject(
                  new Error(
                    "Gagal mendapatkan lokasi.",
                  ),
                );
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        );
      },
    );
  };

  // =========================
  // KIRIM ABSEN FOTO
  // =========================
  const handleSubmitAbsen = async () => {
    if (!capturedPhoto) {
      setCameraError(
        "Silakan ambil foto terlebih dahulu.",
      );

      return;
    }

    if (!kelasId) {
      setCameraError(
        "Kelas ID tidak ditemukan. Buka halaman absensi dengan kelasId yang valid.",
      );

      return;
    }

    try {
      setSubmittingAbsensi(true);
      setCameraError(null);

      // =========================
      // 1. GPS
      // =========================
      const position =
        await getCurrentLocation();

      // =========================
      // 2. DATA URL -> BLOB
      // =========================
      const response = await fetch(
        capturedPhoto,
      );

      const blob = await response.blob();

      // =========================
      // 3. KIRIM KE BE
      // =========================
      await absenDenganFace({
        kelasId,
        snapshot: blob,
        status: "hadir",
        keterangan:
          "Absen masuk melalui foto",
      });

      // =========================
      // 4. UI
      // =========================
      const now = new Date();

      setJamAbsen(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      setSudahAbsen(true);

      // =========================
      // 5. REFRESH DATA BE
      // =========================
      await fetchAbsensi();
    } catch (error) {
      console.error(
        "Error submit absensi:",
        error,
      );

      setCameraError(
        error?.message ||
          "Gagal mengirim absensi.",
      );
    } finally {
      setSubmittingAbsensi(false);
    }
  };

  // =========================
  // RESET DEMO
  // =========================
  const handleReset = () => {
    setSudahAbsen(false);
    setCapturedPhoto(null);
    setJamAbsen(null);
  };

  // =========================
  // DATA KALENDER DARI BE
  // =========================
  const attendanceLog = useMemo(() => {
    const result = {};

    absensiData.forEach((item) => {
      if (!item?.tanggal) return;

      const tanggal = new Date(
        item.tanggal,
      );

      // Hanya bulan & tahun sekarang
      if (
        tanggal.getMonth() !==
          bulanSekarang ||
        tanggal.getFullYear() !==
          tahunSekarang
      ) {
        return;
      }

      result[tanggal.getDate()] =
        item.status;
    });

    return result;
  }, [
    absensiData,
    bulanSekarang,
    tahunSekarang,
  ]);

  // =========================
  // JUMLAH HARI DALAM BULAN
  // =========================
  const jumlahHari =
    new Date(
      tahunSekarang,
      bulanSekarang + 1,
      0,
    ).getDate();

  // =========================
  // HARI PERTAMA BULAN
  // =========================
  const hariPertama =
    new Date(
      tahunSekarang,
      bulanSekarang,
      1,
    ).getDay();

  // =========================
  // GRID KALENDER
  // =========================
  const calendarCells = [
    ...Array(hariPertama).fill(null),
    ...Array.from(
      {
        length: jumlahHari,
      },
      (_, i) => i + 1,
    ),
  ];

  // =========================
  // REKAP
  // =========================
  const rekap = useMemo(() => {
    const result = {
      hadir: 0,
      izin: 0,
      sakit: 0,
      alpha: 0,
    };

    absensiData.forEach((item) => {
      if (!item?.tanggal) return;

      const tanggal = new Date(
        item.tanggal,
      );

      if (
        tanggal.getMonth() !==
          bulanSekarang ||
        tanggal.getFullYear() !==
          tahunSekarang
      ) {
        return;
      }

      const status =
        item.status === "alpa"
          ? "alpha"
          : item.status;

      if (
        Object.prototype.hasOwnProperty.call(
          result,
          status,
        )
      ) {
        result[status] += 1;
      }
    });

    return result;
  }, [
    absensiData,
    bulanSekarang,
    tahunSekarang,
  ]);

  // =========================
  // RIWAYAT TERBARU
  // =========================
  const riwayatTerbaru = useMemo(() => {
    return [...absensiData]
      .sort(
        (a, b) =>
          new Date(b.dibuatPada || b.tanggal) -
          new Date(a.dibuatPada || a.tanggal),
      )
      .slice(0, 5)
      .map((item) => {
        const status =
          item.status === "alpa"
            ? "alpha"
            : item.status;

        return {
          tanggal: item.tanggal
            ? new Date(
                item.tanggal,
              ).toLocaleDateString(
                "id-ID",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                },
              )
            : "-",

          status,

          jam: item.dibuatPada
            ? new Date(
                item.dibuatPada,
              ).toLocaleTimeString(
                "id-ID",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )
            : "-",

          keterangan:
            item.keterangan ||
            `Absensi melalui ${
              item.metode || "-"
            }`,
        };
      });
  }, [absensiData]);

  const notifications = [
    {
      id: 1,
      title: "Jangan lupa absen hari ini",
      desc: "Pastikan absensi kamu sudah tercatat.",
      read: false,
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* =========================
          SIDEBAR
      ========================= */}
      <Sidebar
        role="siswa"
        active="absensi"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* =========================
            HEADER
        ========================= */}
        <Header
          toggleSidebar={() =>
            setSidebarOpen(!sidebarOpen)
          }
          notifications={notifications}
          user={{
            name: "Andi Saputra",
            email: "siswa@smartschool.com",
            avatar: "AS",
          }}
        />

        {/* =========================
            MAIN
        ========================= */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-7xl mx-auto space-y-6">
            {/* =========================
                PAGE HEADER
            ========================= */}
            <div>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                {sekarang.toLocaleDateString(
                  "id-ID",
                  {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </p>

              <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 mt-1 tracking-tight">
                Absensi
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Absen masuk pakai foto, atau
                ajukan izin/sakit kalau tidak
                masuk hari ini.
              </p>
            </div>

            {/* =========================
                ERROR DATA
            ========================= */}
            {absensiError && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 rounded-xl p-4">
                <AlertCircle
                  size={18}
                  className="mt-0.5 flex-shrink-0"
                />

                <div>
                  <p className="text-sm font-medium">
                    Gagal mengambil data
                    absensi
                  </p>

                  <p className="text-xs mt-1">
                    {absensiError}
                  </p>

                  <button
                    onClick={fetchAbsensi}
                    className="text-xs font-medium underline mt-2"
                  >
                    Coba lagi
                  </button>
                </div>
              </div>
            )}

            {/* =========================
                GRID
            ========================= */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* =========================
                  KARTU ABSEN HARI INI
              ========================= */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5 flex flex-col">
                <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <ClipboardCheck
                    size={16}
                    className="text-blue-600"
                  />

                  Absen Masuk
                </h2>

                {/* =========================
                    LOADING
                ========================= */}
                {loadingAbsensi ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-10">
                    <Loader2
                      size={28}
                      className="animate-spin text-blue-600"
                    />

                    <p className="text-xs text-slate-500 mt-3">
                      Memuat data absensi...
                    </p>
                  </div>
                ) : sudahAbsen ? (
                  /* =========================
                     SUDAH ABSEN
                  ========================= */
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                      <Check
                        size={28}
                        strokeWidth={2.5}
                      />
                    </div>

                    <p className="text-sm font-semibold text-slate-800">
                      Kamu sudah absen hari ini
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Tercatat pukul{" "}
                      {jamAbsen || "-"} · Hadir
                    </p>

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
                  /* =========================
                     FORM IZIN / SAKIT
                  ========================= */
                  <IzinForm
                    kelasId={kelasId}
                    onCancel={() =>
                      setShowIzinForm(false)
                    }
                    onSuccess={async () => {
                      setShowIzinForm(false);
                      await fetchAbsensi();
                    }}
                  />
                ) : (
                  /* =========================
                     KAMERA
                  ========================= */
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
                            {loadingCamera
                              ? "Membuka kamera..."
                              : "Kamera belum aktif"}
                          </span>
                        </div>
                      )}

                      <canvas
                        ref={canvasRef}
                        className="hidden"
                      />
                    </div>

                    {cameraError && (
                      <div className="flex items-start gap-2 mt-2 text-red-500">
                        <AlertCircle
                          size={14}
                          className="mt-0.5 flex-shrink-0"
                        />

                        <p className="text-xs">
                          {cameraError}
                        </p>
                      </div>
                    )}

                    {!kelasId && (
                      <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
                        <p className="text-xs text-amber-700">
                          Kelas ID belum tersedia.
                          Halaman harus dibuka
                          dengan parameter{" "}
                          <b>kelasId</b>.
                        </p>
                      </div>
                    )}

                    <div className="mt-4 space-y-2">
                      {capturedPhoto ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleRetake}
                            disabled={
                              submittingAbsensi
                            }
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-colors rounded-xl py-2.5"
                          >
                            <RotateCcw
                              size={15}
                            />

                            Ambil Ulang
                          </button>

                          <button
                            onClick={
                              handleSubmitAbsen
                            }
                            disabled={
                              submittingAbsensi ||
                              !kelasId
                            }
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors rounded-xl py-2.5"
                          >
                            {submittingAbsensi ? (
                              <>
                                <Loader2
                                  size={15}
                                  className="animate-spin"
                                />

                                Mengirim...
                              </>
                            ) : (
                              <>
                                <Check
                                  size={15}
                                />

                                Kirim Absen
                              </>
                            )}
                          </button>
                        </div>
                      ) : cameraActive ? (
                        <button
                          onClick={handleCapture}
                          className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl py-2.5"
                        >
                          <Camera
                            size={15}
                          />

                          Ambil Foto
                        </button>
                      ) : (
                        <button
                          onClick={startCamera}
                          disabled={loadingCamera}
                          className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition-colors rounded-xl py-2.5"
                        >
                          {loadingCamera ? (
                            <Loader2
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Camera
                              size={15}
                            />
                          )}

                          {loadingCamera
                            ? "Membuka Kamera..."
                            : "Nyalakan Kamera"}
                        </button>
                      )}

                      <button
                        onClick={() =>
                          setShowIzinForm(true)
                        }
                        disabled={
                          submittingAbsensi
                        }
                        className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 disabled:opacity-50 transition-colors py-2"
                      >
                        <FileText
                          size={14}
                        />

                        Tidak masuk? Ajukan
                        Izin/Sakit
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* =========================
                  KALENDER + REKAP
              ========================= */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <CalendarDays
                        size={16}
                        className="text-blue-600"
                      />

                      Kalender Absensi
                    </h2>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
                      >
                        <ChevronLeft
                          size={16}
                        />
                      </button>

                      <span className="text-xs font-medium text-slate-600 w-24 text-center">
                        {namaBulan}
                      </span>

                      <button
                        type="button"
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
                      >
                        <ChevronRightIcon
                          size={16}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {HARI.map((h) => (
                      <div
                        key={h}
                        className="text-center text-[11px] font-medium text-slate-400 pb-1"
                      >
                        {h}
                      </div>
                    ))}

                    {calendarCells.map(
                      (day, i) => {
                        if (!day) {
                          return (
                            <div
                              key={`pad-${i}`}
                            />
                          );
                        }

                        const status =
                          attendanceLog[
                            day
                          ] || null;

                        const style = status
                          ? STATUS_STYLE[
                              status
                            ]
                          : null;

                        const isToday =
                          day ===
                            tanggalHariIni;

                        return (
                          <div
                            key={day}
                            className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5 text-xs
                              ${
                                style
                                  ? style.bg
                                  : "bg-white"
                              }
                              ${
                                isToday
                                  ? "ring-2 ring-blue-500"
                                  : "border border-slate-100"
                              }
                            `}
                          >
                            <span
                              className={`font-medium ${
                                style
                                  ? style.text
                                  : "text-slate-400"
                              }`}
                            >
                              {day}
                            </span>

                            {style &&
                              status !==
                                "libur" && (
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
                                />
                              )}
                          </div>
                        );
                      },
                    )}
                  </div>

                  {/* =========================
                      LEGENDA
                  ========================= */}
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-100">
                    {Object.entries(
                      STATUS_STYLE,
                    )
                      .filter(
                        ([key]) =>
                          key !== "alpa",
                      )
                      .map(
                        ([key, s]) => (
                          <div
                            key={key}
                            className="flex items-center gap-1.5"
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${s.dot}`}
                            />

                            <span className="text-[11px] text-slate-500">
                              {s.label}
                            </span>
                          </div>
                        ),
                      )}
                  </div>
                </div>

                {/* =========================
                    REKAP
                ========================= */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    "hadir",
                    "izin",
                    "sakit",
                  ].map((key) => {
                    const s =
                      STATUS_STYLE[key];

                    return (
                      <div
                        key={key}
                        className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-4 text-center"
                      >
                        <p className="text-2xl font-bold text-slate-900">
                          {rekap[key] || 0}
                        </p>

                        <div className="flex items-center justify-center gap-1.5 mt-1">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${s.dot}`}
                          />

                          <span className="text-xs text-slate-500">
                            {s.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* =========================
                RIWAYAT TERBARU
            ========================= */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800">
                  Riwayat Terbaru
                </h3>
              </div>

              {loadingAbsensi ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2
                    size={22}
                    className="animate-spin text-blue-600"
                  />
                </div>
              ) : riwayatTerbaru.length ===
                0 ? (
                <div className="py-10 text-center">
                  <ClipboardCheck
                    size={28}
                    className="mx-auto text-slate-300"
                  />

                  <p className="text-sm text-slate-500 mt-2">
                    Belum ada riwayat
                    absensi.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {riwayatTerbaru.map(
                    (item, i) => {
                      const s =
                        STATUS_STYLE[
                          item.status
                        ] ||
                        STATUS_STYLE.alpha;

                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-3 px-5 py-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`text-xs font-medium px-2.5 py-1 rounded-lg flex-shrink-0 ${s.bg} ${s.text}`}
                            >
                              {s.label}
                            </span>

                            <div className="min-w-0">
                              <p className="text-sm text-slate-700 truncate">
                                {
                                  item.keterangan
                                }
                              </p>

                              <p className="text-xs text-slate-400">
                                {
                                  item.tanggal
                                }

                                {item.jam !==
                                  "-" &&
                                  ` · ${item.jam}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// =====================================================
// FORM IZIN / SAKIT
// =====================================================

function IzinForm({
  kelasId,
  onCancel,
  onSuccess,
}) {
  const [jenis, setJenis] =
    useState("izin");

  const [keterangan, setKeterangan] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const handleSubmit = async () => {
    if (!kelasId) {
      setError(
        "Kelas ID tidak ditemukan.",
      );

      return;
    }

    if (!keterangan.trim()) {
      setError(
        "Keterangan wajib diisi.",
      );

      return;
    }

    try {
      setLoading(true);
      setError(null);

      await absenManual({
        kelasId,
        status: jenis,
        keterangan:
          keterangan.trim(),
      });

      onSuccess();
    } catch (err) {
      console.error(
        "Error submit izin/sakit:",
        err,
      );

      setError(
        err?.message ||
          "Gagal mengirim pengajuan.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col mt-4">
      {/* =========================
          PILIH JENIS
      ========================= */}
      <div className="flex gap-2">
        {["izin", "sakit"].map(
          (j) => (
            <button
              key={j}
              type="button"
              onClick={() =>
                setJenis(j)
              }
              disabled={loading}
              className={`flex-1 text-sm font-medium py-2 rounded-xl border transition-colors ${
                jenis === j
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              {j === "izin"
                ? "Izin"
                : "Sakit"}
            </button>
          ),
        )}
      </div>

      {/* =========================
          KETERANGAN
      ========================= */}
      <textarea
        value={keterangan}
        onChange={(e) =>
          setKeterangan(
            e.target.value,
          )
        }
        disabled={loading}
        placeholder="Tulis alasan singkat..."
        rows={4}
        className="mt-3 w-full text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 disabled:bg-slate-50"
      />

      {/* =========================
          ERROR
      ========================= */}
      {error && (
        <div className="flex items-start gap-2 mt-2 text-red-500">
          <AlertCircle
            size={14}
            className="mt-0.5 flex-shrink-0"
          />

          <p className="text-xs">
            {error}
          </p>
        </div>
      )}

      {/* =========================
          BUTTON
      ========================= */}
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-colors rounded-xl py-2.5"
        >
          <X size={15} />

          Batal
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            loading ||
            !keterangan.trim() ||
            !kelasId
          }
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-xl py-2.5"
        >
          {loading ? (
            <>
              <Loader2
                size={15}
                className="animate-spin"
              />

              Mengirim...
            </>
          ) : (
            <>
              <Check size={15} />

              Kirim
            </>
          )}
        </button>
      </div>
    </div>
  );
}