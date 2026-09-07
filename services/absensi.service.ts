const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type AbsensiStatus =
  | "hadir"
  | "izin"
  | "sakit"
  | "alpha";

type AbsensiMetode =
  | "lokasi"
  | "barcode"
  | "face"
  | "manual";

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
  dibuatOleh?: string;
  dibuatPada?: string;
  diperbaruiPada?: string;
  pengguna?: {
    id: string;
    namaLengkap: string;
    nisn?: string | null;
  };
}

interface CreateAbsensiData {
  kelasId: string;
  status: AbsensiStatus;
  metode?: AbsensiMetode;
  keterangan?: string;
  lintang?: number;
  bujur?: number;
  barcodeData?: string;
  snapshot?: File | Blob;
}

interface AbsensiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Mengambil token login dari localStorage.
 *
 * Disamakan dengan user.service.ts
 * supaya semua service menggunakan mekanisme auth
 * yang sama.
 */
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
      return value
        .trim()
        .replace(/^Bearer\s+/i, "");
    }
  }

  return null;
}

/**
 * Request utama ke backend.
 */
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

  /**
   * Jangan set Content-Type secara manual
   * ketika body berupa FormData.
   *
   * Browser akan otomatis membuat:
   * multipart/form-data; boundary=...
   */
  const isFormData =
    options.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  headers.set(
    "Authorization",
    `Bearer ${token}`
  );

  const url = `${API_URL}${endpoint}`;

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    console.error(
      "Network error absensi:",
      error
    );

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
      console.error(
        "Response absensi bukan JSON:",
        {
          url,
          status: response.status,
          contentType,
          body: rawText,
        }
      );

      throw new Error(
        `Server mengembalikan response tidak valid (${response.status}).`
      );
    }
  }

  /**
   * Unauthorized
   */
  if (response.status === 401) {
    throw new Error(
      result?.message ||
        "Sesi login sudah tidak valid. Silakan login kembali."
    );
  }

  /**
   * Forbidden
   */
  if (response.status === 403) {
    throw new Error(
      result?.message ||
        "Anda tidak memiliki akses untuk melakukan absensi."
    );
  }

  /**
   * Error lainnya
   */
  if (!response.ok) {
    throw new Error(
      result?.message ||
        `Request gagal (${response.status})`
    );
  }

  return result as T;
}

/**
 * =========================================================
 * GET ABSENSI SAYA
 * GET /api/v1/absensi/saya
 * =========================================================
 */
export async function getAbsensiSaya(): Promise<
  Absensi[]
> {
  const result =
    await request<AbsensiResponse<Absensi[]>>(
      "/absensi/saya",
      {
        method: "GET",
      }
    );

  return Array.isArray(result?.data)
    ? result.data
    : [];
}

/**
 * =========================================================
 * GET ABSENSI KELAS
 * GET /api/v1/absensi/kelas/:kelasId
 * =========================================================
 */
export async function getAbsensiKelas(
  kelasId: string,
  tanggal?: string | null
): Promise<Absensi[]> {
  if (!kelasId) {
    throw new Error(
      "kelasId wajib diisi."
    );
  }

  let endpoint =
    `/absensi/kelas/${encodeURIComponent(
      kelasId
    )}`;

  if (tanggal) {
    endpoint +=
      `?tanggal=${encodeURIComponent(
        tanggal
      )}`;
  }

  const result =
    await request<AbsensiResponse<Absensi[]>>(
      endpoint,
      {
        method: "GET",
      }
    );

  return Array.isArray(result?.data)
    ? result.data
    : [];
}

/**
 * =========================================================
 * CREATE ABSENSI
 * POST /api/v1/absensi
 * =========================================================
 */
