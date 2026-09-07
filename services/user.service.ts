const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/* =========================================================
   TYPES
========================================================= */

export type AbsensiStatus =
  | "hadir"
  | "izin"
  | "sakit"
  | "alpha";

export type AbsensiMetode =
  | "lokasi"
  | "barcode"
  | "face"
  | "manual";

export interface AbsensiPengguna {
  id: string;
  namaLengkap: string;
  nisn: string | null;
}

export interface Absensi {
  id: string;
  penggunaId: string;
  kelasId: string;
  tanggal: string;
  status: AbsensiStatus;
  keterangan?: string | null;
  metode: AbsensiMetode;
  lintang?: number | null;
  bujur?: number | null;
  urlFoto?: string | null;
  dibuatOleh: string;
  dibuatPada?: string;
  pengguna?: AbsensiPengguna;
}

export interface AbsensiResponse {
  success: boolean;
  message: string;
  data: Absensi;
}

export interface GetAbsensiResponse {
  success: boolean;
  message: string;
  data: Absensi[];
}

export interface CreateAbsensiData {
  kelasId: string;
  status: AbsensiStatus;
  metode?: AbsensiMetode;
  keterangan?: string;
  lintang?: number;
  bujur?: number;
  barcodeData?: string;
  snapshot?: File | Blob | null;
}

/* =========================================================
   TOKEN
   Sama seperti user.service.ts
========================================================= */

function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const keys = [
    "token",
    "accessToken",
    "access_token",
    "authToken",
    "jwt",
  ];

  for (const key of keys) {
    const value = localStorage.getItem(key);

    if (value && value.trim()) {
      return value.trim().replace(/^Bearer\s+/i, "");
    }
  }

  return null;
}

/* =========================================================
   REQUEST
========================================================= */

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  if (!token) {
    throw new Error(
      "Token login tidak ditemukan. Silakan login kembali."
    );
  }

  const headers = new Headers(options.headers);

  /*
   * Jangan set Content-Type secara manual
   * kalau body adalah FormData.
   *
   * Browser akan otomatis membuat:
   * multipart/form-data; boundary=...
   */
  if (!(options.body instanceof FormData)) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  headers.set("Authorization", `Bearer ${token}`);

  const url = `${API_URL}${endpoint}`;

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    console.error("Network error:", error);

    throw new Error(
      "Tidak dapat terhubung ke server. Pastikan backend berjalan."
    );
  }

  const contentType =
    response.headers.get("content-type") || "";

  const rawText = await response.text();

  let result: any = null;

  if (rawText.trim()) {
    try {
      result = JSON.parse(rawText);
    } catch {
      console.error("Response bukan JSON:", {
        url,
        status: response.status,
        contentType,
        body: rawText,
      });

      throw new Error(
        `Server mengembalikan response tidak valid (${response.status}).`
      );
    }
  }

  if (response.status === 401) {
    throw new Error(
      result?.message ||
        "Sesi login sudah tidak valid. Silakan login kembali."
    );
  }

  if (response.status === 403) {
    throw new Error(
      result?.message ||
        "Anda tidak memiliki akses ke data absensi."
    );
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
        `Request gagal (${response.status})`
    );
  }

  return result as T;
}

/* =========================================================
   GET ABSENSI SAYA
   GET /api/v1/absensi/saya
========================================================= */

export async function getAbsensiSaya(): Promise<GetAbsensiResponse> {
  return request<GetAbsensiResponse>(
    "/absensi/saya"
  );
}

/* =========================================================
   GET ABSENSI KELAS
   GET /api/v1/absensi/kelas/:kelasId
========================================================= */

export async function getAbsensiKelas(
  kelasId: string,
  tanggal?: string
): Promise<GetAbsensiResponse> {
  if (!kelasId) {
    throw new Error(
      "ID kelas tidak ditemukan."
    );
  }

  const searchParams = new URLSearchParams();

  if (tanggal?.trim()) {
    searchParams.set(
      "tanggal",
      tanggal.trim()
    );
  }

  const query = searchParams.toString();

  const endpoint = `/absensi/kelas/${encodeURIComponent(
    kelasId
  )}${query ? `?${query}` : ""}`;

  return request<GetAbsensiResponse>(
    endpoint
  );
}

/* =========================================================
   CREATE ABSENSI
   POST /api/v1/absensi
========================================================= */

