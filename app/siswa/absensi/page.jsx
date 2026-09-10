"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import {
  Camera,
  MapPin,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  CalendarDays,
  Clock3,
  UserCheck,
  X,
  Loader2,
  FileText,
  HeartPulse,
  UserX,
  ScanFace,
  Video,
  ChevronDown,
} from "lucide-react";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  getAbsensiSaya,
  absenDenganFace,
  absenManual,
} from "../../../services/absensi.service";

/* =========================================================
   GPS
========================================================= */

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (
      typeof navigator === "undefined" ||
      !navigator.geolocation
    ) {
      reject(
        new Error(
          "Browser kamu tidak mendukung fitur lokasi."
        )
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        let message =
          "Gagal mendapatkan lokasi.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Izin lokasi ditolak. Aktifkan lokasi dan izinkan website ini mengakses GPS.";
            break;

          case error.POSITION_UNAVAILABLE:
            message =
              "Lokasi tidak tersedia. Pastikan GPS perangkat aktif.";
            break;

          case error.TIMEOUT:
            message =
              "Waktu mengambil lokasi habis. Silakan coba lagi.";
            break;

          default:
            message =
              "Gagal mendapatkan lokasi GPS.";
        }

        reject(
          new Error(message)
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  });
}

/* =========================================================
   FORMAT TANGGAL
========================================================= */