export async function createAbsensi(
  data: CreateAbsensiData
): Promise<Absensi> {
  const {
    kelasId,
    status,
    metode = "lokasi",
    keterangan,
    lintang,
    bujur,
    barcodeData,
    snapshot,
  } = data;

  if (!kelasId) {
    throw new Error(
      "kelasId wajib diisi."
    );
  }

  if (!status) {
    throw new Error(
      "Status absensi wajib diisi."
    );
  }

  /**
   * =======================================================
   * FACE
   *
   * Backend menggunakan:
   * upload.single("snapshot")
   *
   * Jadi nama field HARUS:
   * snapshot
   * =======================================================
   */
  if (metode === "face") {
    if (!snapshot) {
      throw new Error(
        "Foto wajah wajib disertakan."
      );
    }

    const formData = new FormData();

    formData.append(
      "kelasId",
      kelasId
    );

    formData.append(
      "status",
      status
    );

    formData.append(
      "metode",
      metode
    );

    if (keterangan) {
      formData.append(
        "keterangan",
        keterangan
      );
    }

    if (
      lintang !== undefined &&
      lintang !== null
    ) {
      formData.append(
        "lintang",
        String(lintang)
      );
    }

    if (
      bujur !== undefined &&
      bujur !== null
    ) {
      formData.append(
        "bujur",
        String(bujur)
      );
    }

    /**
     * Jika Blob biasa, ubah menjadi File
     * supaya multipart memiliki filename.
     */
    let snapshotFile: File | Blob =
      snapshot;

    if (
      typeof File !== "undefined" &&
      snapshot instanceof Blob &&
      !(snapshot instanceof File)
    ) {
      snapshotFile = new File(
        [snapshot],
        `absen-${Date.now()}.jpg`,
        {
          type:
            snapshot.type ||
            "image/jpeg",
        }
      );
    }

    formData.append(
      "snapshot",
      snapshotFile
    );

    const result =
      await request<
        AbsensiResponse<Absensi>
      >("/absensi", {
        method: "POST",
        body: formData,
      });

    return result.data;
  }

  /**
   * =======================================================
   * LOKASI / BARCODE / MANUAL
   *
   * Backend menerima req.body biasa.
   * =======================================================
   */
  const body: {
    kelasId: string;
    status: AbsensiStatus;
    metode: AbsensiMetode;
    keterangan?: string;
    lintang?: number;
    bujur?: number;
    barcodeData?: string;
  } = {
    kelasId,
    status,
    metode,
  };

  if (keterangan) {
    body.keterangan =
      keterangan;
  }

  if (
    lintang !== undefined &&
    lintang !== null
  ) {
    body.lintang = lintang;
  }

  if (
    bujur !== undefined &&
    bujur !== null
  ) {
    body.bujur = bujur;
  }

  if (barcodeData) {
    body.barcodeData =
      barcodeData;
  }

  const result =
    await request<
      AbsensiResponse<Absensi>
    >("/absensi", {
      method: "POST",
      body: JSON.stringify(body),
    });

  return result.data;
}

/**
 * =========================================================
 * ABSEN DENGAN LOKASI
 * =========================================================
 */
export async function absenDenganLokasi({
  kelasId,
  status = "hadir",
  keterangan = "",
}: {
  kelasId: string;
  status?: AbsensiStatus;
  keterangan?: string;
}): Promise<Absensi> {
  if (
    typeof navigator === "undefined"
  ) {
    throw new Error(
      "Geolocation hanya dapat digunakan di browser."
    );
  }

  if (!navigator.geolocation) {
    throw new Error(
      "Browser tidak mendukung akses lokasi."
    );
  }

  const position =
    await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(
                  new Error(
                    "Akses lokasi ditolak. Silakan izinkan lokasi pada browser."
                  )
                );
                break;

              case error.POSITION_UNAVAILABLE:
                reject(
                  new Error(
                    "Lokasi tidak tersedia."
                  )
                );
                break;

              case error.TIMEOUT:
                reject(
                  new Error(
                    "Waktu mengambil lokasi habis."
                  )
                );
                break;

              default:
                reject(
                  new Error(
                    "Gagal mendapatkan lokasi."
                  )
                );
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      }
    );

  return createAbsensi({
    kelasId,
    status,
    metode: "lokasi",
    keterangan,
    lintang:
      position.coords.latitude,
    bujur:
      position.coords.longitude,
  });
}

/**
 * =========================================================
 * ABSEN DENGAN BARCODE / QR
 * =========================================================
 */
export async function absenDenganBarcode({
  kelasId,
  barcodeData,
  status = "hadir",
  keterangan = "",
}: {
  kelasId: string;
  barcodeData: string;
  status?: AbsensiStatus;
  keterangan?: string;
}): Promise<Absensi> {
  if (!barcodeData) {
    throw new Error(
      "Data barcode/QR wajib diisi."
    );
  }

  return createAbsensi({
    kelasId,
    status,
    metode: "barcode",
    barcodeData,
    keterangan,
  });
}

/**
 * =========================================================
 * ABSEN DENGAN FACE
 * =========================================================
 */
export async function absenDenganFace({
  kelasId,
  snapshot,
  status = "hadir",
  keterangan = "",
}: {
  kelasId: string;
  snapshot: File | Blob;
  status?: AbsensiStatus;
  keterangan?: string;
}): Promise<Absensi> {
  if (!snapshot) {
    throw new Error(
      "Foto wajah wajib disertakan."
    );
  }

  if (
    typeof Blob !== "undefined" &&
    !(snapshot instanceof Blob)
  ) {
    throw new Error(
      "Snapshot harus berupa File atau Blob."
    );
  }

  return createAbsensi({
    kelasId,
    status,
    metode: "face",
    snapshot,
    keterangan,
  });
}

/**
 * =========================================================
 * ABSEN MANUAL
 *
 * Dipakai untuk:
 * - izin
 * - sakit
 * - manual hadir
 * - alpha
 * =========================================================
 */
export async function absenManual({
  kelasId,
  status,
  keterangan = "",
}: {
  kelasId: string;
  status: AbsensiStatus;
  keterangan?: string;
}): Promise<Absensi> {
  return createAbsensi({
    kelasId,
    status,
    metode: "manual",
    keterangan,
  });
}