export async function createAbsensi(
  data: CreateAbsensiData
): Promise<AbsensiResponse> {
  if (!data.kelasId) {
    throw new Error(
      "ID kelas tidak ditemukan."
    );
  }

  if (!data.status) {
    throw new Error(
      "Status absensi wajib dipilih."
    );
  }

  const metode = data.metode || "lokasi";

  /* -------------------------------------------------------
     FACE
     Backend:
     router.post("/", upload.single("snapshot"), ...)
     
     Jadi nama file HARUS:
     snapshot
  ------------------------------------------------------- */

  if (metode === "face") {
    if (!data.snapshot) {
      throw new Error(
        "Foto wajah wajib disertakan."
      );
    }

    const formData = new FormData();

    formData.append(
      "kelasId",
      data.kelasId
    );

    formData.append(
      "status",
      data.status
    );

    formData.append(
      "metode",
      metode
    );

    if (data.keterangan?.trim()) {
      formData.append(
        "keterangan",
        data.keterangan.trim()
      );
    }

    if (
      data.lintang !== undefined &&
      data.lintang !== null
    ) {
      formData.append(
        "lintang",
        String(data.lintang)
      );
    }

    if (
      data.bujur !== undefined &&
      data.bujur !== null
    ) {
      formData.append(
        "bujur",
        String(data.bujur)
      );
    }

    let snapshotFile: File | Blob =
      data.snapshot;

    /*
     * Kalau yang diberikan Blob,
     * ubah menjadi File supaya nama file jelas.
     */
    if (!(data.snapshot instanceof File)) {
      snapshotFile = new File(
        [data.snapshot],
        `absen-${Date.now()}.jpg`,
        {
          type:
            data.snapshot.type ||
            "image/jpeg",
        }
      );
    }

    /*
     * PENTING:
     * Backend multer membaca upload.single("snapshot")
     */
    formData.append(
      "snapshot",
      snapshotFile
    );

    return request<AbsensiResponse>(
      "/absensi",
      {
        method: "POST",
        body: formData,
      }
    );
  }

  /* -------------------------------------------------------
     LOKASI / BARCODE / MANUAL
     Backend menerima JSON
  ------------------------------------------------------- */

  const body: Record<string, any> = {
    kelasId: data.kelasId,
    status: data.status,
    metode,
  };

  if (data.keterangan?.trim()) {
    body.keterangan =
      data.keterangan.trim();
  }

  if (
    data.lintang !== undefined &&
    data.lintang !== null
  ) {
    body.lintang = data.lintang;
  }

  if (
    data.bujur !== undefined &&
    data.bujur !== null
  ) {
    body.bujur = data.bujur;
  }

  if (
    metode === "barcode" &&
    data.barcodeData?.trim()
  ) {
    body.barcodeData =
      data.barcodeData.trim();
  }

  return request<AbsensiResponse>(
    "/absensi",
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
}

/* =========================================================
   ABSEN DENGAN LOKASI
========================================================= */

export async function absenDenganLokasi(
  params: {
    kelasId: string;
    status?: AbsensiStatus;
    keterangan?: string;
  }
): Promise<AbsensiResponse> {
  if (!navigator.geolocation) {
    throw new Error(
      "Browser Anda tidak mendukung GPS."
    );
  }

  const position =
    await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
          }
        );
      }
    ).catch((error) => {
      console.error(
        "GPS error:",
        error
      );

      if (
        error?.code ===
        GeolocationPositionError.PERMISSION_DENIED
      ) {
        throw new Error(
          "Akses lokasi ditolak. Silakan aktifkan izin lokasi."
        );
      }

      if (
        error?.code ===
        GeolocationPositionError.POSITION_UNAVAILABLE
      ) {
        throw new Error(
          "Lokasi tidak tersedia. Pastikan GPS aktif."
        );
      }

      if (
        error?.code ===
        GeolocationPositionError.TIMEOUT
      ) {
        throw new Error(
          "Gagal mendapatkan lokasi karena waktu habis."
        );
      }

      throw new Error(
        "Gagal mendapatkan lokasi."
      );
    });

  return createAbsensi({
    kelasId: params.kelasId,
    status:
      params.status || "hadir",
    metode: "lokasi",
    keterangan:
      params.keterangan,
    lintang:
      position.coords.latitude,
    bujur:
      position.coords.longitude,
  });
}

/* =========================================================
   ABSEN DENGAN BARCODE / QR
========================================================= */

export async function absenDenganBarcode(
  params: {
    kelasId: string;
    barcodeData: string;
    status?: AbsensiStatus;
    keterangan?: string;
  }
): Promise<AbsensiResponse> {
  if (!params.barcodeData?.trim()) {
    throw new Error(
      "Data QR Code / barcode tidak ditemukan."
    );
  }

  return createAbsensi({
    kelasId: params.kelasId,
    status:
      params.status || "hadir",
    metode: "barcode",
    barcodeData:
      params.barcodeData.trim(),
    keterangan:
      params.keterangan,
  });
}

/* =========================================================
   ABSEN DENGAN FACE
========================================================= */

export async function absenDenganFace(
  params: {
    kelasId: string;
    snapshot: File | Blob;
    status?: AbsensiStatus;
    keterangan?: string;
    lintang?: number;
    bujur?: number;
  }
): Promise<AbsensiResponse> {
  if (!params.snapshot) {
    throw new Error(
      "Foto wajah tidak ditemukan."
    );
  }

  return createAbsensi({
    kelasId: params.kelasId,
    status:
      params.status || "hadir",
    metode: "face",
    keterangan:
      params.keterangan,
    lintang:
      params.lintang,
    bujur:
      params.bujur,
    snapshot:
      params.snapshot,
  });
}

/* =========================================================
   ABSEN MANUAL
   Untuk IZIN / SAKIT / ALPHA
========================================================= */

export async function absenManual(
  params: {
    kelasId: string;
    status: AbsensiStatus;
    keterangan?: string;
  }
): Promise<AbsensiResponse> {
  return createAbsensi({
    kelasId: params.kelasId,
    status: params.status,
    metode: "manual",
    keterangan:
      params.keterangan,
  });
}