function formatTanggal(tanggal) {
  if (!tanggal) {
    return "-";
  }

  const date = new Date(tanggal);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "-";
  }

  return date.toLocaleDateString(
    "id-ID",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

/* =========================================================
   FORMAT JAM
========================================================= */

function formatJam(tanggal) {
  if (!tanggal) {
    return "-";
  }

  const date = new Date(tanggal);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "-";
  }

  return date.toLocaleTimeString(
    "id-ID",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

/* =========================================================
   STATUS LABEL
========================================================= */

function getStatusLabel(status) {
  switch (
    String(status || "").toLowerCase()
  ) {
    case "hadir":
      return "Hadir";

    case "izin":
      return "Izin";

    case "sakit":
      return "Sakit";

    case "alpha":
      return "Alpha";

    case "alpa":
      return "Alpha";

    default:
      return status || "-";
  }
}

/* =========================================================
   FORMAT NAMA KAMERA
========================================================= */

function getCameraName(device, index) {
  if (!device) {
    return `Kamera ${index + 1}`;
  }

  if (device.label) {
    return device.label;
  }

  return `Kamera ${index + 1}`;
}

/* =========================================================
   CEK KAMERA VIRTUAL
========================================================= */

function isVirtualCamera(device) {
  const label =
    String(device?.label || "")
      .toLowerCase();

  return (
    label.includes("snap") ||
    label.includes("virtual") ||
    label.includes("obs") ||
    label.includes("droidcam") ||
    label.includes("manycam") ||
    label.includes("xsplit") ||
    label.includes("ndi")
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AbsensiSiswaPage() {
  const searchParams = useSearchParams();

  const kelasIdFromUrl = searchParams.get("kelasId");

  const kelasId =
    kelasIdFromUrl || "d4221aad-78b1-4d14-ab87-97ae3a3f05ac";

  /* =======================================================
     STATE ABSENSI
  ======================================================= */

  const [
    absensiData,
    setAbsensiData,
  ] = useState([]);

  const [
    loadingData,
    setLoadingData,
  ] = useState(true);

  const [
    loadingAbsen,
    setLoadingAbsen,
  ] = useState(false);

  /* =======================================================
     STATE CAMERA
  ======================================================= */

  const [
    cameraOpen,
    setCameraOpen,
  ] = useState(false);

  const [
    cameraLoading,
    setCameraLoading,
  ] = useState(false);

  const [
    cameraError,
    setCameraError,
  ] = useState("");

  const [
    cameras,
    setCameras,
  ] = useState([]);

  const [
    selectedCameraId,
    setSelectedCameraId,
  ] = useState("");

  const [
    capturedImage,
    setCapturedImage,
  ] = useState(null);

  /* =======================================================
     STATE UMUM
  ======================================================= */

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    showIzinForm,
    setShowIzinForm,
  ] = useState(false);

  const [
    jenisIzin,
    setJenisIzin,
  ] = useState("izin");

  const [
    keterangan,
    setKeterangan,
  ] = useState("");

  const [
    locationStatus,
    setLocationStatus,
  ] = useState("idle");

  const [
    locationText,
    setLocationText,
  ] = useState("");

  /* =======================================================
     REFS
  ======================================================= */

  const videoRef =
    useRef(null);

  const canvasRef =
    useRef(null);

  const streamRef =
    useRef(null);

  /* =======================================================
     LOAD ABSENSI
  ======================================================= */

  const loadAbsensi =
    useCallback(async () => {
      try {
        setLoadingData(true);
        setError("");

        const response =
          await getAbsensiSaya();

        let data = [];

        if (
          Array.isArray(response)
        ) {
          data = response;
        } else if (
          Array.isArray(
            response?.data
          )
        ) {
          data =
            response.data;
        } else if (
          Array.isArray(
            response?.data?.data
          )
        ) {
          data =
            response.data.data;
        } else if (
          Array.isArray(
            response?.items
          )
        ) {
          data =
            response.items;
        }

        setAbsensiData(data);
      } catch (err) {
        console.error(
          "Gagal mengambil absensi:",
          err
        );

        setAbsensiData([]);

        setError(
          err?.message ||
            "Gagal mengambil data absensi."
        );
      } finally {
        setLoadingData(false);
      }
    }, []);

  /* =======================================================
     LOAD SAAT PAGE
  ======================================================= */

  useEffect(() => {
    loadAbsensi();
  }, [loadAbsensi]);

  /* =======================================================
     TANGGAL HARI INI
  ======================================================= */

  const today =
    new Date();

  const todayString =
    today
      .toISOString()
      .split("T")[0];

  /* =======================================================
     ABSENSI HARI INI
  ======================================================= */

  const absensiHariIni =
    absensiData.find(
      (item) => {
        if (!item?.tanggal) {
          return false;
        }

        const itemDate =
          new Date(
            item.tanggal
          )
            .toISOString()
            .split("T")[0];

        const tanggalSama =
          itemDate ===
          todayString;

        const kelasSama =
          !kelasId ||
          item.kelasId ===
            kelasId;

        return (
          tanggalSama &&
          kelasSama
        );
      }
    );

  const sudahAbsen =
    Boolean(
      absensiHariIni
    );

  /* =======================================================
     ENUMERATE CAMERA
  ======================================================= */

  const loadCameras =
    useCallback(async () => {
      try {
        if (
          typeof navigator ===
            "undefined" ||
          !navigator.mediaDevices ||
          !navigator.mediaDevices.enumerateDevices
        ) {
          throw new Error(
            "Browser tidak mendukung daftar kamera."
          );
        }

        const devices =
          await navigator.mediaDevices.enumerateDevices();

        const videoDevices =
          devices.filter(
            (device) =>
              device.kind ===
              "videoinput"
          );

        setCameras(
          videoDevices
        );

        if (
          videoDevices.length ===
          0
        ) {
          setSelectedCameraId(
            ""
          );

          return;
        }

        /*
         * Kalau sebelumnya sudah
         * memilih kamera dan masih
         * tersedia, pertahankan.
         */

        const selectedStillExists =
          videoDevices.some(
            (device) =>
              device.deviceId ===
              selectedCameraId
          );

        if (
          selectedStillExists
        ) {
          return;
        }

        /*
         * Prioritaskan kamera
         * non-virtual.
         */

        const realCamera =
          videoDevices.find(
            (device) =>
              !isVirtualCamera(
                device
              )
          );

        const firstCamera =
          realCamera ||
          videoDevices[0];

        setSelectedCameraId(
          firstCamera.deviceId
        );
      } catch (err) {
        console.error(
          "Gagal membaca kamera:",
          err
        );

        setCameraError(
          err?.message ||
            "Tidak dapat membaca daftar kamera."
        );
      }
    }, [selectedCameraId]);

  /* =======================================================
     STOP CAMERA
  ======================================================= */

  const stopCamera =
    useCallback(() => {
      if (
        streamRef.current
      ) {
        streamRef.current
          .getTracks()
          .forEach(
            (track) => {
              track.stop();
            }
          );

        streamRef.current =
          null;
      }

      if (
        videoRef.current
      ) {
        videoRef.current.srcObject =
          null;
      }
    }, []);

  /* =======================================================
     START CAMERA
  ======================================================= */

  const startCamera =
    useCallback(
      async (
        deviceId = null
      ) => {
        try {
          setCameraError("");
          setError("");
          setCameraLoading(true);
          setCameraOpen(true);

          if (
            typeof navigator ===
              "undefined" ||
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
          ) {
            throw new Error(
              "Browser tidak mendukung kamera."
            );
          }

          /*
           * Stop kamera sebelumnya
           * sebelum membuka kamera baru.
           */

          stopCamera();

          /*
           * Kalau belum ada daftar
           * kamera, ambil dulu.
           */

          let cameraId =
            deviceId ||
            selectedCameraId;

          if (!cameraId) {
            const devices =
              await navigator.mediaDevices.enumerateDevices();

            const videoDevices =
              devices.filter(
                (device) =>
                  device.kind ===
                  "videoinput"
              );

            if (
              videoDevices.length ===
              0
            ) {
              throw new Error(
                "Kamera tidak ditemukan. Pastikan webcam terhubung."
              );
            }

            const realCamera =
              videoDevices.find(
                (device) =>
                  !isVirtualCamera(
                    device
                  )
              );

            cameraId =
              (
                realCamera ||
                videoDevices[0]
              ).deviceId;

            setCameras(
              videoDevices
            );

            setSelectedCameraId(
              cameraId
            );
          }

          /*
           * Buka kamera berdasarkan
           * deviceId pilihan user.
           */

          const stream =
            await navigator.mediaDevices.getUserMedia(
              {
                video: {
                  deviceId: {
                    exact: cameraId,
                  },

                  width: {
                    ideal: 1280,
                  },

                  height: {
                    ideal: 720,
                  },
                },

                audio: false,
              }
            );

          streamRef.current =
            stream;

          /*
           * Pasang stream ke video.
           */

          if (
            videoRef.current
          ) {
            videoRef.current.srcObject =
              stream;

            await videoRef.current.play();
          }

          /*
           * Setelah permission kamera
           * diberikan, label kamera
           * biasanya sudah muncul.
           */

          await loadCameras();
        } catch (err) {
          console.error(
            "Camera error:",
            err
          );

          setCameraError(
            err?.message ||
              "Kamera tidak dapat dibuka."
          );
        } finally {
          setCameraLoading(
            false
          );
        }
      },
      [
        loadCameras,
        selectedCameraId,
        stopCamera,
      ]
    );

  /* =======================================================
     LOAD CAMERA SAAT PAGE
  ======================================================= */

  useEffect(() => {
    loadCameras();
  }, [loadCameras]);

  /* =======================================================
     CAMERA DEVICE CHANGE
  ======================================================= */

  useEffect(() => {
    if (
      typeof navigator ===
        "undefined" ||
      !navigator.mediaDevices
    ) {
      return;
    }

    const handleDeviceChange =
      () => {
        loadCameras();
      };

    navigator.mediaDevices.addEventListener(
      "devicechange",
      handleDeviceChange
    );

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      );
    };
  }, [loadCameras]);

  /* =======================================================
     CHANGE CAMERA
  ======================================================= */

  async function handleCameraChange(
    event
  ) {
    const deviceId =
      event.target.value;

    setSelectedCameraId(
      deviceId
    );

    if (
      cameraOpen &&
      deviceId
    ) {
      await startCamera(
        deviceId
      );
    }
  }

  /* =======================================================
     CLOSE CAMERA
  ======================================================= */

  function closeCamera() {
    stopCamera();

    setCameraOpen(
      false
    );

    setCameraError("");
  }

  /* =======================================================
     TAKE PHOTO
  ======================================================= */

  function takePhoto() {
    const video =
      videoRef.current;

    const canvas =
      canvasRef.current;

    if (
      !video ||
      !canvas
    ) {
      setCameraError(
        "Kamera belum siap."
      );

      return;
    }

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      setCameraError(
        "Kamera belum siap. Tunggu sebentar lalu coba lagi."
      );

      return;
    }

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    const context =
      canvas.getContext(
        "2d"
      );

    if (!context) {
      setCameraError(
        "Gagal memproses foto."
      );

      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const image =
      canvas.toDataURL(
        "image/jpeg",
        0.9
      );

    setCapturedImage(
      image
    );

    stopCamera();

    setCameraOpen(
      false
    );

    setCameraError("");
  }

  /* =======================================================
     GET LOCATION
  ======================================================= */

  async function getLocation() {
    try {
      setLocationStatus(
        "loading"
      );

      setLocationText(
        "Mengambil lokasi GPS..."
      );

      const position =
        await getCurrentLocation();

      const latitude =
        position.coords
          .latitude;

      const longitude =
        position.coords
          .longitude;

      const accuracy =
        position.coords
          .accuracy;

      setLocationStatus(
        "success"
      );

      setLocationText(
        `GPS aktif • Akurasi ±${Math.round(
          accuracy || 0
        )} meter`
      );

      return {
        latitude,
        longitude,
      };
    } catch (err) {
      setLocationStatus(
        "error"
      );

      setLocationText(
        err?.message ||
          "Lokasi tidak tersedia."
      );

      throw err;
    }
  }

  /* =======================================================
     SUBMIT FACE
  ======================================================= */

  async function handleSubmitAbsen() {
    if (!kelasId) {
      setError(
        "Kelas siswa belum tersedia. Halaman ini harus dibuka dengan kelasId."
      );

      return;
    }

    if (sudahAbsen) {
      setError(
        "Kamu sudah melakukan absensi hari ini."
      );

      return;
    }

    if (!capturedImage) {
      setError(
        "Silakan ambil foto terlebih dahulu."
      );

      return;
    }

    try {
      setLoadingAbsen(
        true
      );

      setError("");
      setSuccess("");

      /* =========================
         GPS
      ========================= */

      const position =
        await getLocation();

      /* =========================
         DATA URL -> BLOB
      ========================= */

      const response =
        await fetch(
          capturedImage
        );

      if (!response.ok) {
        throw new Error(
          "Gagal memproses foto."
        );
      }

      const blob =
        await response.blob();

      /* =========================
         KIRIM KE BACKEND
      ========================= */

      await absenDenganFace({
        kelasId,
        snapshot: blob,
        status: "hadir",
        keterangan:
          "Absen masuk melalui verifikasi wajah",
        lintang:
          position.latitude,
        bujur:
          position.longitude,
      });

      /* =========================
         BERHASIL
      ========================= */

      setSuccess(
        "Absensi berhasil dicatat!"
      );

      setCapturedImage(
        null
      );

      setLocationStatus(
        "idle"
      );

      setLocationText("");

      await loadAbsensi();
    } catch (err) {
      console.error(
        "Gagal melakukan absensi:",
        err
      );

      setError(
        err?.message ||
          "Gagal melakukan absensi."
      );
    } finally {
      setLoadingAbsen(
        false
      );
    }
  }

  /* =======================================================
     SUBMIT MANUAL
  ======================================================= */

  async function handleSubmitManual() {
    if (!kelasId) {
      setError(
        "Kelas siswa belum tersedia."
      );

      return;
    }

    if (sudahAbsen) {
      setError(
        "Kamu sudah melakukan absensi hari ini."
      );

      return;
    }

    if (
      !keterangan.trim()
    ) {
      setError(
        "Keterangan wajib diisi."
      );

      return;
    }

    try {
      setLoadingAbsen(
        true
      );

      setError("");
      setSuccess("");

      await absenManual({
        kelasId,
        status: jenisIzin,
        keterangan:
          keterangan.trim(),
      });

      setSuccess(
        `Pengajuan ${getStatusLabel(
          jenisIzin
        ).toLowerCase()} berhasil dikirim.`
      );

      setKeterangan("");

      setShowIzinForm(
        false
      );

      await loadAbsensi();
    } catch (err) {
      console.error(
        "Gagal mengirim keterangan:",
        err
      );

      setError(
        err?.message ||
          "Gagal mengirim absensi."
      );
    } finally {
      setLoadingAbsen(
        false
      );
    }
  }

  /* =======================================================
     RESET FOTO
  ======================================================= */

  function resetPhoto() {
    setCapturedImage(
      null
    );

    setError("");
    setSuccess("");

    setLocationStatus(
      "idle"
    );

    setLocationText("");
  }

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (
        streamRef.current
      ) {
        streamRef.current
          .getTracks()
          .forEach(
            (track) => {
              track.stop();
            }
          );
      }
    };
  }, []);

  /* =======================================================
     SIDEBAR & HEADER STATE
  ======================================================= */

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">

      {/* SIDEBAR */}
      <Sidebar
        active="absensi"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={toggleSidebar}
      />

      {/* MAIN CONTENT */}
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER - FIXED AT TOP */}
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{
            name: "Siswa",
            email: "siswa@smartschool.com",
            avatar: "SW",
          }}
        />

        {/* SCROLLABLE CONTENT */}
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">

          <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3 text-sm text-slate-500">
                    <CalendarDays size={16} />
                    <span>{formatTanggal(new Date())}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <Clock3 size={16} />
                    <span>{formatJam(new Date())}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Absensi Siswa
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Lakukan absensi menggunakan verifikasi wajah dan lokasi GPS.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadAbsensi}
                  disabled={loadingData}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw size={17} className={loadingData ? "animate-spin" : ""} />
                  Refresh
                </button>
              </div>
            </div>

            {/* =================================================
                KELAS BELUM TERSEDIA
            ================================================= */}

            {!kelasId && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle size={21} className="mt-0.5 shrink-0 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-amber-800">Kelas belum tersedia</h3>
                    <p className="mt-1 text-sm leading-6 text-amber-700">
                      Halaman absensi membutuhkan <b>kelasId</b> untuk menentukan kelas siswa.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                ERROR & SUCCESS
            ================================================= */}

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                <AlertCircle size={20} className="mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Terjadi kesalahan</p>
                  <p className="mt-1 whitespace-pre-line text-sm">{error}</p>
                </div>
                <button type="button" onClick={() => setError("")} className="rounded-lg p-1 hover:bg-red-100">
                  <X size={17} />
                </button>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Berhasil</p>
                  <p className="mt-1 text-sm">{success}</p>
                </div>
                <button type="button" onClick={() => setSuccess("")} className="rounded-lg p-1 hover:bg-emerald-100">
                  <X size={17} />
                </button>
              </div>
            )}

            {/* =================================================
                STATUS ABSENSI HARI INI
            ================================================= */}

            {sudahAbsen && absensiHariIni && (
              <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                      <CheckCircle2 size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Absensi hari ini</p>
                      <h2 className="text-xl font-bold text-slate-900">{getStatusLabel(absensiHariIni.status)}</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {formatJam(absensiHariIni.tanggal)} • {absensiHariIni.metode || "manual"}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />
                      Sudah melakukan absensi
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                MAIN GRID
            ================================================= */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">

              {/* =================================================
                  LEFT: CAMERA
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
                      <ScanFace size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Verifikasi Wajah</h2>
                      <p className="text-sm text-slate-500">Foto wajah dan GPS diperlukan</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">

                  {/* CAMERA SELECTOR */}
                  <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="mb-3 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <Video size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Pilih Kamera</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">Pilih webcam yang ingin digunakan untuk absensi.</p>
                      </div>
                    </div>
                    <div className="relative">
                      <select
                        value={selectedCameraId}
                        onChange={handleCameraChange}
                        disabled={cameraLoading || sudahAbsen}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                      >
                        {cameras.length === 0 ? (
                          <option value="">Kamera belum terdeteksi</option>
                        ) : (
                          cameras.map((camera, index) => (
                            <option key={camera.deviceId || index} value={camera.deviceId}>
                              {getCameraName(camera, index)}
                              {isVirtualCamera(camera) ? " (Virtual)" : ""}
                            </option>
                          ))
                        )}
                      </select>
                      <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <div className="mt-3 flex items-start gap-2 text-xs text-slate-500">
                      <AlertCircle size={15} className="mt-0.5 shrink-0" />
                      <p>
                        Jika muncul Snap Camera, OBS Virtual Camera, atau kamera virtual lainnya,
                        pilih kamera fisik seperti Integrated Camera atau HD Webcam.
                      </p>
                    </div>
                  </div>

                  {/* CAMERA PREVIEW */}
                  {cameraOpen ? (
                    <div className="space-y-4">
                      <div className="relative overflow-hidden rounded-xl bg-slate-900">
                        <video ref={videoRef} autoPlay muted playsInline className="aspect-video w-full object-cover" />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div className="h-64 w-48 rounded-[45%] border-2 border-white/80 shadow-[0_0_0_999px_rgba(0,0,0,0.35)]" />
                        </div>
                        {cameraLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70">
                            <div className="flex flex-col items-center gap-3 text-white">
                              <Loader2 size={32} className="animate-spin" />
                              <span className="text-sm">Membuka kamera...</span>
                            </div>
                          </div>
                        )}
                        {!cameraLoading && selectedCameraId && (
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="rounded-xl bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-sm">
                              <div className="flex items-center gap-2">
                                <Video size={14} />
                                <span className="truncate">
                                  {cameras.find((c) => c.deviceId === selectedCameraId)?.label || "Kamera terpilih"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {cameraError && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                          {cameraError}
                        </div>
                      )}

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={takePhoto}
                          disabled={cameraLoading}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Camera size={19} />
                          Ambil Foto
                        </button>
                        <button
                          type="button"
                          onClick={closeCamera}
                          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          <X size={18} />
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : capturedImage ? (
                    /* PREVIEW PHOTO */
                    <div className="space-y-4">
                      <div className="relative overflow-hidden rounded-xl bg-slate-100">
                        <img src={capturedImage} alt="Preview foto" className="aspect-video w-full object-cover" />
                        <button
                          type="button"
                          onClick={resetPhoto}
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md hover:bg-white"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div
                        className={`rounded-xl border p-4 ${
                          locationStatus === "success"
                            ? "border-emerald-200 bg-emerald-50"
                            : locationStatus === "error"
                            ? "border-red-200 bg-red-50"
                            : locationStatus === "loading"
                            ? "border-blue-200 bg-blue-50"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <MapPin
                            size={20}
                            className={
                              locationStatus === "success"
                                ? "text-emerald-600"
                                : locationStatus === "error"
                                ? "text-red-600"
                                : locationStatus === "loading"
                                ? "text-blue-600"
                                : "text-slate-500"
                            }
                          />
                          <div>
                            <p className="text-sm font-semibold text-slate-800">Lokasi GPS</p>
                            <p className="mt-1 text-sm text-slate-600">
                              {locationText || "Lokasi akan diperiksa saat absensi dikirim."}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={handleSubmitAbsen}
                          disabled={loadingAbsen || !kelasId || sudahAbsen}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {loadingAbsen ? (
                            <>
                              <Loader2 size={19} className="animate-spin" />
                              Memproses...
                            </>
                          ) : sudahAbsen ? (
                            <>
                              <CheckCircle2 size={19} />
                              Sudah Absen
                            </>
                          ) : (
                            <>
                              <UserCheck size={19} />
                              Kirim Absensi
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => startCamera(selectedCameraId)}
                          disabled={loadingAbsen || sudahAbsen}
                          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Camera size={18} />
                          Foto Ulang
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* EMPTY STATE */
                    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
                      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                        <Camera size={36} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Siap melakukan absensi?</h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Pilih kamera terlebih dahulu, kemudian pastikan wajah terlihat jelas
                        dan izin lokasi GPS sudah diberikan.
                      </p>
                      <button
                        type="button"
                        onClick={() => startCamera(selectedCameraId)}
                        disabled={!kelasId || sudahAbsen || cameras.length === 0}
                        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Camera size={19} />
                        {sudahAbsen ? "Sudah Absen" : "Buka Kamera"}
                      </button>
                    </div>
                  )}

                  {/* INFO */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-slate-50 p-4 text-center">
                      <Camera size={18} className="mx-auto mb-2 text-blue-600" />
                      <p className="text-xs font-semibold text-slate-800">Foto Wajah</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Pastikan wajah terlihat jelas</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4 text-center">
                      <MapPin size={18} className="mx-auto mb-2 text-emerald-600" />
                      <p className="text-xs font-semibold text-slate-800">Lokasi GPS</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Untuk validasi lokasi</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4 text-center">
                      <Clock3 size={18} className="mx-auto mb-2 text-orange-500" />
                      <p className="text-xs font-semibold text-slate-800">Real Time</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Absensi tercatat langsung</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* =================================================
                  RIGHT: STATUS, MANUAL, RIWAYAT
              ================================================= */}

              <div className="space-y-6">

                {/* STATUS HARI INI */}
                <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <h2 className="font-bold text-slate-900">Status Hari Ini</h2>
                  <div className="mt-4">
                    {loadingData ? (
                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                        <Loader2 size={20} className="animate-spin text-blue-600" />
                        <span className="text-sm text-slate-500">Memuat data...</span>
                      </div>
                    ) : sudahAbsen ? (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                            <CheckCircle2 size={21} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-emerald-800">
                              {getStatusLabel(absensiHariIni?.status)}
                            </p>
                            <p className="mt-0.5 text-xs text-emerald-700">
                              {formatJam(absensiHariIni?.tanggal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                            <Clock3 size={21} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-orange-800">Belum Absen</p>
                            <p className="mt-0.5 text-xs text-orange-700">Silakan lakukan absensi.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* MANUAL */}
                <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900">Tidak Bisa Hadir?</h2>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Kirim keterangan izin, sakit, atau alpha.</p>
                    </div>
                  </div>

                  {!showIzinForm ? (
                    <button
                      type="button"
                      onClick={() => setShowIzinForm(true)}
                      disabled={!kelasId || sudahAbsen}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FileText size={17} />
                      Ajukan Keterangan
                    </button>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-slate-700">Jenis</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setJenisIzin("izin")}
                            className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                              jenisIzin === "izin"
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            Izin
                          </button>
                          <button
                            type="button"
                            onClick={() => setJenisIzin("sakit")}
                            className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                              jenisIzin === "sakit"
                                ? "border-red-500 bg-red-50 text-red-700"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            Sakit
                          </button>
                          <button
                            type="button"
                            onClick={() => setJenisIzin("alpha")}
                            className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                              jenisIzin === "alpha"
                                ? "border-slate-600 bg-slate-100 text-slate-800"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            Alpha
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="keterangan" className="mb-2 block text-xs font-semibold text-slate-700">
                          Keterangan
                        </label>
                        <textarea
                          id="keterangan"
                          value={keterangan}
                          onChange={(e) => setKeterangan(e.target.value)}
                          rows={4}
                          placeholder="Tuliskan alasan atau keterangan..."
                          className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowIzinForm(false);
                            setKeterangan("");
                            setError("");
                          }}
                          className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={handleSubmitManual}
                          disabled={loadingAbsen || !kelasId || sudahAbsen}
                          className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {loadingAbsen ? "Mengirim..." : "Kirim"}
                        </button>
                      </div>
                    </div>
                  )}
                </section>

                {/* CALENDAR / RIWAYAT */}
                <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-slate-900">Riwayat Absensi</h2>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                      {absensiData.length}
                    </span>
                  </div>

                  {/* CALENDAR MINI */}
                  <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                      <span>{today.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}</span>
                      <div className="flex gap-1">
                        <button className="rounded-lg p-1 hover:bg-slate-200">
                          <ChevronDown size={16} className="rotate-90" />
                        </button>
                        <button className="rounded-lg p-1 hover:bg-slate-200">
                          <ChevronDown size={16} className="-rotate-90" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs">
                      {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d, i) => (
                        <div key={i} className="font-medium text-slate-400">{d}</div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                        const isToday = date === today.getDate();
                        const hasAbsen = absensiData.some((a) => {
                          const d = new Date(a.tanggal);
                          return d.getDate() === date && d.getMonth() === today.getMonth();
                        });
                        return (
                          <div
                            key={date}
                            className={`rounded-lg p-1.5 text-xs ${
                              isToday
                                ? "bg-blue-600 text-white font-bold"
                                : hasAbsen
                                ? "bg-emerald-100 text-emerald-700 font-semibold"
                                : "text-slate-600"
                            }`}
                          >
                            {date}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 flex justify-center gap-4 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-600" /> Hari ini
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" /> Hadir
                      </span>
                    </div>
                  </div>

                  {/* LIST RIWAYAT */}
                  <div className="mt-4 max-h-[280px] space-y-3 overflow-y-auto pr-1">
                    {loadingData ? (
                      <div className="py-6 text-center">
                        <Loader2 size={22} className="mx-auto animate-spin text-blue-600" />
                        <p className="mt-2 text-xs text-slate-500">Memuat riwayat...</p>
                      </div>
                    ) : absensiData.length === 0 ? (
                      <div className="rounded-xl bg-slate-50 p-5 text-center">
                        <CalendarDays size={28} className="mx-auto text-slate-400" />
                        <p className="mt-2 text-sm font-medium text-slate-700">Belum ada riwayat</p>
                        <p className="mt-1 text-xs text-slate-500">Data absensi akan muncul di sini.</p>
                      </div>
                    ) : (
                      absensiData
                        .slice()
                        .sort((a, b) => new Date(b?.tanggal || b?.dibuatPada || 0).getTime() - new Date(a?.tanggal || a?.dibuatPada || 0).getTime())
                        .map((item) => (
                          <div key={item?.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                    item?.status === "hadir"
                                      ? "bg-emerald-100 text-emerald-600"
                                      : item?.status === "sakit"
                                      ? "bg-red-100 text-red-600"
                                      : item?.status === "izin"
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-slate-200 text-slate-600"
                                  }`}
                                >
                                  {item?.status === "hadir" ? (
                                    <UserCheck size={17} />
                                  ) : item?.status === "sakit" ? (
                                    <HeartPulse size={17} />
                                  ) : item?.status === "alpha" || item?.status === "alpa" ? (
                                    <UserX size={17} />
                                  ) : (
                                    <FileText size={17} />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-800">{getStatusLabel(item?.status)}</p>
                                  <p className="mt-0.5 text-xs text-slate-500">{formatTanggal(item?.tanggal)}</p>
                                </div>
                              </div>
                              <span className="text-xs font-medium text-slate-500">{formatJam(item?.tanggal)}</span>
                            </div>
                            {item?.keterangan && (
                              <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">
                                {item.keterangan}
                              </p>
                            )}
                            {item?.metode && (
                              <div className="mt-2 text-[11px] text-slate-400">Metode: {item.metode}</div>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </section>

              </div>
            </div>

            <div className="h-4" />

          </div>
        </main>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}